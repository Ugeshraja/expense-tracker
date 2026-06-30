🧾 Expense Tracker

A simple full-stack web application to track daily expenses, built as a learning project for Java Full Stack Development.

This project is intentionally kept beginner-friendly — no authentication, no complex UI, no extra features. Just clean CRUD (Create, Read, Update, Delete) operations using a real-world tech stack.


📚 Tech Stack

LayerTechnologyFrontendReact.js (Functional Components, React Router, Axios)BackendSpring Boot (Java)DatabaseMySQLBuild ToolMavenStylingBootstrap 5 + custom CSSCommunicationREST APIs (JSON)


✨ Features


➕ Add a new expense
📋 View all expenses in a table
✏️ Edit an existing expense
🗑️ Delete an expense
💰 See the total of all expenses


Each expense has: Title, Category, Amount, Date (and an auto-generated ID).


🗂️ Project Structure

expense-tracker/
│
├── expense-tracker-backend/          # Spring Boot backend
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/expensetracker/
│       │   ├── ExpenseTrackerBackendApplication.java
│       │   ├── entity/Expense.java
│       │   ├── repository/ExpenseRepository.java
│       │   ├── service/ExpenseService.java
│       │   └── controller/ExpenseController.java
│       └── resources/application.properties
│
└── expense-tracker-frontend/         # React frontend
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js
        ├── App.css
        ├── index.js
        ├── components/
        │   ├── Navbar.js
        │   ├── Home.js
        │   ├── ExpenseList.js
        │   ├── AddExpense.js
        │   └── EditExpense.js
        └── services/ExpenseService.js


⚙️ Prerequisites

Make sure these are installed before you start:


Java 17+ — java -version
Maven (or use IntelliJ's built-in Maven)
MySQL 8+ — running locally
Node.js 18+ — node -v
An IDE — IntelliJ IDEA (backend) and VS Code (frontend) recommended



🗄️ Database Setup

Open MySQL and run:

sqlCREATE DATABASE expense_tracker;

That's it — you don't need to create the expenses table manually. Spring Boot (via Hibernate's ddl-auto=update setting) creates and updates the table automatically based on the Expense entity.


🚀 Getting Started

1. Backend Setup

bashcd expense-tracker-backend

Open src/main/resources/application.properties and update your MySQL credentials:

propertiesspring.datasource.username=root
spring.datasource.password=your_password

Then run the application:


From IntelliJ: Right-click ExpenseTrackerBackendApplication.java → Run
From terminal:


bash  mvn spring-boot:run

The backend will start at: http://localhost:8080

You should see this in the console:

✅ Expense Tracker Backend is running on http://localhost:8080


2. Frontend Setup

Open a new terminal window (keep the backend running):

bashcd expense-tracker-frontend
npm install
npm start

The frontend will open automatically at: http://localhost:3000


🔌 API Endpoints

MethodEndpointDescriptionGET/api/expensesGet all expensesGET/api/expenses/{id}Get a single expense by IDPOST/api/expensesCreate a new expensePUT/api/expenses/{id}Update an existing expenseDELETE/api/expenses/{id}Delete an expense

Sample Request Body (POST / PUT)

json{
  "title": "Grocery Shopping",
  "category": "Food",
  "amount": 450.00,
  "date": "2026-06-30"
}

You can test these endpoints with Postman before connecting the frontend.


🧪 Testing with Postman


Make sure the backend is running on port 8080
Open Postman and create a new request
Try a GET request to http://localhost:8080/api/expenses — you should get an empty array [] initially
Try a POST request to the same URL with the sample JSON body above (set Body → raw → JSON)
Run the GET request again — you should now see your new expense in the list



🛠️ Troubleshooting

ProblemSolutionCommunications link failureMySQL isn't running, or wrong username/password in application.propertiesUnknown database 'expense_tracker'You forgot to run CREATE DATABASE expense_tracker;React shows "Network Error"Backend isn't running, or it's running on a different portCORS error in browser consoleMake sure backend is on port 8080 and frontend on port 3000 (already configured via @CrossOrigin)Port 8080 already in useStop the other process, or change server.port in application.properties


📖 What You'll Learn From This Project


How to structure a Spring Boot app using layered architecture (Entity → Repository → Service → Controller)
How Spring Data JPA removes the need to write raw SQL
How to build REST APIs and test them with Postman
How React functional components and hooks (useState, useEffect) work
How to use React Router for multi-page navigation
How to connect a React frontend to a Spring Boot backend using Axios



📝 License

This is a personal learning project — free to use, modify, and learn from.
