const express = require("express");
const path = require("path");
const { readEmployees } = require("./modules/fileHandler");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Test Route
// app.get("/", (req, res) => {
//   res.send("Server Running Successfully");
// });

app.get("/", async (req, res) => {
    const employees = await readEmployees();

    const updatedEmployees = employees.map(emp => {
        const tax = emp.basicSalary * 0.12;
        const netSalary = emp.basicSalary - tax;

        return {
            ...emp,
            tax,
            netSalary
        };
    });

    res.render("index", { employees: updatedEmployees });
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
