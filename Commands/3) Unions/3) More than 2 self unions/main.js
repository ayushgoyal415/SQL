const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `
    
    SELECT
        CONCAT(first_name, " ", last_name) AS NAME,
        points,
        'Bronze' AS MEDAL
    FROM customers
    WHERE points <= 2000

        UNION

    SELECT
        CONCAT(first_name, " ", last_name) AS NAME,
        points,
        'Silver'
    FROM customers
    WHERE points BETWEEN 2000 AND 3000

        UNION

    SELECT
        CONCAT(first_name, " ", last_name) AS NAME,
        points,
        'Gold'
    FROM customers
    WHERE points >= 3000

    ORDER BY points -- Note : The order by default is in the query order

`;

sql.execute(qry);
