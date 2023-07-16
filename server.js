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

  db.connect(function (err){
    if (err) throw err;
    console.log("************************");
    console.log("Employee Tracker Started");
    console.log("************************");
    init();
  });

function init() {
    // prompt with list type Q
    // in .then() switchcase in js
    prompt([
        {
            name: "userChoice",
            type: "list",
            message: "Please choose from one of the options below:",
            choices: [
                "Show All Employees",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Add Employee",
                "Exit",
            ]

        }
    ]).then(function (data) {
        switch (data.userChoice) {
            case "Show All Employees":
                showAllEmployees()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            case "View All Roles":
                viewAllRoles()
                break;
            case "Add Role":
                addRole()
                break;
            case "View All Departments":
                viewAllDepartments()
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
            // code block
        }
    })
}

// const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
// role.title AS role, department.name AS department, role.salary, 
// CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
// LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) 
// INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`
function showAllEmployees() {
    db.query(`SELECT * FROM employee, role.role_name AS role, department.department_name AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`, function (err, results) {
        console.table(results);
        init(); 
      });
}
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition; (use req.body?) (use ?)

function updateEmployeeRole() {
    db.query('UPDATE employee SET column1 = value1', function (err, results) {
        console.log(results);
      });
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        init();      
    });
}

// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

function addRole() {
    db.query('INSERT INTO role (id, role_title, salary) VALUES (" ")', function (err, results) {
        console.log(results);
        
      });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
      });
}

function addDepartment() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}
function addEmployee() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
      prompt([
        {
            name: "userChoice",
            type: "list",
            message: "Please choose from one of the options below:",
            choices: [
                "Show All Employees",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Exit",
            ]

        }
    ]).then(function (data){})
};