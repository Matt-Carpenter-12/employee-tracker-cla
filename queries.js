
const { Pool } = require("pg");
const pool = new Pool();

// Get all departments
const getAllDepartments = async () => {
  const result = await pool.query("SELECT * FROM department");
  return result.rows;
};

// Get all roles
const getAllRoles = async () => {
  const result = await pool.query(
    `SELECT role.id, title, salary, department.name AS department 
     FROM role 
     JOIN department ON role.department_id = department.id`
  );
  return result.rows;
};

// Get all employees
const getAllEmployees = async () => {
  const result = await pool.query(
    `SELECT employee.id, first_name, last_name, role.title AS role, department.name AS department, salary, 
            manager.first_name AS manager
     FROM employee
     JOIN role ON employee.role_id = role.id
     JOIN department ON role.department_id = department.id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
  );
  return result.rows;
};

// Add a department
const addDepartment = async (name) => {
  const result = await pool.query(
    "INSERT INTO department (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

// Add a role
const addRole = async (title, salary, departmentId) => {
  const result = await pool.query(
    "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *",
    [title, salary, departmentId]
  );
  return result.rows[0];
};

// Add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
  const result = await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, roleId, managerId]
  );
  return result.rows[0];
};

// Update an employee's role
const updateEmployeeRole = async (employeeId, newRoleId) => {
  const result = await pool.query(
    "UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *",
    [newRoleId, employeeId]
  );
  return result.rows[0];
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
