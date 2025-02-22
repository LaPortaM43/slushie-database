/* database/makeDB.sql */ 

DROP DATABASE SlushieTestDB; 
CREATE DATABASE SlushieTestDB;
USE SlushieTestDB;

DROP TABLE IF EXISTS customers; 
CREATE TABLE customers ( 
    customerID INT AUTO_INCREMENT PRIMARY KEY, 
    customerName VARCHAR(100) NOT NULL, 
    customerEmail VARCHAR(100) UNIQUE NOT NULL,
    customerAddress VARCHAR(255) NOT NULL, 
    customerPassword VARCHAR(255) NOT NULL
); 
TRUNCATE TABLE customers; 

DROP TABLE IF EXISTS flavors; 
CREATE TABLE flavors ( 
    flavorID INT AUTO_INCREMENT PRIMARY KEY, 
    flavorName VARCHAR(100) UNIQUE NOT NULL
);
TRUNCATE TABLE flavors; 

DROP TABLE IF EXISTS combo;
CREATE TABLE combo ( 
    comboID INT AUTO_INCREMENT PRIMARY KEY, 
    customerID INT NOT NULL, 
    flavor1ID INT NOT NULL, 
    flavor2ID INT DEFAULT NULL,
    flavor3ID INT DEFAULT NULL,
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (flavor1ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor2ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor3ID) REFERENCES flavors(flavorID)
);
TRUNCATE TABLE combo; 

DROP TABLE IF EXISTS branches;
CREATE TABLE branches ( 
    branchID INT AUTO_INCREMENT PRIMARY KEY, 
    branchName VARCHAR(100) NOT NULL, 
    branchAddress VARCHAR(255) UNIQUE NOT NULL
);
TRUNCATE TABLE branches; 

DROP TABLE IF EXISTS orders; 
CREATE TABLE orders ( 
    orderID INT AUTO_INCREMENT PRIMARY KEY, 
    customerID INT NOT NULL,
    price VARCHAR(50) NOT NULL,  
    deliveryAddress VARCHAR(255) DEFAULT NULL,  
    branchID INT NOT NULL, 
    flavor1ID INT NOT NULL,  
    flavor2ID INT DEFAULT NULL,  
    flavor3ID INT DEFAULT NULL,  
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (branchID) REFERENCES branches (branchID),
    FOREIGN KEY (flavor1ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor2ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor3ID) REFERENCES flavors(flavorID)
);
TRUNCATE TABLE orders;
