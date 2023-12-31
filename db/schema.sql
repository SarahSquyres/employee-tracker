DROP DATABASE IF EXISTS employeeProfile_db;
CREATE DATABASE employeeProfile_db;

USE employeeProfile_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department INT NOT NULL,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role INT NOT NULL,
  FOREIGN KEY (role)
  REFERENCES role(id),
  manager_id INT,
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id) ON DELETE CASCADE
);

-- `department`
--     * `id`: `INT PRIMARY KEY`
--     * `name`: `VARCHAR(30)` to hold department name
-- `role`
--     * `id`: `INT PRIMARY KEY`
--     * `title`: `VARCHAR(30)` to hold role title
--     * `salary`: `DECIMAL` to hold role salary
--     * `department_id`: `INT` to hold reference to department role belongs to
-- `employee`
--     * `id`: `INT PRIMARY KEY`
--     * `first_name`: `VARCHAR(30)` to hold employee first name
--     * `last_name`: `VARCHAR(30)` to hold employee last name
--     * `role_id`: `INT` to hold reference to employee role
--     * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee ()


