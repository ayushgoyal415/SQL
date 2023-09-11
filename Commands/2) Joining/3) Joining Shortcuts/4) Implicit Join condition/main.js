const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `

    -- Implementing implicit join syntax using where -> not recommended

    SELECT
        order_id,
        CONCAT(first_name," ", last_name) AS name,
        order_date
    FROM orders o, customers c
    WHERE o.customer_id = c.customer_id;

`;

sql.execute(qry);
