const sql = require("sql");
sql.connect("sql_store");

const qry = /*SQL*/ `

    INSERT INTO shippers(name)
    VALUES
        ('Tom'),
        ('John'),
        ('Ruff')

`;

sql.execute(qry);
