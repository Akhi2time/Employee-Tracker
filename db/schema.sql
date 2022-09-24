DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
	id PRIMARY KEY,
    name VARCHAR(30) ,
    
);
CREATE TABLE role (
	id INT PRIMARY KEY
    title VARCHAR(30)
    salary DECIMAL (10)
    department_id INT
    FOREIGN KEY (department_id), REFRENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee (
	id PRIMARY KEY
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT
    manager_id INT,
    FOREIGN KEY (role_id) REFRENCES (roleid) role (id) on DELETE CASCADE
    FOREIGN KEY (manager_id) REFRENCES employee (id) ON DELETE SET NULL

);