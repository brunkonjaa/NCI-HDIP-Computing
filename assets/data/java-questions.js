(() => {
  "use strict";

  const createQuestion = (id, topic, prompt, options, correct, type = "single") => ({
    id,
    topic,
    prompt,
    type,
    options: options.map(([value, text]) => ({
      id: value,
      label: value,
      text,
    })),
    correctAnswers: Array.isArray(correct) ? correct : [correct],
  });

  const javaQuestions = [
    createQuestion(
      "JAVA-001",
      "Java Basics",
      "Which method signature is the standard entry point for a Java application?",
      [
        ["A", "public void main(String args[])"],
        ["B", "public static void main(String[] args)"],
        ["C", "static public int main(String[] args)"],
        ["D", "public static void main(List<String> args)"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-068",
      "Concurrency Essentials",
      "Which interface represents a task returning a value when executed asynchronously?",
      [
        ["A", "Runnable"],
        ["B", "Callable<V>"],
        ["C", "Supplier<V>"],
        ["D", "Future<V>"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-069",
      "Concurrency Essentials",
      "What does the synchronized keyword guarantee when used on an instance method?",
      [
        ["A", "Only one thread at a time can execute any synchronized method on that instance."],
        ["B", "The method executes faster."],
        ["C", "Threads cannot enter any method of the class."],
        ["D", "The JVM prevents deadlocks automatically."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-070",
      "Concurrency Essentials",
      "What does volatile ensure for a field?",
      [
        ["A", "Atomicity of compound operations."],
        ["B", "Visibility of writes across threads immediately."],
        ["C", "Immutability of the field."],
        ["D", "That the field can only be modified from synchronized blocks."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-071",
      "Concurrency Essentials",
      "Which class would you use to submit tasks and manage a thread pool?",
      [
        ["A", "Thread"],
        ["B", "ExecutorService"],
        ["C", "ThreadGroup"],
        ["D", "CompletionService"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-072",
      "Concurrency Essentials",
      "How do you properly shut down an ExecutorService?",
      [
        ["A", "executor.stop();"],
        ["B", "executor.shutdown(); optionally followed by awaitTermination."],
        ["C", "executor.close();"],
        ["D", "Let it go out of scope without action."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-073",
      "Concurrency Essentials",
      "What is the purpose of CountDownLatch?",
      [
        ["A", "To coordinate completion of multiple threads before proceeding."],
        ["B", "To provide reentrant locking."],
        ["C", "To enforce mutual exclusion."],
        ["D", "To create cyclic barriers repeatedly."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-074",
      "Concurrency Essentials",
      "Which class provides atomic increment operations without explicit synchronization?",
      [
        ["A", "AtomicInteger"],
        ["B", "Integer"],
        ["C", "LongAdder"],
        ["D", "CopyOnWriteArrayList"],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "JAVA-075",
      "Concurrency Essentials",
      "What is the effect of calling future.get() on a Future?",
      [
        ["A", "It immediately returns null."],
        ["B", "It blocks until the result is available or an exception occurs."],
        ["C", "It cancels the task execution."],
        ["D", "It checks status without blocking."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-076",
      "Concurrency Essentials",
      "Which statement about ReentrantLock is true?",
      [
        ["A", "It cannot be unlocked by the thread that locked it."],
        ["B", "It offers tryLock() for non-blocking acquisition."],
        ["C", "It cannot be used with condition variables."],
        ["D", "It is slower than synchronized in all cases."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-077",
      "Concurrency Essentials",
      "What does CompletableFuture.thenApply(...) do?",
      [
        ["A", "Attaches a synchronous transformation to the result."],
        ["B", "Attaches an asynchronous transformation using the common pool."],
        ["C", "Blocks until the future completes."],
        ["D", "Cancels the future when completed."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-078",
      "Concurrency Essentials",
      "Which utility waits for a set number of parties to reach a barrier repeatedly?",
      [
        ["A", "CountDownLatch"],
        ["B", "CyclicBarrier"],
        ["C", "Semaphore"],
        ["D", "Phaser"],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "JAVA-079",
      "Concurrency Essentials",
      "What is ThreadLocal used for?",
      [
        ["A", "Sharing variables across all threads."],
        ["B", "Providing each thread with its own isolated instance of a variable."],
        ["C", "Storing thread priorities."],
        ["D", "Synchronizing blocks of code."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-080",
      "Concurrency Essentials",
      "Which statement about synchronized blocks is correct?",
      [
        ["A", "They lock on the specified object monitor until the block exits."],
        ["B", "They always lock on the current instance, regardless of argument."],
        ["C", "They only protect primitive fields."],
        ["D", "They can lock on null references."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-055",
      "Error Handling",
      "Which exceptions are checked in Java?",
      [
        ["A", "RuntimeException and subclasses"],
        ["B", "Exception and subclasses excluding RuntimeException"],
        ["C", "Error and subclasses"],
        ["D", "Throwable and subclasses"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-056",
      "Error Handling",
      "What is the purpose of the throws clause on a method?",
      [
        ["A", "To throw a new exception instance."],
        ["B", "To declare that the method may propagate specified checked exceptions."],
        ["C", "To convert checked exceptions into unchecked ones."],
        ["D", "To catch exceptions automatically."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-057",
      "Error Handling",
      "Which statements about finally blocks are correct?",
      [
        ["A", "finally always executes, even if return is called inside try."],
        ["B", "finally can be skipped if System.exit is invoked."],
        ["C", "finally executes before catch."],
        ["D", "finally is optional in try-catch structures."],
      ],
      ["A", "B", "D"],
      "multi"
    ),
    createQuestion(
      "JAVA-058",
      "Error Handling",
      "What does try-with-resources require?",
      [
        ["A", "Resources must implement AutoCloseable."],
        ["B", "Resources must be final classes."],
        ["C", "Resources must extend Closeable."],
        ["D", "Resources must be declared outside the try statement."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-059",
      "Error Handling",
      "In try-with-resources, in what order are resources closed?",
      [
        ["A", "In declaration order (first to last)."],
        ["B", "In reverse declaration order (last to first)."],
        ["C", "Based on resource priority."],
        ["D", "Resources are not closed automatically."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-060",
      "Error Handling",
      "What does the multi-catch feature (Java 7+) allow?",
      [
        ["A", "Catching multiple exception types in a single catch block separated by |."],
        ["B", "Catching unchecked and checked exceptions in a single try."],
        ["C", "Catching an exception across multiple threads."],
        ["D", "Catching errors and exceptions together automatically."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-061",
      "Error Handling",
      "Which statement is true about throwing exceptions?",
      [
        ["A", "throw new Exception(); requires the method to declare throws Exception if checked."],
        ["B", "throw only works with RuntimeException."],
        ["C", "throw cannot be used inside lambdas."],
        ["D", "throw statements automatically log the stack trace."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-062",
      "Error Handling",
      "What does Throwable.addSuppressed(Throwable) allow you to do?",
      [
        ["A", "Attach additional exceptions that occurred while handling the primary exception."],
        ["B", "Suppress logging for an exception."],
        ["C", "Convert a checked exception to unchecked."],
        ["D", "Prevent stack trace printing."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-063",
      "Error Handling",
      "Which is a recommended practice for custom exception classes?",
      [
        ["A", "Extending java.lang.Error for all custom exceptions."],
        ["B", "Extending RuntimeException for unchecked behavior when appropriate."],
        ["C", "Avoiding constructors that accept cause Throwable."],
        ["D", "Storing additional context only in static fields."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-064",
      "Error Handling",
      "What happens if a catch block rethrows the caught exception without wrapping?",
      [
        ["A", "The stack trace is lost."],
        ["B", "The original stack trace is preserved."],
        ["C", "Compilation error occurs."],
        ["D", "The exception becomes unchecked automatically."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-065",
      "Error Handling",
      "Which class would you extend to create a checked exception?",
      [
        ["A", "RuntimeException"],
        ["B", "IllegalArgumentException"],
        ["C", "Exception"],
        ["D", "Error"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-066",
      "Error Handling",
      "Which statement about Error subclasses (e.g., OutOfMemoryError) is accurate?",
      [
        ["A", "They are meant to be caught and recovered from routinely."],
        ["B", "They indicate serious problems from which applications typically should not recover."],
        ["C", "They are checked exceptions."],
        ["D", "They must be declared in throws clauses."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-067",
      "Error Handling",
      "What is the effect of calling Thread.currentThread().interrupt() inside a catch block handling InterruptedException?",
      [
        ["A", "It clears the interrupt status."],
        ["B", "It reasserts the interrupt status so higher-level code can handle it."],
        ["C", "It throws a new InterruptedException immediately."],
        ["D", "It stops the thread instantly."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-042",
      "Streams & Functional",
      "Which operation on a Stream is terminal?",
      [
        ["A", "map"],
        ["B", "filter"],
        ["C", "collect"],
        ["D", "peek"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-043",
      "Streams & Functional",
      "What does stream().peek(System.out::println).count() do?",
      [
        ["A", "Prints elements as they are consumed and returns the count."],
        ["B", "Prints elements without consuming the stream."],
        ["C", "Throws IllegalStateException at runtime."],
        ["D", "Creates an infinite loop."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-044",
      "Streams & Functional",
      "What is the difference between map and flatMap on streams?",
      [
        ["A", "map flattens nested streams, flatMap does not."],
        ["B", "flatMap maps each element to a stream and flattens the result."],
        ["C", "map is terminal; flatMap is intermediate."],
        ["D", "flatMap only works on primitive streams."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-045",
      "Streams & Functional",
      "Which collector would you use to group elements by a classifier function?",
      [
        ["A", "Collectors.toList()"],
        ["B", "Collectors.groupingBy(...)"],
        ["C", "Collectors.partitioningBy(...)"],
        ["D", "Collectors.joining(\" \")"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-046",
      "Streams & Functional",
      "Which functional interface represents a function that takes T and returns R?",
      [
        ["A", "Supplier<T>"],
        ["B", "Function<T, R>"],
        ["C", "Consumer<T>"],
        ["D", "Predicate<T>"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-047",
      "Streams & Functional",
      "What does Optional.orElseGet(Supplier<? extends T>) do?",
      [
        ["A", "Returns the Optional itself if present, otherwise null."],
        ["B", "Returns the value if present, otherwise invokes the Supplier to obtain a value."],
        ["C", "Throws an exception when empty."],
        ["D", "Always evaluates the supplier."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-048",
      "Streams & Functional",
      "Which method creates an infinite stream?",
      [
        ["A", "Stream.of(1,2,3)"],
        ["B", "Stream.generate(Math::random)"],
        ["C", "Stream.empty()"],
        ["D", "Stream.concat(a, b)"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-049",
      "Streams & Functional",
      "What is a side effect of using parallelStream() without proper consideration?",
      [
        ["A", "Streams become sequential automatically."],
        ["B", "Results may be nondeterministic if the source or operations are not thread-safe."],
        ["C", "It always improves performance on single-core machines."],
        ["D", "Order is guaranteed regardless of source."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-050",
      "Streams & Functional",
      "Which lambda syntax is valid for a Comparator<String> comparing length?",
      [
        ["A", "(left, right) -> Integer.compare(left.length(), right.length())"],
        ["B", "left, right -> left.length() - right.length()"],
        ["C", "(String left, right) => left.length() - right.length()"],
        ["D", "(left, right) => left.length() - right.length()"],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-051",
      "Streams & Functional",
      "What does Collectors.partitioningBy(predicate) return?",
      [
        ["A", "List<List<T>>"],
        ["B", "Map<Boolean, List<T>>"],
        ["C", "Set<Set<T>>"],
        ["D", "Optional<List<T>>"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-052",
      "Streams & Functional",
      "Which stream operation can short-circuit?",
      [
        ["A", "map"],
        ["B", "filter"],
        ["C", "anyMatch"],
        ["D", "forEach"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-053",
      "Streams & Functional",
      "What does method reference String::toUpperCase represent?",
      [
        ["A", "A Supplier<String>"],
        ["B", "A Function<String, String>"],
        ["C", "A Predicate<String>"],
        ["D", "A BiFunction<String, String, String>"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-054",
      "Streams & Functional",
      "What happens if you reuse a Stream after a terminal operation?",
      [
        ["A", "It restarts from the beginning automatically."],
        ["B", "It throws an IllegalStateException."],
        ["C", "It returns an empty stream."],
        ["D", "It compiles but results in undefined behavior."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-029",
      "Collections & Generics",
      "Which collection type maintains insertion order and allows duplicates?",
      [
        ["A", "HashSet"],
        ["B", "LinkedHashSet"],
        ["C", "ArrayList"],
        ["D", "TreeSet"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-030",
      "Collections & Generics",
      "What is the time complexity of get(index) on an ArrayList?",
      [
        ["A", "O(1)"],
        ["B", "O(log n)"],
        ["C", "O(n)"],
        ["D", "O(n log n)"],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-031",
      "Collections & Generics",
      "Which statement about HashMap and LinkedHashMap is correct?",
      [
        ["A", "HashMap preserves insertion order by default."],
        ["B", "LinkedHashMap maintains insertion order or access order when configured."],
        ["C", "LinkedHashMap does not permit null keys."],
        ["D", "HashMap guarantees iteration order by key hash."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-032",
      "Collections & Generics",
      "What does Collections.unmodifiableList(list) return?",
      [
        ["A", "A deep copy of the list."],
        ["B", "An immutable view that throws at runtime on modifications."],
        ["C", "A synchronized list."],
        ["D", "A list that copies on write."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-033",
      "Collections & Generics",
      "Which statement about List.of(...) introduced in Java 9 is true?",
      [
        ["A", "It returns a mutable list."],
        ["B", "It allows null elements."],
        ["C", "It returns an unmodifiable list."],
        ["D", "It always returns an ArrayList."],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-034",
      "Collections & Generics",
      "What does Arrays.asList(arr) return when arr is an array?",
      [
        ["A", "A mutable ArrayList copy of the array."],
        ["B", "A fixed-size list backed by the array."],
        ["C", "A synchronized list copy."],
        ["D", "A TreeList."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-035",
      "Collections & Generics",
      "Given List<? extends Number> numbers, which operations are permitted?",
      [
        ["A", "numbers.add(10);"],
        ["B", "numbers.add(null);"],
        ["C", "Number n = numbers.get(0);"],
        ["D", "Object o = numbers.get(0);"],
      ],
      ["B", "C", "D"],
      "multi"
    ),
    createQuestion(
      "JAVA-036",
      "Collections & Generics",
      "What does List<? super Integer> allow you to do?",
      [
        ["A", "Read elements as Integer without casting."],
        ["B", "Add Integer and any of its subclasses."],
        ["C", "Add Integer superclasses like Number directly."],
        ["D", "Retrieve items as Object unless cast."],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "JAVA-037",
      "Collections & Generics",
      "Which statement about type erasure is correct?",
      [
        ["A", "Generic type information is available at runtime via reflection."],
        ["B", "Generic type parameters are removed at compile time for backward compatibility."],
        ["C", "Type erasure applies only to interfaces."],
        ["D", "Type erasure prevents use of arrays."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-038",
      "Collections & Generics",
      "How can you create a thread-safe List with minimal overhead?",
      [
        ["A", "new ArrayList<>()"],
        ["B", "Collections.synchronizedList(new ArrayList<>())"],
        ["C", "List.of()"],
        ["D", "new CopyOnWriteArrayList<>()"],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "JAVA-039",
      "Collections & Generics",
      "Which collection would you choose for implementing a LIFO stack?",
      [
        ["A", "ArrayDeque"],
        ["B", "LinkedHashSet"],
        ["C", "PriorityQueue"],
        ["D", "ConcurrentSkipListSet"],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-040",
      "Collections & Generics",
      "What does Optional.orElseThrow() do when the Optional is empty?",
      [
        ["A", "Returns null."],
        ["B", "Throws NoSuchElementException."],
        ["C", "Throws NullPointerException."],
        ["D", "Returns an Optional.empty()."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-041",
      "Collections & Generics",
      "Which method would you use to sort a List<T> with a custom Comparator?",
      [
        ["A", "Collections.sort(list, comparator)"],
        ["B", "list.sorted(comparator)"],
        ["C", "Arrays.sort(list)"],
        ["D", "list.sort(comparator)"],
      ],
      ["A", "D"],
      "multi"
    ),
    createQuestion(
      "JAVA-021",
      "Object-Oriented Principles",
      "What must be the first statement inside a constructor if you explicitly call another constructor of the same class?",
      [
        ["A", "super();"],
        ["B", "this();"],
        ["C", "return;"],
        ["D", "new This();"],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-022",
      "Object-Oriented Principles",
      "What does the super keyword refer to?",
      [
        ["A", "The current object."],
        ["B", "The direct superclass of the current class."],
        ["C", "A static member of the class."],
        ["D", "The root Object class."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-023",
      "Object-Oriented Principles",
      "What is the purpose of sealed classes introduced in Java 17?",
      [
        ["A", "To prevent serialization."],
        ["B", "To restrict which classes can extend or implement them."],
        ["C", "To auto-generate constructors."],
        ["D", "To mark a class as thread-safe."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-024",
      "Object-Oriented Principles",
      "Which statement about records (Java 16+) is correct?",
      [
        ["A", "Records cannot implement interfaces."],
        ["B", "Records implicitly declare final fields and a canonical constructor."],
        ["C", "Records are mutable data carriers."],
        ["D", "Records must extend java.lang.Record explicitly."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-025",
      "Object-Oriented Principles",
      "What does polymorphism enable?",
      [
        ["A", "Compiling code in multiple modules simultaneously."],
        ["B", "Using a superclass reference to invoke subclass implementations at runtime."],
        ["C", "Copying object graphs automatically."],
        ["D", "Storing multiple data types in primitive arrays."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-026",
      "Object-Oriented Principles",
      "What is the benefit of pattern matching for instanceof (Java 16+)?",
      [
        ["A", "It allows matching on multiple patterns at once."],
        ["B", "It eliminates the need for a separate cast after instanceof checks."],
        ["C", "It enables pattern matching on primitive types."],
        ["D", "It replaces switch statements."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-027",
      "Object-Oriented Principles",
      "Which rules are part of the equals and hashCode contract?",
      [
        ["A", "If two objects are equal, they must have the same hash code."],
        ["B", "If two objects have the same hash code, they must be equal."],
        ["C", "equals must be reflexive, symmetric, and transitive."],
        ["D", "hashCode must return unique values for every object."],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "JAVA-028",
      "Object-Oriented Principles",
      "What is encapsulation primarily concerned with?",
      [
        ["A", "Bundling data with methods and restricting direct access to some components."],
        ["B", "Ensuring methods have unique names."],
        ["C", "Sharing state between unrelated classes."],
        ["D", "Automatically generating getters and setters."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-002",
      "Java Basics",
      "How many primitive data types does Java provide?",
      [
        ["A", "6"],
        ["B", "7"],
        ["C", "8"],
        ["D", "9"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-003",
      "Java Basics",
      "What is the default value of an uninitialized instance variable of type int?",
      [
        ["A", "null"],
        ["B", "0"],
        ["C", "0.0"],
        ["D", "Undefined; it must be assigned before use."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-004",
      "Java Basics",
      "What does the final keyword indicate when applied to a variable?",
      [
        ["A", "The variable cannot be accessed outside the package."],
        ["B", "The variable is thread-safe."],
        ["C", "The variable can be assigned only once."],
        ["D", "The variable is volatile."],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-005",
      "Java Basics",
      "Which statement about the var keyword (Java 10+) is correct?",
      [
        ["A", "It allows type inference for local variables with initializers."],
        ["B", "It can be used for method parameters."],
        ["C", "It is a reserved type representing Any."],
        ["D", "It enables dynamic typing at runtime."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-006",
      "Java Basics",
      "Which of the following are immutable in Java?",
      [
        ["A", "String"],
        ["B", "StringBuilder"],
        ["C", "java.time.LocalDate"],
        ["D", "StringBuffer"],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "JAVA-007",
      "Java Basics",
      "Which primitive type can store the largest positive value?",
      [
        ["A", "int"],
        ["B", "long"],
        ["C", "float"],
        ["D", "double"],
      ],
      "D"
    ),
    createQuestion(
      "JAVA-008",
      "Java Basics",
      "Which statement about switch expressions in Java 14+ is true?",
      [
        ["A", "They require the break keyword for each case."],
        ["B", "They can return a value using the yield keyword."],
        ["C", "They only support integral types."],
        ["D", "They do not allow arrow labels."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-009",
      "Java Basics",
      "What is the result of the expression 5 / 2 when both operands are int?",
      [
        ["A", "2"],
        ["B", "2.5"],
        ["C", "2.0"],
        ["D", "Compilation error"],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-010",
      "Java Basics",
      "Which package is imported automatically into every Java source file?",
      [
        ["A", "java.lang"],
        ["B", "java.util"],
        ["C", "java.io"],
        ["D", "java.math"],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-011",
      "Java Basics",
      "What will happen if you access an array index outside its bounds?",
      [
        ["A", "The JVM wraps around to the beginning of the array."],
        ["B", "An ArrayIndexOutOfBoundsException is thrown at runtime."],
        ["C", "A compilation error occurs."],
        ["D", "The JVM silently ignores the operation."],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-012",
      "Java Basics",
      "Which statement about autoboxing is correct?",
      [
        ["A", "It converts primitives to wrapper objects automatically when needed."],
        ["B", "It converts wrapper objects to primitives automatically."],
        ["C", "It only applies to numeric types."],
        ["D", "It is disabled in Java 17 and later."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-013",
      "Java Basics",
      "What does System.out.println(Integer.parseInt(\"10\") + 5); output?",
      [
        ["A", "105"],
        ["B", "15"],
        ["C", "\"105\""],
        ["D", "\"15\""],
      ],
      "B"
    ),
    createQuestion(
      "JAVA-014",
      "Java Basics",
      "Which loop guarantees execution of the body at least once?",
      [
        ["A", "for"],
        ["B", "while"],
        ["C", "do-while"],
        ["D", "enhanced for"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-015",
      "Object-Oriented Principles",
      "Which keyword prevents a class from being subclassed?",
      [
        ["A", "abstract"],
        ["B", "sealed"],
        ["C", "final"],
        ["D", "static"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-016",
      "Object-Oriented Principles",
      "What is method overloading?",
      [
        ["A", "Providing multiple methods with the same name but different parameter lists."],
        ["B", "Providing multiple implementations of an interface method across classes."],
        ["C", "Redefining a superclass method in a subclass."],
        ["D", "Calling a method recursively."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-017",
      "Object-Oriented Principles",
      "Which statement about interfaces is true in Java 8+?",
      [
        ["A", "Interfaces can contain private static methods."],
        ["B", "Interfaces cannot have default methods."],
        ["C", "Interfaces can declare constructors."],
        ["D", "Interfaces cannot extend other interfaces."],
      ],
      "A"
    ),
    createQuestion(
      "JAVA-018",
      "Object-Oriented Principles",
      "Which access modifier makes a member visible only within the same package?",
      [
        ["A", "protected"],
        ["B", "public"],
        ["C", "package-private (no modifier)"],
        ["D", "private"],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-019",
      "Object-Oriented Principles",
      "What is true about abstract classes?",
      [
        ["A", "They cannot have any implemented methods."],
        ["B", "They cannot be extended."],
        ["C", "They may contain both abstract and concrete methods."],
        ["D", "They must implement all interface methods they inherit."],
      ],
      "C"
    ),
    createQuestion(
      "JAVA-020",
      "Object-Oriented Principles",
      "Given class Base { void greet() {} } and class Derived extends Base { @Override void greet() {} }, what concept does greet() in Derived demonstrate?",
      [
        ["A", "Encapsulation"],
        ["B", "Method overloading"],
        ["C", "Method overriding"],
        ["D", "Shadowing"],
      ],
      "C"
    ),
  ];

  window.MockExamQuestionBank = window.MockExamQuestionBank || {};
  window.MockExamQuestionBank.java = javaQuestions;
})();
