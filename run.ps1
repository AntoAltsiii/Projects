# 1. Compilation
javac -cp "lombok.jar" -d target/classes src/main/java/com/library/model/Book.java src/main/java/com/library/service/LibraryService.java src/main/java/com/library/Main.java
javac -cp "target/classes;lombok.jar" -d target/test-classes src/test/java/com/library/ManualTestRunner.java

# 2. Execution (App)
java -cp "target/classes;lombok.jar" com.library.Main

# 3. Execution (Tests)
java -cp "target/classes;target/test-classes;lombok.jar" com.library.ManualTestRunner
