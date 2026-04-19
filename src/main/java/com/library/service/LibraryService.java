package com.library.service;

import com.library.model.Book;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Year;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LibraryService {

    private final AtomicInteger correctedAuthors = new AtomicInteger(0);
    private final AtomicInteger correctedYears = new AtomicInteger(0);
    private final int currentYear = Year.now().getValue();

    public Map<String, List<Book>> processCatalog(String inputPath, String outputPath) {
        List<Book> cleanBooks;
        try (Stream<String> lines = Files.lines(Paths.get(inputPath))) {
            List<String> allLines = lines.collect(Collectors.toList());
            int totalInput = Math.max(0, allLines.size() - 1);
            
            cleanBooks = allLines.stream()
                .skip(1)
                .map(this::parseLine)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
            
            saveToCsv(cleanBooks, outputPath);
            printStats(totalInput, cleanBooks.size());
            
            return cleanBooks.stream().collect(Collectors.groupingBy(book -> 
                book.getAuthor().equalsIgnoreCase("Author Unknown") 
                    ? "Year: " + book.getPublicationYear() 
                    : book.getAuthor()
            ));
        } catch (IOException e) {
            return Collections.emptyMap();
        }
    }

    private Book parseLine(String line) {
        if (line == null || line.isBlank()) return null;
        String[] fields = line.split(",", -1);
        
        String title = fields.length > 0 ? fields[0].trim() : "";
        if (title.isEmpty()) return null;

        String author = (fields.length > 1 && !fields[1].isBlank()) ? fields[1].trim() : "Author Unknown";
        if (author.equals("Author Unknown")) correctedAuthors.incrementAndGet();

        int year = 0;
        try {
            if (fields.length > 2 && !fields[2].isBlank()) {
                year = Integer.parseInt(fields[2].trim());
                if (year < 0 || year > currentYear) throw new NumberFormatException();
            } else {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException e) {
            year = 0;
            correctedYears.incrementAndGet();
        }

        return new Book(title, author, year);
    }

    private void saveToCsv(List<Book> books, String path) {
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(path))) {
            writer.write("Title,Author,Publication Year");
            writer.newLine();
            for (Book book : books) {
                writer.write(book.toCsvRow());
                writer.newLine();
            }
        } catch (IOException ignored) {}
    }

    public void printStats(int totalInput, int totalOutput) {
        double fixedAuthorsPct = (totalInput > 0) ? (correctedAuthors.get() * 100.0 / totalInput) : 0;
        double fixedYearsPct = (totalInput > 0) ? (correctedYears.get() * 100.0 / totalInput) : 0;
        int duplicates = totalInput - (totalOutput + (totalInput - totalOutput - (totalInput - totalOutput))); // Logic simplified in print

        System.out.println("\n--- PROCESSING REPORT ---");
        System.out.println(String.format("Input records:     %d", totalInput));
        System.out.println(String.format("Cleaned records:   %d", totalOutput));
        System.out.println(String.format("Unknown authors:   %d (%.1f%%)", correctedAuthors.get(), fixedAuthorsPct));
        System.out.println(String.format("Invalid years:     %d (%.1f%%)", correctedYears.get(), fixedYearsPct));
        System.out.println("--------------------------");
    }
}
