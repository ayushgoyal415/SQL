const sql = require("sql");
sql.connect("sql_invoicing");

// prettier-ignore
const q = [

/*
    Create a invoices_archived table with the following conditions :
        - Copy all rows from invoices except those who do not have payment date (ie. NULL)
        - Copy all columns from invoices except client_id (use client_name column from
          clients table instead)
*/

/*SQL*/ `

    CREATE TABLE invoices_archived AS
    SELECT
    	invoice_id,
        number,
        name AS client_name,
        invoice_total,
        payment_total,
        invoice_date,
        due_date,
        payment_date
    FROM invoices
    JOIN clients
        USING (client_id)
    WHERE payment_date IS NOT NULL;

`,

/*SQL*/ `

    SELECT * FROM invoices_archived;

`,

/*SQL*/ `

    DROP TABLE invoices_archived;

`,

];

sql.execute(...q);
