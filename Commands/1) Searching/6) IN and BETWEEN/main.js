const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Using IN -> helps in combining multiple OR conditions

    SELECT
        first_name AS NAME,
        state AS STATE
    FROM customers
    WHERE state IN('VA', 'FL', 'GA');

`,

/*SQL*/ `

    -- Using NOT IN

    SELECT
        first_name AS NAME,
        state AS STATE
    FROM customers
    WHERE state NOT IN('VA', 'FL', 'GA'); -- cannot use '!' here

`,

/*SQL*/ `

    -- Using BETWEEN - AND

    SELECT
        first_name AS NAME,
        points AS POINTS
    FROM customers
    WHERE points BETWEEN 1000 AND 3000 -- cannot use '&&' here

`,

/*SQL*/ `

    -- Using NOT BETWEEN - AND

    SELECT
        first_name AS NAME,
        birth_date AS DOB
    FROM customers
    WHERE birth_date NOT BETWEEN '1990-01-01' AND '1995-01-01' -- cannot use '!' here

`,

];

sql.execute(...q);
