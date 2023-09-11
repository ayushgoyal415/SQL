const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [
/*SQL*/`

    DROP PROCEDURE IF EXISTS insert_col;

`,

/*SQL*/ `

    -- Have to use .query() because procedures cannot be made using prepared statements
    -- Then have to make a prepare statement inside the procedure because we cannot use
    -- variables as database, table or column name

    -- Note there is a problem with this procedure that it does not support multi-word
    -- column name insertion

    CREATE PROCEDURE insert_col(IN col VARCHAR(50))
    BEGIN
        
        IF NOT EXISTS(SELECT NULL
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE
                table_name = 'customers'
            AND table_schema = 'sql_store'
            AND column_name = \`col\`
        )THEN
            SET @s = CONCAT('ALTER TABLE customers ADD ', \`col\`,' VARCHAR(50) DEFAULT NULL');
            PREPARE stmt1 FROM @s;
            EXECUTE stmt1;
            DEALLOCATE PREPARE stmt1;
        END IF;
    END;

`,

/*SQL*/`
    
    -- Doesn't support insertion of column named 'main features'
    CALL insert_col('main_features');
`,
];

sql.query(q[0], q[1]).then(() => sql.call(q[2]));
