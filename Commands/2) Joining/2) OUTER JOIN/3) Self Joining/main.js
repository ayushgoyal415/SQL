const sql = require("sql");
sql.connect("sql_hr");

const qry = /*SQL*/ `

    -- Using outer self join to include manager himself in the result

    SELECT
    	e.employee_id,
        e.first_name,
        m.first_name AS manager
    FROM employees e
    LEFT JOIN employees m
    	ON e.reports_to = m.employee_id

`;

sql.execute(qry);
