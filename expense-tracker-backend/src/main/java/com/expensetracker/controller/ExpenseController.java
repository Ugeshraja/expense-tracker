package com.expensetracker.controller;



import com.expensetracker.entity.Expense;
import com.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController


@RequestMapping("/api/expenses")

@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://expense-tracker-kappa-indol.vercel.app/"
})
public class ExpenseController {


    @Autowired
    private ExpenseService expenseService;


    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {

    
        List<Expense> expenses = expenseService.getAllExpenses();

       
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {

        Optional<Expense> expense = expenseService.getExpenseById(id);

        if (expense.isPresent()) {
        
            return new ResponseEntity<>(expense.get(), HttpStatus.OK);
        } else {
        
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {

        
        Expense savedExpense = expenseService.createExpense(expense);

       
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        Expense updatedExpense = expenseService.updateExpense(id, expense);

        if (updatedExpense != null) {
            
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
        
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {

        
        boolean deleted = expenseService.deleteExpense(id);

        if (deleted) {
            return new ResponseEntity<>("Expense deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
        }
    }
}
