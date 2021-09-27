
DROP TABLE IF EXISTS wallet;

CREATE TABLE `wallet` (
	`id` int NOT NULL AUTO_INCREMENT,
	`city` char NOT NULL,
	`currency` char NOT NULL,
	`sum` int NOT NULL,
	`sum-native-currency` int NOT NULL,
	`user.id` int NOT NULL,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS Expenses;

CREATE TABLE `Expenses` (
	`id` int NOT NULL AUTO_INCREMENT,
	`category` char NOT NULL,
	`amount` int NOT NULL,
	`amount-native-currency` int NOT NULL,
	`date` char NOT NULL,
	`notes` char NOT NULL,
	`wallet.id` int NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS User;

CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` char NOT NULL,
	`native-currency` char NOT NULL,
	PRIMARY KEY (`id`)
);



