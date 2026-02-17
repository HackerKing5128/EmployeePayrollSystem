const express = require("express");
const path = require("path");
const { readEmployees, writeEmployees } = require('./modules/fileHandler');


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Dashboard - Display all employees
app.get("/", async (req, res) => {
  try {
    const employees = await readEmployees();
    res.render("index", { employees });
  } catch (err) {
    console.log(err);
    res.send("Error loading dashboard");
  }
});

// Show Add Employee Form
app.get("/add", (req, res) => {
  res.render("add");
});

// Add New Employee
app.post("/add", async (req, res) => {
  try {
    const { name, gender, department, basicSalary } = req.body;
    const employees = await readEmployees();
    
    const newEmployee = {
      id: Date.now(),
      name,
      gender,
      department: [department],
      basicSalary: Number(basicSalary),
      tax: Number(basicSalary) * 0.12,
      netSalary: Number(basicSalary) * 0.88
    };
    
    employees.push(newEmployee);
    await writeEmployees(employees);
    
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error adding employee");
  }
});

// Load Edit Page
app.get("/edit/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const employees = await readEmployees();
    
    const employee = employees.find(emp => emp.id === id);
    
    if (!employee) {
      return res.send("Employee not found");
    }
    
    res.render("edit", { employee });
  } catch (err) {
    console.log(err);
    res.send("Error loading edit page");
  }
});

// Update Employee
app.post("/edit/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, gender, department, basicSalary } = req.body;
    
    const employees = await readEmployees();
    
    const updatedEmployees = employees.map(emp => {
      if (emp.id === id) {
        return {
          ...emp,
          name,
          gender,
          department: [department],
          basicSalary: Number(basicSalary),
          tax: Number(basicSalary) * 0.12,
          netSalary: Number(basicSalary) * 0.88
        };
      }
      return emp;
    });
    
    await writeEmployees(updatedEmployees);
    
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error updating employee");
  }
});

// Delete Employee
app.get("/delete/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const employees = await readEmployees();
    
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    
    await writeEmployees(updatedEmployees);
    
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error deleting employee");
  }
});

// Log employee data on server start
async function startServer() {
  const employees = await readEmployees();
  console.log("Employee Data Loaded:");
  console.log(employees);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

