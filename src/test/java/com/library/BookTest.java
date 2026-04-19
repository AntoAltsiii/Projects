package com.library;

import com.library.model.Book;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class BookTest {

    @Test
    public void testNormalizationAndEquality() {
        Book book1 = new Book("Don Quixote", "Cervantes", 1605);
        Book book2 = new Book("  don quixote  ", "cervantes", 1605);
        Book book3 = new Book("Don Quixote", "Miguel de Cervantes", 1605);

        assertEquals(book1, book2, "Books should be equal despite case and spaces");
        assertNotEquals(book1, book3, "Books should be different if authors are different");
    }

    @Test
    public void testSpecialCharacters() {
        Book book1 = new Book("El Niño", "Author", 2000);
        Book book2 = new Book("el nino", "author", 2000);

        assertEquals(book1, book2, "Normalizer should handle special characters like tildes");
    }
}
