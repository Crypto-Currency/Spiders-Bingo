const mysql = require('mysql');
const config=require("./config.json");
const pool = require('./database');
const rpc = require('node-json-rpc');
const token = config.token;

const sqluser=config.sqluser;
const sqlpass=config.sqlpass;
const sqldatabase=config.sqldatabase;
const prefix = config.prefix;

var coin="";
var user="";

var command;
if(process.argv[2])
  command=process.argv[2].toLowerCase();
//  var com=command.toLowerCase();

async function update()
{
  let result=await pool.query("select * from coins");
  let numRows=result.length;
  if(numRows>0)
    for(let t=0;t<numRows;t++)
      await updateCoin(result[t].ticker);
}

async function creditAccounts()
{
  let result=await pool.query("select * from transactions");
  var numRows = result.length;
  if(numRows>0)
  {
    for(let i=0;i<numRows;i++)
    {
      if(result[i].done != 1)
      {
        let id=result[i].ID;
        let res=await updateAccounts(result[i].name,result[i].ticker,result[i].address,result[i].txid,result[i].txtype,result[i].amount);
//console.log("res=",res);
        if(res==1)
        {
          let res=await pool.query("update transactions set done = 1 where ID = \""+id+"\"");
        }
      }
    }
  }
}

async function doit()
{
  switch (command)
  {
    case "update":
      await update();
console.log("step 1 done.");
      process.exit();
      break;
    case "credit":
      await creditAccounts();
console.log("step 2 done.");
      process.exit();
      break;
    case "all":
      await update();
      await creditAccounts();
console.log("both steps done.");
      process.exit();
  }
  console.log("dep-update");
  console.log("update - gets transactions from walets, and adds it to the database");
  console.log("credit - rescans database and credits user accounts");
  console.log("all    - do both\n");
  process.exit();
}

doit();


/////////////////////////////////////////////  sub routines
////////////////////////////////////////////////////////////////////////  updateAccounts
async function updateAccounts(name,ticker,address,txid,txtype,amount)
{
// transaction sent here is done=0
console.log("%s %s %s %s %s %d",name,ticker,address,txid,txtype,amount);
  let tid= await pool.query("select * from addresses where address=\""+address+"\" and ticker=\""+ticker+"\"");
  let balance=tid[0].balance;
  let newbalance=balance+amount;
  let wallet=tid[0].wallet;
  let withdrawal=tid[0].withdrawal;
  let id=tid[0].ID;
  let done=1;
  if(txtype=="receive")
    wallet=wallet+amount;
  if(txtype=="send")
    withdrawal=withdrawal+amount;
//console.log("newbalance=",newbalance);
 let res=await pool.query("update addresses set balance=\""+newbalance+"\",wallet=\""+wallet+"\",withdrawal=\""+withdrawal+"\"  where ID = \""+id+"\"");
//console.log("res=",res);
  return res.changedRows;
}

////////////////////////////////////////////////////////////////  updateCoin
async function updateCoin(coin)
{
  var address="";
  var txid="";

  var param="*";
  var param2=100;
  var method="listtransactions";
  res=await Daemon(coin,method,param,param2);

  let numRows=res.length;
  if(numRows>0)
  {
    for(let t=0;t<numRows;t++)
    {
      txid=res[t].txid;
      let isin=await pool.query("select * from transactions where txid=\""+txid+"\"");
      let txNum=isin.length
      if(txNum==0)
      {
//  would be better to check confirmations
        if((res[t].category!="generate")&&(res[t].category!="orphan"))
        {
          if(res[t].category=="send")
          {
            console.log("send %d to %s",res[t].amount,res[t].address);
          }
          if(res[t].category=="receive")
          {
            console.log("%s received %d with %s",res[t].account,res[t].amount,res[t].address);
console.log("calling insertTx");
            let intx=await insertTx(res[t].account,coin,res[t].address,txid,res[t].category,res[t].amount,0);
          }

        }
      }
      else
      {
        if(isin[0].txtype != res[t].category)
        {
// for sends - we need to look up the user name via address;
          let result=await pool.query("select * from addresses");
          let numRows = result.length;
          if(numRows>0)
          for(let i=0;i<numRows;i++)
          {
            if(result[i].address==res[t].address)
            {
              let intx= insertTx(result[i].name,coin,res[t].address,txid,res[t].category,res[t].amount,0);
              break;
            }
          }
        }
      }
    }
  }
}


///////////////////////////////////////////////////////////////  insertTx
async function insertTx(user,coin,addr,txid,txtype,amt,done)
{
console.log("looking for ",txid);
  let txs = await pool.query("select * from transactions where txid=\""+txid+"\" and txtype=\""+txtype+"\"");
  let dups = txs.length;
console.log("dups=",dups);
  if(dups==0)
  {
console.log("trying to insert new transaction");
    return new Promise((resolve,reject) =>
    {
//      pool.query("insert into transactions (name,ticker,address,txid,txtype,amount,done) VALUES (\""+user+"\",\""+coin+"\",\""+addr+"\",\""+txid+"\",\""+txtype+"\",\""+amt+"\",\""+done+"\") ON DUPLICATE KEY UPDATE amount=\""+amt+"\"",
      pool.query("insert into transactions (name,ticker,address,txid,txtype,amount,done) VALUES (\""+user+"\",\""+coin+"\",\""+addr+"\",\""+txid+"\",\""+txtype+"\",\""+amt+"\",\""+done+"\")",
      function(err,txresults)
      {
        if (err) resolve(err);
        resolve(txresults);
      });
    });
  }
  else
  {// dups mean they are already in the database
//console.log("looking for ",txid);
console.log("tx record is",txs[0].txid);
console.log("looking for ",txtype);
console.log("txtype    is",txs[0].txtype);
  }
}

//////////////////////////////////////////////////////////  Daemon
async function Daemon(ticker,method,params,params2)
{
console.log("ticker=",ticker)
  if(!ticker)
    return;

  let myport="coins."+ticker+"port";
  var coinfile="./coins/"+ticker+".json";
  let coins=require(coinfile);
  var options=
  {
    port: coins.port,
    host: "localhost",
    path: "/",
    strict: true,
    login: coins.user,
    hash: coins.password
  };

  var client = new rpc.Client(options);
  return new Promise((resolve, reject) =>
  {
    client.call(
    {
      "jsonrpc": "1.0", "method": method, "params": [params,params2], "id": 1
    },
    function (err, res)
    {
      if( err )
      {
        resolve(err);
        console.log("Daemon error: "+err);
      }
      else
      {
        resolve(res.result);
        return(res);
      }
    });
  });
}

