const inquirer = require("inquirer");
const queries = require("./queries");
require("dotenv").config();


const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Employee Role",
    ],
  });

  switch (action) {
    case "View All Departments":
      const departments = await queries.getAllDepartments();
      console.table(departments);
      break;

    case "View All Roles":
      const roles = await queries.getAllRoles();
      console.table(roles);
      break;

    case "View All Employees":
      const employees = await queries.getAllEmployees();
      console.table(employees);
      break;

    case "Add a Department":
      const { departmentName } = await inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "Enter the department name:",
      });
      await queries.addDepartment(departmentName);
      console.log("Department added.");
      break;

    case "Add a Role":
      const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Enter the role title:",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Enter the role salary:",
        },
        {
          type: "input",
          name: "departmentId",
          message: "Enter the department ID for this role:",
        },
      ]);
      await queries.addRole(roleTitle, roleSalary, departmentId);
      console.log("Role added.");
      break;

    case "Add an Employee":
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name:",
        },
        {
          type: "input",
          name: "roleId",
          message: "Enter the role ID for this employee:",
        },
        {
          type: "input",
          name: "managerId",
          message:
            "Enter the manager ID for this employee (leave blank if none):",
          default: null,
        },
      ]);
      await queries.addEmployee(firstName, lastName, roleId, managerId);
      console.log("Employee added.");
      break;

    case "Update Employee Role":
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: "input",
          name: "employeeId",
          message: "Enter the employee ID to update:",
        },
        {
          type: "input",
          name: "newRoleId",
          message: "Enter the new role ID for this employee:",
        },
      ]);
      await queries.updateEmployeeRole(employeeId, newRoleId);
      console.log("Employee role updated.");
      break;
  }

  mainMenu(); // Return to main menu after action
};

mainMenu();
