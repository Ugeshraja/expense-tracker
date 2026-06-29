package com.expensetracker.controller;

// =====================================================
// EXPENSE CONTROLLER
//
// What is a Controller?
//   The Controller is the FRONT DOOR of your backend.
//   It receives HTTP requests from React (via Axios),
//   calls the Service layer to do the work, and sends
//   back an HTTP response.
//
// REST API Endpoints we are creating:
//   GET    /api/expenses         → Get all expenses
//   GET    /api/expenses/{id}    → Get one expense by ID
//   POST   /api/expenses         → Create a new expense
//   PUT    /api/expenses/{id}    → Update an expense
//   DELETE /api/expenses/{id}    → Delete an expense
//
// HTTP Methods explained:
//   GET    = Read data      (no body needed)
//   POST   = Create data    (send data in body)
//   PUT    = Update data    (send updated data in body)
//   DELETE = Delete data    (no body needed)
// =====================================================

import com.expensetracker.entity.Expense;
import com.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @RestController = @Controller + @ResponseBody
// Tells Spring: "This class handles REST API requests"
// All methods will automatically return JSON responses
@RestController

// @RequestMapping sets the base URL for all endpoints in this class
// All URLs in this controller will start with /api/expenses
@RequestMapping("/api/expenses")

// @CrossOrigin allows React (running on port 3000) to communicate
// with our backend (running on port 8080).
// Without this, the browser blocks requests between different ports.
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    // Inject the ExpenseService so we can call its methods
    @Autowired
    private ExpenseService expenseService;


    // -------------------------------------------------------
    // API 1: GET ALL EXPENSES
    // URL:    GET http://localhost:8080/api/expenses
    //
    // ResponseEntity<T> is a wrapper that lets us control:
    //   - The response body (what data to send)
    //   - The HTTP status code (200 OK, 404 Not Found, etc.)
    // -------------------------------------------------------
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {

        // Ask service layer to get all expenses from DB
        List<Expense> expenses = expenseService.getAllExpenses();

        // Return the list with HTTP 200 OK status
        // HttpStatus.OK = 200 (standard "success" response)
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }


    // -------------------------------------------------------
    // API 2: GET EXPENSE BY ID
    // URL:    GET http://localhost:8080/api/expenses/1
    //
    // @PathVariable extracts the {id} value from the URL
    // Example: /api/expenses/5 → id = 5
    // -------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {

        // Ask service to find the expense by ID
        Optional<Expense> expense = expenseService.getExpenseById(id);

        if (expense.isPresent()) {
            // Found it! Return it with 200 OK
            return new ResponseEntity<>(expense.get(), HttpStatus.OK);
        } else {
            // Not found! Return 404 NOT FOUND (no body)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // -------------------------------------------------------
    // API 3: CREATE NEW EXPENSE
    // URL:    POST http://localhost:8080/api/expenses
    //
    // @RequestBody tells Spring to read the JSON body sent
    // from React and convert it into an Expense Java object.
    //
    // Example JSON body sent from React:
    // {
    //   "title": "Groceries",
    //   "category": "Food",
    //   "amount": 500.00,
    //   "date": "2024-01-15"
    // }
    // -------------------------------------------------------
    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {

        // Pass the expense object to the service to save it
        Expense savedExpense = expenseService.createExpense(expense);

        // Return the saved expense (with auto-generated ID) and 201 CREATED
        // HttpStatus.CREATED = 201 (standard "resource created" response)
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }


    // -------------------------------------------------------
    // API 4: UPDATE EXISTING EXPENSE
    // URL:    PUT http://localhost:8080/api/expenses/1
    //
    // Combines @PathVariable (id from URL) and
    // @RequestBody (updated data from React)
    // -------------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        // Ask service to update the expense
        Expense updatedExpense = expenseService.updateExpense(id, expense);

        if (updatedExpense != null) {
            // Update successful! Return updated expense with 200 OK
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
            // Expense not found, return 404 NOT FOUND
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // -------------------------------------------------------
    // API 5: DELETE EXPENSE
    // URL:    DELETE http://localhost:8080/api/expenses/1
    //
    // We only need the ID from the URL — no request body needed
    // -------------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {

        // Ask service to delete the expense by ID
        boolean deleted = expenseService.deleteExpense(id);

        if (deleted) {
            // Successfully deleted! Return a message with 200 OK
            return new ResponseEntity<>("Expense deleted successfully", HttpStatus.OK);
        } else {
            // Not found! Return 404
            return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
        }
    }
}
