use PRICE

create table BCF
(
  ID INT AUTO_INCREMENT,
  exchange VARCHAR(24),
  pair VARCHAR(5),
  bid DECIMAL(24,8) DEFAULT 0.00,
  ask DECIMAL(24,8) DEFAULT 0.00,
  close DECIMAL(24,8) DEFAULT 0.00,
  date timestamp default now(),
  PRIMARY KEY(ID),
  INDEX(date)
);
