const sql = require("sql");
sql.connect("sql_store");

// prettier-ignore
const q = [

/*SQL*/ `

    -- Inserting a row into customers table
    
    INSERT INTO customers
    VALUES(DEFAULT, 'John', 'Smith', '1990-01-01', DEFAULT, 'address', 'city', 'CA', DEFAULT);

`,

/*SQL*/ `

    -- Can also insert as written below to avoid writing default each time

    INSERT INTO customers(first_name, last_name, birth_date, address, city, state)
    VALUES('Tom', 'Cruise', '1980-01-01','address', 'city', 'WA');

`,

];

sql.execute(...q);