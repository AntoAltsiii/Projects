package com.library.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.text.Normalizer;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private String title;
    private String author;
    private int publicationYear;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return publicationYear == book.publicationYear &&
                normalize(title).equals(normalize(book.title)) &&
                normalize(author).equals(normalize(book.author));
    }

    @Override
    public int hashCode() {
        return Objects.hash(normalize(title), normalize(author), publicationYear);
    }

    private String normalize(String input) {
        if (input == null) return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        return normalized.replaceAll("\\p{M}", "").toLowerCase().trim();
    }

    public String toCsvRow() {
        return String.format("%s,%s,%d", title, author, publicationYear);
    }
}
