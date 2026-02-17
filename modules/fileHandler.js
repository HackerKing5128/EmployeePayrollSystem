const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "..", "employees.json");

// Read employees
async function readEmployees() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error.message);
    return []; // prevent crash
  }
}

// Write employees
async function writeEmployees(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", error.message);
  }
}

module.exports = {
  readEmployees,
  writeEmployees,
};
