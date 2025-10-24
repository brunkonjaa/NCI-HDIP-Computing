const examQuestions = [
  {
    id: 1,
    domain: "JVM & Platform",
    prompt: "Which statement about the Java Virtual Machine (JVM) is correct?",
    options: [
      "It executes Java bytecode and abstracts underlying operating system differences.",
      "It compiles Java source directly into CPU-specific machine code without bytecode.",
      "It can only run applications packaged as executable JAR files."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "The JVM loads and executes bytecode, providing platform independence by abstracting OS details."
  },
  {
    id: 2,
    domain: "Language Fundamentals",
    prompt: "What is the output of the expression `Integer.compareUnsigned(3, -1)`?",
    options: ["A positive value", "Zero", "A negative value"],
    answer: [2],
    multiple: false,
    rationale:
      "When treated as unsigned, -1 becomes the maximum 32-bit value, so 3 is less, yielding a negative result."
  },
  {
    id: 3,
    domain: "Language Fundamentals",
    prompt: "Which statements about the `var` keyword introduced in Java 10 are true?",
    options: [
      "It performs local variable type inference based on the initializer.",
      "It may be used for fields and method parameters in interfaces.",
      "It still enforces static typing at compile time."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "`var` infers the type from the initializer while preserving static typing; it is limited to local variables."
  },
  {
    id: 4,
    domain: "OOP & Design",
    prompt: "Given a sealed class hierarchy, what must every direct subclass declare?",
    options: [
      "Either `permits` or be listed in the sealed class declaration.",
      "A canonical constructor calling `super()`.",
      "The `non-sealed` modifier regardless of design."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Sealed classes restrict subclassing by listing permitted subclasses or allowing subclasses to redeclare sealing via `permits`."
  },
  {
    id: 5,
    domain: "OOP & Design",
    prompt: "Which design pattern best encapsulates a request as an object so it can be queued and executed later?",
    options: ["Command", "Strategy", "Observer"],
    answer: [0],
    multiple: false,
    rationale:
      "The Command pattern turns a request into an object, enabling queuing, logging, and undo operations."
  },
  {
    id: 6,
    domain: "Generics & Collections",
    prompt: "Which options correctly describe Java generics type erasure?",
    options: [
      "Generic type parameters are removed at compile time, enforcing type safety via casts.",
      "It allows overloading methods solely by their generic parameter types.",
      "Unbounded wildcards retain `Object` as the effective runtime type."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Type erasure removes type parameters, inserting casts, and unbounded wildcards behave as `Object` at runtime."
  },
  {
    id: 7,
    domain: "Generics & Collections",
    prompt: "Which collection guarantees predictable iteration order matching insertion order?",
    options: ["LinkedHashSet", "HashSet", "TreeSet"],
    answer: [0],
    multiple: false,
    rationale:
      "LinkedHashSet maintains a doubly linked list of entries to preserve insertion order during iteration."
  },
  {
    id: 8,
    domain: "Concurrency",
    prompt: "What is the key benefit of using `CompletableFuture` over `Future`?",
    options: [
      "It supports non-blocking composition and callback chaining.",
      "It guarantees execution on the Fork/Join common pool only.",
      "It eliminates the need for exception handling."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`CompletableFuture` enables asynchronous pipelines with callbacks, unlike the blocking `Future` interface."
  },
  {
    id: 9,
    domain: "Concurrency",
    prompt: "Which statements about `synchronized` blocks are valid?",
    options: [
      "They acquire the monitor of the referenced object before executing the block.",
      "They prevent `volatile` fields from being visible across threads.",
      "They establish a happens-before relationship between lock release and subsequent acquisition."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Entering a synchronized block locks on the monitor and releasing the lock establishes happens-before semantics."
  },
  {
    id: 10,
    domain: "Concurrency",
    prompt: "Which `java.util.concurrent` class is best suited for maintaining task submission order while using multiple consumers?",
    options: ["LinkedBlockingQueue", "ConcurrentSkipListSet", "CopyOnWriteArrayList"],
    answer: [0],
    multiple: false,
    rationale:
      "`LinkedBlockingQueue` preserves FIFO ordering and supports multiple producers and consumers safely."
  },
  {
    id: 11,
    domain: "Streams & Functional",
    prompt: "What does the `Stream.peek` operation guarantee?",
    options: [
      "It provides a non-terminal operation mainly for debugging without modifying the stream pipeline.",
      "It forces immediate evaluation of the stream.",
      "It ensures thread-safe mutation of upstream data sources."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`peek` is an intermediate operation for observing elements; it does not trigger evaluation or guarantee thread safety."
  },
  {
    id: 12,
    domain: "Streams & Functional",
    prompt: "Which lambda-related statements are true in Java?",
    options: [
      "A lambda can capture effectively final local variables from the enclosing scope.",
      "A lambda can declare checked exceptions even if the functional interface method does not.",
      "A lambda target type is inferred from the surrounding context."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Lambdas capture effectively final variables and rely on target typing; checked exceptions must match the functional interface signature."
  },
  {
    id: 13,
    domain: "Streams & Functional",
    prompt: "What is the effect of calling `Collectors.toUnmodifiableList()` in Java 16 and later?",
    options: [
      "It produces an unmodifiable `List` that throws `UnsupportedOperationException` on structural changes.",
      "It returns an immutable list that allows replacing elements but not resizing.",
      "It returns a view of the original mutable collection."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "The collector creates a structurally unmodifiable list; attempts to add or remove elements throw `UnsupportedOperationException`."
  },
  {
    id: 14,
    domain: "JVM & Platform",
    prompt: "Which tool would you use to inspect class-level bytecode instructions from the command line?",
    options: ["javap", "jlink", "jdeps"],
    answer: [0],
    multiple: false,
    rationale:
      "`javap` disassembles class files, revealing bytecode for verifying compilation results."
  },
  {
    id: 15,
    domain: "JVM & Platform",
    prompt: "Which statements about the module system (JPMS) are correct?",
    options: [
      "`exports` exposes packages to other modules while `opens` enables deep reflection.",
      "All modules must define a `uses` clause to consume services.",
      "`requires transitive` propagates dependencies to dependent modules."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Modules use `exports` and `opens` for visibility control, and `requires transitive` shares dependencies automatically."
  },
  {
    id: 16,
    domain: "Exceptions & Error Handling",
    prompt: "Which exception types are unchecked in Java?",
    options: ["`NullPointerException`", "`SQLException`", "`DateTimeParseException`"],
    answer: [0, 2],
    multiple: true,
    rationale:
      "`NullPointerException` and `DateTimeParseException` extend `RuntimeException`; `SQLException` is checked."
  },
  {
    id: 17,
    domain: "Exceptions & Error Handling",
    prompt: "What is a good reason to use `try-with-resources`?",
    options: [
      "It guarantees that any `AutoCloseable` resource is closed even if an exception occurs.",
      "It avoids the need for finally blocks but suppresses primary exceptions.",
      "It only works with classes from `java.io`."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`try-with-resources` ensures deterministic closing of `AutoCloseable` resources when exiting the block."
  },
  {
    id: 18,
    domain: "Exceptions & Error Handling",
    prompt: "In a multi-catch block (`catch (IOException | SQLException ex)`), which rule applies?",
    options: [
      "The caught exception variable is implicitly final.",
      "The exceptions must be in the same inheritance branch.",
      "You can assign a new value to the exception variable to rethrow a different exception."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Within a multi-catch, the exception parameter is effectively final to prevent type confusion."
  },
  {
    id: 19,
    domain: "File I/O & NIO.2",
    prompt: "Which NIO.2 class would you use to monitor directory changes such as file creation?",
    options: ["WatchService", "FileChannel", "FileSystemProvider"],
    answer: [0],
    multiple: false,
    rationale:
      "`WatchService` registers directories for file change notifications."
  },
  {
    id: 20,
    domain: "File I/O & NIO.2",
    prompt: "Which methods create a stream of lines from a file while managing resource closure automatically?",
    options: [
      "`Files.lines(Path)`",
      "`new BufferedReader(new FileReader(path)).lines()`",
      "`Path.toFile().listFiles()`"
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "Both approaches yield a lazily evaluated stream of lines; the stream must be closed, typically via try-with-resources."
  },
  {
    id: 21,
    domain: "File I/O & NIO.2",
    prompt: "What does the `Files.walk(Path, int maxDepth)` method return?",
    options: ["A lazy stream of paths up to the specified depth.", "A list of `File` objects.", "A recursive directory copy."],
    answer: [0],
    multiple: false,
    rationale:
      "`Files.walk` produces a lazy depth-first stream of `Path` entries limited by `maxDepth`."
  },
  {
    id: 22,
    domain: "JDBC & Persistence",
    prompt: "Which JDBC interface is designed for executing parameterized queries multiple times efficiently?",
    options: ["PreparedStatement", "Statement", "CallableStatement"],
    answer: [0],
    multiple: false,
    rationale:
      "`PreparedStatement` compiles SQL once with placeholders and reuses it with different parameter values."
  },
  {
    id: 23,
    domain: "JDBC & Persistence",
    prompt: "Which best practices apply when using JDBC transactions manually?",
    options: [
      "Disable auto-commit before executing multiple statements that must succeed together.",
      "Rely on the driver default auto-commit to batch operations safely.",
      "Always call `commit()` or `rollback()` in a finally block when auto-commit is off."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Manual transaction control requires disabling auto-commit and ensuring commit or rollback executes in a finally block."
  },
  {
    id: 24,
    domain: "JDBC & Persistence",
    prompt: "What does the `ResultSet.TYPE_SCROLL_INSENSITIVE` constant guarantee?",
    options: [
      "The cursor can move backward and forward without reflecting database changes after the result is retrieved.",
      "The result set automatically updates when rows change in the database.",
      "The result set is read-only."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`TYPE_SCROLL_INSENSITIVE` enables bi-directional navigation while remaining insensitive to later database updates."
  },
  {
    id: 25,
    domain: "Security",
    prompt: "What is the purpose of the `java.security.Policy` file?",
    options: [
      "It defines permissions granted to code sources when using the Java Security Manager.",
      "It stores user authentication credentials for JAAS.",
      "It lists trusted TLS root certificates."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Policy files map code sources to permissions under the legacy Security Manager framework."
  },
  {
    id: 26,
    domain: "Security",
    prompt: "Which APIs would you use to generate a message digest securely?",
    options: [
      "`MessageDigest` with algorithms like SHA-256.",
      "`Cipher` configured in ECB mode.",
      "`Mac` using HmacSHA256 when a secret key is required."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Use `MessageDigest` for hashes and `Mac` for keyed digests; ECB mode encryption is not a digest mechanism."
  },
  {
    id: 27,
    domain: "Security",
    prompt: "Which properties should be set to enable TLS 1.3 in a Java application using JSSE?",
    options: [
      "Ensure the runtime is Java 11 or higher and specify `TLSv1.3` in the enabled protocols.",
      "Install the Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files manually.",
      "Set the `javax.net.ssl.trustStore` and `keyStore` if custom stores are required."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "TLS 1.3 is available from Java 11; custom keystore/truststore properties are set when defaults are insufficient."
  },
  {
    id: 28,
    domain: "Testing & Quality",
    prompt: "What does the `@TestInstance(TestInstance.Lifecycle.PER_CLASS)` annotation do in JUnit 5?",
    options: [
      "It creates a single test instance per class, allowing non-static `@BeforeAll` methods.",
      "It forces tests to run sequentially.",
      "It disables dependency injection."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Per-class lifecycle reuses the same test instance across methods and permits non-static lifecycle callbacks."
  },
  {
    id: 29,
    domain: "Testing & Quality",
    prompt: "Which statements about Mockito are accurate?",
    options: [
      "`when(...).thenReturn(...)` stubs method responses on mocks.",
      "`@Spy` creates a full mock that ignores real method calls.",
      "`verify(mock, times(n))` asserts invocation counts."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Mockito stubbing configures return values, and `verify` checks interactions; spies wrap real objects instead of ignoring methods."
  },
  {
    id: 30,
    domain: "Testing & Quality",
    prompt: "Which tool integrates with Maven Surefire to produce mutation testing metrics?",
    options: ["PIT (Pitest)", "JaCoCo", "Error Prone"],
    answer: [0],
    multiple: false,
    rationale:
      "PIT executes mutation testing, assessing suite effectiveness beyond code coverage."
  },
  {
    id: 31,
    domain: "Build & Tooling",
    prompt: "What does the `mvn dependency:tree` goal provide?",
    options: [
      "A hierarchical view of project dependencies including conflicts.",
      "It compiles the project with verbose logging.",
      "It packages the application into an executable JAR."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`dependency:tree` visualizes dependencies and highlights version conflicts in Maven builds."
  },
  {
    id: 32,
    domain: "Build & Tooling",
    prompt: "When using Gradle's Kotlin DSL, which statements are true?",
    options: [
      "Build scripts use `.kts` files with statically typed accessors.",
      "Plugins must be declared in `buildSrc` exclusively.",
      "You can apply plugins using the `plugins {}` block at the top level."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Gradle Kotlin DSL uses `.kts` scripts with type-safe accessors; plugins still use the `plugins {}` block."
  },
  {
    id: 33,
    domain: "Build & Tooling",
    prompt: "What does the `jlink` tool allow you to do?",
    options: [
      "Assemble a custom runtime image containing only required modules.",
      "Create JAR manifests for multi-release JARs.",
      "Compile Java source code into bytecode."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`jlink` builds trimmed runtime images with chosen modules for distribution."
  },
  {
    id: 34,
    domain: "Performance & Monitoring",
    prompt: "Which Java Flight Recorder (JFR) feature is beneficial for production profiling?",
    options: [
      "Low-overhead continuous event recording integrated with the JVM.",
      "Automatic code optimization hints inserted into bytecode.",
      "Real-time thread interruption control."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "JFR records JVM events with minimal overhead, suitable for production diagnostics."
  },
  {
    id: 35,
    domain: "Performance & Monitoring",
    prompt: "Which options help mitigate Java memory leaks in long-running services?",
    options: [
      "Use profiling tools to inspect retained objects and reference chains.",
      "Disable garbage collection logging to reduce overhead.",
      "Prefer weak references for caches to allow reclamation."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Leak hunting involves profiling and using weak/soft references for caches; disabling GC logs removes vital insight."
  },
  {
    id: 36,
    domain: "Performance & Monitoring",
    prompt: "What is the effect of enabling the G1 garbage collector in modern JVMs?",
    options: [
      "It targets predictable pause times by collecting regions concurrently.",
      "It requires manual heap region sizing via command-line flags.",
      "It only works for heaps under 4 GB."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "G1 aims for low pause times using region-based concurrent collection and defaults suitable for most heaps."
  },
  {
    id: 37,
    domain: "Functional Programming",
    prompt: "Which statements about `Optional` are valid?",
    options: [
      "`Optional.orElseGet` defers evaluation until the optional is empty.",
      "`Optional.get` should be used freely because it never throws.",
      "`Optional.ifPresentOrElse` accepts a consumer and a runnable for absence handling."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "`orElseGet` lazily supplies values; `get` throws on empty optionals; `ifPresentOrElse` handles both presence and absence."
  },
  {
    id: 38,
    domain: "Functional Programming",
    prompt: "What is a key benefit of using `Collectors.groupingBy` with a downstream collector?",
    options: [
      "It enables aggregation such as counting or mapping per group in a single pipeline.",
      "It mutates the source collection in place.",
      "It guarantees sorted keys."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Downstream collectors allow operations like counting, summing, or mapping within each grouped bucket."
  },
  {
    id: 39,
    domain: "Functional Programming",
    prompt: "Which functional interface matches a lambda returning a primitive boolean without input parameters?",
    options: ["BooleanSupplier", "Supplier<Boolean>", "BooleanFunction"],
    answer: [0],
    multiple: false,
    rationale:
      "`BooleanSupplier` provides a primitive boolean result and avoids boxing."
  },
  {
    id: 40,
    domain: "Language Fundamentals",
    prompt: "What is true about record classes introduced in Java 16?",
    options: [
      "They provide a compact syntax for immutable data carriers with generated accessors.",
      "They must extend an abstract superclass to function.",
      "They implicitly implement `Serializable`."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Records synthesize accessors, equals, hashCode, and toString for immutable data aggregates."
  },
  {
    id: 41,
    domain: "Language Fundamentals",
    prompt: "Which statements about switch expressions are accurate?",
    options: [
      "They can return a value using `yield` when using block cases.",
      "They require explicit `break` statements to prevent fall-through.",
      "They support pattern matching for type tests starting from Java 21."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Switch expressions use `yield` in block cases and now support pattern matching enhancements in modern releases."
  },
  {
    id: 42,
    domain: "Language Fundamentals",
    prompt: "Which primitive wrapper classes are immutable and cache frequently used values?",
    options: [
      "`Integer` caches values between -128 and 127 by default.",
      "`Double` caches all positive finite numbers.",
      "`Boolean` caches both `true` and `false`."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Integer caches a small range and Boolean caches both values; Double does not broadly cache."
  },
  {
    id: 43,
    domain: "OOP & Design",
    prompt: "Which SOLID principle advocates for programming to abstractions so modules depend on interfaces?",
    options: ["Dependency Inversion", "Liskov Substitution", "Single Responsibility"],
    answer: [0],
    multiple: false,
    rationale:
      "Dependency inversion principle (DIP) encourages high-level modules to depend on abstractions, not concretions."
  },
  {
    id: 44,
    domain: "OOP & Design",
    prompt: "In Java, what is a valid reason to prefer composition over inheritance?",
    options: [
      "To reuse behavior without tightly coupling the class hierarchy.",
      "Because composition automatically exposes protected members.",
      "Because inheritance cannot be unit tested."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Composition enables code reuse through delegation while minimizing coupling inherent in inheritance."
  },
  {
    id: 45,
    domain: "OOP & Design",
    prompt: "Which statements about interfaces with default methods are true?",
    options: [
      "Classes can override default methods like any other instance method.",
      "A class implementing two interfaces with identical default methods compiles without extra handling.",
      "Default methods can call other abstract methods within the same interface."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Default methods are overrideable and may invoke other interface methods; conflicts require explicit resolution."
  },
  {
    id: 46,
    domain: "Generics & Collections",
    prompt: "Which wildcard usage allows reading elements as type `T` but prevents adding anything other than null?",
    options: ["`List<? extends T>`", "`List<? super T>`", "`List<T>`"],
    answer: [0],
    multiple: false,
    rationale:
      "An upper-bounded wildcard is a producer: elements can be read as `T`, but additions (except null) are prohibited."
  },
  {
    id: 47,
    domain: "Generics & Collections",
    prompt: "What is the time complexity of retrieving an element by key from a `HashMap` under ideal hashing conditions?",
    options: ["O(1)", "O(log n)", "O(n)"],
    answer: [0],
    multiple: false,
    rationale:
      "With uniform hashing, a HashMap get operation averages constant time."
  },
  {
    id: 48,
    domain: "Generics & Collections",
    prompt: "Which collections are thread-safe without requiring external synchronization?",
    options: [
      "`ConcurrentHashMap`",
      "`ArrayDeque`",
      "`CopyOnWriteArrayList`"
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "ConcurrentHashMap and CopyOnWriteArrayList provide built-in thread safety; ArrayDeque is not thread-safe."
  },
  {
    id: 49,
    domain: "Concurrency",
    prompt: "Which statements about `ReentrantReadWriteLock` are accurate?",
    options: [
      "Multiple readers can hold the read lock concurrently as long as no writer holds the write lock.",
      "Upgrading from a read lock to a write lock is automatically handled by the JVM.",
      "Write lock acquisition is exclusive and blocks readers."],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Read locks are shared, write locks are exclusive; upgrading requires manual strategy to avoid deadlock."
  },
  {
    id: 50,
    domain: "Concurrency",
    prompt: "What does the `@GuardedBy` annotation communicate in concurrent code reviews?",
    options: [
      "A field or method should be accessed only while holding the specified lock.",
      "The annotated element is safe without synchronization.",
      "The variable is immutable."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`@GuardedBy` documents which lock protects a mutable field or method, aiding thread-safety analysis."
  },
  {
    id: 51,
    domain: "Concurrency",
    prompt: "What problem does `ThreadLocal` primarily solve?",
    options: [
      "It stores per-thread state without additional synchronization.",
      "It schedules tasks across a fixed thread pool automatically.",
      "It prevents deadlocks in nested lock acquisition."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`ThreadLocal` binds data to the current thread, avoiding shared mutable state without locking."
  },
  {
    id: 52,
    domain: "Concurrency",
    prompt: "Which techniques help avoid deadlocks in Java applications?",
    options: [
      "Acquire locks in a consistent global order.",
      "Rely on `System.gc()` to release locked monitors.",
      "Use `tryLock` with timeout to detect contention."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Ordering lock acquisition and using timed lock attempts reduce deadlock risk; GC does not release active monitors."
  },
  {
    id: 53,
    domain: "Streams & Functional",
    prompt: "What is the result of calling `Stream.of(1,2,3).reduce(0, Integer::sum)`?",
    options: ["6", "`OptionalInt.empty()`", "`NoSuchElementException`"],
    answer: [0],
    multiple: false,
    rationale:
      "The two-argument `reduce` starts with identity 0 and sums elements, resulting in 6."
  },
  {
    id: 54,
    domain: "Streams & Functional",
    prompt: "Which collectors efficiently compute summary statistics for `int` values?",
    options: [
      "`Collectors.summarizingInt`",
      "`Collectors.toSet`",
      "`Collectors.partitioningBy`"
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`summarizingInt` returns count, sum, min, max, and average in one pass for primitive ints."
  },
  {
    id: 55,
    domain: "Streams & Functional",
    prompt: "Which situations warrant parallel stream usage?",
    options: [
      "Processing CPU-intensive tasks on large datasets with associative operations.",
      "Mutating shared state within the stream pipeline.",
      "Using short-lived small collections where sequential streams outperform parallel."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Parallel streams help with large, stateless, associative computations; shared mutations and tiny datasets degrade performance."
  },
  {
    id: 56,
    domain: "File I/O & NIO.2",
    prompt: "How can you safely write text data to a file using UTF-8 encoding?",
    options: [
      "Use `Files.newBufferedWriter(path, StandardCharsets.UTF_8)` in a try-with-resources block.",
      "Write bytes manually without specifying a charset.",
      "Rely on platform default encoding for portability."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Explicitly setting UTF-8 with try-with-resources ensures consistent encoding and resource closure."
  },
  {
    id: 57,
    domain: "File I/O & NIO.2",
    prompt: "What does memory-mapping a file via `FileChannel.map` enable?",
    options: [
      "Treating file content as a `ByteBuffer` backed by virtual memory.",
      "Automatic serialization of Java objects.",
      "Direct manipulation of compressed archives."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Memory mapping exposes file content as a buffer, allowing fast random access backed by the OS virtual memory system."
  },
  {
    id: 58,
    domain: "File I/O & NIO.2",
    prompt: "Which statement about `Files.copy(Path, Path, CopyOption...)` is true?",
    options: [
      "It throws an exception if the target exists unless `REPLACE_EXISTING` is specified.",
      "It automatically copies file attributes regardless of options.",
      "It deletes the source after copying."],
    answer: [0],
    multiple: false,
    rationale:
      "By default the target must not exist; copying attributes requires `COPY_ATTRIBUTES`, and source deletion is separate."
  },
  {
    id: 59,
    domain: "JDBC & Persistence",
    prompt: "Which approaches mitigate SQL injection vulnerabilities in JDBC code?",
    options: [
      "Use parameterized `PreparedStatement` placeholders.",
      "Concatenate user input directly into SQL strings.",
      "Validate and sanitize input in addition to parameter binding."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Prepared statements and rigorous validation reduce injection risk; string concatenation is unsafe."
  },
  {
    id: 60,
    domain: "JDBC & Persistence",
    prompt: "What is the effect of calling `EntityManager.merge(entity)` in JPA?",
    options: [
      "It returns a managed instance with state copied from the detached entity.",
      "It permanently deletes the entity from the database.",
      "It flushes pending changes immediately."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`merge` copies state into a managed entity (existing or new) and returns it; flush timing depends on the persistence context."
  },
  {
    id: 61,
    domain: "JDBC & Persistence",
    prompt: "Which JPA query language features are valid?",
    options: [
      "JPQL operates on entity attributes rather than table names.",
      "JPQL supports database-specific functions without registration.",
      "Named queries can be declared using the `@NamedQuery` annotation."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "JPQL is entity-focused, and named queries are defined via annotations or XML; vendor functions require registration or native queries."
  },
  {
    id: 62,
    domain: "Security",
    prompt: "What is the role of JAAS LoginModules in authentication?",
    options: [
      "They validate credentials and populate a `Subject` with principals and credentials.",
      "They manage HTTPS handshakes at the socket level.",
      "They render UI dialogs for password resets."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "LoginModules authenticate users and enrich the `Subject`; TLS and UI duties are outside JAAS scope."
  },
  {
    id: 63,
    domain: "Security",
    prompt: "Which choices strengthen password storage in Java applications?",
    options: [
      "Use adaptive hashing algorithms like bcrypt, scrypt, or PBKDF2 via libraries.",
      "Store raw passwords encrypted with a reversible key.",
      "Apply per-user salts to prevent rainbow table attacks."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Adaptive hashing with salts mitigates offline attacks; reversible encryption risks compromise if keys leak."
  },
  {
    id: 64,
    domain: "Security",
    prompt: "Which Java EE / Jakarta EE security annotations enforce role-based access?",
    options: [
      "`@RolesAllowed`",
      "`@DenyAll`",
      "`@PermitCustom`"
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "`@RolesAllowed` and `@DenyAll` control authorization declaratively; `@PermitCustom` is not a standard annotation."
  },
  {
    id: 65,
    domain: "Testing & Quality",
    prompt: "How can you parameterize tests in JUnit 5?",
    options: [
      "Use `@ParameterizedTest` with sources like `@ValueSource` or `@MethodSource`.",
      "Annotate a regular `@Test` method with `@Parameters`.",
      "Combine `@ParameterizedTest` with custom argument providers."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "JUnit 5 parameterized tests rely on `@ParameterizedTest` with built-in or custom providers; `@Parameters` belongs to JUnit 4."
  },
  {
    id: 66,
    domain: "Testing & Quality",
    prompt: "Which metrics complement code coverage when assessing test effectiveness?",
    options: [
      "Mutation score from tools like PIT.",
      "Cyclomatic complexity per class.",
      "Compilation time of the test suite."
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "Mutation score gauges test strength; tracking complexity highlights risk. Compilation time is not an effectiveness metric."
  },
  {
    id: 67,
    domain: "Testing & Quality",
    prompt: "What advantage does Testcontainers provide for integration tests?",
    options: [
      "On-demand, disposable environments provisioned via Docker.",
      "Mock implementations for all external services.",
      "Automatic conversion of unit tests into end-to-end tests."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Testcontainers spins up real service dependencies in containers, improving realistic integration testing."
  },
  {
    id: 68,
    domain: "Build & Tooling",
    prompt: "What does adding `--enable-preview` to the `javac` and `java` commands accomplish?",
    options: [
      "It allows compiling and running code using preview language features in that JDK release.",
      "It permanently enables experimental features for all future JDKs.",
      "It is required for using modules."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Preview features must be explicitly enabled per compilation and runtime invocation using `--enable-preview`."
  },
  {
    id: 69,
    domain: "Build & Tooling",
    prompt: "Which Gradle task runs unit tests using the configured test framework?",
    options: ["`test`", "`assemble`", "`checkstyleMain`"],
    answer: [0],
    multiple: false,
    rationale:
      "The `test` task executes unit tests and is wired into the `check` lifecycle in Gradle projects."
  },
  {
    id: 70,
    domain: "Build & Tooling",
    prompt: "What is a benefit of using the Maven Wrapper (`mvnw`)?",
    options: [
      "It ensures a specific Maven version is used without manual installation.",
      "It compiles the project faster by default.",
      "It eliminates the need for a `pom.xml`."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "The wrapper downloads and locks the Maven version required by the project, easing onboarding."
  },
  {
    id: 71,
    domain: "Performance & Monitoring",
    prompt: "Which JVM option enables detailed garbage collection logging in human-readable form on Java 11?",
    options: [
      "`-Xlog:gc*`",
      "`-verbose:class`",
      "`-XX:+UseParallelGC`"
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`-Xlog:gc*` uses the unified logging syntax to output comprehensive GC information."
  },
  {
    id: 72,
    domain: "Performance & Monitoring",
    prompt: "Which tools can attach to a running JVM to inspect memory usage?",
    options: [
      "`jcmd <pid> GC.heap_info`",
      "`jconsole`",
      "`jar`"
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "`jcmd` and `jconsole` connect to running JVMs; `jar` is for packaging archives."
  },
  {
    id: 73,
    domain: "Performance & Monitoring",
    prompt: "What is the advantage of structured concurrency introduced in Project Loom?",
    options: [
      "It scopes lifetimes of concurrent tasks, simplifying cancellation and error handling.",
      "It requires manual management of native threads for every virtual thread.",
      "It removes the need for synchronization primitives entirely."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Structured concurrency treats concurrent tasks as structured blocks, making cancellation and error propagation more manageable."
  },
  {
    id: 74,
    domain: "Functional Programming",
    prompt: "Which statements about `CompletableFuture` chaining are true?",
    options: [
      "`thenCompose` flattens dependent asynchronous computations.",
      "`thenApply` is used for asynchronous callbacks returning `CompletableFuture` instances automatically.",
      "`exceptionally` handles exceptions and can recover with fallback values."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "`thenCompose` chains futures to avoid nested futures, and `exceptionally` provides recovery logic."
  },
  {
    id: 75,
    domain: "Functional Programming",
    prompt: "Which Java functional interfaces represent primitive specializations?",
    options: [
      "`IntUnaryOperator`",
      "`Function<Integer, Integer>`",
      "`LongConsumer`"
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Primitive specializations like `IntUnaryOperator` and `LongConsumer` avoid boxing; `Function<Integer, Integer>` boxes values."
  },
  {
    id: 76,
    domain: "Functional Programming",
    prompt: "How does the `Predicate` interface support composition?",
    options: [
      "It provides default methods like `and`, `or`, and `negate`.",
      "It exposes the `compose` method for chaining like `Function`.",
      "It cannot combine multiple predicates."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Predicates include default composition helpers `and`, `or`, and `negate`."
  },
  {
    id: 77,
    domain: "Language Fundamentals",
    prompt: "Which statements about pattern matching for `instanceof` introduced in Java 16 are correct?",
    options: [
      "It allows binding the target type to a new variable upon a successful match.",
      "It supports destructuring tuples in the language core.",
      "It eliminates the need for explicit casts after a successful check."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Pattern matching binds a new variable of the tested type, avoiding manual casts; it does not destructure tuples."
  },
  {
    id: 78,
    domain: "Language Fundamentals",
    prompt: "What is the default access modifier for interface methods in Java?",
    options: ["public", "protected", "package-private"],
    answer: [0],
    multiple: false,
    rationale:
      "Interface methods are implicitly `public`; other modifiers are not permitted except for default/private static combos introduced later."
  },
  {
    id: 79,
    domain: "Language Fundamentals",
    prompt: "Which annotations have retention policy `SOURCE` in the standard library?",
    options: [
      "`@Override`",
      "`@Deprecated`",
      "`@SuppressWarnings`"
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`@Override` is discarded by the compiler; `@Deprecated` and `@SuppressWarnings` are retained in class files."
  },
  {
    id: 80,
    domain: "Language Fundamentals",
    prompt: "Which statements about enums are valid?",
    options: [
      "Enums can implement interfaces to add behavior.",
      "Enum constants are instantiated lazily when first accessed.",
      "Enums extend `java.lang.Enum` implicitly."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Enums implicitly extend `Enum` and may implement interfaces; all constants are instantiated at class load time."
  },
  {
    id: 81,
    domain: "OOP & Design",
    prompt: "Which GoF patterns promote loose coupling via event subscription?",
    options: ["Observer", "Decorator", "Mediator"],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Observer enables publish/subscribe while Mediator coordinates components; Decorator adds behavior without event coupling."
  },
  {
    id: 82,
    domain: "OOP & Design",
    prompt: "Which Java features help implement immutability?",
    options: [
      "Declaring fields `private final` and avoiding setters.",
      "Returning defensive copies of mutable collections.",
      "Using `protected` fields so subclasses can mutate state."
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "Immutability relies on final encapsulated state and defensive copies; protected access undermines it."
  },
  {
    id: 83,
    domain: "OOP & Design",
    prompt: "Which scenarios justify using the Builder pattern in Java?",
    options: [
      "Creating objects with many optional parameters requiring readability.",
      "Ensuring only a single instance exists globally.",
      "Constructing immutable objects step by step."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Builders improve readability for complex object construction and support building immutable instances; they don't enforce singletons."
  },
  {
    id: 84,
    domain: "Generics & Collections",
    prompt: "Which statements about `ConcurrentLinkedQueue` are correct?",
    options: [
      "It is lock-free and safe for concurrent producers and consumers.",
      "It preserves FIFO ordering of inserted elements.",
      "It blocks when the queue is empty."
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "ConcurrentLinkedQueue is a lock-free FIFO queue; it does not block, returning null when empty."
  },
  {
    id: 85,
    domain: "Generics & Collections",
    prompt: "Which map implementations maintain key order sorted according to natural ordering or a comparator?",
    options: ["TreeMap", "LinkedHashMap", "ConcurrentHashMap"],
    answer: [0],
    multiple: false,
    rationale:
      "TreeMap stores keys sorted by natural order or a supplied comparator; LinkedHashMap maintains insertion order."
  },
  {
    id: 86,
    domain: "Generics & Collections",
    prompt: "Which operations run in amortized constant time on an `ArrayDeque`?",
    options: [
      "Adding elements at the head or tail.",
      "Random access by index.",
      "Removing elements from both ends."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "ArrayDeque excels at double-ended queue operations but lacks indexed random access in constant time."
  },
  {
    id: 87,
    domain: "Concurrency",
    prompt: "What distinguishes a virtual thread in Java 21?",
    options: [
      "It is scheduled by the JVM onto carrier platform threads, enabling massive concurrency.",
      "It replaces the need for executors entirely.",
      "It cannot perform blocking I/O operations."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Virtual threads map many user-mode tasks onto fewer carrier threads, supporting high concurrency while permitting blocking calls."
  },
  {
    id: 88,
    domain: "Concurrency",
    prompt: "Which statements about the Fork/Join framework are true?",
    options: [
      "Tasks should divide work recursively into subtasks and combine results.",
      "`ForkJoinPool` executes tasks strictly in submission order.",
      "Work-stealing balances load across worker threads."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Fork/Join tasks recursively fork and join, and the pool uses work-stealing for load balancing; order is not guaranteed."
  },
  {
    id: 89,
    domain: "Concurrency",
    prompt: "Which method on `ExecutorService` initiates an orderly shutdown while finishing submitted tasks?",
    options: ["shutdown()", "shutdownNow()", "awaitTermination()"],
    answer: [0],
    multiple: false,
    rationale:
      "`shutdown()` rejects new tasks but lets previously submitted ones complete; `shutdownNow()` interrupts tasks."
  },
  {
    id: 90,
    domain: "Concurrency",
    prompt: "Which statements about `AtomicReference` are correct?",
    options: [
      "It provides compare-and-set semantics for object references.",
      "It can only store primitive values.",
      "It is part of the `java.util.concurrent.atomic` package."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "AtomicReference supports CAS operations on objects and resides in the atomic package; primitives use specialized classes."
  },
  {
    id: 91,
    domain: "Streams & Functional",
    prompt: "Which collector partitions elements into boolean buckets?",
    options: ["`Collectors.partitioningBy`", "`Collectors.mapping`", "`Collectors.teeing`"],
    answer: [0],
    multiple: false,
    rationale:
      "`partitioningBy` splits data into two groups based on a predicate result."
  },
  {
    id: 92,
    domain: "Streams & Functional",
    prompt: "What is the effect of invoking `mapMulti` in Java 16 streams?",
    options: [
      "It allows pushing zero or more results per input element into the downstream consumer.",
      "It enforces parallel execution of the stream.",
      "It materializes the stream into a list eagerly."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`mapMulti` acts like a fusion of `flatMap` with lower allocation overhead, emitting multiple results per element."
  },
  {
    id: 93,
    domain: "Streams & Functional",
    prompt: "Which operations terminate a stream pipeline?",
    options: [
      "`collect`",
      "`forEach`",
      "`filter`"
    ],
    answer: [0, 1],
    multiple: true,
    rationale:
      "`collect` and `forEach` are terminal operations; `filter` is intermediate."
  },
  {
    id: 94,
    domain: "File I/O & NIO.2",
    prompt: "Which approaches read all bytes from a file efficiently?",
    options: [
      "`Files.readAllBytes(path)`",
      "`InputStream.read()` inside a tight loop without buffering.",
      "`Files.readString(path, StandardCharsets.UTF_8)` for text files."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "`readAllBytes` loads entire content; `readString` handles text conveniently. Unbuffered single-byte reads are inefficient."
  },
  {
    id: 95,
    domain: "File I/O & NIO.2",
    prompt: "What does `Files.isSameFile(path1, path2)` determine?",
    options: [
      "Whether two paths locate the same underlying file.",
      "Whether two paths have identical text content.",
      "Whether two paths share the same parent directory."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "`isSameFile` resolves symbolic links and metadata to test if paths refer to the same file."
  },
  {
    id: 96,
    domain: "JDBC & Persistence",
    prompt: "Which isolation level prevents dirty reads but allows non-repeatable reads?",
    options: ["READ_COMMITTED", "READ_UNCOMMITTED", "SERIALIZABLE"],
    answer: [0],
    multiple: false,
    rationale:
      "READ_COMMITTED disallows dirty reads but still permits non-repeatable reads and phantom reads."
  },
  {
    id: 97,
    domain: "JDBC & Persistence",
    prompt: "What does optimistic locking with a `@Version` field in JPA accomplish?",
    options: [
      "It detects conflicting updates and throws an `OptimisticLockException`.",
      "It enforces database-level exclusive locks for the entire transaction.",
      "It updates the version column automatically on flush."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Optimistic locking increments the version on flush and detects concurrent modifications without database locks."
  },
  {
    id: 98,
    domain: "Security",
    prompt: "Which headers should a Java web application set to mitigate clickjacking?",
    options: [
      "`X-Frame-Options: DENY` or `Content-Security-Policy` frame-ancestors directive.",
      "`X-Powered-By` identifying the Java version.",
      "`Strict-Transport-Security` for HSTS."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "Frame-control headers prevent clickjacking, and HSTS enforces HTTPS; exposing `X-Powered-By` adds no protection."
  },
  {
    id: 99,
    domain: "Security",
    prompt: "Which Java APIs support JSON Web Token (JWT) handling?",
    options: [
      "Jakarta EE `JsonWebToken` interface via MicroProfile JWT.",
      "`java.util.zip` package.",
      "Third-party libraries like `jjwt` or `Nimbus JOSE + JWT`."
    ],
    answer: [0, 2],
    multiple: true,
    rationale:
      "MicroProfile JWT and dedicated libraries provide JWT parsing and validation; `java.util.zip` is unrelated."
  },
  {
    id: 100,
    domain: "Testing & Quality",
    prompt: "What is the goal of contract testing in distributed Java systems?",
    options: [
      "To verify that service providers and consumers adhere to agreed interaction contracts.",
      "To perform stress testing under peak load.",
      "To replace unit testing entirely."
    ],
    answer: [0],
    multiple: false,
    rationale:
      "Contract tests validate that services communicate according to defined schemas and expectations."
  }
];

const examState = {
  currentIndex: 0,
  answers: Array.from({ length: examQuestions.length }, () => []),
  visited: new Set(),
  flagged: new Set(),
  startedAt: Date.now(),
  durationMs: 60 * 1000 * examQuestions.length, // 60s per question
  reviewOpen: false,
  submitted: false
};

const elements = {
  palette: document.getElementById("question-palette"),
  answeredCount: document.getElementById("answered-count"),
  flaggedCount: document.getElementById("flagged-count"),
  remainingCount: document.getElementById("remaining-count"),
  togglePalette: document.getElementById("toggle-palette"),
  questionContainer: document.getElementById("question-container"),
  questionProgress: document.getElementById("question-progress"),
  questionDomain: document.getElementById("question-domain"),
  progressFill: document.getElementById("progress-fill"),
  progressBar: document.querySelector(".progress-bar"),
  flagButton: document.getElementById("flag-question"),
  prevButton: document.getElementById("prev-question"),
  nextButton: document.getElementById("next-question"),
  submitButton: document.getElementById("submit-exam"),
  elapsed: document.getElementById("elapsed-time"),
  reviewOverlay: document.getElementById("review-overlay"),
  closeReview: document.getElementById("close-review"),
  reviewContent: document.getElementById("review-content"),
  scorePercent: document.getElementById("score-percent"),
  scoreDetail: document.getElementById("score-detail"),
  reviewElapsed: document.getElementById("review-elapsed"),
  expandAll: document.getElementById("expand-all"),
  collapseAll: document.getElementById("collapse-all"),
  themeToggle: document.getElementById("mode-toggle")
};

// Active question set (supports retrying subsets)
let activeIndices = examQuestions.map((_, i) => i);
const activeLength = () => activeIndices.length;
const origIndexFromActive = (idx) => activeIndices[idx];
const questionAtActive = (idx) => examQuestions[origIndexFromActive(idx)];

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
  const elapsed = Date.now() - examState.startedAt;
  const remaining = Math.max(0, examState.durationMs - elapsed);
  elements.elapsed.textContent = formatTime(remaining);
  if (remaining === 0 && !examState.submitted) {
    examState.submitted = true;
    gradeExam();
    elements.reviewOverlay.classList.add("visible");
    elements.reviewOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    examState.reviewOpen = true;
  }
}

setInterval(updateTimer, 1000);
updateTimer();

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    elements.themeToggle.checked = true;
  }
}

applySavedTheme();

elements.themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", elements.themeToggle.checked ? "dark" : "light");
});

function renderPalette() {
  elements.palette.innerHTML = "";
  activeIndices.forEach((origIdx, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "palette-item";
    button.textContent = index + 1;
    const answer = examState.answers[origIdx];
    if (answer && answer.length) {
      button.classList.add("answered");
    } else if (examState.visited.has(index)) {
      button.classList.add("skipped");
    } else {
      button.classList.add("unanswered");
    }
    if (examState.flagged.has(index)) {
      button.classList.add("flagged");
    }
    if (index === examState.currentIndex) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      examState.currentIndex = index;
      renderQuestion();
    });
    elements.palette.appendChild(button);
  });

  const answered = activeIndices.filter(i => examState.answers[i] && examState.answers[i].length).length;
  elements.answeredCount.textContent = answered;
  elements.flaggedCount.textContent = examState.flagged.size;
  elements.remainingCount.textContent = activeIndices.length - answered;
}

function createOptionInput(question, optionText, optionIndex, origIndex) {
  const id = `q${question.id}-opt${optionIndex}`;
  const wrapper = document.createElement("div");
  wrapper.className = "option-row";
  const input = document.createElement("input");
  input.id = id;
  input.name = `question-${question.id}`;
  input.type = question.multiple ? "checkbox" : "radio";
  input.value = optionIndex;
  const selected = examState.answers[origIndex] || [];
  if (selected.includes(optionIndex)) {
    input.checked = true;
  }
  input.addEventListener("change", (event) => {
    handleAnswerChange(question, optionIndex, event.target.checked, origIndex);
  });

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = optionText;

  wrapper.append(input, label);
  return wrapper;
}

function handleAnswerChange(question, optionIndex, isChecked, origIndex) {
  const selections = [...(examState.answers[origIndex] || [])];

  if (question.multiple) {
    if (isChecked) {
      const maxSelections = Math.min(question.answer.length, 3);
      if (!selections.includes(optionIndex)) {
        if (selections.length >= maxSelections) {
          const message = document.getElementById("selection-warning");
          if (message) {
            message.textContent = `Select up to ${maxSelections} option${maxSelections > 1 ? "s" : ""}.`;
            message.classList.add("visible");
            setTimeout(() => message.classList.remove("visible"), 2000);
          }
          const input = document.querySelector(`#q${question.id}-opt${optionIndex}`);
          if (input) {
            input.checked = false;
          }
          return;
        }
        selections.push(optionIndex);
      }
    } else {
      const idx = selections.indexOf(optionIndex);
      if (idx >= 0) {
        selections.splice(idx, 1);
      }
    }
  } else {
    selections.length = 0;
    if (isChecked) {
      selections.push(optionIndex);
    }
  }

  examState.answers[origIndex] = selections;
  renderPalette();
  updateNavButtons();
}

function renderQuestion() {
  const origIndex = origIndexFromActive(examState.currentIndex);
  const question = examQuestions[origIndex];
  // mark this question as visited when rendering
  examState.visited.add(examState.currentIndex);
  elements.questionProgress.textContent = `Question ${examState.currentIndex + 1} of ${activeIndices.length}`;
  elements.questionDomain.textContent = `Domain: ${question.domain}`;

  const progressPercent = ((examState.currentIndex + 1) / activeIndices.length) * 100;
  elements.progressFill.style.width = `${progressPercent}%`;
  elements.progressBar.setAttribute("aria-valuenow", String(examState.currentIndex + 1));

  elements.questionContainer.innerHTML = "";
  const prompt = document.createElement("h3");
  prompt.textContent = question.prompt;
  elements.questionContainer.appendChild(prompt);

  if (question.multiple) {
    const guidance = document.createElement("p");
    guidance.className = "selection-guidance";
    const expected = Math.min(question.answer.length, 3);
    guidance.textContent = `Select ${question.answer.length === 1 ? "the" : "up to"} ${expected} answer${expected > 1 ? "s" : ""}.`;
    elements.questionContainer.appendChild(guidance);
  }

  const warning = document.createElement("p");
  warning.id = "selection-warning";
  warning.className = "selection-warning";
  warning.setAttribute("aria-live", "assertive");
  elements.questionContainer.appendChild(warning);

  const list = document.createElement("div");
  list.className = "options-container";
  question.options.forEach((option, index) => {
    list.appendChild(createOptionInput(question, option, index, origIndex));
  });
  elements.questionContainer.appendChild(list);

  const note = document.createElement("p");
  note.className = "flag-note";
  note.textContent = examState.flagged.has(examState.currentIndex)
    ? "This question is flagged for review."
    : "";
  elements.questionContainer.appendChild(note);

  elements.flagButton.textContent = examState.flagged.has(examState.currentIndex)
    ? "Unflag"
    : "Flag for Review";
  elements.flagButton.setAttribute("aria-pressed", examState.flagged.has(examState.currentIndex) ? "true" : "false");

  updateNavButtons();
  renderPalette();
}

function updateNavButtons() {
  elements.prevButton.disabled = examState.currentIndex === 0;
  elements.nextButton.disabled = examState.currentIndex === activeIndices.length - 1;

  // Keep submit enabled; show state through label instead of disabling
  const answeredCount = activeIndices.filter(i => examState.answers[i] && examState.answers[i].length).length;
  elements.submitButton.disabled = false;
  elements.submitButton.title = `${answeredCount}/${activeIndices.length} answered`;
}

elements.prevButton.addEventListener("click", () => {
  if (examState.currentIndex > 0) {
    examState.currentIndex -= 1;
    renderQuestion();
  }
});

elements.nextButton.addEventListener("click", () => {
  if (examState.currentIndex < activeIndices.length - 1) {
    examState.currentIndex += 1;
    renderQuestion();
  }
});

elements.flagButton.addEventListener("click", () => {
  if (examState.flagged.has(examState.currentIndex)) {
    examState.flagged.delete(examState.currentIndex);
    elements.flagButton.textContent = "Flag for Review";
  } else {
    examState.flagged.add(examState.currentIndex);
    elements.flagButton.textContent = "Unflag";
  }
  renderPalette();
  renderQuestion();
});

elements.togglePalette.addEventListener("click", () => {
  const sidebar = document.querySelector(".exam-sidebar");
  sidebar.classList.toggle("collapsed");
  const expanded = !sidebar.classList.contains("collapsed");
  elements.togglePalette.textContent = expanded ? "Hide Palette" : "Show Palette";
  elements.togglePalette.setAttribute("aria-expanded", String(expanded));
});

function gradeExam() {
  let correct = 0;
  const reviewNodes = document.createDocumentFragment();

  activeIndices.forEach((origIndex, index) => {
    const question = examQuestions[origIndex];
    const userAnswer = examState.answers[origIndex] || [];
    const correctAnswer = [...question.answer].sort((a, b) => a - b);
    const sortedUser = [...userAnswer].sort((a, b) => a - b);
    const isCorrect =
      correctAnswer.length === sortedUser.length &&
      correctAnswer.every((value, idx) => value === sortedUser[idx]);

    const overlapCount = sortedUser.filter(v => correctAnswer.includes(v)).length;
    const skipped = userAnswer.length === 0;
    const partial = !skipped && !isCorrect && overlapCount > 0;

    if (isCorrect) {
      correct += 1;
    }

    const item = document.createElement("details");
    item.className = "review-item";
    const statusClass = skipped ? "skipped" : (isCorrect ? "correct" : (partial ? "partial" : "incorrect"));
    item.classList.add(statusClass);
    item.open = isCorrect || index < 3;

    const summary = document.createElement("summary");
    const label = skipped ? "Not answered" : (isCorrect ? "Correct" : (partial ? "Partially correct" : "Wrong"));
    const badgeCls = skipped ? "skipped" : (isCorrect ? "correct" : (partial ? "partial" : "incorrect"));
    summary.innerHTML = `<span class="badge ${badgeCls}">${label}</span> Question ${index + 1}: ${question.prompt}`;
    item.appendChild(summary);

    const content = document.createElement("div");
    content.className = "review-body";

    const selectedList = userAnswer.length
      ? userAnswer.map((ansIndex) => question.options[ansIndex]).join("; ")
      : "Not answered";
    const correctList = question.answer.map((ansIndex) => question.options[ansIndex]).join("; ");

    content.innerHTML = `
      <p><strong>Your answer:</strong> ${selectedList}</p>
      <p><strong>Correct answer:</strong> ${correctList}</p>
      <p class="rationale"><strong>Rationale:</strong> ${question.rationale}</p>
    `;

    item.appendChild(content);
    reviewNodes.appendChild(item);
  });

  const scorePercent = Math.round((correct / activeIndices.length) * 100);
  elements.scorePercent.textContent = `${scorePercent}%`;
  const passed = scorePercent >= 80;
  elements.scorePercent.classList.toggle("pass", passed);
  elements.scorePercent.classList.toggle("fail", !passed);
  elements.scoreDetail.textContent = `${correct} of ${activeIndices.length} correct — ${passed ? "Passed" : "Failed"} (>= 80%)`;
  elements.reviewContent.innerHTML = "";
  elements.reviewContent.appendChild(reviewNodes);
  elements.reviewElapsed.textContent = formatTime(Date.now() - examState.startedAt);
}

elements.submitButton.addEventListener("click", () => {
  if (examState.reviewOpen) return;
  const unanswered = examState.answers.filter((ans) => !ans || ans.length === 0).length;
  if (unanswered > 0) {
    const proceed = confirm(`You still have ${unanswered} unanswered question${unanswered>1?"s":""}. Review & submit now?`);
    if (!proceed) return;
  }
  gradeExam();
  elements.reviewOverlay.classList.add("visible");
  elements.reviewOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  examState.reviewOpen = true;
});

elements.closeReview.addEventListener("click", () => {
  elements.reviewOverlay.classList.remove("visible");
  elements.reviewOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  examState.reviewOpen = false;
});

elements.expandAll.addEventListener("click", () => {
  document.querySelectorAll(".review-item").forEach((item) => {
    item.open = true;
  });
});

elements.collapseAll.addEventListener("click", () => {
  document.querySelectorAll(".review-item").forEach((item) => {
    item.open = false;
  });
});

// Restart and retry buttons in review panel
document.getElementById("restart-exam").addEventListener("click", () => {
  activeIndices = examQuestions.map((_, i) => i);
  examState.currentIndex = 0;
  examState.answers = Array.from({ length: examQuestions.length }, () => []);
  examState.visited = new Set();
  examState.flagged = new Set();
  examState.startedAt = Date.now();
  examState.durationMs = 60 * 1000 * activeIndices.length;
  examState.reviewOpen = false;
  examState.submitted = false;
  elements.reviewOverlay.classList.remove("visible");
  elements.reviewOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  renderPalette();
  renderQuestion();
});

document.getElementById("retry-incomplete").addEventListener("click", () => {
  const toRetry = [];
  examQuestions.forEach((q, idx) => {
    const a = examState.answers[idx] || [];
    const correct = [...q.answer].sort((x, y) => x - y);
    const user = [...a].sort((x, y) => x - y);
    const isCorrect = correct.length === user.length && correct.every((v, i) => v === user[i]);
    if (!a.length || !isCorrect) toRetry.push(idx);
  });
  if (!toRetry.length) {
    alert("Nothing to retry — all questions are correct.");
    return;
  }
  activeIndices = toRetry;
  toRetry.forEach(i => { examState.answers[i] = []; });
  examState.currentIndex = 0;
  examState.visited = new Set();
  examState.flagged = new Set();
  examState.startedAt = Date.now();
  examState.durationMs = 60 * 1000 * activeIndices.length;
  examState.reviewOpen = false;
  examState.submitted = false;
  elements.reviewOverlay.classList.remove("visible");
  elements.reviewOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  renderPalette();
  renderQuestion();
});

// Anti-cheat heuristics: block context menu and basic screenshot hotkeys outside review
document.addEventListener("contextmenu", (e) => {
  if (!examState.reviewOpen) e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if (examState.reviewOpen) return;
  const key = e.key.toLowerCase();
  const isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
  const printScreen = e.key === 'PrintScreen';
  const winSnip = e.ctrlKey && e.shiftKey && (key === 's'); // Win+Ctrl+Shift+S often handled at OS, heuristic
  const macShot = e.metaKey && e.shiftKey && (key === '3' || key === '4');
  const printDlg = (e.ctrlKey && key === 'p') || (isMac && e.metaKey && key === 'p');
  if (printScreen || winSnip || macShot || printDlg) {
    e.preventDefault();
    alert('Screenshot detected');
  }
});

renderPalette();
renderQuestion();

