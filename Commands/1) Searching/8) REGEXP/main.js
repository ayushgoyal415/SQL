const sql = require("sql");
sql.connect("sql_store");

/*
    REGEXP (regular expression) -> used to filter data based on template (better than like)
        - ^ means 'start with'
        - $ means 'end with'
        - | means 'or' (Note : Don't use spaces)

    Can also use NOT.
*/

// prettier-ignore
const q = [

/*SQL*/ `

    -- Finding all customers whose last name has 'se'

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP 'se';

`,

/*SQL*/ `

    -- Finding all customers whose last name starts with character 'b'.
    
    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP '^b';

`,

/*SQL*/ `

    -- Finding all customers whose last name ends with character 'y'.

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP 'y$';

`,

/*SQL*/ `

    -- Finding all customers whose last name has 'se' or 'ey'.
    
    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP 'se|ey';

`,

/*SQL*/ `

    -- Finding all customers whose last name starts with 'mac' or ends with 'field'.

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP '^mac|field$';

`,

/*SQL*/ `

    -- Finding all customers who have 'ge' or 'ie' in last name
    
    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP '[gi]e';

`,

/*SQL*/ `

    -- Finding all customers who have 'ac' or 'ay' in last name

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP 'a[cy]';

`,

/*SQL*/ `

    -- Finding all customers who have 'aa' to 'aj' in last name

    SELECT
        CONCAT(first_name," ",last_name) AS NAME
    FROM customers
    WHERE last_name REGEXP 'a[a-j]';

`,

];

sql.execute(...q);