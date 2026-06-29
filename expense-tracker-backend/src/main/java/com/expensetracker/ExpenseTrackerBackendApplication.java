package com.expensetracker;

// =====================================================
// MAIN APPLICATION CLASS
//
// This is the ENTRY POINT of our Spring Boot application.
// When you run this file, the entire backend starts up.
//
// Think of it like the "main()" method in a regular
// Java program — it's where everything begins.
// =====================================================

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication is a special annotation that does 3 things:
//   1. @Configuration     → Marks this as a configuration class
//   2. @EnableAutoConfiguration → Tells Spring Boot to auto-setup everything
//   3. @ComponentScan     → Scans all classes in this package for Spring components
@SpringBootApplication
public class ExpenseTrackerBackendApplication {

    // The main() method — Java starts here
    public static void main(String[] args) {

        // SpringApplication.run() starts the entire Spring Boot app
        // It boots up the embedded Tomcat server on port 8080
        SpringApplication.run(ExpenseTrackerBackendApplication.class, args);

        System.out.println("✅ Expense Tracker Backend is running on http://localhost:8080");
    }
}
