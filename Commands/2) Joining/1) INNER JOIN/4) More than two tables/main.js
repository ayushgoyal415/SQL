const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `

    SELECT
    	order_id,
        CONCAT(first_name, " ", last_name) AS name,
        name AS status
    FROM orders o
    JOIN customers c
    	ON o.customer_id = c.customer_id
    JOIN order_statuses os
    	ON o.status = os.order_status_id
    ORDER BY order_id;

`;

sql.execute(qry);
