
DROP TABLE IF EXISTS wallet;

CREATE TABLE `wallet` (
	`id` int NOT NULL AUTO_INCREMENT,
	`city` char(40) NOT NULL,
	`currency` char(40) NOT NULL,
	`native_currency` char(40) NOT NULL,
	`sum` int,
	`sum_native_currency` int,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS Expenses;

CREATE TABLE `Expenses` (
	`id` int NOT NULL AUTO_INCREMENT,
	`category` char(40),
	`amount` int NOT NULL,
	`sum_native_currency` int,
	`date` char(40),
	`notes` char(40),
	`wallet_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS User;

CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` char (40) NOT NULL,
	`native_currency` char(40) NOT NULL,
	PRIMARY KEY (`id`)
);



