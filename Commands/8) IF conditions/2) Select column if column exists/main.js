const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    DROP PROCEDURE IF EXISTS select_col;

`,

/*SQL*/ `

    CREATE PROCEDURE select_col(IN col VARCHAR(50))
    BEGIN
        IF EXISTS(SELECT NULL
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE
                table_name = 'customers'
            AND table_schema = 'sql_store'
            AND column_name = \`col\`
        ) THEN
            SET @s = CONCAT('SELECT ', \`col\`, ' FROM customers');
            PREPARE stmt1 FROM @s;
            EXECUTE stmt1;
            DEALLOCATE PREPARE stmt1;
        END IF;
    END;
`,

/*SQL*/ `
    
    -- Cannot use for tables with multi-word names

    CALL select_col('customer_id');

`,

];

sql.query(q[0], q[1]).then(() => sql.call(q[2]));