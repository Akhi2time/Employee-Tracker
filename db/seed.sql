USE employee_DB

INSERT department (name)
VALUES ("ENGINEERING"),("SALES"),("ACCOUNTING") 

INSERT INFO role (title, salary, department_id)
VALUES ("LEAD ENGINEERING", 90000, 1),
        ("Jr Engineer", 65000, 1),
        ("Sales Manager", 80000, 2)
        ("Sales Analyst", 60000, 2)
        ("Accountant", 50000, 3)
        ("Finance Manager",90000,3);

INSERT INFO employee (first_name, last_name, role_id, manager_id)
VALUES ("LEBRON", "JAMES", 1, 1),
("STEPH", "CURRY", 2, 2),
("LAMAR", "JACKSON", 3, 3),
("JONATHAN", "TAYLOR", 4, 4),
("STEFON", "DIGGS", 5, 5),
("JUSTIN", "JEFFORSON", 6, 6),