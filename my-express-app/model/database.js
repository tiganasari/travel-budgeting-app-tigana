require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "expenses",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = "DROP TABLE IF EXISTS 'wallet'; CREATE TABLE `wallet` (`id` int NOT NULL AUTO_INCREMENT,`city` char NOT NULL,	`currency` char NOT NULL,	`sum` int NOT NULL,	`sum-native-currency` int NOT NULL,	`user.id` int NOT NULL, PRIMARY KEY (`id`));DROP TABLE IF EXISTS 'Expenses';CREATE TABLE `Expenses` (`id` intNOT NULL AUTO_INCREMENT,	`category` char NOT NULL,	`amount` int NOT NULL`amount-native-currency` int NOT NULL,`date` char NOT NULL,	`notes` char NOT NULL,	`wallet.id` int NOT NULL,PRIMARY KEY (`id`);DROP TABLE IF EXISTS 'User';CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT,`name` char NOT NULL,	`native-currency` char NOT NULL,PRIMARY KEY (`id`));";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `items` was successful!");

    console.log("Closing...");
  });

  con.end();
});


