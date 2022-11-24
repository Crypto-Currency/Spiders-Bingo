use BANK;
#drop table transactions;

CREATE TABLE transactions
(
  ID INT AUTO_INCREMENT,
  name VARCHAR(24),
  ticker VARCHAR(5),
  address VARCHAR(35),
  txid VARCHAR(64),
  txtype VARCHAR(12),
  amount DECIMAL(24,8),
  done DECIMAL(1),
  PRIMARY KEY(ID),
  INDEX(name),
  INDEX(address),
  INDEX(txid)
);

