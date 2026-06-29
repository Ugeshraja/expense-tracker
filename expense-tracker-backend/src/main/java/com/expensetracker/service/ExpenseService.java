package com.expensetracker.service;

// =====================================================
// EXPENSE SERVICE
//
// What is a Service?
//   The Service layer contains the BUSINESS LOGIC of
//   your application. It sits between the Controller
//   (which handles HTTP requests) and the Repository
//   (which talks to the database).
//
// Why do we need a Service layer?
//   - To keep business rules separate from HTTP logic
//   - Controller should only handle requests/responses
//   - Repository should only handle database queries
//   - Service handles everything in between
//
// Flow of a request:
//   React → Controller → Service → Repository → MySQL
//   MySQL → Repository → Service → Controller → React
// =====================================================

import com.expensetracker.entity.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// @Service marks this class as a Spring Service component.
// Spring will manage this class automatically (create it, inject it, etc.)
@Service
public class ExpenseService {

    // -------------------------------------------------------
    // DEPENDENCY INJECTION
    //
    // We need the ExpenseRepository to talk to the database.
    // @Autowired tells Spring: "Please inject/provide an instance
    // of ExpenseRepository here automatically."
    //
    // You don't need to write: new ExpenseRepository()
    // Spring handles object creation for you!
    // -------------------------------------------------------
    @Autowired
    private ExpenseRepository expenseRepository;


    // -------------------------------------------------------
    // METHOD 1: GET ALL EXPENSES
    //
    // Returns a list of ALL expenses from the database.
    // Calls expenseRepository.findAll() which runs:
    //   SELECT * FROM expenses;
    // -------------------------------------------------------
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }


    // -------------------------------------------------------
    // METHOD 2: GET EXPENSE BY ID
    //
    // Returns one expense based on its ID.
    // Optional<Expense> means the result might or might not exist.
    // If no expense with that ID exists, it returns empty.
    //
    // Runs: SELECT * FROM expenses WHERE id = ?
    // -------------------------------------------------------
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }


    // -------------------------------------------------------
    // METHOD 3: CREATE EXPENSE (Save new expense)
    //
    // Saves a new expense to the database.
    // expenseRepository.save() decides:
    //   - If id is null → INSERT (create new row)
    //   - If id exists  → UPDATE (update existing row)
    //
    // Here we use it for INSERT (creating a new expense)
    // -------------------------------------------------------
    public Expense createExpense(Expense expense) {
        // Simply save the expense object to the database
        // JPA automatically generates the SQL INSERT statement
        return expenseRepository.save(expense);
    }


    // -------------------------------------------------------
    // METHOD 4: UPDATE EXPENSE
    //
    // Updates an existing expense in the database.
    // Steps:
    //   1. Check if expense with given ID exists
    //   2. If yes → update its fields and save
    //   3. If no  → return null (Controller will handle this)
    // -------------------------------------------------------
    public Expense updateExpense(Long id, Expense updatedExpense) {

        // Step 1: Try to find the existing expense in the database
        Optional<Expense> existingExpenseOptional = expenseRepository.findById(id);

        // Step 2: Check if an expense with that ID was found
        if (existingExpenseOptional.isPresent()) {

            // Get the actual Expense object from Optional wrapper
            Expense existingExpense = existingExpenseOptional.get();

            // Step 3: Update each field with the new values
            // We keep the same ID, just update the other fields
            existingExpense.setTitle(updatedExpense.getTitle());
            existingExpense.setCategory(updatedExpense.getCategory());
            existingExpense.setAmount(updatedExpense.getAmount());
            existingExpense.setDate(updatedExpense.getDate());

            // Step 4: Save the updated expense back to the database
            // Since the ID already exists, JPA runs an UPDATE statement
            return expenseRepository.save(existingExpense);

        } else {
            // Expense with that ID was not found
            return null;
        }
    }


    // -------------------------------------------------------
    // METHOD 5: DELETE EXPENSE
    //
    // Deletes an expense from the database by its ID.
    // Returns true if deleted successfully, false if not found.
    //
    // Runs: DELETE FROM expenses WHERE id = ?
    // -------------------------------------------------------
    public boolean deleteExpense(Long id) {

        // First check if the expense exists
        if (expenseRepository.existsById(id)) {

            // If it exists, delete it
            expenseRepository.deleteById(id);
            return true; // Deletion was successful

        } else {
            return false; // Expense not found
        }
    }
}
