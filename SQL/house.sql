use BANK;
#drop table house;

CREATE TABLE house
(
  ID INT AUTO_INCREMENT,
  ticker VARCHAR(6),
  balance DECIMAL(24,8) DEFAULT '0.0',
  PRIMARY KEY(ID),
  INDEX(ticker)
)

