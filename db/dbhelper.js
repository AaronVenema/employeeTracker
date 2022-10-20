const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;   
  }

  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT * FROM employee;"
    );
  }

  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT * From department" 
    );
  }

  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.title AS title, role.salary AS salary, role.department_id AS id;"
    );
  }

  findAllBudget() {
    return this.connection.promise().query(
      "SELECT * FROM department;",
      "SUM(salary);"
    );
  }  

  newDepartment() {
    connection.query("INSERT INTO department SET")
  } 
  newRole() {
    connection.query("INSERT INTO role SET")
  }   

}

module.exports = new DB(connection);
