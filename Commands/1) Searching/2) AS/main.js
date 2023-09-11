const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Alias for columns which already exist

    SELECT
        first_name AS NAME,
    	last_name AS SURNAME,
        points
    FROM customers;

`,

/*SQL*/ `

    -- Alias for columns created using expressions

    SELECT
        first_name AS NAME,
        points AS POINTS,
        (points * 10), -- Selecting expression without assigning an alias
        (points * customer_id) AS REPO -- Selecting expression and assigning it an alias
    FROM customers;

`,

];

sql.execute(...q);
