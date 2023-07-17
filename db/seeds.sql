INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (role_name, salary, department)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Attorney", 190000, 4);

INSERT INTO employee (first_name, last_name, role, manager_id)
VALUES ("Neo", "Chosen", 3, null),
       ("Homer", "Simpson", 4, 1);