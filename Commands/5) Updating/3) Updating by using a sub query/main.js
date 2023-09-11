const sql = require("sql");
sql.connect("sql_invoicing");

const qry = /*SQL*/ `

    -- In this example we are trying to update the table 'invoices' for the person
    -- named 'Myworks'. But the invoices table does not have a column defining
    -- names of clients. It has client_id though which can be used to compare the
    -- client's name located in the table 'clients'

    UPDATE invoices
    SET payment_total = invoice_total * 0.5, payment_date = due_date

    -- Getting client_id for 'Myworks' from clients table using a sub query
    -- Note sub query is put in ()

    WHERE client_id = (SELECT client_id FROM clients WHERE name = 'Myworks')
`;

sql.execute(qry);
