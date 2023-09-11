const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Selecting the Top 3 rows

    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        points AS POINTS
    FROM customers
    LIMIT 3;

`,

/*SQL*/ `

    -- If LIMIT exceeds the total number of selected rows then it returns all rows
    
    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        points AS POINTS
    FROM customers
    LIMIT 300;

`,

/*SQL*/ `

    -- Using limit with offset

    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        points AS POINTS
    FROM customers
    LIMIT 6,3; -- Selects rows 7 to 9

`,

/*SQL*/ `

    -- Getting the top 3 customers with highest points

    SELECT
        CONCAT(first_name," ",last_name) AS NAME,
        points AS POINTS
    FROM customers
    ORDER BY points DESC
    LIMIT 3;

`,

];

sql.execute(...q);
