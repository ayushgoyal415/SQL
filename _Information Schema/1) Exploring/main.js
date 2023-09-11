const sql = require("sql");
sql.connect("world");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Getting all the tables available in Information Schema

    SELECT TABLE_NAME AS INFORMATION_SCHEMA_TABLES
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'INFORMATION_SCHEMA';

`,

/*SQL*/ `

    -- Getting name of all the columns available in the table (APPLICABLE_ROLES)

    SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'INFORMATION_SCHEMA' AND TABLE_NAME = 'APPLICABLE_ROLES';

`,

/*SQL*/ `

    -- Getting information about all schemas present on SQL server

    SELECT * FROM INFORMATION_SCHEMA.SCHEMATA;

`,

];

sql.execute(...q);
// sql.log(q[1]);
