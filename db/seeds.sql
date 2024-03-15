INSERT INTO departments (department)
VALUES 
       ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles (title, department_id, salary)
VALUES 
       ('Sales Lead', 'Sales', 100000),
       ('Sales Person', "Sales", 80000),
       ('Lead Engineer', 'Engineering', 150000),
       ('Software Engineer', 'Engineering', 120000),
       ('Account Manager', 'Finance', 160000),
       ('Accountant', 'Finance', 125000),
       ('Legal Team Lead', 'Legal', 250000),
       ('Lawyer', 'Legal', 190000);

INSERT INTO employees (first_name, last_name, title, role_id, salary, manager_id)
VALUES 
       ('John','Doe','Sales Lead', 'Sales', 100000),
       ('Mike', 'Chan','Sales Person', "Sales", 80000, 'John Doe'),
       ('Ashley','Rodriguez','Lead Engineer', 'Engineering', 150000),
       ('Kevin','Tupik','Software Engineer', 'Engineering', 120000, 'Ashley Rodriguez'),
       ('Kunal', 'Singh','Account Manager', 'Finance', 160000),
       ('Malia',"Brown",'Accountant', 'Finance', 125000, 'Kunal Singh'),
       ('Sarah', 'Lourd', 'Legal Team Lead', 'Legal', 250000),
       ('Tom', 'Allen', 'Lawyer', 'Legal', 190000, 'Sarah Lourd');

