/* populateDB.sql */ 

INSERT INTO customers VALUES (1, 'Bob', 'Bob@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'bob123'); 
INSERT INTO customers VALUES (2, 'Bill', 'Bill@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'bill123'); 
INSERT INTO customers VALUES (3, 'Matt', 'matt@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'matt123'); 
INSERT INTO customers VALUES (4, 'Mark', 'mark@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'max123'); 
INSERT INTO customers VALUES (5, 'Tom', 'tom@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'tom123'); 
 
INSERT INTO flavors VALUES (1, 'Vanilla');
INSERT INTO flavors VALUES (2, 'Chocolate');
INSERT INTO flavors VALUES (3, 'Strawberry');
INSERT INTO flavors VALUES (4, 'Blueberry');
INSERT INTO flavors VALUES (5, 'Blue Raspberry');

INSERT INTO combo VALUES (1, 1, 1, 4, NULL); 
INSERT INTO combo VALUES (2, 2, 5, NULL, NULL); 
INSERT INTO combo VALUES(3, 3, 1, 3, NULL); 
INSERT INTO combo VALUES(4, 4, 2, NULL, NULL); 
INSERT INTO combo VALUES(5, 5, 5, NULL, NULL);

INSERT INTO branches VALUES (1, 'slushie', '400 Cedar Ave, West Long Branch, NJ 07764'); 
INSERT INTO branches VALUES (2, 'slushie', '500 Cedar Ave, West Long Branch, NJ 07764'); 

INSERT INTO orders VALUES(1, 1, 10, NULL, 1, 1, 3, NULL);
