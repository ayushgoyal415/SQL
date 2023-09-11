const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `

    SELECT
        CONCAT(first_name, " ", last_name) AS name,
        points,
        'current' -- This returns a column named current and initiates values as 'current'
    FROM customers
`;

sql.execute(qry);
