const express = require("express");
const path = require("path");
const { readEmployees, writeEmployees } = require("./modules/fileHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// DASHBOARD
app.get("/", async (req, res) => {
  try {
    const employees = await readEmployees();

    // Dynamic tax calculation
    const processedEmployees = employees.map(emp => {
      const tax = emp.basicSalary * 0.10;
      const netSalary = emp.basicSalary - tax;
      return { ...emp, tax, netSalary };
    });

    res.render("index", { employees: processedEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
});

// ADD EMPLOYEE
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  try {
    const {
      name,
      profileImage,
      gender,
      department,
      salary,
      day,
      month,
      year,
      notes
    } = req.body;

    // Validation (Must-Have)
    if (!name || !gender || !salary || Number(salary) < 0) {
      return res.status(400).send("Invalid input data");
    }

    const employees = await readEmployees();

    const newEmployee = {
      id: Date.now(),
      name: name.trim(),
      profileImage,
      gender,
      department: Array.isArray(department) ? department : [department],
      basicSalary: Number(salary),
      startDate: `${day}-${month}-${year}`,
      notes: notes || ""
    };

    employees.push(newEmployee);
    await writeEmployees(employees);

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding employee");
  }
});

// EDIT EMPLOYEE via ID
app.get("/edit/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const employees = await readEmployees();
    const employee = employees.find(emp => emp.id === id);

    if (!employee) return res.send("Employee not found");

    res.render("edit", { employee });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading edit page");
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { 
      name, 
      profileImage, 
      gender, 
      department, 
      salary, 
      day, 
      month, 
      year, 
      notes 
    } = req.body;

    if (!name || Number(salary) < 0) {
      return res.status(400).send("Invalid input");
    }

    const employees = await readEmployees();

    const updatedEmployees = employees.map(emp => {
      if (emp.id === id) {
        return {
          ...emp,
          name: name.trim(),
          profileImage,
          gender,
          department: Array.isArray(department) ? department : [department],
          basicSalary: Number(salary),
          startDate: `${day}-${month}-${year}`,
          notes: notes || ""
        };
      }
      return emp;
    });

    await writeEmployees(updatedEmployees);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating employee");
  }
});

// DELETE
app.get("/delete/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const employees = await readEmployees();
    const updatedEmployees = employees.filter(emp => emp.id !== id);

    await writeEmployees(updatedEmployees);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting employee");
  }
});

// START SERVER
async function startServer() {
  const employees = await readEmployees();
  console.log("Employee Data Loaded:");
  console.log(employees);

  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
}

startServer();
