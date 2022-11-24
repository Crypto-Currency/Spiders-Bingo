use BANK;
#drop table addresses;

CREATE TABLE addresses
(
  ID INT AUTO_INCREMENT,
  name VARCHAR(256),
  ticker VARCHAR(5),
  address VARCHAR(35),
  balance DECIMAL(24,8) DEFAULT '0.00',
  spent DECIMAL(24,8) DEFAULT '0.00',
  tips DECIMAL(24,8) DEFAULT '0.00',
  tips_sent DECIMAL(24,8) DEFAULT '0.00',
  wallet DECIMAL(24,8) DEFAULT '0.00',
  withdrawal DECIMAL(24,8) DEFAULT '0.00',
  PRIMARY KEY(ID),
  INDEX(name),
  INDEX(address)
)

