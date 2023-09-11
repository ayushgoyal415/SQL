const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- We use CROSS JOIN to join every record in the first table with every record
    -- in the second table. Hence, no joining condition is needed in cross joins.

    SELECT
    	CONCAT(first_name, " ", last_name) AS name,
        p.name AS product
    FROM customers
    CROSS JOIN products p
    ORDER BY name;

`,

/*SQL*/ `

    -- Implicit syntax for CROSS JOIN

    SELECT
    	CONCAT(first_name, " ", last_name) AS name,
        p.name AS product
    FROM customers, products p
    ORDER BY name;

`,

];

sql.execute(...q);
