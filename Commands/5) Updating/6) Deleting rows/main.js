const sql = require("sql");
sql.connect("sql_invoicing");

const qry = /*SQL*/ `

    -- Deleting invoices for client named 'Myworks'
    -- same as updating data

    DELETE FROM invoices
    WHERE client_id = (SELECT client_id FROM clients WHERE name = 'Myworks')
    
`;

sql.execute(qry);
