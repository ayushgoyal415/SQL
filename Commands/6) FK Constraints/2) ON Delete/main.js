const sql = require("sql");
sql.connect("sql_bank");

const add = [
	/*SQL */ `  -- ON UPDATE RESTRICT ON DELETE RESTRICT
    
                ALTER TABLE transactions
                ADD CONSTRAINT fk_accounts_transactions
                FOREIGN KEY (account_number)
                REFERENCES accounts(account_number);
    `,

	/*SQL*/ `   -- ON UPDATE RESTRICT ON DELETE CASCADE

                ALTER TABLE transactions
                ADD CONSTRAINT fk_accounts_transactions
                FOREIGN KEY (account_number)
                REFERENCES accounts(account_number)
                ON DELETE CASCADE;
    `,

	/*SQL*/ `   -- ON UPDATE RESTRICT ON DELETE SET NULL

                ALTER TABLE transactions
                ADD CONSTRAINT fk_accounts_transactions
                FOREIGN KEY (account_number)
                REFERENCES accounts(account_number)
                ON DELETE SET NULL;
    `,
    
];

const check = [
	/*SQL*/ `   DELETE FROM accounts
                WHERE first_name = 'Abeesh';
    `,

	/*SQL*/ `   SELECT * FROM transactions;
    `,
];

const reset = [
	/*SQL*/ `   ALTER TABLE transactions
                DROP CONSTRAINT fk_accounts_transactions;
    `,

	/*SQL*/ `   -- USE INSERT IGNORE to prevent inserting a duplicate key leading to error

                INSERT IGNORE INTO accounts
                VALUES (215461215, 'Abeesh', 'Goyal', '1995-09-25', '76960-90038', 47850);
    `,

	/*SQL*/ `   -- USE ON DUPLICATE KEY TO INSERT/UPDATE IN A SINGLE STATEMENT
                
                INSERT INTO transactions
                VALUES (24234, 215461215, 1250, '2022-12-07', 47850)
                ON DUPLICATE KEY UPDATE account_number = 215461215
    `,

];

sql.execute(add[2])
	.then(() => sql.execute(...check))
	.catch(err => console.log(err.sqlMessage))
	.then(() => sql.execute(...reset))
	.catch(err => console.log(err.sqlMessage));
