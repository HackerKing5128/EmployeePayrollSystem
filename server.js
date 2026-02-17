const express = require("express");
const path = require("path");
const { readEmployees } = require("./modules/fileHandler");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
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
