const sql = require("sql");
sql.connect("sql_store");

/*
    Selects only those rows from a column which have distinct value.
    ~ Multiple distinct columns cannot be used.
    ~ DISTINCT should be used before selecting other columns.
*/

const qry = /*SQL*/ `

    SELECT
        DISTINCT state AS STATE,
    	first_name AS NAME
    FROM customers

`;

sql.execute(qry);
