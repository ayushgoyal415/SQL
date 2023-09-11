const sql = require("sql");
sql.connect("sql_store");

/*
    - In the following example we trying to make two tables -
        - First with a label active for all the order in year 2019
        - Second with a label archived for all the order before year 2019
        - Finally to make one table we are joining all rows of these two tables using union
*/

const qry = /*SQL*/ `

    SELECT
        order_id,
        order_date,
        'Active' AS Activity -- using string literal to add a column and set values
    FROM orders
    WHERE order_date >= '2019-01-01'

        UNION
    
    SELECT
        order_id,
        order_date,
        'Archived' -- No need to specify alias (the name of this column will be determined by the first query)
    FROM orders
    WHERE order_date < '2019-01-01'
`;

sql.execute(qry);
