const express = require("express");
const path = require("path");
const { readEmployees, writeEmployees } = require('./modules/fileHandler');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
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

        if (!name || !profileImage || !gender || !salary || !day || !month || !year) {
            return res.status(400).send("All required fields must be filled");
        }

        const employees = await readEmployees();

        const newEmployee = {
            id: Date.now(),
            name: name.trim(),
            profileImage,
            gender,
            department: Array.isArray(department) ? department : [department],
            salary: Number(salary),
            startDate: `${day}-${month}-${year}`,
            notes: notes || ""
        };

        employees.push(newEmployee);

        await writeEmployees(employees);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
