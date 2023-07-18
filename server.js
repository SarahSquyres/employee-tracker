const { prompt } = require('inquirer');
const mysql = require('mysql2');
require("console.table");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Wanderlust15!',
        database: 'employeeProfile_db'
    },
    console.log(`Connected to the employeeProfile_db.`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("************************");
    console.log("Employee Tracker Started");
    console.log("************************");
    init();
});

function init() {
    prompt([
        {
            name: "userChoice",
            type: "list",
            message: "Please choose from one of the options below:",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Update Employee Role",
                "Add Role",
                "Add Department",
                "Add Employee",
                "Exit",
            ]

        }
    ]).then(function (data) {
        switch (data.userChoice) {
            case "View All Employees":
                viewAllEmployees()
                break;
            case "View All Roles":
                viewAllRoles()
                break;
            case "View All Departments":
                viewAllDepartments()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Exit":
                console.log("Thanks for using Employee Tracker!");
                db.end();
                break;
        }
    })
}

// Help from https://github.com/andreahergert/employee_tracker/blob/main/server.js
function viewAllEmployees() {
    const sqlQuery = `SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, role.role_name 
    AS Role, department.department_name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id 
    INNER JOIN role ON (role.id = employee.role) 
    INNER JOIN department ON (department.id = role.department) ORDER BY employee.id;`

    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(results);
        init();
    });
}

function viewAllRoles() {
    db.query(`SELECT role.id AS ID, role.role_name AS Role, role.salary AS Salary, 
    department.department_name AS Department FROM role 
    INNER JOIN department ON (department.id = role.department);`, function (err, results) {
        console.table(results);
        init();
    });
}

function viewAllDepartments() {
    db.query('SELECT department.id AS ID, department.department_name AS Department FROM department', function (err, results) {
        console.table(results);
        init();
    });
}
function updateEmployeeRole() {
    db.query('SELECT * FROM role', function (err, results) {
        roleList = results.map(role => ({
            name: role.role_name,
            value: role.id
        }));

        db.query(`SELECT * FROM employee`, function (err, results) {
            employeeList = results.map(employee => ({
                name: employee.first_name.concat(" ", employee.last_name),
                value: employee.id
            }));
            prompt([
                {
                    name: "updateRoleEmpl",
                    type: "list",
                    message: "Whose role would you like to update?",
                    choices: employeeList
                },
                {
                    type: "list",
                    name: "updateRoleRole",
                    message: "What is their new role?",
                    choices: roleList
                },
                {
                    name: "updateRoleManager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: employeeList
                }
            ]).then((answer) => {
                db.query(`UPDATE employee SET role='${answer.updateRoleRole}', manager_id='${answer.updateRoleManager}' WHERE id=${answer.updateRoleEmpl};`, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Updated Employee Successfuly!");
                    init();
                })
            })
        })
    });
}

// Help from https://github.com/andreahergert/employee_tracker/blob/main/server.js and AskBCS tutor David
function addRole() {
    db.query('SELECT * FROM department', function (err, results) {
        dptList = results.map(department => ({
            name: department.department_name,
            value: department.id
        }));

        prompt([
            {
                type: "input",
                name: "newRole",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "newRoleSalary",
                message: "What is the salary for this role?",
            },
            {
                type: "list",
                name: "newRoleDpt",
                message: "To which department does this role belong?",
                choices: dptList
            },

        ]).then((answer) => {
            db.query(`INSERT INTO role SET role_name='${answer.newRole}', salary='${answer.newRoleSalary}', 
            department='${answer.newRoleDpt}';`, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Added Role Successfuly!");
                init();
            })
        }
        );
    });
}

function addDepartment() {
    prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the department?",
        }

    ]).then((answer) => {
        db.query(`INSERT INTO department SET department_name='${answer.newDepartment}';`)
        console.log("Added department!")
        init();
    });
}

function addEmployee() {
    db.query('SELECT * FROM role', function (err, results) {
        roleList = results.map(role => ({
            name: role.role_name,
            value: role.id
        }));

        db.query(`SELECT * FROM employee`, function (err, results) {
            employeeList = results.map(employee => ({
                name: employee.first_name.concat(" ", employee.last_name),
                value: employee.id
            }));
            prompt([
                {
                    name: "newEmplFirstName",
                    type: "input",
                    message: "What is the employee's first name?",
                },
                {
                    name: "newEmplLastName",
                    type: "input",
                    message: "What is the employee's last name?",
                },
                {
                    type: "list",
                    name: "newEmplRole",
                    message: "What is the new employee's role?",
                    choices: roleList
                },
                {
                    name: "newEmplManager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: employeeList
                }
            ]).then((answer) => {
                db.query(`INSERT INTO employee SET first_name='${answer.newEmplFirstName}', last_name='${answer.newEmplLastName}', 
            role='${answer.newEmplRole}', manager_id='${answer.newEmplManager}';`, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Added Employee Successfuly!");
                    init();
                })
            })
        })
    });
};
