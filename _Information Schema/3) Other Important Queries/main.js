const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

    /*SQL*/ `   -- Finding characteristics of a table's columns

                SHOW FULL COLUMNS FROM sql_bank.accounts;
    `,

    /*SQL*/ `   -- Finding foreign key constraints

                SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE REFERENCED_TABLE_SCHEMA IS NOT NULL;
    `,

    /*SQL*/ `   -- Finding if a procedure exists or not

                SET @exists = 0;
    `,

    /*SQL*/ `   SELECT COUNT(*) INTO @exists
                FROM INFORMATION_SCHEMA.ROUTINES
                WHERE
                    ROUTINE_SCHEMA = 'sql_store'
                AND ROUTINE_NAME = 'proc_name';
    `,

    /*SQL*/ `   SELECT @exists;
    `,

];

sql.execute(...q);
