const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Getting primary keys in order_items table

    SELECT COLUMN_NAME AS PRIMARY_KEYS
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'order_items' && COLUMN_KEY = 'PRI';

`,

/*SQL*/ `

    -- Here we want to join the table order_items (has 2 primary keys) with the table
    -- order_item_notes which defines note name based both on order_id and product_id.
    -- So here we need to use compound join condition

    SELECT *
    FROM order_items oi
    JOIN order_item_notes oin
    	ON oi.order_id = oin.order_id && oi.product_id = oin.product_id;

`,

];

sql.execute(...q);