use BANK;
#drop table users;

CREATE TABLE users
(
  ID INT AUTO_INCREMENT,
  name VARCHAR(256),
  userid VARCHAR(5),
  PRIMARY KEY(ID,name),
  INDEX(name)
)

