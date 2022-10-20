
const inquier = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");
const db = require("./db/dbhelper");
const { connection } = require("./db/connection");
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
          name:"View The Total Budget of A Department",
          value:"VIEW_BUDGET"
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
        {
          name:"Delete Department",
          value:"Delete_DEPARTMENT"
        },
        {
          name:"Delete Role",
          value:"Delete_ROLE"
        },
        {
          name:"Delete Employee",
          value:"Delete_Employee"
        }
      ]
    }
  ).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    
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
      case "VIEW_BUDGET":
        viewBudget();
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
      case "UPDATE_ROLE":
        updateRole();
        break;
      case "DELETE_DEPARTMENT":
        deleteDepartment();
        break;
      case "DELETE_ROLE":
        deleteRole();
        break;
      case "DELETE_EMPLOYEE":
        deleteEmployee();
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

function viewBudget() {
  db.findAllBudget()
    .then(([rows]) => {
      let budget = rows;
      console.log("\n");
      console.table(budget);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
  inquier.prompt ({
    type: "input",
    name: "department",
    message: "Please input new department name."
  })
    .then((answers) => {
      newDepartment(answers)
    })
    .then(() => loadMainPrompts());
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

function addRole() {
  inquier.prompt ({
    type: "input",
    name: "title",
    message: "Please input new title."
  },
  { 
    type: "number",
    name: "salary",
    message: "Please input new salary."
  },
  {
    type: "list",
    name: "department",
    choices: [],
    message: "Please chose a department."
  }
  )
    .then(() => loadMainPrompts());
}

function updateRole() {
  inquier.prompt ({
    type: "input",
    name: "role",
    message: "Please input updated role."
  })
    .then(() => loadMainPrompts());
}

function deleteDepartment() {
  viewDepartments();
  inquier.prompt ({
    type: "lists",
    name: "department",
    message: "Please select the department you wish to delete."
  })
    .then(() => loadMainPrompts());
}

function deleteRole() {
  viewRoles();
  inquier.prompt ({
    type: "lists",
    name: "role",
    message: "Please select the role you wish to delete."
  })
    .then(() => loadMainPrompts());
}

function deleteEmployee() {
  viewEmployees();
  inquier.prompt ({
    type: "lists",
    name: "employee",
    message: "Please select the employee you wish to delete."
  })
    .then(() => loadMainPrompts());
}

init();