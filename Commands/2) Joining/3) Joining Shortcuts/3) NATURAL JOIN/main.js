const sql = require("sql");
sql.connect("sql_store");

/*
    - While using natural join, we do not explicitly mention the join condition
    - Instead SQL automatically joins the tables based on columns with common titles
    - Not recommended as we are giving the control to SQL.
*/

const qry = /*SQL*/ `

    SELECT
    	o.order_id,
        CONCAT(first_name, " ", last_name) AS name
    FROM orders o
    NATURAL JOIN customers c

`;

sql.execute(qry);
