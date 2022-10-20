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
      "SELECT * FROM role"
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

  async getDepartmentNameByID(rows){
    for(let i = 0; i < rows.length; i++){
      let id = rows[i].department_id
      let [name] = await connection.promise().query(
        `SELECT name FROM department WHERE id = ${id}`
      )
        name = name[0].name
        rows[i].departmentName = name
        delete rows[i].department_id
    }
    return rows;
  }

  async getRoleTitleByID(rows){
    for(let i = 0; i < rows.length; i++){
      let id = rows[i].role_id
      let managerId =rows[i].manager_id
      let [title] = await connection.promise().query(
        `SELECT title FROM role WHERE id = ${id}`
      )
      if (managerId) {
        let [name] = await connection.promise().query(
          `SELECT first_name, last_name FROM employee WHERE id = ${managerId}`
        )
        let first = name[0].first_name
        let last = name[0].last_name
        let manager = `${first} ${last}`
        rows[i].manager = manager
        delete rows[i].manager_id
    } else{
        delete rows[i].manager_id
    }  
        title = title[0].title
        rows[i].title = title
        delete rows[i].role_id
    }
    return rows;
  }

}

module.exports = new DB(connection);
