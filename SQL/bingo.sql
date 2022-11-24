use BANK;
#drop table bingo;

create table bingo
(
  ID INT AUTO_INCREMENT,
  name VARCHAR(256),
  ticker VARCHAR(5),
  userid VARCHAR(18),
  B VARCHAR(26),
  I VARCHAR(26),
  N VARCHAR(26),
  G VARCHAR(26),
  O VARCHAR(26),
  hits DECIMAL(3) DEFAULT '0.00',
  PRIMARY KEY(ID),
  INDEX(name)
)
