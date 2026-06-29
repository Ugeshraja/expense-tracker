package com.expensetracker.entity;

// =====================================================
// EXPENSE ENTITY
//
// What is an Entity?
//   An Entity is a Java class that represents a TABLE
//   in the database. Each field in this class becomes
//   a COLUMN in the MySQL 'expenses' table.
//
// So this class = the 'expenses' table in MySQL.
// One object of this class = one ROW in that table.
// =====================================================

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

// @Entity tells Spring/JPA: "This class is a database table"
@Entity

// @Table(name = "expenses") tells JPA the exact table name in MySQL
// Without this, JPA would use the class name "Expense" as table name
@Table(name = "expenses")
public class Expense {

    // -------------------------------------------------------
    // FIELDS — Each field = one column in the database table
    // -------------------------------------------------------

    // @Id marks this field as the PRIMARY KEY of the table
    // @GeneratedValue means MySQL will auto-generate this ID
    // GenerationType.IDENTITY = MySQL auto-increment (1, 2, 3, 4...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @Column defines the column properties
    // nullable = false means this field CANNOT be empty
    // length = 100 means max 100 characters
    @Column(nullable = false, length = 100)
    private String title;       // e.g., "Grocery Shopping"

    @Column(nullable = false, length = 50)
    private String category;    // e.g., "Food", "Transport", "Bills"

    // BigDecimal is used for money — it handles decimal numbers precisely
    // Never use float or double for money values (rounding errors!)
    @Column(nullable = false)
    private BigDecimal amount;  // e.g., 250.00

    // LocalDate stores only the date (no time): e.g., 2024-01-15
    @Column(nullable = false)
    private LocalDate date;     // e.g., 2024-01-15


    // -------------------------------------------------------
    // CONSTRUCTORS
    // A constructor is a special method used to CREATE objects
    // -------------------------------------------------------

    // No-argument constructor (required by JPA — don't remove this!)
    public Expense() {
    }

    // All-argument constructor (useful when creating an expense with all fields)
    public Expense(Long id, String title, String category, BigDecimal amount, LocalDate date) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }


    // -------------------------------------------------------
    // GETTERS AND SETTERS
    //
    // These methods allow OTHER classes to READ and WRITE
    // the private fields above. This is called Encapsulation.
    //
    // Getter = reads the value  (getId, getTitle, etc.)
    // Setter = writes the value (setId, setTitle, etc.)
    // -------------------------------------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    // toString() is helpful for printing/debugging an Expense object
    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", amount=" + amount +
                ", date=" + date +
                '}';
    }
}
