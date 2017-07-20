CREATE SCHEMA IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	id INTEGER AUTO_INCREMENT,
	product_name VARCHAR(255),
	department_name VARCHAR(255),
	price DECIMAL(11,2),
	stock_quantity INTEGER(11),

	PRIMARY KEY (id)
);
