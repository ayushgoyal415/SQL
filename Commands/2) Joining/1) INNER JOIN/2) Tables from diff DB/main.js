const sql = require('sql');
sql.connect('sql_store');

const qry = /*SQL*/ `

    SELECT
        order_id,
        oi.product_id,
        name AS product_name,
        (oi.quantity * p.unit_price) AS due_payment
    FROM order_items oi
    JOIN sql_inventory.products p
        ON p.product_id = oi.product_id
    ORDER BY 1,2;

`;

sql.execute(qry);
