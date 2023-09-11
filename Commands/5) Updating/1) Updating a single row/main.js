const sql = require("sql");
sql.connect("sql_invoicing");

// prettier-ignore
const q = [

/*SQL*/ `

    UPDATE invoices
    SET payment_total = 10, payment_date = '2022-12-12'
    WHERE invoice_id = 1;

`,

/*SQL*/ `

    -- Using expressions to update values
    -- eg. the person payed 50% of the invoice total  on due date
    
    UPDATE invoices
    SET payment_total = invoice_total * 0.5, payment_date = due_date
    WHERE invoice_id = 3;

`,

];

sql.execute(...q);
