// =====================================================
// Home.js — Home Page Component
//
// This is the landing page of our app.
// It gives a simple welcome message and quick links
// to add expenses or view the expense list.
// =====================================================

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container">

      {/* Welcome Card */}
      <div className="card text-center" style={{ padding: '50px 30px' }}>

        {/* Icon */}
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🧾</div>

        {/* Heading */}
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#2c3e50', marginBottom: '12px' }}>
          Expense Tracker
        </h1>

        {/* Subtitle */}
        <p style={{ color: '#666', fontSize: '1rem', maxWidth: '400px', margin: '0 auto 30px' }}>
          A simple app to track your daily expenses. Add, view, edit, and delete your expenses easily.
        </p>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>

          {/* Link styled as a primary button */}
          <Link to="/add" className="btn btn-primary">
            + Add New Expense
          </Link>

          {/* Link styled as an outline button */}
          <Link to="/expenses" className="btn btn-outline-primary">
            View All Expenses
          </Link>

        </div>
      </div>

      {/* Info Cards Row */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>

        <div className="card" style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2rem' }}>➕</div>
          <h5 style={{ marginTop: '10px', color: '#0d6efd' }}>Add Expense</h5>
          <p style={{ color: '#888', fontSize: '0.88rem' }}>
            Log a new expense with title, category, amount, and date.
          </p>
        </div>

        <div className="card" style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2rem' }}>📋</div>
          <h5 style={{ marginTop: '10px', color: '#0d6efd' }}>View Expenses</h5>
          <p style={{ color: '#888', fontSize: '0.88rem' }}>
            See all your recorded expenses in a clean list.
          </p>
        </div>

        <div className="card" style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2rem' }}>✏️</div>
          <h5 style={{ marginTop: '10px', color: '#0d6efd' }}>Edit & Delete</h5>
          <p style={{ color: '#888', fontSize: '0.88rem' }}>
            Update or remove any expense whenever needed.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;
