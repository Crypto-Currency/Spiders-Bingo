# Spiders-Bingo

This is a Discord bot written in node.
<br>
Includes:
<br>*Bingo
<br>*Banker (Wallet deposits/withdrawals)
<br>*tipping
<br>*faucet
<br>
<br>
Each feature can be enabled/dissabled
<br>
<br>
## Setting up

copy config.json-basic to config.json<br>
edit the config file as needed.
```
  "token": "this is your very long supper secret token",
  "sqluser": "db user name",
  "sqlpass": "db user password",
```
### never post passwords or discord bot tokens!!!
```
  "sqldatabase": "BANK",
```
### if you change the database name and it breaks the bot, search the files for BANK
```
  "prefix": "*",
```
### this is the char that tells the bot it is a command
```
  "coinNum": 2,
  "coin1": "LCP",
  "coin2": "BCF",
```
### I don't think  coinnum and coin1, coin2 are used <shrug>

```
  "firstchar": "B",
  "firstchar2": "B",
```
### some coins have more than one letter in the begining of their addresses
```
  "server": "BitcoinFast",
  "roomid": "506252317801185281",
```
###  actual discord server name - make sure it matches
```
  "bingoroom": "506252317801185281",
  "botroom": "659876181373485127",
  "faucetroom": "713972268883116081",
```
### id# for the rooms. it keeps the bot from using other rooms/channels
### you don't want people using *bal in your main channel
```
  "bingo_enabled": 1,
  "rain_enabled": 0,
  "fountain_enabled": 1,
  "fountainid": "683492514992619574",
```
### fountainid is the id## of the user named faucet.
### I suggest creating a new discord account with a user name of faucet.
### the easiest way to refill the faucet is to tip it.
### also, you may have a need to login as faucet to withdraw funds 
```
  "bottest": "500353242182451211",
```
### you might want a private channel for testing
```
  "ticker": "BCF",
  "logo": "BCF.png",
  "donation_enabled":1,
  "btc_address":"18gN7vYLqc87iAvzq7e2DwZYh9mBvGgSxk",
  "gamecost": 10,
  "housecost": 1
```
### donation_enabled is for btc donations.
### game cost is how much bingo cost each round of bingo
### housecost is how much the host gets each round of bingo
<br>

