# 12 SQL: Employee Tracker
Repository link: https://github.com/AaronVenema/employeeTracker
## Table of Contents
* [Demo](#Demo)

* [Description](#Description)

* [Installation](#Installation)

* [Acceptance Criteria](#Acceptance-Criteria)

### Demo
![gif](https://github.com/AaronVenema/employeeTracker/blob/main/demo/demoGif.gif)

### Description
employeeTracker is an mysql2 application that can help the user stay organized when managing departments, roles, and employees. It features the ability to add departments, roles, employees. It features the ability to view departments, roles, employees. It features the ability to update roles. 

### Installation
Node, inquirer, mysql2, sequilize, console.table,asciiart-logo. 


### Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

