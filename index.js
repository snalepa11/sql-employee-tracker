const inquirer = require('inquirer');
const db = require('./db/connection');
const fs = require('fs')


db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');

    employee_tracker();
});



var employee_tracker = function () {
    //Staarts the command line question flow
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Log Out']
        }
    ]).then((answer) => {
        switch (answer.questions) {
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
        console.table(result.rows);
        employee_tracker();

    });
}

function viewRoles() {
    db.query(`SELECT * FROM roles LEFT JOIN departments ON roles.department_id = departments.id`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Roles: ");
        console.table(result.rows);
        employee_tracker();
    });
}

function viewEmployees() {
    db.query(`SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Employees: ");
        console.table(result.rows);
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
        db.query(`INSERT INTO departments (department) VALUES ('${answers.addDepartment}')`,
            (err, result) => {
                if (err) throw err;
                employee_tracker();
            }
        );
    })
};

//Adds a new role
function newRole() {
    db.query("SELECT * FROM departments", (err, departments)=>{
        const departmentChoices = departments.rows.map((dep)=> ({ name: dep.department, value: dep.id}))

    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you would like to add?",
            name: "addNewTitle",
        },
        {
            type: "list",
            message: "What is the department of the role you would like to add?",
            name: "departmentId",
            choices: departmentChoices
        },
        {
            type: "input",
            message: "What is the salary of the role you would like to add?",
            name: "addNewSalary",
        },
    ]).then((answers => {
        db.query(`INSERT INTO roles (title, department_id, salary) VALUES ('${answers.addNewTitle}' , ${answers.departmentId}, '${answers.addNewSalary}')`,
            (err, result) => {
                if (err) throw err;
                employee_tracker();
            }
        );
    }));
})
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
            message: "What is the salary for this employee?",
            name: "newEmployeeSalary",
        },
        {
            type: "input",
            message: "Who is the manager for this employee?",
            name: "newEmployeeManager",
        },
    ]).then((answers => {
        db.query(`INSERT INTO employees VALUES ${answers.newEmployeeFirstName} , ${answers.newEmployeeLastName} , ${answers.newEmployeeTitle} , ${answers.newEmployeeSalary} , ${answers.newEmployeeManager}`,
            (err, result) => {
                if (err) throw err;
                employee_tracker();
            }
        );
    }));
};

function updateRole(newEmployee) {
    db.query("SELECT * FROM roles", (err, roles) => {

        const roleChoices = roles.rows.map((role)=> ({ name: role.title, value: role.id}))

        db.query("SELECT * FROM employees", (err, employees) => {

            const employeeChoices = employees.rows.map((person)=> ({ name: person.first_name + " " + person.last_name, value: person.id}))

        inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "which employee would you like to update the role for",
                choices: employeeChoices
            },
            {
                type: "list",
                message: "What is the role id you would like to choose ?",
                name: "role_id",
                choices: roleChoices
            },
        ]).then((answer) => {
            console.log(answer);
            db.query(
                `UPDATE employees 
           SET role_id = ${answer.role_id}
            WHERE id = ${answer.employee_id}`,
                (err) => {
                    if (err) throw err;
                    employee_tracker();
                });
        });
    })
})};


function logOut() {
    db.end();
    console.log("Adios!");
    process.exit();
}


