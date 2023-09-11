const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `


    -- It is recommended to arrange your tables in a way that you only need to
    -- perform left joins. Otherwise it becomes difficult to understand the code

    SELECT
    	c.customer_id,
        CONCAT(first_name, " ", last_name) AS name,
        o.order_id,
        o.shipper_id,
        s.name AS shipper
    FROM customers c
    LEFT JOIN orders o
    	ON c.customer_id = o.customer_id
    LEFT JOIN shippers s
    	ON s.shipper_id = o.shipper_id
    ORDER BY c.customer_id;
    
`;

sql.execute(qry);
