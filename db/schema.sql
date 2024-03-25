DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

-- DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  department_id INTEGER NOT NULL,
  salary INTEGER NOT NULL,
  FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE CASCADE 
);

-- DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INTEGER NOT NULL, 
  manager_id INTEGER, 
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE SET NULL,
  FOREIGN KEY(manager_id) REFERENCES employees(id)
);

