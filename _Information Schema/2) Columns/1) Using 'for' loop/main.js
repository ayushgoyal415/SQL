const sql = require("sql");
const store = sql.connect("sql_store");

const qry = /*SQL*/ `

    -- Extracting attributes of all columns of table 'customers'

    SELECT * FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'customers';

`;

store.execute(qry).then(([result]) => {
	const [column_1] = result;
	console.log("All attributes of Column 1\n", column_1);

	console.log("Total Columns :", result.length);

	const A = [];
	for (let i of result) A.push(i.COLUMN_NAME);
	console.log("Column names : ", A);

	let nn = 0;
	for (let i of result) if (i.IS_NULLABLE === "NO") nn++;
	console.log("Total number of NOT_NULL keys : ", nn);

	let dt = 0;
	for (let i of result) if (i.DATA_TYPE === "date") dt++;
	console.log("Total number of DATE columns : ", dt);

	let pk = 0;
	for (let i of result) if (i.COLUMN_KEY === "PRI") pk++;
	console.log("Total number of primary keys : ", pk);

	let def = 0;
	for (let i of result) if (i.COLUMN_DEFAULT !== null) def++;
	console.log("Total number of columns with default values : ", def);
});
