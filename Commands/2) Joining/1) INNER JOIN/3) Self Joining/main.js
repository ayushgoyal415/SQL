const sql = require("sql");
sql.connect("sql_hr");

const qry = /*SQL*/ `

    -- Here we are trying to make another table employee table 'm' which has a manager column
    -- We have to use different aliases while referring to the same table

    SELECT
        e.employee_id,
        e.first_name,
        m.first_name AS manager
    FROM employees e
    JOIN employees m
    	ON e.reports_to = m.employee_id;

`;

sql.execute(qry);
