const inquirer = require('inquirer');
const db = require('./db/connection');


//Starts server after database connected
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

//put predefined work into a function

var employee_trackertracker = function () {
    //Staarts the command line question flow
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Log Out']
        }
    ]).then((answer) => {
        switch (answer.queryOptions) {
            case "view all departments":
                viewDepartments();
                break;
            case "view all roles":
                viewRoles();
                break;
            case "view all employees":
                viewEmployees();
                break;

            case "add a department":
                newDepartment();
                break;
            case "add a role":
                newRole();
                break;
            case "add an employee":
                newEmployee();
                break;
            case "update an employee role":
                updateRole();
                break;
            case "Log Out":
                logOut();
                break;
        }
    });
}





function viewDepartments() {
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Departments: ");
        console.table(result);
        employee_tracker();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Roles: ");
        console.table(result);
        employee_tracker();
    });
}

function viewEmployees() {
    db.query(`SELECT * FROM employees`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Employees: ");
        console.table(result);
        employee_tracker();
    });
}

function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "addDepartment",
        },
    ]).then(answers => {
        db.query(`INSERT INTO department (department) VALUES ${answers.newDepartment}`,
            (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                employee_tracker();
            }
        );
    })
};

func
//use left joins going forward



function logOut() {
    db.end();
    console.log("Adios!");
}


