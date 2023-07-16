INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (role_name, department_id, salary)
VALUES ("Sales Lead", "Sales", 100000),
       ("Salesperson", "Sales", 80000),
       ("Lead Engineer", "Engineering", 150000),
       ("Software Engineer", "Engineering", 120000),
       ("Account Manager", "Finance", 160000),
       ("Accountant", "Finance", 125000),
       ("Legal Team Lead", "Legal", 250000),
       ("Attorney", "Legal", 190000);