const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- CREATE TABLE -> Creating a table by copying

    CREATE TABLE orders_archived AS SELECT * FROM orders;

`,

/*SQL*/ `

    -- TRUNCATE TABLE -> Emptying the table
    
    TRUNCATE TABLE orders_archived;

`,

/*SQL*/ `

    -- Using a sub query in insert statement

    INSERT INTO orders_archived
    SELECT * FROM orders WHERE order_date < '2019-01-01';

`,

/*SQL*/ `

    SELECT * FROM orders_archived;

`,

/*SQL*/ `

    -- DROP TABLE -> Deleting the table
    
    DROP TABLE orders_archived;

`,

];

sql.execute(...q);
