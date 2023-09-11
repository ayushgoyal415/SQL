const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Finding all customers whose last name starts with character 'b'.
    -- Using CONCAT() to connect multiple strings

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name LIKE 'b%'; -- '%' means any number of characters

`,

/*SQL*/ `

    -- Finding all customers whose last name has a character 'b'

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name LIKE '%b%';

`,

/*SQL*/ `

    -- Finding all customers whose third character is 's'

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name LIKE '__s%'; -- '_' means a single character blank

`,

/*SQL*/ `

    -- Finding all customers whose last character is 'y' and the last third character is 'g'
    
    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name LIKE '%g_y';

`,

/*SQL*/ `

    -- Using NOT LIKE
    
    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name NOT LIKE '%g_y';

`,

];

sql.execute(...q);