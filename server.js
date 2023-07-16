const { prompt } = require('inquirer');
require("console.table");

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
            default:
            // code block
        }
    })
}

function showAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
      });
}
function updateEmployeeRole() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}
function updateEmployeeRole() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}
function viewAllRoles() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}
function addRole() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}
function viewAllDepartments() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}
function addDepartment() {
    db.query('SELECT * FROM course_names', function (err, results) {
        console.log(results);
      });
}







init();