
<div align="center" style="background:mintcream; border-radius: 15px; border: 1px solid #ddd; color:black;">
    <svg width="180" height="80" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 60V190H220V165H135V135H200V110H135V85H220V60H100Z" fill="#1A365D"/>
      <path d="M230 60H300M230 85H300M290 60C290 60 305 125 240 125M255 125L300 190" stroke="#38B2AC" stroke-width="22" stroke-linecap="square"/>
      <text x="200" y="235" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" letter-spacing="1" fill="#1A365D">
        EMPLOYEE <tspan fill="#38B2AC">PAYROLL</tspan>
      </text>
    </svg>
</div>

---
# 💼 Employee Payroll System (EPS)

BridgeLabz Full Stack Backend Mini Project built using **Node.js, Express, and EJS**.

The **Employee Payroll System (EPS)** is a server-side web application designed to manage employee records and perform payroll calculations dynamically. It allows users to add, edit, delete, and view employee details with automatic tax and net salary computation.

---

## 🎯 Project Objective

Build a server-side web application to:
- Manage employee records
- Calculate monthly payroll
- Store data using JSON file persistence
- Use modular architecture for file operations

---

## ✨ Features

### 📊 Dashboard
- Displays all employees in a clean table UI
- Shows:
  - Profile image
  - Name
  - Gender
  - Department(s)
  - Net Salary — calculated dynamically
  - Start Date
- Includes search functionality

---

### ➕ Add Employee
- Employee payroll form with:
  - Name
  - Profile image
  - Gender
  - Department (multiple selection)
  - Basic Salary
  - Start Date
  - Notes
- Automatic unique ID generation using `Date.now()`

---

### ✏️ Edit Employee
- Update employee details
- Pre-filled form with existing data
- Salary recalculation after update

---

### 🗑 Delete Employee
- Remove employee from system
- Confirmation prompt before deletion

---

### 💾 Data Persistence
- Employee data stored in `employees.json`
- Uses custom file handler module with `fs.promises`

---

## 🧠 Technical Highlights

- Dynamic payroll calculation (Tax & Net Salary)
- Modular architecture (`fileHandler.js`)
- MVC-inspired structure
- Input validation & redirection
- Static file serving via Express
- EJS templating for server-side rendering

---

## 🛠 Tech Stack

| Technology | Usage |
|-----------|------|
| Node.js | Backend runtime |
| Express.js | Server & routing |
| EJS | Server-side templating |
| CSS | UI styling |
| JSON | Data storage |
| Nodemon | Development auto-reload |

---

## 📁 Project Structure
```
hackerking5128-employeepayrollsystem/
│
├── modules/
│ └── fileHandler.js # File read/write logic
│
├── public/
│ ├── add.css # Add/Edit form styling
│ └── dashboard.css # Dashboard styling
│
├── views/
│ ├── index.ejs # Dashboard
│ ├── add.ejs # Registration form
│ └── edit.ejs # Update form
│
├── employees.json # Data storage
├── server.js # Main server entry
├── package.json
└── README.md
```

---
## 👥 Team Members

- 👨‍💻 Nakul Saini (Team Lead) : [Github 🔗](https://github.com/HackerKing5128/)
 
- 👨‍💻 Nitin Rathor : [Github 🔗](https://github.com/NIKEIRONMAN/)

- 👨‍💻 Brajdeep Singh : [Github 🔗](https://github.com/BrajdeepSingh8172/)

- 👨‍💻 Ashutosh Patel : [Github 🔗](https://github.com/ashutosh123patel/)

---
## 🎓 Academic Note

This project was developed as part of the BridgeLabz Full Stack Backend curriculum, focusing on:

- Node.js backend fundamentals
- File-based data persistence
- Server-side rendering using EJS
- CRUD operations
- Collaborative Git workflow

---
