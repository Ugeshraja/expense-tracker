// =====================================================
// AddExpense.js — Add New Expense Form Component
//
// This component:
//   1. Shows a form with input fields for expense data
//   2. Handles form input changes using useState
//   3. Submits the form data to the backend via POST API
//   4. Redirects to the expense list after saving
//
// React concepts used:
//   useState   → stores form field values
//   useNavigate → redirects to another page after submit
// =====================================================

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import expenseService from '../services/ExpenseService';

function AddExpense() {

  // -------------------------------------------------------
  // FORM STATE
  //
  // We store all form field values in a single object.
  // This is a common pattern: one state object for all fields.
  // -------------------------------------------------------
  const [expense, setExpense] = useState({
    title: '',      // Expense name e.g. "Groceries"
    category: '',   // e.g. "Food"
    amount: '',     // e.g. 250.00
    date: ''        // e.g. 2024-01-15
  });

  // Holds error or success messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Prevents double-clicking submit
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();


  // -------------------------------------------------------
  // HANDLE INPUT CHANGE
  //
  // This single function handles ALL input field changes.
  // When a user types in any field, this function runs.
  //
  // e.target.name  = the 'name' attribute of the input field
  // e.target.value = what the user typed
  //
  // Spread operator (...expense) copies all existing fields,
  // then we override just the changed field using [name]: value
  // -------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
    // Example: if user types in "title" field:
    // setExpense({ ...expense, title: "Groceries" })
  };


  // -------------------------------------------------------
  // HANDLE FORM SUBMIT
  //
  // Runs when the user clicks the "Save Expense" button.
  // Steps:
  //   1. Prevent default browser form submit
  //   2. Basic validation
  //   3. Send data to backend via POST request
  //   4. Redirect to expense list on success
  // -------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop browser from refreshing the page

    // Basic Validation — check all fields are filled
    if (!expense.title || !expense.category || !expense.amount || !expense.date) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return; // Stop here, don't submit
    }

    // Amount must be a positive number
    if (parseFloat(expense.amount) <= 0) {
      setMessage('Amount must be greater than 0.');
      setMessageType('error');
      return;
    }

    try {
      setSubmitting(true); // Disable the button while submitting

      // Send the expense data to the backend
      // This calls: POST http://localhost:8080/api/expenses
      await expenseService.createExpense(expense);

      // Show success message briefly
      setMessage('Expense added successfully!');
      setMessageType('success');

      // Wait 1 second, then redirect to All Expenses page
      setTimeout(() => {
        navigate('/expenses');
      }, 1000);

    } catch (error) {
      setMessage('Failed to add expense. Please try again.');
      setMessageType('error');
      setSubmitting(false);
    }
  };


  // -------------------------------------------------------
  // RENDER — Form UI
  // -------------------------------------------------------
  return (
    <div className="page-container">

      {/* Page Title */}
      <h2 className="page-title">Add New Expense</h2>

      {/* Message Box */}
      {message && (
        <div className={`alert-box ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      {/* Form Card */}
      <div className="card">
        <form onSubmit={handleSubmit}>

          {/* Title Field */}
          <div className="mb-3">
            <label className="form-label">Expense Title</label>
            <input
              type="text"
              className="form-control"
              name="title"           // Must match the key in our state object
              value={expense.title}  // Controlled input — value from state
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
            />
          </div>

          {/* Category Field — Dropdown */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              name="category"
              value={expense.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount Field */}
          <div className="mb-3">
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="e.g. 250.00"
              min="0.01"
              step="0.01" // Allows decimal values
            />
          </div>

          {/* Date Field */}
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting} // Disable while submitting
            >
              {submitting ? 'Saving...' : '💾 Save Expense'}
            </button>

            {/* Cancel goes back to expense list */}
            <Link to="/expenses" className="btn btn-secondary">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddExpense;
