const sql = require('sql');
sql.connect('sql_store');

const qry = [
  /*SQL*/ `
    
  SHOW COLUMNS FROM sql_hr.employees;

`,
  /*SQL*/ `
    
  SHOW DATABASES;

`
];

sql.execute(qry);
