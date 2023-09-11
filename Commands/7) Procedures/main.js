const sql = require("sql");
sql.connect("sql_store");

/*
    > Drawbacks of stored procedures

    - We cannot alter the data and parameters of stored procedures.

    - If we use stored procedures, the memory usage of every connection that uses those stored procedures
      will increase substantially. Also, if we overuse many logical applications inside stored procedures,
      the CPU usage will increase. It is because the database server is not well designed for logical operations.

    - Stored procedure's constructs are not designed to develop complex and flexible business logic.
    
    - It is difficult to debug stored procedures. Only a few database management systems allow us to debug stored
      procedures. Unfortunately, MySQL does not provide facilities for debugging stored procedures.

    - It is not easy to develop and maintain stored procedures.

*/

// prettier-ignore
const q = [

/*SQL*/ `

    DROP PROCEDURE IF EXISTS special_customers;
    
`,

/*SQL*/ `

    -- In command line, delimiter is required because command line
    -- will consider (;) as end of statement resulting in premature
    -- execution of the query

    -- While executing as a query, delimiter is not required
    
    CREATE PROCEDURE special_customers()
    BEGIN

        SELECT CONCAT(first_name, " ", last_name) AS special
        FROM customers
        WHERE points > 3000;

        SELECT CONCAT(first_name, " ", last_name) AS old
        FROM customers
        WHERE customer_id <= 10;

    END;

`,

/*SQL*/ `

    DROP PROCEDURE IF EXISTS top_customers;
    
`,


/*SQL*/ `

    -- IN parameter acts as an argument to the procedure
    -- using which the procedure will act.
    -- IN parameter values are accessible and protected (cannot be changed)
    -- The default mode is IN (here we don't have to mention IN)

    CREATE PROCEDURE top_customers(IN n INT)
    BEGIN

        SELECT CONCAT(first_name, " ", last_name) AS top_n
        FROM customers
        WHERE points > 1000 LIMIT n;

    END;

`,

/*SQL*/ `

    DROP PROCEDURE IF EXISTS max_points;
    
`,

/*SQL*/ `

    -- OUT parameter is used to pass a parameter as output. Its value
    -- can be changed inside the stored procedure, and the changed
    -- value is passed back to the calling program.
    -- A procedure cannot access the OUT parameter's initial value.

    CREATE PROCEDURE max_points(OUT highest_points INT)
    BEGIN

        SELECT MAX(points) INTO highest_points
        FROM customers;

    END;

`,

/*SQL*/ `

    DROP PROCEDURE IF EXISTS get_points;

`,

/*SQL*/ `

    -- INOUT acts both as the IN parameter and then OUT parameter.

    CREATE PROCEDURE get_points(INOUT p INT)
    BEGIN

        SELECT points INTO p
        FROM customers
        WHERE customer_id = p;

    END;

`

];

// prettier-ignore
const c = [

    /*SQL*/ ` CALL special_customers(); `,

    /*SQL*/ ` CALL top_customers(5); `,

    /*SQL*/ ` CALL max_points(@M); `,

    /*SQL*/ ` SET @P = 3`,

    /*SQL*/ ` CALL get_points(@P); `,

];

// prettier-ignore
const e = [

    /*SQL*/ ` SELECT @M; `,

    /*SQL*/ ` SELECT @P; `,

    /*SQL*/ `
        SELECT ROUTINE_NAME
        FROM INFORMATION_SCHEMA.ROUTINES
        WHERE ROUTINE_SCHEMA = 'sql_store' AND ROUTINE_TYPE = 'PROCEDURE'
    `,

];

// prettier-ignore
const l = [
    
    /*SQL*/ ` SHOW PROCEDURE STATUS WHERE db = 'sql_store'; `
];

//~ Procedures cannot be created using prepare statements (ie .execute() does not work)

sql.query(...q)
	.then(() => sql.call(...c))
	.then(() => sql.execute(...e))
	.then(() => sql.log(...l))
    .then(() => sql.query(q[0], q[2], q[4], q[6]))
    .then(() => sql.execute(e[2]));