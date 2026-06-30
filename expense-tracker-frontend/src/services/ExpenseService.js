// =====================================================
// ExpenseService.js — API Communication Layer
//
// What is this file?
//   This file contains ALL the Axios calls to our
//   Spring Boot backend. Think of it as the "bridge"
//   between React and the backend.
//
// Why a separate file?
//   Instead of writing Axios calls inside each component,
//   we centralize them here. This way:
//   - Easy to find and change API URLs
//   - Components stay clean and focused on UI
//   - Reusable across multiple components
//
// Axios is a library that makes HTTP requests from React.
// It's like fetch() but simpler and with more features.
// =====================================================

import axios from 'axios';

// BASE_URL is the root address of our Spring Boot backend.
// All API calls will be prefixed with this URL.
// React runs on :3000, Backend runs on :8080
const BASE_URL = 'https://expense-tracker-hi05.onrender.com/api/expenses';

// -------------------------------------------------------
// We create an "expenseService" object that holds
// all our API functions. Export it so components can use it.
// -------------------------------------------------------
const expenseService = {

  // ---------------------------------------------------
  // 1. GET ALL EXPENSES
  // Sends: GET http://localhost:8080/api/expenses
  // Returns: Array of all expense objects
  // ---------------------------------------------------
  getAllExpenses: () => {
    return axios.get(BASE_URL);
    // axios.get() returns a Promise
    // The actual data is in response.data (used in components)
  },

  // ---------------------------------------------------
  // 2. GET ONE EXPENSE BY ID
  // Sends: GET http://localhost:8080/api/expenses/1
  // Returns: A single expense object
  // ---------------------------------------------------
  getExpenseById: (id) => {
    return axios.get(`${BASE_URL}/${id}`);
    // Template literal: ${BASE_URL}/${id} = "http://localhost:8080/api/expenses/1"
  },

  // ---------------------------------------------------
  // 3. CREATE A NEW EXPENSE
  // Sends: POST http://localhost:8080/api/expenses
  // Body: the expense object (title, category, amount, date)
  // Returns: The saved expense with its auto-generated ID
  // ---------------------------------------------------
  createExpense: (expense) => {
    return axios.post(BASE_URL, expense);
    // axios.post(url, data) sends data as JSON in the request body
  },

  // ---------------------------------------------------
  // 4. UPDATE AN EXISTING EXPENSE
  // Sends: PUT http://localhost:8080/api/expenses/1
  // Body: the updated expense object
  // Returns: The updated expense object
  // ---------------------------------------------------
  updateExpense: (id, expense) => {
    return axios.put(`${BASE_URL}/${id}`, expense);
  },

  // ---------------------------------------------------
  // 5. DELETE AN EXPENSE
  // Sends: DELETE http://localhost:8080/api/expenses/1
  // Returns: Success message string
  // ---------------------------------------------------
  deleteExpense: (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }

};

export default expenseService;
