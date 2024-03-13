DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db;

CREATE TABLE departments (
  id BIGSERIAL PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INTEGER NOT NULL,
);

CREATE TABLE employees (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  department VARCHAR (30) NOT NULL, 
  salary INTEGER NOT NULL,
  manager,
ON DELETE SET NULL
)