CREATE productsComponent

USE productsComponent

CREATE TABLE product (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  slogan VARCHAR(50),
  description VARCHAR(250),
  category VARCHAR(15),
)

CREATE TABLE features (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  feature VARCHAR(15),
  value VARCHAR(25),
  FOREIGN KEY (productId) REFERENCES product (id),
)

CREATE TABLE relatedProducts (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  relatedProductId INT,
  FOREIGN KEY (productId) REFERENCES product (id),
)

CREATE TABLE style (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  productId INT,
  default TINYINT,
  name VARCHAR(15),
  original_price VARCHAR(10),
  salePrice VARCHAR(10),
  FOREIGN KEY (productId) REFERENCES product (id),
)

CREATE TABLE styleSku (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  styleId INT,
  size VARCHAR(10),
  quantity INT(5),
  FOREIGN KEY (styleId) REFERENCES style (id),
)

CREATE TABLE stylePhotos (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  styleId INT,
  url VARCHAR(150),
  thumbnail_url varchar(150)
  FOREIGN KEY (styleId) REFERENCES style (id),
)