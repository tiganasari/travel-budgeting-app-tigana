
DROP TABLE IF EXISTS wallet;

CREATE TABLE `wallet` (
	`id` int NOT NULL AUTO_INCREMENT,
	`city` char(40) NOT NULL,
	`currency` char(40) NOT NULL,
	`sum` int NOT NULL,
	`sum_native_currency` int NOT NULL,
	`user.id` int NOT NULL,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS Expenses;

CREATE TABLE `Expenses` (
	`id` int NOT NULL AUTO_INCREMENT,
	`category` char(40) NOT NULL,
	`amount` int NOT NULL,
	`sum_native_currency` int NOT NULL,
	`date` char(40)NOT NULL,
	`notes` char(40) NOT NULL,
	`wallet.id` int NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS User;

CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` char (40) NOT NULL,
	`native_currency` char(40) NOT NULL,
	PRIMARY KEY (`id`)
);



