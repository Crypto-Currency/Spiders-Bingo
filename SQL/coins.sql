use BANK;
drop table coins;

CREATE TABLE coins
(
  ID INT AUTO_INCREMENT,
  name VARCHAR(24),
  ticker VARCHAR(5),
  guild VARCHAR(256),
  channel VARCHAR(256),
  PRIMARY KEY(ID),
  INDEX(name),
  INDEX(ticker)
)

