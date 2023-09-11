const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*
    INNER JOIN (JOIN) ->
    - selects only those rows from each table which satisfy the join condition
    - (e.g. here only those rows will be selected which have a customer_id in
      both customers table and orders table).
    - Thus by using inner join, we lost the information about -
        1) customers who haven't placed an order yet and thus are not there in orders table.
        2) orders placed by customers who haven't got an id yet and thus are not there in
           customers table.
*/

/*SQL*/ `

    SELECT
        c.customer_id,
        CONCAT(first_name, " ", last_name) AS name,
        order_id
    FROM orders o
    JOIN customers c
    	ON c.customer_id = o.customer_id
    ORDER BY c.customer_id;

`,

/*
    RIGHT OUTER JOIN (RIGHT JOIN) ->
    - Right join ensures that all the rows in the joining table (ie. right sided table) get
      selected even if some of these rows don't satisfy the joining condition.
    - Thus by doing this we select all the rows in customers table even if those customers
      hadn't placed an order. In the columns referring to the left table, for such rows, NULL
      is added.
*/

/*SQL*/ `

    SELECT
        c.customer_id,
        CONCAT(first_name, " ", last_name) AS name,
        order_id
    FROM orders o
    RIGHT JOIN customers c
    	ON c.customer_id = o.customer_id
    ORDER BY c.customer_id;

`,

/*
    LEFT OUTER JOIN (LEFT JOIN) ->
    - vice versa of right join
    - In this example, the results of inner joins and left join are same because there are no
      orders in orders table which don't have a customer id.
*/

/*SQL*/ `

    SELECT
        c.customer_id,
        CONCAT(first_name, " ", last_name) AS name,
        order_id
    FROM orders o
    LEFT JOIN customers c
    	ON c.customer_id = o.customer_id
    ORDER BY c.customer_id;

`,

];

sql.execute(...q);
