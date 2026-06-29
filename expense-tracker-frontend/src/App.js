// =====================================================
// App.js — Root Component
//
// This is the main component that:
//   1. Wraps the entire app in a Router (for navigation)
//   2. Renders the Navbar at the top of every page
//   3. Sets up Routes — which component shows for which URL
//
// React Router v6 Concepts:
//   <BrowserRouter> → Enables URL-based navigation in the app
//   <Routes>        → Container for all route definitions
//   <Route>         → Maps a URL path to a component
//   path="/"        → Home page URL
//   path="/expenses"→ Expense list URL
//   path="/add"     → Add expense form URL
//   path="/edit/:id"→ Edit form URL (:id is dynamic — e.g. /edit/3)
// =====================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all our components
import Navbar from './components/Navbar';
import Home from './components/Home';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';

// Import global styles
import './App.css';

function App() {
  return (
    // BrowserRouter enables navigation without full page reloads
    <Router>

      {/* Navbar is outside Routes so it shows on EVERY page */}
      <Navbar />

      {/* Routes defines which component to show for each URL */}
      <Routes>

        {/* "/" = Home page */}
        <Route path="/" element={<Home />} />

        {/* "/expenses" = Expense list page */}
        <Route path="/expenses" element={<ExpenseList />} />

        {/* "/add" = Add expense form */}
        <Route path="/add" element={<AddExpense />} />

        {/* "/edit/:id" = Edit form
            :id is a URL parameter — it changes per expense
            e.g. /edit/1, /edit/2, /edit/5
            The EditExpense component reads this :id via useParams() */}
        <Route path="/edit/:id" element={<EditExpense />} />

      </Routes>

    </Router>
  );
}

export default App;
