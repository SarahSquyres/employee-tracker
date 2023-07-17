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


function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
    FROM employee
    LEFT JOIN employee AS manager
    ON employee.manager_id = manager_id.id;)`, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
        console.table(results);
        init();
    });
}

function viewAllRoles() {
    db.query(`SELECT * FROM role `, function (err, results) {
        console.table(results);
        init();
    });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
    });
}
function updateEmployeeRole() {
    db.query('UPDATE employee SET column1 = value1', function (err, results) {
        console.log(results);
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
            db.query(`INSERT INTO role SET role_name='${answer.newRole}', salary='${answer.newRoleSalary}', department='${answer.newRoleDpt}';`, (err, results) => {
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
        db.query(`INSERT INTO department(department_name) VALUES('${answer.department}');`)
        console.log("Added department!")
        init();
    });
}

function addEmployee() {
    prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            name: "newRole",
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"]
        },
        // {
        //     name: "manager",
        //     type: "list",
        //     message: "Who is the employee's manager?",
        //     choices: employeeList
        // }
    ]).then(function (answer) {
        db.query("INSERT INTO employee")
    })
};