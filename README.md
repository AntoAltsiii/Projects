# Library Catalog Cleaner - High Performance Java

## Decisions

### 1. Processing Model: Lazy Streams
Instead of reading the entire file into memory (which would crash with a 10GB CSV), we use `Files.lines()`. This creates a **Lazy Iterator** that reads one line at a time. The memory footprint remains constant regardless of the file size.

### 2. Intelligent Data Normalization
We implemented an "Aggressive Normalizer" inside the `Book` model (`equals`/`hashCode`).
- **NFD Normalization:** Converts characters like `ñ` to `n` and `é` to `e`.
- **Case Insensitivity:** Everything is compared in lowercase.
- **Sanitization:** Leading/trailing spaces are trimmed before hashing.
- **Why?** This ensures that "El Quijote", "el quijote ", and "EL QUÍJOTE" are correctly identified as duplicates without expensive regex operations.

### 3. Efficiency & Resource Management
- **Single-Pass Processing:** Cleaning, validation, statistics, and duplicate removal happen in a single Stream pipeline.
- **Lombok Integration:** Reduces boilerplate code, making the compiled bytecode leaner and the source code easier to maintain.
- **Garbage Collector Friendly:** We avoid creating unnecessary intermediate objects. Invalid data is handled with lightweight primitive defaults (like `0` for years) instead of heavy Exception objects where possible.

### 4. Output Strategy
- **CSV Export:** Generates `output_clean.csv` to demonstrate a complete Data Pipeline (Extract, Transform, Load).
- **Processing Report:** Provides instant feedback with counts and percentages for data quality auditing.

## Execution Guide

### Prerequisites
- JDK 17 or higher.
- `lombok.jar` (included in the root folder).

### Run the System and the Tests
Execute this command in your terminal:
```Gitbash
   ./run.ps1
```
