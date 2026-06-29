// =====================================================
// ExpenseList.js — View All Expenses Component
//
// This component:
//   1. Fetches all expenses from the backend on load
//   2. Displays them in a table
//   3. Provides Edit and Delete buttons for each row
//   4. Shows the total amount at the bottom
//
// React Hooks used:
//   useState  → stores data (like variables that trigger re-render)
//   useEffect → runs code when component loads (like calling the API)
// =====================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import expenseService from '../services/ExpenseService';

function ExpenseList() {

  // -------------------------------------------------------
  // STATE VARIABLES
  //
  // useState(initialValue) returns [value, setValue]
  // When setValue is called, React re-renders the component
  // -------------------------------------------------------

  // Holds the array of all expenses from the backend
  const [expenses, setExpenses] = useState([]);

  // Shows a loading message while data is being fetched
  const [loading, setLoading] = useState(true);

  // Holds error or success messages to show the user
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // useNavigate lets us redirect to another page programmatically
  const navigate = useNavigate();


  // -------------------------------------------------------
  // useEffect — Runs once when the component first loads
  //
  // The empty array [] means: "only run this once,
  // when the component mounts (appears on screen)"
  //
  // This is where we fetch data from the backend.
  // -------------------------------------------------------
  useEffect(() => {
    fetchExpenses();
  }, []); // <- empty dependency array = run once on mount


  // -------------------------------------------------------
  // FETCH ALL EXPENSES FROM BACKEND
  // -------------------------------------------------------
  const fetchExpenses = async () => {
    try {
      setLoading(true); // Show loading state

      // Call our service which calls axios.get('/api/expenses')
      const response = await expenseService.getAllExpenses();

      // response.data contains the array of expenses from Spring Boot
      setExpenses(response.data);

    } catch (error) {
      // If something went wrong (network error, server down, etc.)
      setMessage('Failed to load expenses. Is the backend running?');
      setMessageType('error');
    } finally {
      setLoading(false); // Hide loading state regardless of success/failure
    }
  };


  // -------------------------------------------------------
  // DELETE AN EXPENSE
  // Called when Delete button is clicked
  // -------------------------------------------------------
  const handleDelete = async (id) => {
    // Confirm before deleting — basic UX safety check
    const confirmed = window.confirm('Are you sure you want to delete this expense?');

    if (!confirmed) return; // User cancelled, do nothing

    try {
      // Call delete API
      await expenseService.deleteExpense(id);

      // Show success message
      setMessage('Expense deleted successfully!');
      setMessageType('success');

      // Refresh the list by fetching again
      fetchExpenses();

    } catch (error) {
      setMessage('Failed to delete expense. Please try again.');
      setMessageType('error');
    }
  };


  // -------------------------------------------------------
  // NAVIGATE TO EDIT PAGE
  // Passes the expense ID in the URL
  // -------------------------------------------------------
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
    // This takes the user to: /edit/1 (or whatever the ID is)
  };


  // -------------------------------------------------------
  // CALCULATE TOTAL AMOUNT
  // Adds up all expense amounts for the total row
  // -------------------------------------------------------
  const calculateTotal = () => {
    return expenses
      .reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0)
      .toFixed(2); // Round to 2 decimal places
  };


  // -------------------------------------------------------
  // RENDER — What the component displays on screen
  // -------------------------------------------------------
  return (
    <div className="page-container">

      {/* Page Title */}
      <h2 className="page-title">All Expenses</h2>

      {/* Message Box — shows success or error alerts */}
      {message && (
        <div className={`alert-box ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="card empty-state">
          <p>⏳ Loading expenses...</p>
        </div>

      ) : expenses.length === 0 ? (
        /* Empty State — no expenses in database yet */
        <div className="card empty-state">
          <p>📭 No expenses found.</p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>
            Click "+ Add Expense" in the navbar to add your first expense.
          </p>
        </div>

      ) : (
        /* Expense Table */
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table className="expense-table">

            {/* Table Header */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Amount (₹)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body — one row per expense */}
            <tbody>
              {expenses.map((expense, index) => (
                // key={expense.id} is required by React for list items
                // It helps React track which items changed
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.title}</td>
                  <td>
                    <span className="category-badge">{expense.category}</span>
                  </td>
                  <td>
                    <span className="amount-text">₹{parseFloat(expense.amount).toFixed(2)}</span>
                  </td>
                  <td>{expense.date}</td>
                  <td>
                    {/* Edit Button */}
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(expense.id)}
                    >
                      ✏️ Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(expense.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Total Row */}
            <tfoot>
              <tr className="total-row">
                <td colSpan="3" style={{ textAlign: 'right', paddingRight: '16px' }}>
                  Total:
                </td>
                <td colSpan="3">
                  <span className="amount-text">₹{calculateTotal()}</span>
                  <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '8px' }}>
                    ({expenses.length} expense{expenses.length !== 1 ? 's' : ''})
                  </span>
                </td>
              </tr>
            </tfoot>

          </table>
        </div>
      )}

    </div>
  );
}

export default ExpenseList;
