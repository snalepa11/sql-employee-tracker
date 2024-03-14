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

//Adds a new department
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
                console.log("Viewing New Department: ");
                console.table(result);
                employee_tracker();
            }
        );
    })
};

//Adds a new role
function newRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you would like to add?",
            name: "addNewTitle",
        },
        {
            type: "input",
            message: "What is the department of the role you would like to add?",
            name: "addNewDepartment",
        },
        {
            type: "input",
            message: "What is the salary of the role you would like to add?",
            name: "addNewSalary",
        },
    ]).then((answers => {
        db.query(`INSERT INTO roles VALUES ${answers.addNewTitle} , ${answers.addNewDepartment} , ${answers.addNewSalary}`,
            (err, result) => {
                if (err) throw err;
                console.log("Viewing New Role: ");
                console.table(result);
                employee_tracker();
            }
        );
    }));
};
//use left joins going forward
function newEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee you would like to add?",
            name: "newEmployeeFirstName",
        },
        {
            type: "input",
            message: "What is the last name of the employee you would like to add?",
            name: "newEmployeeLastName",
        },
        {
            type: "input",
            message: "What is the title for this employee?",
            name: "newEmployeeTitle",
        },
        {
            type: "input",
            message: "What is the employee role id?",
            name: "newEmployeeRoleId",
        },
        {
            type: "input",
            message: "What is the salary for this employee?",
            name: "newEmployeeSalary",
        },
        {
            type: "input",
            message: "What is the manager for this employee?",
            name: "newEmployeeManager",
        },
    ]).then((answers => {
        db.query(`INSERT INTO employees VALUES ${answers.newEmployeeFirstName} , ${answers.newEmployeeLastName} , ${answers.newEmployeeTitle} , ${answers.newEmployeeRoleId} , ${answers.newEmployeeSalary} , ${answers.newEmployeeManager}`,
            (err, result) => {
                if (err) throw err;
                console.log("Viewing New Employee: ");
                console.table(result);
                employee_tracker();
            }
        );
    }));
};

function updateRole(newEmployee) {
    inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "which employee would you like to update the role for",
        },
        {
            type: "input",
            message: "What is the role id you would like to choose ?",
            name: "role_id",
        },
    ]).then((answer) => {
        db.query(
            `UPDATE employees 
           SET employee_id = first_name, last_name
           WHERE role_id = employee_id
           SET role_id = role_id `,
            (err, result) => {
                if (err) throw err;
                console.log("Viewing New Employee: ");
                console.table(result);
                employee_tracker();
            }
        );
    };


    function logOut() {
        db.end();
        console.log("Adios!");
    }


