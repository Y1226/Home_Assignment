--===========
-- Exercise_1
--===========

CREATE DATABASE Relationships
GO

USE Relationships
GO

CREATE TABLE Person_tbl
(
	Person_Id SMALLINT PRIMARY KEY,
	Personal_Name VARCHAR(50),
	Family_Name VARCHAR(50),
	Gender CHAR,
	CONSTRAINT chk_Gender 
        CHECK (Gender IN ('M', 'F')),
	Father_Id SMALLINT,
	Mother_Id SMALLINT,
	Spouse_Id SMALLINT
)

CREATE TABLE Relation_tbl
(
	Person_Id SMALLINT REFERENCES Person_tbl(Person_Id),
	Relative_Id SMALLINT REFERENCES Person_tbl(Person_Id),
	Connection_Type VARCHAR(10),
	CONSTRAINT chk_ConnectionType 
        CHECK (Connection_Type IN ('Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter', 'Husband', 'Wife')),
	PRIMARY KEY (Person_Id, Relative_Id, Connection_Type)
)

--===========
-- Exercise_2
--===========

UPDATE P
SET P.Spouse_Id = R.Person_Id
FROM Person_tbl P 
	JOIN Relation_tbl R
	ON P.Person_Id = R.Relative_Id
WHERE 
	R.Connection_Type IN ('Husband', 'Wife')
AND 
	Relative_Id NOT IN 
	(
		SELECT Person_Id 
		FROM Relation_tbl 
		WHERE Connection_Type IN ('Husband', 'Wife')
	)


--==========================================================
-- The following code gets the Id's that have to be updated.
--==========================================================

--SELECT 
--	Person_Id,
--	Relative_Id
--FROM Relation_tbl R
--WHERE (
--	Connection_Type = 'Husband' OR Connection_Type = 'Wife'
--) 
--AND Relative_Id NOT IN (
--	SELECT Person_Id 
--	FROM Relation_tbl 
--	WHERE Connection_Type = 'Husband' OR Connection_Type = 'Wife'
--)




--===============================================
-- Code to fill in the data for testing purposes.
--===============================================

INSERT INTO Person_tbl (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES 
(111,'Avraham', 'First', 'M', NULL, NULL, NULL),
(222,'Sarah', 'First', 'F', NULL, NULL, 111),
(333,'Rivka', 'Second', 'F', 111, 222, NULL),
(444,'Yitzchak', 'Second', 'M', NULL, NULL, 333),
(555,'Yaakov', 'Second', 'M', 444, 333, NULL);

INSERT INTO Relation_tbl(Person_Id, Relative_Id, Connection_Type)
VALUES 
(111,333,'Daughter'),
(222,333,'Daughter'),
(333,555,'Son'),
(444,555,'Son'),
(555,333,'Mother'),
(555,444,'Father'),
(333,111,'Father'),
(333,222,'Mother'),
(222,111,'Husband'),
(444,333,'Wife');



INSERT INTO Relation_tbl (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Father_Id, 'Father'
FROM Person_tbl
WHERE Father_Id IS NOT NULL;

INSERT INTO Relation_tbl (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Mother_Id, 'Mother'
FROM Person_tbl
WHERE Mother_Id IS NOT NULL;

INSERT INTO Relation_tbl (Person_Id, Relative_Id, Connection_Type)
SELECT 
	Person_Id, 
	Spouse_Id, 
	CASE
		WHEN Gender = 'M' THEN 'Wife'
		ELSE 'Husband'
	END AS Spouse
FROM Person_tbl
WHERE Spouse_Id IS NOT NULL AND Person_Id NOT IN (SELECT Person_Id FROM Relation_tbl WHERE Connection_Type IN ('Husband','Wife'));

INSERT INTO Relation_tbl (Person_Id, Relative_Id, Connection_Type)
SELECT 
	P1.Person_Id, 
	P2.Person_Id,
	CASE
		WHEN P2.Gender = 'M' THEN 'Brother'
		ELSE 'Sister'
	END AS Sibling
FROM Person_tbl P1
JOIN Person_tbl P2
    ON P1.Father_Id = P2.Father_Id
    AND P1.Mother_Id = P2.Mother_Id
    AND P1.Person_Id != P2.Person_Id;

INSERT INTO Relation_tbl (Person_Id, Relative_Id, Connection_Type)
SELECT 
	P2.Person_Id, 
	P1.Person_Id,
	CASE
		WHEN P1.Gender = 'M' THEN 'Son'
		ELSE 'Daughter'
	END AS Sibling
FROM Person_tbl P1
JOIN Person_tbl P2
    ON P1.Father_Id = P2.Person_Id
	OR P1.Mother_Id = P2.Person_Id
    AND P1.Person_Id != P2.Person_Id;