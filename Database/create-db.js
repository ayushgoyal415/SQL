const sql = require('sql');
sql.connect('sys');

// cspell:disable
// prettier-ignore
const db = {
	sql_bank: [
	/*SQL*/ `   DROP DATABASE IF EXISTS sql_bank;
    `,
	/*SQL*/ `   CREATE DATABASE sql_bank;
    `,
	/*SQL*/ `   CREATE TABLE sql_bank.accounts(
                        account_number INT AUTO_INCREMENT,
                        first_name VARCHAR(20) NOT NULL,
                        last_name VARCHAR(20) NOT NULL,
                        birth_date DATE NOT NULL,
                        phone_number CHAR(11) DEFAULT NULL,
                        balance INT NOT NULL,
                    PRIMARY KEY (account_number)
                );
    `,

    /*
        KEYS NOT MADE NOT NULL ->

        - Account number is not made not null in transactions table so as to use SET NULL constraint.

        - Also for this reason the account number (the primary key in accounts) was also not made not
          null because the keys must be same to apply foreign key constraint.

        - Interestingly, only a single value in the primary key column can hold null as a value because
          values in the primary key column are unique.
    */
	
    /*SQL*/ `   CREATE TABLE sql_bank.transactions(
                        transaction_id INT NOT NULL AUTO_INCREMENT,
                        account_number INT,
                        transacted_amount INT NOT NULL,
                        transaction_date DATE NOT NULL,
                        balance INT NOT NULL,
                    PRIMARY KEY (transaction_id),
                    INDEX fk_accounts_transactions_idx(account_number)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_bank.accounts VALUES
                    (215461215, 'Abeesh', 'Goyal', '1995-09-25', '76960-90038', 47850),
                    (DEFAULT, 'Ayush', 'Goyal', '1997-07-10', '76968-42758', 10500),
                    (DEFAULT, 'Pushpinder', 'Kumar', '1971-03-13', '76960-79013', 87200);
    `,
	/*SQL*/ `   INSERT INTO sql_bank.transactions VALUES
                    (24234, 215461215, 1250, '2022-12-07', 47850),
                    (DEFAULT, 215461216, 750, '2020-07-10', 10500),
                    (DEFAULT, 215461217, 13800, '2022-12-13', 87200);
    `,
	],

	sql_invoicing: [
	/*SQL*/ `   DROP DATABASE IF EXISTS sql_invoicing;
    `,
	/*SQL*/ `   CREATE DATABASE sql_invoicing;
    `,
	/*SQL*/ `   CREATE TABLE sql_invoicing.payment_methods (
                        payment_method_id tinyint(4) NOT NULL AUTO_INCREMENT,
                        name varchar(50) NOT NULL,
                    PRIMARY KEY (payment_method_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_invoicing.payment_methods VALUES
                    (1,'Credit Card'),
                    (2,'Cash'),
                    (3,'PayPal'),
                    (4,'Wire Transfer');
    `,
	/*SQL*/ `   CREATE TABLE sql_invoicing.clients (
                        client_id int(11) NOT NULL,
                        name varchar(50) NOT NULL,
                        address varchar(50) NOT NULL,
                        city varchar(50) NOT NULL,
                        state char(2) NOT NULL,
                        phone varchar(50) DEFAULT NULL,
                    PRIMARY KEY (client_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_invoicing.clients VALUES
                    (1,'Vinte','3 Nevada Parkway','Syracuse','NY','315-252-7305'),
                    (2,'Myworks','34267 Glendale Parkway','Huntington','WV','304-659-1170'),
                    (3,'Yadel','096 Pawling Parkway','San Francisco','CA','415-144-6037'),
                    (4,'Kwideo','81674 Westerfield Circle','Waco','TX','254-750-0784'),
                    (5,'Topiclounge','0863 Farmco Road','Portland','OR','971-888-9129');
    `,
	/*SQL*/ `   CREATE TABLE sql_invoicing.invoices (
                        invoice_id int(11) NOT NULL,
                        number varchar(50) NOT NULL,
                        client_id int(11) NOT NULL,
                        invoice_total decimal(9,2) NOT NULL,
                        payment_total decimal(9,2) NOT NULL DEFAULT '0.00',
                        invoice_date date NOT NULL,
                        due_date date NOT NULL,
                        payment_date date DEFAULT NULL,
                    PRIMARY KEY (invoice_id),
                    KEY FK_client_id (client_id),
                    CONSTRAINT FK_client_id FOREIGN KEY (client_id) REFERENCES clients (client_id) ON DELETE RESTRICT ON UPDATE CASCADE
                );
    `,
	/*SQL*/ `   INSERT INTO sql_invoicing.invoices VALUES
                    (1,'91-953-3396',2,101.79,0.00,'2019-03-09','2019-03-29',NULL),
                    (2,'03-898-6735',5,175.32,8.18,'2019-06-11','2019-07-01','2019-02-12'),
                    (3,'20-228-0335',5,147.99,0.00,'2019-07-31','2019-08-20',NULL),
                    (4,'56-934-0748',3,152.21,0.00,'2019-03-08','2019-03-28',NULL),
                    (5,'87-052-3121',5,169.36,0.00,'2019-07-18','2019-08-07',NULL),
                    (6,'75-587-6626',1,157.78,74.55,'2019-01-29','2019-02-18','2019-01-03'),
                    (7,'68-093-9863',3,133.87,0.00,'2019-09-04','2019-09-24',NULL),
                    (8,'78-145-1093',1,189.12,0.00,'2019-05-20','2019-06-09',NULL),
                    (9,'77-593-0081',5,172.17,0.00,'2019-07-09','2019-07-29',NULL),
                    (10,'48-266-1517',1,159.50,0.00,'2019-06-30','2019-07-20',NULL),
                    (11,'20-848-0181',3,126.15,0.03,'2019-01-07','2019-01-27','2019-01-11'),
                    (13,'41-666-1035',5,135.01,87.44,'2019-06-25','2019-07-15','2019-01-26'),
                    (15,'55-105-9605',3,167.29,80.31,'2019-11-25','2019-12-15','2019-01-15'),
                    (16,'10-451-8824',1,162.02,0.00,'2019-03-30','2019-04-19',NULL),
                    (17,'33-615-4694',3,126.38,68.10,'2019-07-30','2019-08-19','2019-01-15'),
                    (18,'52-269-9803',5,180.17,42.77,'2019-05-23','2019-06-12','2019-01-08'),
                    (19,'83-559-4105',1,134.47,0.00,'2019-11-23','2019-12-13',NULL);
    `,
	/*SQL*/ `   CREATE TABLE sql_invoicing.payments (
                        payment_id int(11) NOT NULL AUTO_INCREMENT,
                        client_id int(11) NOT NULL,
                        invoice_id int(11) NOT NULL,
                        date date NOT NULL,
                        amount decimal(9,2) NOT NULL,
                        payment_method tinyint(4) NOT NULL,
                    PRIMARY KEY (payment_id),
                    KEY fk_client_id_idx (client_id),
                    KEY fk_invoice_id_idx (invoice_id),
                    KEY fk_payment_payment_method_idx (payment_method),
                    CONSTRAINT fk_payment_client FOREIGN KEY (client_id) REFERENCES clients (client_id) ON UPDATE CASCADE,
                    CONSTRAINT fk_payment_invoice FOREIGN KEY (invoice_id) REFERENCES invoices (invoice_id) ON UPDATE CASCADE,
                    CONSTRAINT fk_payment_payment_method FOREIGN KEY (payment_method) REFERENCES payment_methods (payment_method_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_invoicing.payments VALUES
                    (1,5,2,'2019-02-12',8.18,1),
                    (2,1,6,'2019-01-03',74.55,1),
                    (3,3,11,'2019-01-11',0.03,1),
                    (4,5,13,'2019-01-26',87.44,1),
                    (5,3,15,'2019-01-15',80.31,1),
                    (6,3,17,'2019-01-15',68.10,1),
                    (7,5,18,'2019-01-08',32.77,1),
                    (8,5,18,'2019-01-08',10.00,2);
    `,
	],

	sql_store: [
	/*SQL*/ `   DROP DATABASE IF EXISTS sql_store;
    `,
	/*SQL*/ `   CREATE DATABASE sql_store;
    `,
	/*SQL*/ `   CREATE TABLE sql_store.products (
                        product_id int(11) NOT NULL AUTO_INCREMENT,
                        name varchar(50) NOT NULL,
                        quantity_in_stock int(11) NOT NULL,
                        unit_price decimal(4,2) NOT NULL,
                    PRIMARY KEY (product_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_store.products VALUES
                    (1,'Foam Dinner Plate',70,1.21),
                    (2,'Pork - Bacon,back Peameal',49,4.65),
                    (3,'Lettuce - Romaine, Heart',38,3.35),
                    (4,'Brocolinni - Gaylan, Chinese',90,4.53),
                    (5,'Sauce - Ranch Dressing',94,1.63),
                    (6,'Petit Baguette',14,2.39),
                    (7,'Sweet Pea Sprouts',98,3.29),
                    (8,'Island Oasis - Raspberry',26,0.74),
                    (9,'Longan',67,2.26),
                    (10,'Broom - Push',6,1.09);
    `,
	/*SQL*/ `   CREATE TABLE sql_store.shippers (
                        shipper_id smallint(6) NOT NULL AUTO_INCREMENT,
                        name varchar(50) NOT NULL,
                    PRIMARY KEY (shipper_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_store.shippers VALUES
                    (1,'Hettinger LLC'),
                    (2,'Schinner-Predovic'),
                    (3,'Satterfield LLC'),
                    (4,'Mraz, Renner and Nolan'),
                    (5,'Waters, Mayert and Prohaska');
    `,
	/*SQL*/ `   CREATE TABLE sql_store.customers (
                        customer_id int(11) NOT NULL AUTO_INCREMENT,
                        first_name varchar(50) NOT NULL,
                        last_name varchar(50) NOT NULL,
                        birth_date date DEFAULT NULL,
                        phone varchar(50) DEFAULT NULL,
                        address varchar(50) NOT NULL,
                        city varchar(50) NOT NULL,
                        state char(2) NOT NULL,
                        points int(11) NOT NULL DEFAULT '0',
                    PRIMARY KEY (customer_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_store.customers VALUES
                    (1,'Babara','MacCaffrey','1986-03-28','781-932-9754','0 Sage Terrace','Waltham','MA',2273),
                    (2,'Ines','Brushfield','1986-04-13','804-427-9456','14187 Commercial Trail','Hampton','VA',947),
                    (3,'Freddi','Boagey','1985-02-07','719-724-7869','251 Springs Junction','Colorado Springs','CO',2967),
                    (4,'Ambur','Roseburgh','1974-04-14','407-231-8017','30 Arapahoe Terrace','Orlando','FL',457),
                    (5,'Clemmie','Betchley','1973-11-07',NULL,'5 Spohn Circle','Arlington','TX',3675),
                    (6,'Elka','Twiddell','1991-09-04','312-480-8498','7 Manley Drive','Chicago','IL',3073),
                    (7,'Ilene','Dowson','1964-08-30','615-641-4759','50 Lillian Crossing','Nashville','TN',1672),
                    (8,'Thacher','Naseby','1993-07-17','941-527-3977','538 Mosinee Center','Sarasota','FL',205),
                    (9,'Romola','Rumgay','1992-05-23','559-181-3744','3520 Ohio Trail','Visalia','CA',1486),
                    (10,'Levy','Mynett','1969-10-13','404-246-3370','68 Lawn Avenue','Atlanta','GA',796);
    `,
	/*SQL*/ `   CREATE TABLE sql_store.order_statuses (
                        order_status_id tinyint(4) NOT NULL,
                        name varchar(50) NOT NULL,
                    PRIMARY KEY (order_status_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_store.order_statuses VALUES
                    (1,'Processed'),
                    (2,'Shipped'),
                    (3,'Delivered');
    `,
	/*SQL*/ `   CREATE TABLE sql_store.orders (
                        order_id int(11) NOT NULL AUTO_INCREMENT,
                        customer_id int(11) NOT NULL,
                        order_date date NOT NULL,
                        status tinyint(4) NOT NULL DEFAULT '1',
                        comments varchar(2000) DEFAULT NULL,
                        shipped_date date DEFAULT NULL,
                        shipper_id smallint(6) DEFAULT NULL,
                    PRIMARY KEY (order_id),
                    KEY fk_orders_customers_idx (customer_id),
                    KEY fk_orders_shippers_idx (shipper_id),
                    KEY fk_orders_order_statuses_idx (status),
                    CONSTRAINT fk_orders_customers FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON UPDATE CASCADE,
                    CONSTRAINT fk_orders_order_statuses FOREIGN KEY (status) REFERENCES order_statuses (order_status_id) ON UPDATE CASCADE,
                    CONSTRAINT fk_orders_shippers FOREIGN KEY (shipper_id) REFERENCES shippers (shipper_id) ON UPDATE CASCADE
                );
    `,
	/*SQL*/ `   INSERT INTO sql_store.orders VALUES
                    (1,6,'2019-01-30',1,NULL,NULL,NULL),
                    (2,7,'2018-08-02',2,NULL,'2018-08-03',4),
                    (3,8,'2017-12-01',1,NULL,NULL,NULL),
                    (4,2,'2017-01-22',1,NULL,NULL,NULL),
                    (5,5,'2017-08-25',2,'','2017-08-26',3),
                    (6,10,'2018-11-18',1,'Aliquam erat volutpat. In congue.',NULL,NULL),
                    (7,2,'2018-09-22',2,NULL,'2018-09-23',4),
                    (8,5,'2018-06-08',1,'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',NULL,NULL),
                    (9,10,'2017-07-05',2,'Nulla mollis molestie lorem. Quisque ut erat.','2017-07-06',1),
                    (10,6,'2018-04-22',2,NULL,'2018-04-23',2);
    `,
	/*SQL*/ `   CREATE TABLE sql_store.order_items (
                        order_id int(11) NOT NULL AUTO_INCREMENT,
                        product_id int(11) NOT NULL,
                        quantity int(11) NOT NULL,
                    PRIMARY KEY (order_id,product_id),
                    KEY fk_order_items_products_idx (product_id),
                    CONSTRAINT fk_order_items_orders FOREIGN KEY (order_id) REFERENCES orders (order_id) ON UPDATE CASCADE,
                    CONSTRAINT fk_order_items_products FOREIGN KEY (product_id) REFERENCES products (product_id) ON UPDATE CASCADE
                );
    `,
	/*SQL*/ `   INSERT INTO sql_store.order_items VALUES
                    (1,4,4),
                    (2,1,2),
                    (2,4,4),
                    (2,6,2),
                    (3,3,10),
                    (4,3,7),
                    (4,10,7),
                    (5,2,3),
                    (6,1,4),
                    (6,2,4),
                    (6,3,4),
                    (6,5,1),
                    (7,3,7),
                    (8,5,2),
                    (8,8,2),
                    (9,6,5),
                    (10,1,10),
                    (10,9,9);
    `,
	/*SQL*/ `   CREATE TABLE sql_store.order_item_notes (
                        note_id INT NOT NULL,
                        order_Id INT NOT NULL,
                        product_id INT NOT NULL,
                        note VARCHAR(255) NOT NULL,
                PRIMARY KEY (note_id));
    `,
	/*SQL*/ `   INSERT INTO sql_store.order_item_notes (note_id, order_Id, product_id, note) VALUES
                    ('1', '1', '1', 'first note'),
                    ('2', '2', '2', 'second note'),
                    ('3', '3', '3', 'third note'),
                    ('4', '4', '4', 'fourth note'),
                    ('5', '5', '5', 'fifth note'),
                    ('6', '6', '6', 'sixth note'),
                    ('7', '7', '7', 'seventh note'),
                    ('8', '8', '8', 'eighth note'),
                    ('9', '9', '9', 'ninth note'),
                    ('10', '10', '10', 'tenth note');
    `,
	],

	sql_hr: [
	/*SQL*/ `   DROP DATABASE IF EXISTS sql_hr;
    `,
    /*SQL*/ `   CREATE DATABASE sql_hr;
    `,
	/*SQL*/ `   CREATE TABLE sql_hr.offices (
                        office_id int(11) NOT NULL,
                        address varchar(50) NOT NULL,
                        city varchar(50) NOT NULL,
                        state varchar(50) NOT NULL,
                    PRIMARY KEY (office_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_hr.offices VALUES
                    (1,'03 Reinke Trail','Cincinnati','OH'),
                    (2,'5507 Becker Terrace','New York City','NY'),
                    (3,'54 Northland Court','Richmond','VA'),
                    (4,'08 South Crossing','Cincinnati','OH'),
                    (5,'553 Maple Drive','Minneapolis','MN'),
                    (6,'23 North Plaza','Aurora','CO'),
                    (7,'9658 Wayridge Court','Boise','ID'),
                    (8,'9 Grayhawk Trail','New York City','NY'),
                    (9,'16862 Westend Hill','Knoxville','TN'),
                    (10,'4 Bluestem Parkway','Savannah','GA');
    `,
	/*SQL*/ `   CREATE TABLE sql_hr.employees (
                        employee_id int(11) NOT NULL,
                        first_name varchar(50) NOT NULL,
                        last_name varchar(50) NOT NULL,
                        job_title varchar(50) NOT NULL,
                        salary int(11) NOT NULL,
                        reports_to int(11) DEFAULT NULL,
                        office_id int(11) NOT NULL,
                    PRIMARY KEY (employee_id),
                    KEY fk_employees_offices_idx (office_id),
                    KEY fk_employees_employees_idx (reports_to),
                    CONSTRAINT fk_employees_managers FOREIGN KEY (reports_to) REFERENCES employees (employee_id),
                    CONSTRAINT fk_employees_offices FOREIGN KEY (office_id) REFERENCES offices (office_id) ON UPDATE CASCADE
                );
    `,
	/*SQL*/ `   INSERT INTO sql_hr.employees VALUES
                    (37270,'Yovonnda','Magrannell','Executive Secretary',63996,NULL,10),
                    (33391,"D'arcy",'Nortunen','Account Executive',62871,37270,1),
                    (37851,'Sayer','Matterson','Statistician III',98926,37270,1),
                    (40448,'Mindy','Crissil','Staff Scientist',94860,37270,1),
                    (56274,'Keriann','Alloisi','VP Marketing',110150,37270,1),
                    (63196,'Alaster','Scutchin','Assistant Professor',32179,37270,2),
                    (67009,'North','de Clerc','VP Product Management',114257,37270,2),
                    (67370,'Elladine','Rising','Social Worker',96767,37270,2),
                    (68249,'Nisse','Voysey','Financial Advisor',52832,37270,2),
                    (72540,'Guthrey','Iacopetti','Office Assistant I',117690,37270,3),
                    (72913,'Kass','Hefferan','Computer Systems Analyst IV',96401,37270,3),
                    (75900,'Virge','Goodrum','Information Systems Manager',54578,37270,3),
                    (76196,'Mirilla','Janowski','Cost Accountant',119241,37270,3),
                    (80529,'Lynde','Aronson','Junior Executive',77182,37270,4),
                    (80679,'Mildrid','Sokale','Geologist II',67987,37270,4),
                    (84791,'Hazel','Tarbert','General Manager',93760,37270,4),
                    (95213,'Cole','Kesterton','Pharmacist',86119,37270,4),
                    (96513,'Theresa','Binney','Food Chemist',47354,37270,5),
                    (98374,'Estrellita','Daleman','Staff Accountant IV',70187,37270,5),
                    (115357,'Ivy','Fearey','Structural Engineer',92710,37270,5);
    `,
	],

	sql_inventory: [
	/*SQL*/ `   DROP DATABASE IF EXISTS sql_inventory;
    `,
	/*SQL*/ `   CREATE DATABASE sql_inventory;
    `,
	/*SQL*/ `   CREATE TABLE sql_inventory.products (
                        product_id int(11) NOT NULL AUTO_INCREMENT,
                        name varchar(50) NOT NULL,
                        quantity_in_stock int(11) NOT NULL,
                        unit_price decimal(4,2) NOT NULL,
                    PRIMARY KEY (product_id)
                );
    `,
	/*SQL*/ `   INSERT INTO sql_inventory.products VALUES
                    (1,'Foam Dinner Plate',70,1.21),
                    (2,'Pork - Bacon,back Peameal',49,4.65),
                    (3,'Lettuce - Romaine, Heart',38,3.35),
                    (4,'Brocolinni - Gaylan, Chinese',90,4.53),
                    (5,'Sauce - Ranch Dressing',94,1.63),
                    (6,'Petit Baguette',14,2.39),
                    (7,'Sweet Pea Sprouts',98,3.29),
                    (8,'Island Oasis - Raspberry',26,0.74),
                    (9,'Longan',67,2.26),
                    (10,'Broom - Push',6,1.09);
    `,
	],
};

function create(name) {
  sql.execute(...db[name]);
}

const create_all = () => {
  const q = [];
  for (let i in db) q.push(...db[i]);
  sql.execute(...q);
};

// create("sql_store");
create_all();
