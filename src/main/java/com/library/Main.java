package com.library;

import com.library.model.Book;
import com.library.service.LibraryService;

import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   CLEANING PROCESS            ");
        System.out.println("==================================================\n");

        LibraryService service = new LibraryService();
        String inputPath = "src/resources/books.csv";
        String outputPath = "src/resources/output_clean.csv";

        Map<String, List<Book>> catalog = service.processCatalog(inputPath, outputPath);

        if (catalog.isEmpty()) {
            System.out.println("No valid records found.");
            return;
        }

        catalog.forEach((group, books) -> {
            System.out.println("--------------------------------------------------");
            System.out.println(" GROUP: " + group.toUpperCase());
            System.out.println("--------------------------------------------------");
            books.forEach(book -> 
                System.out.printf(" - %-30s | Year: %d%n", book.getTitle(), book.getPublicationYear())
            );
            System.out.println();
        });

        System.out.println("==================================================");
        System.out.println("   PROCESS COMPLETED SUCCESSFULLY                ");
        System.out.println("   Output saved to: " + outputPath);
        System.out.println("==================================================");
    }
}
