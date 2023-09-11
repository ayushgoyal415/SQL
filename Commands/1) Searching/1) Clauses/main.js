const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `
    
    SELECT * -- Selects the columns specified (* means all columns)
    FROM customers -- Points at the table from which to select
    WHERE points > 1000 -- Provides an argument for the rows to be selected
    ORDER BY first_name -- Provides the sorting technique
    LIMIT 3; -- Set the limit of maximum rows that can be selected

`;

sql.execute(qry);
