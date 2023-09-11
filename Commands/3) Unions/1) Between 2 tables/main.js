const sql = require("sql");
sql.connect("sql_store");

/*
    Unions help to combine results from different queries ->
    - Note: The number of columns that each query returns should be same
    - The title of the resulting column(s) is based on the title of the first query
    - We can thus rename the first query column name to change the resultant table column name

    ~ UNION removes the duplicate rows (keeps only unique rows)
*/

const qry = /*SQL*/ `
    
    SELECT CONCAT(first_name, " ", last_name) AS NAME 
    FROM customers
    
        UNION
    
    SELECT name
    FROM shippers;

`;

sql.execute(qry);
