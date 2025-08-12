-- Q1: Library Management System

-- 1. Table Creation
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Country VARCHAR(50)
);

CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    AuthorID INT,
    PublishedYear INT,
    Genre VARCHAR(50),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

CREATE TABLE Borrowers (
    BorrowerID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Contact VARCHAR(15)
);

CREATE TABLE BorrowedBooks (
    BorrowID INT PRIMARY KEY,
    BorrowerID INT,
    BookID INT,
    BorrowDate DATE,
    ReturnDate DATE,
    FOREIGN KEY (BorrowerID) REFERENCES Borrowers(BorrowerID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- 2. Data Insertion
INSERT INTO Authors VALUES (1, 'J.K. Rowling', 'UK');
INSERT INTO Authors VALUES (2, 'George R.R. Martin', 'USA');
INSERT INTO Authors VALUES (3, 'Haruki Murakami', 'Japan');
INSERT INTO Authors VALUES (4, 'Chimamanda Ngozi Adichie', 'Nigeria');
INSERT INTO Authors VALUES (5, 'Paulo Coelho', 'Brazil');

INSERT INTO Books VALUES (1, 'Harry Potter and the Cursed Child', 1, 2016, 'Fantasy');
INSERT INTO Books VALUES (2, 'A Game of Thrones', 2, 1996, 'Fantasy');
INSERT INTO Books VALUES (3, 'Kafka on the Shore', 3, 2002, 'Fiction');
INSERT INTO Books VALUES (4, 'Half of a Yellow Sun', 4, 2006, 'Historical Fiction');
INSERT INTO Books VALUES (5, 'The Alchemist', 5, 1988, 'Fiction');
INSERT INTO Books VALUES (6, 'The Silent Patient', NULL, 2019, 'Thriller');
INSERT INTO Books VALUES (7, 'Becoming', NULL, 2018, 'Biography');
INSERT INTO Books VALUES (8, 'Normal People', NULL, 2018, 'Fiction');
INSERT INTO Books VALUES (9, 'Educated', NULL, 2018, 'Memoir');
INSERT INTO Books VALUES (10, 'The Testaments', 1, 2019, 'Dystopian');

INSERT INTO Borrowers VALUES (1, 'Alice Smith', '1234567890');
INSERT INTO Borrowers VALUES (2, 'Bob Johnson', '2345678901');
INSERT INTO Borrowers VALUES (3, 'Charlie Lee', '3456789012');
INSERT INTO Borrowers VALUES (4, 'Diana Prince', '4567890123');
INSERT INTO Borrowers VALUES (5, 'Ethan Hunt', '5678901234');

INSERT INTO BorrowedBooks VALUES (1, 1, 3, '2024-06-01', NULL);
INSERT INTO BorrowedBooks VALUES (2, 2, 1, '2024-06-02', '2024-06-10');
INSERT INTO BorrowedBooks VALUES (3, 3, 5, '2024-06-03', NULL);
INSERT INTO BorrowedBooks VALUES (4, 1, 6, '2024-06-04', NULL);
INSERT INTO BorrowedBooks VALUES (5, 4, 8, '2024-06-05', NULL);

-- 3. Queries
-- a) Books published after 2015
SELECT * FROM Books WHERE PublishedYear > 2015;

-- b) Borrowers who borrowed 'Fiction' books
SELECT DISTINCT br.Name
FROM Borrowers br
JOIN BorrowedBooks bb ON br.BorrowerID = bb.BorrowerID
JOIN Books b ON bb.BookID = b.BookID
WHERE b.Genre = 'Fiction';

-- c) Most borrowed book
SELECT b.Title, COUNT(*) AS BorrowCount
FROM BorrowedBooks bb
JOIN Books b ON bb.BookID = b.BookID
GROUP BY b.Title
ORDER BY BorrowCount DESC
LIMIT 1;

-- d) Authors whose books are currently borrowed
SELECT DISTINCT a.Name
FROM Authors a
JOIN Books b ON a.AuthorID = b.AuthorID
JOIN BorrowedBooks bb ON b.BookID = bb.BookID
WHERE bb.ReturnDate IS NULL;

-- e) Total number of books in each genre
SELECT Genre, COUNT(*) AS TotalBooks
FROM Books
GROUP BY Genre;

-- Q2: Customers with ID 2001 below Salesperson ID of Mc Lyon
-- (Sample data for Customer and Salesman tables)
CREATE TABLE Salesman (
    salesman_id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(100),
    commission DECIMAL(4,2)
);

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    cust_name VARCHAR(100),
    city VARCHAR(100),
    grade INT,
    salesman_id INT
);

INSERT INTO Salesman VALUES (5001, 'James Hoog', 'New York', 0.15);
INSERT INTO Salesman VALUES (5002, 'Nail Knite', 'Paris', 0.13);
INSERT INTO Salesman VALUES (5005, 'Pit Alex', 'London', 0.11);
INSERT INTO Salesman VALUES (5006, 'Mc Lyon', 'Paris', 0.14);
INSERT INTO Salesman VALUES (5003, 'Lauson Hen', 'San Jose', 0.12);
INSERT INTO Salesman VALUES (5007, 'Paul Adam', 'Rome', 0.13);

INSERT INTO Customer VALUES (3002, 'Nick Rimando', 'New York', 100, 5001);
INSERT INTO Customer VALUES (3005, 'Graham Zusi', 'California', 200, 5002);
INSERT INTO Customer VALUES (3001, 'Brad Guzan', 'London', 100, 5005);
INSERT INTO Customer VALUES (3004, 'Fabian Johns', 'Paris', 300, 5006);
INSERT INTO Customer VALUES (3007, 'Brad Davis', 'New York', 200, 5001);
INSERT INTO Customer VALUES (3009, 'Geoff Camero', 'Berlin', 100, 5003);
INSERT INTO Customer VALUES (3008, 'Julian Green', 'London', 300, 5002);
INSERT INTO Customer VALUES (3003, 'Jozy Altidor', 'Moscow', 200, 5007);

SELECT *
FROM Customer
WHERE customer_id = 2001
  AND salesman_id < (
      SELECT salesman_id
      FROM Salesman
      WHERE name = 'Mc Lyon'
  );

-- Q3: Salespeople not in the same city as their customers, commission > 12%
SELECT c.cust_name, c.city AS customer_city, s.name AS salesman, s.city AS salesman_city, s.commission
FROM Customer c
JOIN Salesman s ON c.salesman_id = s.salesman_id
WHERE c.city <> s.city
  AND s.commission > 0.12;

-- Q4: Customer Order Placement Report
CREATE TABLE orders (
    ord_no INT PRIMARY KEY,
    purch_amt DECIMAL(10,2),
    ord_date DATE,
    customer_id INT,
    salesman_id INT
);

INSERT INTO orders VALUES (70001, 150.50, '2012-10-05', 3005, 5002);
INSERT INTO orders VALUES (70009, 270.65, '2012-09-10', 3001, 5005);
INSERT INTO orders VALUES (70002, 65.26, '2012-10-05', 3002, 5001);
INSERT INTO orders VALUES (70004, 110.50, '2012-08-17', 3009, 5003);
INSERT INTO orders VALUES (70007, 948.50, '2012-09-10', 3005, 5002);
INSERT INTO orders VALUES (70005, 2400.60, '2012-07-27', 3007, 5001);
INSERT INTO orders VALUES (70008, 5760.00, '2012-09-10', 3002, 5001);
INSERT INTO orders VALUES (70010, 1983.43, '2012-10-10', 3004, 5006);

SELECT
    c.cust_name,
    c.city,
    o.ord_no,
    o.ord_date,
    o.purch_amt
FROM orders o
LEFT JOIN customer c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NOT NULL

UNION

SELECT
    NULL AS cust_name,
    NULL AS city,
    o.ord_no,
    o.ord_date,
    o.purch_amt
FROM orders o
LEFT JOIN customer c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL; 