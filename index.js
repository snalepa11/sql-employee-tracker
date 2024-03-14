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
    ]).then((answers) => {
        if (answers.prompt === 'view all departments') {
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'view all roles') {
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'view all employees') {
            db.query(`SELECT * FROM employees`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                employee_tracker();
            });
        }

        //use left joins going forward



        else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Adios!");
        }
    })

}

