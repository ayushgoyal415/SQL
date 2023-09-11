const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    SELECT COLUMN_NAME AS column_names
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers';

`,

/*SQL*/ `

    SELECT COLUMN_NAME AS not_null_columns
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers' AND IS_NULLABLE = 'NO';

`,

/*SQL*/ `

    SELECT COLUMN_NAME AS date_columns
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers' AND DATA_TYPE = 'date';

`,

/*SQL*/ `

    SELECT COLUMN_NAME AS primary_keys
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers' AND COLUMN_KEY = 'PRI';

`,

/*SQL*/ `

    SELECT COLUMN_NAME AS default_columns
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers' AND COLUMN_DEFAULT IS NOT NULL;

`,

];

sql.execute(...q);
