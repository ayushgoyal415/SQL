const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `

    -- Make an updating code for table orders with the following conditions -
    -- Update the comments for customers with points > 3000 with 'Gold customers'
    -- Update only if the comment is NULL.

    UPDATE orders
    SET comments = 'Gold customers'
    WHERE comments = NULL && customer_id IN
        (SELECT customer_id FROM customers WHERE points > 3000);

`;

sql.execute(qry);
