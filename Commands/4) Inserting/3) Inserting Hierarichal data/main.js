const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*
    - Note that orders table and order_items table follow a parent-child
    - relationship (i.e. for every row in the orders table (parent) there
    - can be multiple rows in order_items table (children)
*/

/*SQL*/ `

    INSERT INTO orders(customer_id, order_date)
    VALUES(1, '2019-01-02');

`,

/*SQL*/ `

    -- Here we are using last_insert_id function to access the last ID
    -- that mySQL auto incremented (e.g. order_id in orders table)

    INSERT INTO order_items(order_id, product_id, quantity, unit_price)
    VALUES
        (LAST_INSERT_ID(), 1, 1, 2.95),
        (LAST_INSERT_ID(), 1, 2, 3.95)

`,

];

sql.execute(...q);