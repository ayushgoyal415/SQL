const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    --  Finding the primary key

    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers' && COLUMN_KEY = 'PRI';

`,

/*SQL*/ `

    --  Default sorting order is defined by primary key

    SELECT
        customer_id AS PRIMARY_KEY,
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers

`,

/*SQL*/ `

    -- DESC -> sorting in descending order

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    ORDER BY first_name DESC;

`,

/*SQL*/ `

    -- Sorting based on multiple columns (as a fallback sorting technique)

    SELECT
        state AS STATE,
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    ORDER BY state DESC, first_name; -- Can use DESC on both also

`,

/*SQL*/ `

    -- In mySQL we can even sort according to a column which is not even used in SELECT

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    ORDER BY birth_date; -- Sorting based on birth_date (which was not used in SELECT)

`,

/*SQL*/ `

    -- Sorting data using an Alias

    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        (points * customer_id) AS REPO
    FROM customers
    ORDER BY REPO;

`,

/*SQL*/ `

    -- Sort by numbering the selected columns (should be avoided ideally)

    SELECT
        state AS STATE,
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    ORDER BY 1,2;

`,

/*SQL*/ `

    --  Sorting by using an arithmetic expression (expression not included in SELECT)

    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        points AS POINTS
    FROM customers
    ORDER BY (points * customer_id) DESC;

`,

/*SQL*/ `

    --  Sorting by using an arithmetic expression (expression included in SELECT)

    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        (points * customer_id) AS REPO
    FROM customers
    ORDER BY REPO DESC;

`,

];

sql.execute(...q);
