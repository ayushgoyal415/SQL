const sql = require('sql');
sql.connect('sql_store');
const tables = {
    1: ['sql_store', 'customers', 'order_item_notes', 'order_items', 'order_statuses', 'orders', 'products', 'shippers'],
    2: ['sql_invoicing', 'clients', 'invoices', 'payment_methods', 'payments'],
    3: ['sql_hr', 'employees', 'offices'],
    4: ['sql_inventory', 'products'],
    5: ['sql_bank', 'accounts', 'transactions']
} // prettier-ignore

fun([1, 1]);

/* 
*---------------------------------------------------------------------------------------------------------------
    sql_store             sql_invoicing            sql_hr              sql_inventory          sql_bank     
*---------------------------------------------------------------------------------------------------------------
    customers             clients                  employees           products               accounts           
    order_item_notes      invoices                 offices                                    transactions
    order_items           payment_methods
    order_statuses        payments
    orders
    products
    shippers
*---------------------------------------------------------------------------------------------------------------
*/

async function fun(...A) {
  for (let i of A) {
    const qry = /*SQL*/ `
        
            SELECT * FROM ${tables[i[0]][0]}.${tables[i[0]][i[1]]}
        
        `;

    console.log(`${tables[i[0]][0]} -> ${tables[i[0]][i[1]]}`);
    await sql.execute(qry);
  }
}
