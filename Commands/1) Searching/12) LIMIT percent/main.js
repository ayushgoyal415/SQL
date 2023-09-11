const sql = require("sql");
const store = sql.connect("sql_store");

const percent = 30;

store
	.execute(
		/*SQL*/ `

	-- FLOOR function converts the floating number to integer
	-- COUNT function counts the total number of rows that get selected

		SELECT
			FLOOR(COUNT(*)/100 * ${percent}) AS count
		FROM customers
		
	`
	)
	.then(result =>
		store.execute(/*SQL*/ `
			
		SELECT
	    	CONCAT(first_name," ",last_name) AS NAME,
	    	points
	    FROM customers
		ORDER BY points DESC
		LIMIT ${result[0][0].count};
		
	`)
	)
	.then(([result, _]) => console.table(result));