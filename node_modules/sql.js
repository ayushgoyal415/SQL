const mysql = require("mysql2");

// prettier-ignore
const red = `\u001b[38;5;203m`, yll = `\u001b[38;5;11m`, cyn = `\u001b[38;5;33m`, esc = `\u001b[0m`;

exports.connect = name => {
	// prettier-ignore
	const pool = mysql.createPool(
		{
			host: "localhost",
			user: "root",
			password: "0000",
			database: `${name}`,
		}
	).promise(); // Promise Wrapper (only in mysql2)

	this.pool = pool;
	return pool;
};

function error_handler(e) {
	console.log(`${red}Message : ${e.sqlMessage}${esc}`);
	console.log(`${yll}Code: ${e.code}${esc}`);
	console.log(e);
	console.log(`${cyn}Execution Aborted prematurely${esc}`);
}

function pause() {
	const st = new Date().getTime();
	do {} while (new Date().getTime() < st + 200);
}

exports.execute = async (...qry) => {
	for (let i = 0; i < qry.length; i++) {
		try {
			const [result, _] = await this.pool.execute(qry[i]);
			console.table(result);
		} catch (error) {
			error_handler(error);
			return;
		}
		pause();
	}
	console.log(`${cyn}Execution Done\n${esc}`);
};

exports.call = async (...qry) => {
	for (let i = 0; i < qry.length; i++) {
		try {
			const [result, _] = await this.pool.execute(qry[i]);
			for (let j = 0; j < result.length - 1; j++)
				console.table(result[j]);
		} catch (error) {
			error_handler(error);
			return;
		}

		pause();
	}
	console.log(`${cyn}Calling Done\n${esc}`);
};

exports.log = async (...qry) => {
	for (let i = 0; i < qry.length; i++) {
		try {
			const [result, _] = await this.pool.execute(qry[i]);
			console.log(result);
		} catch (error) {
			error_handler(error);
			return;
		}

		pause();
	}
	console.log(`${cyn}Logging Done\n${esc}`);
};

exports.query = async (...qry) => {
	for (let i = 0; i < qry.length; i++) {
		try {
			const [result, _] = await this.pool.query(qry[i]);
			console.table(result);
		} catch (error) {
			error_handler(error);
			return;
		}

		pause();
	}
	console.log(`${cyn}Querying Done\n${esc}`);
};

exports.end = async () => this.pool.end();

/*
	* db.query() v/s db.execute()
	- db.execute() helps in sending the query in pieces using prepare statements :
		- db.execute uses prepare statement.
		- It firstly sends code to server to prepare a template statement.
		- This code contains the the entire query except for the parameter data (${})
		  which is assigned a placeholder (?) at this moment.
		- After the statement gets prepared, now .execute will send the data which was
		  defined in ${}. Server then use this data to replace the placeholder (?) and
		  finally execute the entire query.

	- db.query() does not use prepare statement. Here the parameter substitution is handled
	  on the client side.

	* Benefits of prepared statements
	- With prepared statements MySQL doesn't have to prepare plan for same query every time, this
	  results in better performance.
	
	- Prepared statements are resilient against SQL injection, because parameter values, which are
	  transmitted later using a different protocol, need not be correctly escaped. If the original
	  statement template is not derived from external input, SQL injection cannot occur.

	- The idea is very simple - the query and the data are sent to the database server separately.
	  That's all. The root of the SQL injection problem is in the mixing of the code and the data.

	visit -> https://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks

	* createConnection() v/s createPool()
	- Connection pools help reduce the time spent connecting to the MySQL server by reusing a previous
	  connection, leaving them open instead of closing when you are done with them. This improves the
	  latency of queries as you avoid all of the overhead that comes with establishing a new connection.
	- The pool does not create all connections upfront but creates them on demand until the connection
	  limit is reached.

*/
