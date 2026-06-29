package com.expensetracker.repository;

// =====================================================
// EXPENSE REPOSITORY
//
// What is a Repository?
//   A Repository is the layer that directly talks to
//   the database. It contains all the database operations
//   like: findAll, findById, save, delete, etc.
//
// The AMAZING thing about Spring Data JPA:
//   You just extend JpaRepository and you get ALL these
//   methods for FREE — no SQL needed!
//
//   JpaRepository gives you:
//   ✅ save(expense)       → INSERT or UPDATE
//   ✅ findById(id)        → SELECT WHERE id = ?
//   ✅ findAll()           → SELECT * FROM expenses
//   ✅ deleteById(id)      → DELETE WHERE id = ?
//   ✅ existsById(id)      → Check if record exists
//   ✅ count()             → Count total records
//   ... and more!
// =====================================================

import com.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// @Repository marks this as a Spring-managed Repository component.
// Spring will automatically create an implementation of this interface.
// You don't need to write any implementation class!
@Repository

// JpaRepository<Expense, Long>
//   - Expense = the Entity this repository manages
//   - Long    = the data type of the Primary Key (our 'id' field)
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // -------------------------------------------------------
    // That's it! No code needed inside the interface body.
    //
    // Spring Data JPA automatically provides all basic CRUD
    // operations just by extending JpaRepository.
    //
    // If you need custom queries later, you can add them here.
    // For example:
    //
    //   List<Expense> findByCategory(String category);
    //   → Spring automatically translates this to:
    //   → SELECT * FROM expenses WHERE category = ?
    //
    // But for our basic app, the inherited methods are enough!
    // -------------------------------------------------------
}
