const sql = require("sql");
sql.connect("sql_bank");

/*
    - The FOREIGN KEY constraint is used to prevent actions that would destroy links between tables.

    - A FOREIGN KEY is a field (or collection of fields) in one table, that refers to the PRIMARY
      key in another table. Note that if you want to make a table with 2 foreign keys referring to a
      single parent table then the parent table has to have declare these keys as a primary composite
      key. While doing so, the keys, although a part of primary composite, are not made unique. So
      they should be made unique explicitly. Otherwise foreign key constraint will fail.

    - The table with the foreign key is called the child table, and the table with the primary key
      is called the referenced or parent table.

    - The FOREIGN KEY constraint prevents invalid data from being inserted into the foreign key
      column, because it has to be one of the values contained in the parent table.
    
    - When creating foreign keys be sure the columns you are using have the same:
         - Data Type, Collation, Zero Fill, Not Null, Unsigned, Binary

    - MySQL requires that foreign key columns be indexed; if you create a table with a foreign key
      constraint but no index on a given column, an index is created implicitly.

*/

const add = [
	/*
        If nothing is mentioned about any constraint then by default it is set to:
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
  */

	/*SQL */ `  -- ON UPDATE RESTRICT ON DELETE RESTRICT
    
                ALTER TABLE transactions
                ADD CONSTRAINT fk_accounts_transactions
                FOREIGN KEY (account_number)
                REFERENCES accounts(account_number);
    `,

	/*SQL*/ `   -- ON UPDATE CASCADE ON DELETE RESTRICT
              -- This is the best constraint in most cases

                ALTER TABLE transactions
                ADD CONSTRAINT fk_accounts_transactions
                FOREIGN KEY (account_number)
                REFERENCES accounts(account_number)
                ON UPDATE CASCADE;
    `,

	/*SQL*/ `   -- ON UPDATE SET NULL ON DELETE RESTRICT

                ALTER TABLE transactions
                ADD CONSTRAINT fk_accounts_transactions
                FOREIGN KEY (account_number)
                REFERENCES accounts(account_number)
                ON UPDATE SET NULL;
    `,
];

const check = [
	/*SQL*/ `   UPDATE accounts
                SET account_number = 20
                WHERE first_name = 'Abeesh';
    `,

	/*SQL*/ `   SELECT * FROM transactions;
    `,
];

const reset = [
	/*SQL*/ `   ALTER TABLE transactions
                DROP CONSTRAINT fk_accounts_transactions;
    `,
	/*SQL*/ `   UPDATE accounts
                SET account_number = 215461215
                WHERE first_name = 'Abeesh';
    `,
	/*SQL*/ `   UPDATE transactions
                SET account_number = 215461215
                WHERE balance = 47850;
    `,
];

sql.execute(add[0])
	.then(() => sql.execute(...check))
	.then(() => sql.execute(...reset));
