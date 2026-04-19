package com.library;

import com.library.model.Book;

public class ManualTestRunner {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   RUNNING TESTS MANUALLY (NO-MAVEN MODE)         ");
        System.out.println("==================================================\n");

        int passed = 0;
        int failed = 0;

        try {
            // Test 1: Case and Spacing
            Book b1 = new Book("Don Quixote", "Cervantes", 1605);
            Book b2 = new Book("  don quixote  ", "cervantes", 1605);
            if (b1.equals(b2)) {
                System.out.println("[PASS] - Normalization: Case and Spaces");
                passed++;
            } else {
                System.out.println("[FAIL] - Normalization: Case and Spaces");
                failed++;
            }

            // Test 2: Special Characters (Tildes)
            Book b3 = new Book("El Niño", "Author", 2000);
            Book b4 = new Book("el nino", "author", 2000);
            if (b3.equals(b4)) {
                System.out.println("[PASS] - Normalization: Special Characters");
                passed++;
            } else {
                System.out.println("[FAIL] - Normalization: Special Characters");
                failed++;
            }

            // Test 3: Duplicates in List (Logical Distinct)
            java.util.List<Book> list = java.util.Arrays.asList(b1, b2);
            long distinctCount = list.stream().distinct().count();
            if (distinctCount == 1) {
                System.out.println("[PASS] - Duplicates: Stream.distinct()");
                passed++;
            } else {
                System.out.println("[FAIL] - Duplicates: Stream.distinct()");
                failed++;
            }

        } catch (Exception e) {
            System.err.println("Unexpected error during tests: " + e.getMessage());
            failed++;
        }

        System.out.println("\n--------------------------------------------------");
        System.out.println(" TESTS COMPLETED: " + (passed + failed));
        System.out.println(" PASSED: " + passed);
        System.out.println(" FAILED: " + failed);
        System.out.println("==================================================");
    }
}
