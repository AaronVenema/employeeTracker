const inquier = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");
const db = require("./db/dbhelper");
const { connection, pool } = require("./db/connection");
const { newDepartment } = require("./db/dbhelper");

function init() {
  loadMainPrompts()
}

function loadMainPrompts() {
  inquier.prompt(
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name:"View All Departments",
          value:"VIEW_DEPARTMENTS"
        },
        {
          name:"View All Roles",
          value:"VIEW_ROLES"
        },
        {
          name:"Add A Department",
          value:"ADD_DEPARTMENT"
        },
        {
          name:"Add A Role",
          value:"ADD_ROLE"
        },
        {
          name:"Add A Employee",
          value:"ADD_EMPLOYEE"
        },
        {
          name:"Update An Employe Role",
          value:"UPDATE_ROLE"
        },
      ]
    }
  ).then(res => {
    let choice = res.choice;
    
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "UPDATE_ROLE":
        updateRole();
        break;  
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      default:
        connection.end();
    }
  }
)}

async function viewEmployees() {
  let [rows] = await db.findAllEmployees()
  let title = await db.getRoleTitleByID(rows);
  console.table(title)
  loadMainPrompts()
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

async function viewRoles() {
  let [rows] = await db.findAllRoles()
  let roles = await db.getDepartmentNameByID(rows);
      console.table(roles);
  loadMainPrompts()
}

function addDepartment() {
  inquier.prompt ({
    type: "input",
    name: "newDepartment",
    message: "Please input new department name."
  })
    .then((answer) => {
       newDepartment(answer)
    })
    .then(() =>{
      loadMainPrompts()
    })
}

function addEmployee() {
  inquier.prompt ({
    type: "input",
    name: "first_name",
    message: "Please input new employee first name."
  },
  {
    type: "input",
    name: "last_name",
    message: "Please input new employee last name."
  },
  {
    type: "number",
    name: "department_id",
    message: "Please input new Employee's department id."
  },
  {
    type: "number",
    name: "role_id",
    message: "Please input new Employee's role id."
  },
  {
    type: "number",
    name: "manager_id",
    message: "Please input employee's Manager id."
  })
    .then(() => loadMainPrompts());
}

async function addRole() {
  let [depNamesArray] = await pool.query(
    `SELECT name FROM department;`
  )
  let newDepNameArray = []
  for(let i=0; i < depNamesArray.length; i++){
    newDepNameArray.push(depNamesArray[i].name)
  }
  
 const {newTitle, newSalary, department} = await inquier.prompt ([
  {
    type: "input",
    name: "newTitle",
    message: "Please input new title."
  },
  { 
    type: "number",
    name: "newSalary",
    message: "Please input new salary."
  },
  {
    type: "list",
    name: "department",
    choices: newDepNameArray,
    message: "Please chose a department."
  }
])
 const [depId] = await pool.query(`SELECT id FROM department WHERE name= "${department}"`)
 let selectedDepID
  for(i=0; i <depId.length; i++){
    selectedDepID= depId[i].id
  }
 
  pool.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newTitle}", ${newSalary}, ${selectedDepID})`)
  .then(() =>{
    loadMainPrompts()
  })
}

function updateRole() {
  inquier.prompt ({
    type: "input",
    name: "role",
    message: "Please input updated role."
  })
    .then(() => loadMainPrompts());
}


init();