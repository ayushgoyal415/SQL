const sql = require("sql");
sql.connect("sql_store");

/*
    JOIN/INNER JOIN -> helps to join two tables
        - ON provides the arguments based 'on' which we want to join and filter the data
        - The column used as ON argument does not need to be SELECTED by SELECT statement
*/

const qry = /*SQL*/ `


    -- Note in the following example :
    --  - The customers who haven't placed any order will not be displayed in the result
    --  - Also the customers who have placed order multiple times will be duplicated

    SELECT
        c.customer_id,
        CONCAT(first_name," ",last_name) AS NAME,
        order_id

    --  If we used an alias for a table then we have to use the same alias
    --  everywhere while referring to the table (otherwise it is an error)
    
    FROM orders o -- Using alias for orders table as 'o'
    JOIN customers c -- Using alias for customers table as 'c'

        -- We need to specify the table when referring to an ambiguous column (e.g. customer_id)
    	ON o.customer_id = c.customer_id

    ORDER BY c.customer_id;

`;

sql.execute(qry);
