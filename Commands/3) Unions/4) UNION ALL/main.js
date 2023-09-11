const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `

    -- UNION -> first performs sorting operation and then remove all duplicate rows
    -- UNION ALL -> does not remove duplicate rows

    SELECT
        CONCAT(first_name, " ", last_name) AS NAME,
        points,
        'Bronze' AS MEDAL
    FROM customers
    WHERE points <= 2000

        UNION ALL

    SELECT
        CONCAT(first_name, " ", last_name) AS NAME,
        points,
        'Silver'
    FROM customers
    WHERE points BETWEEN 2000 AND 3000

        UNION ALL

    SELECT
        CONCAT(first_name, " ", last_name) AS NAME,
        points,
        'Gold'
    FROM customers
    WHERE points >= 3000

    ORDER BY points;

`;

sql.execute(qry);
