const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

	SELECT
		first_name AS NAME,
		birth_date AS DOB,
		state AS STATE
	FROM customers
	WHERE birth_date >= '1990-01-01' && state = 'va'; -- Can use 'va' or 'VA' (SQL is case-insensitive)

`,

/*SQL*/ `

	SELECT
		first_name AS NAME,
		birth_date AS DOB,
		state AS STATE
	FROM customers
	WHERE birth_date >= '1990-01-01' || state = 'va'; -- Can also use OR, AND, NOT

`,

/*SQL*/ `

	SELECT
		first_name AS NAME,
		birth_date AS DOB,
		state AS STATE
	FROM customers
	WHERE !(birth_date >= '1990-01-01' || state = 'va');

`,

];

sql.execute(...q);