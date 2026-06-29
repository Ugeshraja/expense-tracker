// =====================================================
// EditExpense.js — Edit Existing Expense Form Component
//
// This component:
//   1. Reads the expense ID from the URL (/edit/:id)
//   2. Fetches the existing expense data from backend
//   3. Pre-fills the form with existing values
//   4. Submits updated data via PUT API
//   5. Redirects back to the expense list after saving
//
// React concepts used:
//   useState    → stores form data and UI state
//   useEffect   → fetches expense data when component loads
//   useParams   → reads the :id from the URL
//   useNavigate → redirects programmatically
// =====================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import expenseService from '../services/ExpenseService';

function EditExpense() {

  // -------------------------------------------------------
  // useParams — reads URL parameters
  //
  // If the URL is /edit/5, then:
  //   const { id } = useParams() → id = "5"
  // -------------------------------------------------------
  const { id } = useParams();

  const navigate = useNavigate();


  // -------------------------------------------------------
  // STATE VARIABLES
  // -------------------------------------------------------

  // Stores the form field values
  const [expense, setExpense] = useState({
    title: '',
    category: '',
    amount: '',
    date: ''
  });

  const [loading, setLoading] = useState(true);   // Loading the existing expense
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [submitting, setSubmitting] = useState(false);


  // -------------------------------------------------------
  // LOAD EXISTING EXPENSE DATA ON COMPONENT MOUNT
  //
  // When this page loads, we fetch the expense with the
  // given ID and pre-fill the form with its current values.
  // -------------------------------------------------------
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        // Fetch the expense by ID from the backend
        const response = await expenseService.getExpenseById(id);
        const data = response.data;

        // Pre-fill the form with existing values
        setExpense({
          title: data.title,
          category: data.category,
          amount: data.amount,
          date: data.date
          // Note: LocalDate from Java comes as "YYYY-MM-DD" string
          // which works perfectly with HTML <input type="date">
        });

      } catch (error) {
        setMessage('Failed to load expense. It may not exist.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]); // Re-run if the ID in the URL changes


  // -------------------------------------------------------
  // HANDLE INPUT CHANGES (same pattern as AddExpense)
  // -------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };


  // -------------------------------------------------------
  // HANDLE FORM SUBMIT — UPDATE the expense
  // -------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!expense.title || !expense.category || !expense.amount || !expense.date) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }

    if (parseFloat(expense.amount) <= 0) {
      setMessage('Amount must be greater than 0.');
      setMessageType('error');
      return;
    }

    try {
      setSubmitting(true);

      // Send PUT request to update the expense
      // This calls: PUT http://localhost:8080/api/expenses/{id}
      await expenseService.updateExpense(id, expense);

      setMessage('Expense updated successfully!');
      setMessageType('success');

      // Redirect to expense list after 1 second
      setTimeout(() => {
        navigate('/expenses');
      }, 1000);

    } catch (error) {
      setMessage('Failed to update expense. Please try again.');
      setMessageType('error');
      setSubmitting(false);
    }
  };


  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  // While loading the existing expense data, show a spinner
  if (loading) {
    return (
      <div className="page-container">
        <div className="card empty-state">
          <p>⏳ Loading expense data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Page Title */}
      <h2 className="page-title">Edit Expense</h2>

      {/* Message Box */}
      {message && (
        <div className={`alert-box ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      {/* Edit Form — same structure as AddExpense but pre-filled */}
      <div className="card">
        <form onSubmit={handleSubmit}>

          {/* Title Field */}
          <div className="mb-3">
            <label className="form-label">Expense Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={expense.title}
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
            />
          </div>

          {/* Category Dropdown */}
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
              step="0.01"
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
              className="btn btn-success"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : '✅ Update Expense'}
            </button>

            <Link to="/expenses" className="btn btn-secondary">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditExpense;
