const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

	SELECT
		first_name AS NAME,
		points AS POINTS
	FROM customers
	WHERE points > 3000;

`,

/*SQL*/ `

	SELECT
		first_name AS NAME,
		state AS STATE
	FROM customers
	WHERE state <> 'VA'; -- Not Equal operators != or <>

`,

/*
	DATE in SQL -> 'YYYY-MM-DD' (hyphen is not necessary)

	- Always put DATE in quotes. Otherwise SQL will consider date as integers
	  with subtraction sign in between, leading to unexpected results.

	- Also keep in mind that sometimes dates maybe stored as VARCHAR.
	  In such cases we can use CAST() to cast VARCHAR date to DATE datatype
*/

/*SQL*/ `

	-- Casting so that if birth_date was VARCHAR, it gets converted to DATE

	SELECT
		first_name AS NAME,
		birth_date AS DOB
	FROM customers
	WHERE CAST(birth_date AS DATE) > '1990-01-01';

`,

/*SQL*/ `

	-- Finding data type of birth_dates

	SELECT DATA_TYPE
	FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_NAME = 'customers' && COLUMN_NAME = 'birth_date';

`,

];

sql.execute(...q);
