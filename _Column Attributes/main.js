/*
	> Display width

	- All numeric data types can accept a number inside () known as display width eg INT(4)
	- Display width is just for formatting purposes. It does not change any storage capacity
	- It does not do anything unless you turn on ZEROFILL(ZF) attribute
	- ZEROFILL fills the zeroes to make the number of digits equal to display width.
		- for eg if we used INT(4) with ZF then the table will show all values with at least
		4 digits. eg 1 will be shown as 0001, 2 as 0002 and so on. Values which are already
		4 or more digits long will not formatted any further. for eg 2123 will be displayed
		as it is.
	- Maximum display width that can be set is 255.
	~ if we turn on ZF for any column, it by default be converted to unsigned data type
	~ TINYINT requires display width although turning on ZF is not a necessity

	> Data types

	* TINYINT(N)
		- TINYINT is the smallest integer data type and only uses 1 byte of storage.
		- If signed, the allowable range is from -128 to 127.
		- If unsigned, the allowable range is from 0 to 255.
		- N refers to display width (can specify up to 4)
		- An example usage of TINYINT is a person's age since no person reaches the age of 255.

	* VARCHAR(N) and CHAR(N)
		- N refers to the maximum number of characters that it can hold
		- CHAR(50) is same as VARCHAR(50). However, unlike VARCHAR, it allocates extra space
		  (for eg. if a name is only 5 characters long, it would allocate extra 45 character
		  space whereas VARCHAR is smart and would not allocate this extra space)

		~ Use CHAR when the sizes of the column data entries are consistent.
		~ Use VARCHAR when the sizes of the column data entries vary considerably.
		~ Use VARCHAR(MAX) when the sizes of the column data entries vary considerably ( > 8,000 bytes)
	
	* DECIMAL [(p [,s])]
		- p stands for Precision, the total number of digits in the value, i.e. on both sides of the decimal point
		- s stands for Scale, number of digits after the decimal point
		- The default value of p is 18 and s is 0 and for both these values, the minimum is 1 and the maximum is 38.
		- parameter s can only be specified if p is specified. The scale must be <= precision.

	> Primary Key (PK)

	- Tables by default are sorted according to the primary key
	- Primary keys are unique by convention.
	- We can also set multiple primary keys (compound keys). In such case the overall key should be unique
	- Usually we perform auto increment(AI) to PK
	- Must be assigned Not NULL(NN)

	> Not Null (NN)

	- Defines whether this column can accept NULL as a value.
	- If a column is defined as NN then it forces you to provide a value (either as user input or as default value)
	- It cannot receive a default value or user value of 'NULL'
	~ Empty string is not considered as NULL in mySQL

	> Default/Expression

	- Used to set default values in case a value is not provided by the user - can be set to 'NULL' or something else

	> Auto increment(AI)

	- Fills in the value for the current row by incrementing the value present in the previous row
	- Usually used for PK(s)

	> UNIQUE KEY

	- A unique cannot have duplicate values.
	- A primary key is unique by default.
	- A key with auto-increment is considered as a unique key by default.
    - A key can be made unique by explicitly calling UNIQUE KEY(key_name)

*/