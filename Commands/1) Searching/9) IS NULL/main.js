const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Using IS NULL

    SELECT
        first_name AS NAME,
        phone AS PHONE
    FROM customers
    WHERE phone IS NULL;

`,

/*SQL*/ `

    -- USING IS NOT NULL

    SELECT
        first_name AS NAME,
        phone AS PHONE
    FROM customers
    WHERE phone IS NOT NULL;

`,

];

sql.execute(...q);