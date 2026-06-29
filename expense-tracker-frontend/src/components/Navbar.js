// =====================================================
// Navbar.js — Navigation Bar Component
//
// This component renders the top navigation bar.
// It uses React Router's <Link> for navigation
// so the page doesn't fully reload when clicking links.
// =====================================================

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  // useLocation() tells us the current URL path
  // We use it to highlight the active nav link
  const location = useLocation();

  return (
    // Bootstrap navbar classes handle the layout and styling
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        {/* Brand / Logo — clicking takes you to Home */}
        <Link className="navbar-brand" to="/">
          🧾 Expense Tracker
        </Link>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            {/* Home Link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>

            {/* View All Expenses Link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/expenses' ? 'active fw-bold' : ''}`}
                to="/expenses"
              >
                All Expenses
              </Link>
            </li>

            {/* Add Expense Link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/add' ? 'active fw-bold' : ''}`}
                to="/add"
              >
                + Add Expense
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
