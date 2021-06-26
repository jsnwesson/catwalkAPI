DROP DATABASE IF EXISTS productsComponent;

CREATE DATABASE productsComponent;

USE productsComponent;

CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  slogan VARCHAR(50),
  description VARCHAR(250),
  category VARCHAR(15)
);

CREATE TABLE features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(15),
  value VARCHAR(25),
  FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE relatedProducts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  relatedProductId INT,
  FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE style (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  _default TINYINT(1),
  name VARCHAR(15),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE styleSku (
  id INT AUTO_INCREMENT PRIMARY KEY,
  style_id INT,
  size VARCHAR(10),
  quantity INT(5),
  FOREIGN KEY (style_id) REFERENCES style (id)
);

CREATE TABLE stylePhotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  style_id INT,
  url VARCHAR(150),
  thumbnail_url varchar(150),
  FOREIGN KEY (style_id) REFERENCES style (id)
);