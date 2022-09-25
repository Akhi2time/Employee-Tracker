const mysql = require('mysql2');
const inquirer = require('inquirer');

const consoleTable = require('console.table');
const util = require("util");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
  });

  connection.connect(err => {
    if (err) throw err;
    console.log(' ');
    start();
  });

 const queryAsync = util.promisify(connection.query).bind(connection);

  async function start() {
	const answer = await inquirer.prompt({
		name: 'selectOption',
		type: 'list',
		message: 'What would you like to do?',
		choices: [
			'View All Departments',
			'View All ',
			'View All Employees',
			'Add A Department',
			'Add A Role',
			'Add An Employee',
			'Delete A Department',
			'Delete A Role',
			'Delete An Employee',
			'Update A Role\'s Salary',
			'Update An Employee\'s Role',
			'Update An Employee\'s Manager',
			'Exit'
		]
	});
	switch (answer.selectOption) {
		case 'View All Departments':
			viewDepartments();
			break;
		case 'View All ':
			view();
			break;
		case 'View All Employees':
			viewEmployees();
			break;
		case 'Add A Department':
			addDepartment();
			break;
		case 'Add A Role':
			addRole();
			break;
		case 'Add An Employee':
			addEmployee();
			break;
		case 'Delete A Department':
			deleteDepartment();
			break;
		case 'Delete A Role':
			deleteRole();
			break;
		case 'Delete An Employee':
			deleteEmployee();
			break;
		case 'Update A Role\'s Salary':
			updateSalary();
			break;
		case 'Update An Employee\'s Role':
			updateRole();
			break;
		case 'Update An Employee\'s Manager':
			updateManager();
			break;
		case 'Exit':
			console.log(' ');
			connection.end();
			break;
	}
};

async function viewDepartments() {
	const res = await queryAsync('SELECT * FROM department');
	const allDepartments = [];
	console.log(' ');
    for (let i of res) {
	    allDepartments.push({ ID: i.id, NAME: i.name });
    }
    console.table(allDepartments);
    start();
};

async function view() {
	const res = await queryAsync('SELECT role.id, role.title, role.salary, department.name FROM roles role INNER JOIN department ON role.department_id = department.id');
	const all = [];
    console.log(' ');
    for (let i of res) {
	    all.push({ ID: i.id, TITLE: i.title, SALARY: i.salary, DEPARTMENT: i.name });
    }
    console.table(all);
    start();
};

async function viewEmployees() {	
	const res = await queryAsync('SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee_Name, role.title, role.salary, CONCAT(m.first_name, " ", m.last_name) AS managerName FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN roles role ON e.role_id = role.id');
	const allEmployees = [];
	console.log(' ');
    for (let i of res) {   
	    allEmployees.push({ ID: i.id, NAME: i.employeeName, ROLE: i.title, SALARY: i.salary, MANAGER: i.managerName });
    }
	console.table(allEmployees);
    start();
};

async function addDepartment() {
	const answer = await inquirer.prompt({
		name: 'departmentName',
		type: 'input',
		message: 'Department Name:'
	});	

	await queryAsync('INSERT INTO department SET ?', { name: answer.departmentName });
};

async function addRole() {
	const res = await queryAsync('SELECT * FROM department');	
	const answer = await inquirer.prompt([
		{
			name: 'role',
			type: 'input',
			message: 'Role Name:'
		},
		{
			name: 'salary',
			type: 'input',
			message: 'Salary:',
			validate: value => {
			  if (isNaN(value) === false) return true;
			  return false;
			}
		},
		{
			name: 'department',
			type: 'list',
			message: 'Department:',
			choices: () => {
				const departments = [];
				for (let i of res) {
					departments.push(i.name);
				}
				return departments;
			}
		}
	]);
	let departmentId;
	for (let i of res) {
		if (i.name === answer.department) {
			departmentId = i.id;
  		}
		  await queryAsync('INSERT INTO roles SET ?', { title: answer.role, salary: answer.salary, departmentId: departmentId });
		  viewEmployees ();
	};
}