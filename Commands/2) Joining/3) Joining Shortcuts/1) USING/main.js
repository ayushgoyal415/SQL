const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `
    
    -- When the join condition has same column title in both tables then we can use 'USING'
    
    SELECT
        order_id,
        CONCAT(first_name, " " ,last_name) AS name
    FROM orders o
    JOIN customers c
    	USING (customer_id)

`;

sql.execute(qry);
