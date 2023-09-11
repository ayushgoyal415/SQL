const sql = require("sql");
sql.connect("sql_invoicing");

const qry = /*SQL*/ `

    -- in this example we are trying to update the table based on client's state
    -- 'CA' and 'NY' which is defined inside a different table (clients)
    
    UPDATE invoices
    SET payment_total = invoice_total * 0.5, payment_date = due_date

    -- Getting client_id for states 'CA' and 'NY' from clients table
    -- Note here we are receiving multiple values thus we use IN
    WHERE client_id IN
        (SELECT client_id FROM clients WHERE state IN ('CA', 'NY'))

`;

sql.execute(qry);
