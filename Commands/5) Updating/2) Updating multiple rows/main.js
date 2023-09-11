const sql = require("sql");
sql.connect("sql_invoicing");

/*
    Same as updating a single row, the difference is that here we use a more general 'WHERE'
    condition (can use all 'WHERE' clause methods, and operators learnt previously)

    Note : 'WHERE' clause is optional so if you want to update all the positions then you can
    do it by not adding a 'WHERE' clause

    Note : mySQL workbench works in safe update mode by default thus not allowing more than 1
    updates at a time -> You can turn off it from Edit -> Preferences -> SQL Editor ->
    go to the end of the dialog box and unselect the checkbox for safe updates
*/

const qry = /*SQL*/ `

    UPDATE invoices
    SET
        payment_total = 10,
        payment_date = '2019-03-01'
    WHERE client_id IN (3,4);

`;

sql.execute(qry);
