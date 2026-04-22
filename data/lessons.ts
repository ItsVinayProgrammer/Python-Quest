
import type { Lesson } from '../types';

export const lessons: Lesson[] = [
    {
        day: 1,
        title: 'Hello, World! & The print() Function',
        skill: 'Basics',
        tutorial: {
            coreConcept: {
                title: "What is `print()`?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of your computer as a very obedient but silent assistant. It can do a lot of calculations and processing, but unless you tell it to show you the results, you'll never know what it's thinking. The `print()` function is your primary tool for telling Python: 'Hey, show this to me!'." },
                    { type: 'paragraph', content: "It's a fundamental command that outputs text, numbers, or the values of variables to the console, which is the text output area you see in your development environment. Mastering `print()` is the first step to debugging your code and seeing it come to life." },
                    { type: 'note', content: "Everything you want to print as plain text needs to be wrapped in quotes, either single (`' '`) or double (`\" \"`)." },
                ]
            },
            syntax: {
                title: "How to Use `print()`",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The syntax is straightforward. You type `print`, followed by parentheses `()`. Whatever you put inside the parentheses is what gets printed." },
                    { type: 'code', language: 'python', content: 'print("Your text goes here")' },
                    { type: 'paragraph', content: "You can also print variables (we'll cover these more on Day 2):" },
                    { type: 'code', language: 'python', content: 'message = "I am learning Python!"\nprint(message)' },
                    { type: 'note', content: "When printing variables, you don't use quotes around the variable name itself." },
                ]
            },
            realWorldExample: {
                title: "A Simple Greeting",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you're writing a simple program to welcome users to your app. `print()` is perfect for that." },
                    { type: 'code', language: 'python', content: '# A program to display a welcome message\nprint("Welcome to Python Quest!")\nprint("Let your adventure begin...")' },
                    { type: 'paragraph', content: "This is like a receptionist at an office building. The first line greets the visitor, and the second gives them a friendly instruction. Each `print()` statement typically creates a new line of output." },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting the parentheses:" },
                    { type: 'code', language: 'python', content: '# INCORRECT in Python 3\n# print "Hello, World!"' },
                    { type: 'note', content: "This syntax was used in a very old version of Python (Python 2) and will cause a `SyntaxError` in modern Python." },
                    { type: 'paragraph', content: "Mismatched quotes:" },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# print("Hello, World!\')' },
                    { type: 'warning', content: "Always use the same type of quote to start and end your string." },
                    { type: 'paragraph', content: "Forgetting quotes for text:" },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# print(Hello, World!)' },
                    { type: 'note', content: "Python will think `Hello` and `World!` are variables, which probably don't exist, causing a `NameError`." },
                ]
            }
        },
        challenges: [
            {
                id: 'day1-core',
                title: 'Print "Hello, Python Quest!"',
                description: 'Write a single line of Python code that prints the exact string "Hello, Python Quest!" to the console.',
                starterCode: '# Your code here\n',
                testCases: [ { input: [], expected: 'Hello, Python Quest!\n', hidden: false } ],
                xp: 50,
                isOptional: false,
                difficulty: 'Beginner',
            },
            {
                id: 'day1-practice-print-number',
                title: 'Print a Number',
                description: 'Write code to print the number `100` to the console.',
                starterCode: '# Your code here\n',
                testCases: [ { input: [], expected: '100\n', hidden: false } ],
                xp: 25,
                isOptional: true,
                difficulty: 'Beginner',
            },
            {
                id: 'day1-bonus',
                title: 'Print on Two Lines',
                description: "Write code to print 'First line' and then 'Second line' on two separate lines. The easiest way is to use two separate `print()` statements.",
                starterCode: '# Your code here\n',
                testCases: [ { input: [], expected: 'First line\nSecond line\n', hidden: false } ],
                xp: 75,
                isOptional: true,
                difficulty: 'Intermediate',
            },
            {
                id: 'day1-practice-print-with-sep',
                title: 'Print with a Separator',
                description: 'Use a single `print()` statement to print the numbers 1, 2, and 3, but separate them with a dash `-`. The output should be `1-2-3`. Hint: look up the `sep` argument for the `print()` function.',
                starterCode: '# Your code here\n',
                testCases: [ { input: [], expected: '1-2-3\n', hidden: false } ],
                xp: 100,
                isOptional: true,
                difficulty: 'Advanced',
            }
        ]
    },
    {
        day: 2,
        title: 'Variables & Data Types',
        skill: 'Variables',
        tutorial: {
            coreConcept: {
                title: "What Are Variables?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you have a set of labeled jars in your kitchen. One jar is labeled 'Flour', another 'Sugar', and another 'Cookies'. Variables in Python are just like these jars: they are containers with names that you use to store information." },
                    { type: 'paragraph', content: "Just as you can store different things in jars, you can store different types of data in variables. This could be text (like a name), numbers (like an age), or even more complex things. Using variables makes your code readable and easy to manage, as you can refer to the data by its name instead of its value." },
                ]
            },
            syntax: {
                title: "How to Use Variables",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "Creating a variable is as simple as choosing a name and using the equals sign (`=`) to assign it a value. Python automatically figures out the data type." },
                    { type: 'code', language: 'python', content: '# A variable to store text (a string)\nplayer_name = "Alex"\n\n# A variable to store a whole number (an integer)\nplayer_score = 100\n\n# A variable to store a number with a decimal (a float)\nhealth_percentage = 95.5\n\n# A variable to store a True/False value (a boolean)\nis_active = True' },
                    { type: 'paragraph', content: "Once you've stored data in a variable, you can use the `print()` function to see its value." },
                    { type: 'code', language: 'python', content: 'print(player_name)\nprint(player_score)' },
                ]
            },
            realWorldExample: {
                title: "Simple User Profile",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's create a mini user profile. We store the user's name and age in variables and then print a welcome message." },
                    { type: 'code', language: 'python', content: '# Store user information\nusername = "Kai"\nage = 28\n\n# Display the profile information\nprint("User Profile:")\nprint("Name: ")\nprint(username)\nprint("Age: ")\nprint(age)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Using a variable before creating it. This will give you a `NameError` because Python doesn't know what you're referring to." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# print(my_variable)  # This will cause an error\n# my_variable = "hello"' },
                    { type: 'paragraph', content: "Forgetting quotes for text values. Python will think the text is another variable name." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# user = Alice  # Python thinks Alice is a variable' },
                    { type: 'warning', content: "Variable names are case-sensitive. `score` is a different variable from `Score`." },
                ]
            }
        },
        challenges: [
            { id: 'day2-core', title: 'Store and Print a Greeting', description: "Create a variable named `greeting` and assign it the value 'Welcome to Day 2'. Then, print the value of the variable.", starterCode: '# Create your variable\n\n# Print your variable\n', testCases: [{ input: [], expected: 'Welcome to Day 2\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day2-practice-types', title: 'Store Player Stats', description: 'Create three variables: `player_name` with a string value "Hero", `level` with a number value 10, and `is_ready` with a boolean value `True`. Print each variable on a new line.', starterCode: '# Your code here', testCases: [{ input: [], expected: 'Hero\n10\nTrue\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day2-practice-reassign', title: 'Update a Score', description: 'Create a variable `score` and set it to 50. Print it. Then, on a new line, update the `score` to 100 and print it again.', starterCode: '# Your code here\nscore = 50\nprint(score)\n', testCases: [{ input: [], expected: '50\n100\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day2-practice-concatenate', title: 'Combine Name and Greeting', description: 'Create a variable `name` with your name, and another variable `greeting` with "Hello, ". Combine them using the `+` operator and print the result.', starterCode: 'name = "Alex"\ngreeting = "Hello, "\n# Your code here', testCases: [{ input: [], expected: 'Hello, Alex\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 3,
        title: 'Basic Arithmetic',
        skill: 'Basics',
        tutorial: {
            coreConcept: {
                title: "What is Arithmetic in Python?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of Python as a super-smart calculator that's always available. You can ask it to perform mathematical calculations, from simple addition and subtraction to more complex operations. This is a fundamental building block in programming, used everywhere from calculating scores in a game to processing financial data." },
                ]
            },
            syntax: {
                title: "How to Use Operators",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "Python uses standard symbols, called operators, for math." },
                    { type: 'code', language: 'python', content: 'a = 10\nb = 3\n\nprint(a + b)  # Addition: 13\nprint(a - b)  # Subtraction: 7\nprint(a * b)  # Multiplication: 30\nprint(a / b)  # Division: 3.333...\nprint(a // b) # Floor Division (discards remainder): 3\nprint(a % b)  # Modulo (gets the remainder): 1\nprint(a ** b) # Exponent (10 to the power of 3): 1000' },
                    { type: 'note', content: "You can use parentheses `()` to control the order of operations, just like in math class (PEMDAS/BODMAS)." },
                ]
            },
            realWorldExample: {
                title: "Simple Shopping Calculator",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's calculate the total cost of a few items in a shopping cart." },
                    { type: 'code', language: 'python', content: 'item1_price = 15\nitem2_price = 20\nitem3_price = 5\ntax_rate = 0.1 # 10% tax\n\nsubtotal = item1_price + item2_price + item3_price\ntax_amount = subtotal * tax_rate\ntotal_cost = subtotal + tax_amount\n\nprint("Subtotal:")\nprint(subtotal)\nprint("Total Cost:")\nprint(total_cost)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Dividing by zero. This will crash your program with a `ZeroDivisionError`." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# result = 10 / 0' },
                    { type: 'paragraph', content: "Ignoring the order of operations. Without parentheses, Python follows a specific order (`*` and `/` before `+` and `-`)." },
                    { type: 'code', language: 'python', content: 'result = 10 + 2 * 3 # This is 16, not 36\ncorrect_result = (10 + 2) * 3 # This is 36' },
                ]
            }
        },
        challenges: [
            { id: 'day3-core', title: 'Add Two Numbers', description: 'Add 10 and 35 and print the result.', starterCode: 'a = 10\nb = 35\n# Your code here\n', testCases: [{ input: [], expected: '45\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day3-practice-area', title: 'Calculate Rectangle Area', description: 'Two variables, `width` and `height`, are provided. Multiply them to calculate the area and print the result.', starterCode: 'width = 8\nheight = 5\n# Your code here', testCases: [{ input: [], expected: '40\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day3-practice-remainder', title: 'Find the Remainder', description: 'Calculate the remainder when 27 is divided by 4. Print the result. Hint: use the modulo operator (`%`).', starterCode: '# Your code here', testCases: [{ input: [], expected: '3\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day3-practice-temp', title: 'Celsius to Fahrenheit', description: 'Convert a temperature from Celsius to Fahrenheit. The formula is `(C * 9/5) + 32`. Print the result.', starterCode: 'celsius = 25\n# Your code here', testCases: [{ input: [], expected: '77.0\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day3-practice-exponent', title: 'Calculate Exponent', description: 'Calculate 2 to the power of 8 (2^8). Print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '256\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 4,
        title: 'Introduction to Lists',
        skill: 'Data Structures',
        tutorial: {
            coreConcept: {
                title: "What is a List?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine a to-do list for your day. You have a sequence of tasks, and each one is in a specific order. A Python list is exactly that: an ordered collection of items. You can add items, remove them, and change them. Lists are one of the most versatile data structures in Python." },
                ]
            },
            syntax: {
                title: "How to Use Lists",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You create a list by placing items inside square brackets `[]`, separated by commas." },
                    { type: 'code', language: 'python', content: '# A list of strings\ncolors = ["red", "green", "blue"]\n\n# A list of numbers\nscores = [88, 92, 100, 75]\n\n# A list with mixed data types\nmixed_list = ["hello", 10, True, 3.14]' },
                    { type: 'paragraph', content: "You access items in a list using their index, which starts at 0." },
                    { type: 'code', language: 'python', content: 'colors = ["red", "green", "blue"]\nprint(colors[0]) # Prints "red"\nprint(colors[1]) # Prints "green"' },
                    { type: 'paragraph', content: "You can also change an item at a specific index." },
                    { type: 'code', language: 'python', content: 'colors[1] = "yellow"\nprint(colors) # Prints ["red", "yellow", "blue"]' },
                    { type: 'note', content: "To add an item to the end of a list, use the `.append()` method: `colors.append('purple')`."}
                ]
            },
            realWorldExample: {
                title: "Party Guest List",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's manage a guest list for a party. We can create a list, add a new guest, and then check who the first guest on the list is." },
                    { type: 'code', language: 'python', content: '# Initial guest list\nguests = ["Alice", "Bob", "Charlie"]\n\n# A new guest arrives!\nguests.append("Diana")\n\n# Check the first guest and the total number of guests\nfirst_guest = guests[0]\nnumber_of_guests = len(guests)\n\nprint("Current Guests:")\nprint(guests)\nprint("First Guest:")\nprint(first_guest)\nprint("Total Guests:")\nprint(number_of_guests)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Off-by-one error (or `IndexError`). This happens when you try to access an index that doesn't exist. Remember, for a list with 3 items, the valid indices are 0, 1, and 2." },
                    { type: 'code', language: 'python', content: '# INCORRECT\ncolors = ["red", "green", "blue"]\n# print(colors[3]) # This causes an IndexError' },
                    { type: 'warning', content: "Forgetting that list indices start at 0, not 1. `my_list[1]` is the second item, not the first." },
                ]
            }
        },
        challenges: [
            { id: 'day4-core', title: 'Create a List of Fruits', description: 'Create a list named `fruits` containing "apple", "banana", and "cherry". Then, print the entire list.', starterCode: '# Your code here', testCases: [{ input: [], expected: "['apple', 'banana', 'cherry']\n", hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day4-practice-access', title: 'Access a List Item', description: 'A list of planets is provided. Print the third planet, "Earth".', starterCode: 'planets = ["Mercury", "Venus", "Earth", "Mars"]\n# Your code here', testCases: [{ input: [], expected: 'Earth\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day4-practice-append', title: 'Add to a List', description: 'A list of numbers is given. Use the `.append()` method to add the number 4 to the end of the list, then print the updated list.', starterCode: 'numbers = [1, 2, 3]\n# Your code here', testCases: [{ input: [], expected: '[1, 2, 3, 4]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day4-practice-change-item', title: 'Change a List Item', description: 'Given the list `colors`, change the second item ("green") to "yellow". Then print the updated list.', starterCode: 'colors = ["red", "green", "blue"]\n# Your code here', testCases: [{ input: [], expected: "['red', 'yellow', 'blue']\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day4-practice-length', title: 'Find List Length', description: 'Print the number of items in the `inventory` list using the `len()` function.', starterCode: 'inventory = ["sword", "shield", "potion", "gold coin"]\n# Your code here', testCases: [{ input: [], expected: '4\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 5,
        title: 'Conditional Statements',
        skill: 'Control Flow',
        tutorial: {
            coreConcept: {
                title: "What are Conditionals?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you're giving directions. You might say, 'IF the light is green, then cross the street. ELSE, wait.' Conditional statements (`if`, `elif`, `else`) in Python work just like that. They allow your program to make decisions and execute different pieces of code based on whether a certain condition is true or false." },
                ]
            },
            syntax: {
                title: "How to Use Conditionals",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The basic structure starts with an `if` statement, followed by a condition and a colon `:`. The code to be executed if the condition is true must be indented." },
                    { type: 'code', language: 'python', content: 'temperature = 30\n\nif temperature > 25:\n    print("It\'s a hot day!")\n' },
                    { type: 'paragraph', content: "You can add an `else` block to run code if the `if` condition is false." },
                    { type: 'code', language: 'python', content: 'age = 16\n\nif age >= 18:\n    print("You can vote.")\nelse:\n    print("You are not old enough to vote.")' },
                    { type: 'paragraph', content: "To check for multiple conditions, use `elif` (short for 'else if')." },
                    { type: 'code', language: 'python', content: 'score = 85\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C or below")' },
                ]
            },
            realWorldExample: {
                title: "Login System Check",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Here's a very simple check for a login system. It checks if a password is correct." },
                    { type: 'code', language: 'python', content: 'saved_password = "python123"\nuser_input = "python123"\n\nif user_input == saved_password:\n    print("Access granted!")\nelse:\n    print("Access denied. Incorrect password.")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Using a single equals sign (`=`) for comparison. `=` is for assigning values, while `==` is for checking if two values are equal." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# if age = 18:\n\n# CORRECT\n# if age == 18:' },
                    { type: 'paragraph', content: "Forgetting the colon `:` at the end of the `if`, `elif`, or `else` line. This will cause a `SyntaxError`." },
                    { type: 'warning', content: "Incorrect indentation. The code inside the `if`/`elif`/`else` blocks must be indented consistently (usually with 4 spaces)." },
                ]
            }
        },
        challenges: [
            { id: 'day5-core', title: 'If-Else Statement', description: 'A variable `num` is provided. Write an if-else statement that prints "Positive" if `num` is greater than 0, and "Not positive" otherwise.', starterCode: 'num = 5\n# Your code here', testCases: [{ input: [], expected: 'Positive\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day5-practice-equality', title: 'Check for Equality', description: 'Check if the variable `color` is equal to the string "blue". If it is, print "The color is blue".', starterCode: 'color = "blue"\n# Your code here', testCases: [{ input: [], expected: 'The color is blue\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day5-practice-even-odd', title: 'Even or Odd', description: 'Check if a number is even or odd. If the number is even, print "Even". Otherwise, print "Odd". Hint: use the modulo operator (`%`).', starterCode: 'number = 7\n# Your code here', testCases: [{ input: [], expected: 'Odd\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day5-practice-grades', title: 'Grade Check', description: 'Write an if-elif-else statement to check a student\'s grade. If `score` is 90 or above, print "Excellent". If it\'s between 70 and 89, print "Good". Otherwise, print "Needs Improvement".', starterCode: 'score = 85\n# Your code here', testCases: [{ input: [], expected: 'Good\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day5-practice-discount', title: 'Discount Logic', description: 'Write a program to check if a customer gets a discount. If their `age` is under 12 OR over 65, print "Discount applied". Otherwise, print "No discount".', starterCode: 'age = 70\n# Your code here', testCases: [{ input: [], expected: 'Discount applied\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
     {
        day: 6,
        title: 'Introduction to Functions',
        skill: 'Functions',
        tutorial: {
            coreConcept: {
                title: "What are Functions?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of a function like a recipe for a cake. Instead of writing down all the steps every single time you want a cake, you just refer to the 'Chocolate Cake Recipe'. In programming, a function is a reusable block of code that performs a specific task. You define it once and can call it whenever you need it." },
                    { type: 'paragraph', content: "This helps you avoid repeating code (making your programs shorter) and makes your code more organized and easier to understand." },
                ]
            },
            syntax: {
                title: "How to Use Functions",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You define a function using the `def` keyword, followed by a function name, parentheses `()`, and a colon `:`. The code inside the function must be indented." },
                    { type: 'code', language: 'python', content: '# Defining a simple function\ndef say_hello():\n    print("Hello there!")\n\n# Calling the function to execute it\nsay_hello()' },
                    { type: 'paragraph', content: "Functions can also take inputs, called parameters, to make them more flexible." },
                    { type: 'code', language: 'python', content: '# A function that takes a name as a parameter\ndef greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Alice") # Prints "Hello, Alice!"\ngreet("Bob")   # Prints "Hello, Bob!"' },
                    { type: 'paragraph', content: "Functions can also send a value back using the `return` keyword." },
                    { type: 'code', language: 'python', content: 'def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result) # Prints 8' },
                ]
            },
            realWorldExample: {
                title: "Area Calculator Function",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's create a reusable function to calculate the area of a rectangle. This is much better than writing the `width * height` formula every time." },
                    { type: 'code', language: 'python', content: '# Define the function once\ndef calculate_area(width, height):\n    return width * height\n\n# Use it multiple times\narea1 = calculate_area(10, 5)\narea2 = calculate_area(20, 8)\n\nprint("Area of first rectangle:")\nprint(area1)\nprint("Area of second rectangle:")\nprint(area2)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Defining a function but forgetting to call it. The code inside the `def` block will not run until the function is called." },
                    { type: 'paragraph', content: "Confusing `print` and `return`. `print` just displays a value to the screen. `return` sends a value back from the function so it can be stored in a variable or used in another calculation." },
                    { type: 'warning', content: "Mismatched arguments. Calling a function with the wrong number of arguments will cause a `TypeError`." },
                ]
            }
        },
        challenges: [
            { id: 'day6-core', title: 'Define and Call a Function', description: 'Define a function called `show_message` that prints the string "I am learning functions!". After defining it, call the function to run it.', starterCode: '# Define your function here\n\n# Call your function here\n', testCases: [{ input: [], expected: 'I am learning functions!\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day6-practice-greet-person', title: 'Greeting Function', description: 'Create a function named `greet_person` that takes one argument, `name`. The function should print a personalized greeting like "Hello, [name]!". Call it with the name "World".', starterCode: '# Your code here', testCases: [{ input: [], expected: 'Hello, World!\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Beginner' },
            { id: 'day6-practice-add', title: 'Sum Function', description: 'Define a function `get_sum` that takes two numbers as arguments, `num1` and `num2`. The function should `return` their sum. Then call the function with `10` and `15` and print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '25\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day6-practice-square', title: 'Square a Number', description: 'Define a function `square` that takes one number and returns its square (the number multiplied by itself). Call it with the number 8 and print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '64\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day6-practice-find-max', title: 'Find Maximum of Two', description: 'Define a function `find_max` that takes two numbers and returns the larger of the two. Use an if-else statement inside. Call it with 100 and 250 and print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '250\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
     {
        day: 7,
        title: 'Understanding Dictionaries',
        skill: 'Data Structures',
        tutorial: {
            coreConcept: {
                title: "What is a Dictionary?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of a real-world dictionary. You look up a word (a 'key') to find its definition (a 'value'). A Python dictionary works the same way. It's a collection of key-value pairs, where each key is unique. Unlike lists, which are ordered by position, dictionaries are organized by keys." },
                ]
            },
            syntax: {
                title: "How to Use Dictionaries",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You create a dictionary using curly braces `{}`. Each item consists of a `key`, a colon `:`, and a `value`." },
                    { type: 'code', language: 'python', content: '# A dictionary to store a user\'s data\nuser = {\n    "name": "Alice",\n    "email": "alice@example.com",\n    "level": 5\n}' },
                    { type: 'paragraph', content: "You access a value by referring to its key inside square brackets `[]`." },
                    { type: 'code', language: 'python', content: 'print(user["name"])  # Prints "Alice"\nprint(user["level"])  # Prints 5' },
                    { type: 'paragraph', content: "You can add a new key-value pair or change an existing one easily." },
                    { type: 'code', language: 'python', content: '# Adding a new item\nuser["city"] = "New York"\n\n# Changing an existing item\nuser["level"] = 6\n\nprint(user)' },
                ]
            },
            realWorldExample: {
                title: "Phone Book",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "A dictionary is perfect for creating a simple phone book. The names are the keys and the phone numbers are the values." },
                    { type: 'code', language: 'python', content: 'phone_book = {\n    "Alice": "555-1234",\n    "Bob": "555-5678",\n    "Charlie": "555-8765"\n}\n\n# Look up Bob\'s number\nbobs_number = phone_book["Bob"]\n\nprint("Bob\'s phone number is:")\nprint(bobs_number)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Trying to access a key that doesn't exist. This will raise a `KeyError`." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# print(phone_book["David"]) # David is not in the phone book' },
                    { type: 'note', content: "To safely access a key, you can use the `.get()` method, which returns `None` (or a default value you specify) if the key is not found, instead of crashing: `phone_book.get('David')`." },
                    { type: 'paragraph', content: "Keys must be unique. If you add a key that already exists, you will overwrite the old value." },
                ]
            }
        },
        challenges: [
            { id: 'day7-core', title: 'Access Dictionary Value', description: 'Given a dictionary `user`, access and print the value associated with the key "name".', starterCode: 'user = {"name": "Alice", "age": 30}\n# Your code here', testCases: [{ input: [], expected: 'Alice\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day7-practice-create-dict', title: 'Create a Book Dictionary', description: 'Create a dictionary named `book` to represent a book. It should have the keys "title", "author", and "year" with corresponding string and number values. Print the value of the "title" key.', starterCode: '# Your code here\nbook = {"title": "The Hobbit", "author": "J.R.R. Tolkien", "year": 1937}\n', testCases: [{ input: [], expected: 'The Hobbit\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day7-practice-add-key', title: 'Add to a Dictionary', description: 'Given the `movie` dictionary, add a new key "director" with the value "Chris Columbus". Then print the entire updated dictionary.', starterCode: 'movie = {"title": "Home Alone", "year": 1990}\n# Your code here', testCases: [{ input: [], expected: "{'title': 'Home Alone', 'year': 1990, 'director': 'Chris Columbus'}\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day7-practice-update-key', title: 'Update a Value', description: 'Given the `player` dictionary, update the value of the "score" key to 150. Print the updated dictionary.', starterCode: 'player = {"name": "Zelda", "score": 100}\n# Your code here', testCases: [{ input: [], expected: "{'name': 'Zelda', 'score': 150}\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day7-practice-check-key', title: 'Check if Key Exists', description: 'Given the `settings` dictionary, check if the key "theme" exists in it. Print `True` if it exists and `False` otherwise. Hint: use the `in` keyword.', starterCode: 'settings = {"font_size": 12, "theme": "dark"}\n# Your code here', testCases: [{ input: [], expected: "True\n", hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
     {
        day: 8,
        title: 'For Loops',
        skill: 'Control Flow',
        tutorial: {
            coreConcept: {
                title: "What are For Loops?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you have a stack of letters to mail, and for each letter, you need to perform the same action: put a stamp on it. A `for` loop in Python does exactly this. It lets you iterate over a sequence of items (like a list) and execute a block of code once for each item in the sequence." },
                ]
            },
            syntax: {
                title: "How to Use For Loops",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The basic syntax is `for item in sequence:`. The block of code to be repeated must be indented." },
                    { type: 'code', language: 'python', content: 'fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print("I have a " + fruit)' },
                    { type: 'paragraph', content: "The variable `fruit` is temporary. In each iteration of the loop, it takes on the value of the next item in the `fruits` list." },
                    { type: 'paragraph', content: "If you need to loop a specific number of times, you can use the `range()` function." },
                    { type: 'code', language: 'python', content: '# Loop 5 times, from 0 to 4\nfor i in range(5):\n    print("Loop number", i)' },
                ]
            },
            realWorldExample: {
                title: "Summing Numbers in a List",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's use a `for` loop to calculate the sum of all numbers in a list of expenses." },
                    { type: 'code', language: 'python', content: 'expenses = [25.50, 8.00, 12.75, 30.00]\ntotal_expense = 0\n\nfor expense in expenses:\n    total_expense = total_expense + expense\n\nprint("Total expenses:")\nprint(total_expense)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting the colon `:` at the end of the `for` line." },
                    { type: 'paragraph', content: "Indentation errors. The code that should be inside the loop must be indented." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# for fruit in fruits:\n# print(fruit) # This will cause an IndentationError' },
                ]
            }
        },
        challenges: [
            { id: 'day8-core', title: 'Loop Through a List', description: 'Loop through the given list of fruits and print each fruit on a new line.', starterCode: 'fruits = ["apple", "banana", "cherry"]\n# Your code here', testCases: [{ input: [], expected: 'apple\nbanana\ncherry\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day8-practice-range', title: 'Print Numbers with Range', description: 'Use a `for` loop with the `range()` function to print the numbers from 1 to 5, each on a new line. Hint: `range(1, 6)`.', starterCode: '# Your code here', testCases: [{ input: [], expected: '1\n2\n3\n4\n5\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day8-practice-sum', title: 'Sum a List of Numbers', description: 'Given a list of numbers, use a `for` loop to calculate their sum and print the final total.', starterCode: 'numbers = [10, 20, 30, 40]\n# Your code here', testCases: [{ input: [], expected: '100\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day8-practice-find-evens', title: 'Find Even Numbers', description: 'Loop through the `numbers` list. If a number is even, print it. Hint: use the modulo operator (`%`).', starterCode: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8]\n# Your code here', testCases: [{ input: [], expected: '2\n4\n6\n8\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day8-practice-dict-loop', title: 'Loop Through Dictionary Keys', description: 'Use a `for` loop to iterate through the `capitals` dictionary and print each key (country name).', starterCode: 'capitals = {"USA": "Washington D.C.", "France": "Paris", "Japan": "Tokyo"}\n# Your code here', testCases: [{ input: [], expected: 'USA\nFrance\nJapan\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 9,
        title: 'Classes and Objects',
        skill: 'OOP',
        tutorial: {
            coreConcept: {
                title: "What are Classes & Objects?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of a `class` as a blueprint for making a car. The blueprint specifies that every car will have attributes (like `color` and `make`) and can perform actions, or methods (like `start_engine()` and `drive()`)." },
                    { type: 'paragraph', content: "An `object` (or instance) is an actual car built from that blueprint. You can have a red Ferrari object and a blue Ford object—both are cars made from the same blueprint, but they have different details (attribute values)." },
                    { type: 'note', content: "This concept, called Object-Oriented Programming (OOP), is a powerful way to structure your code to represent real-world things."}
                ]
            },
            syntax: {
                title: "How to Use Classes",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You define a class with the `class` keyword. Inside, you define a special method called `__init__` (the constructor) to set up the object's initial attributes." },
                    { type: 'code', language: 'python', content: 'class Dog:\n    # The __init__ method is called when a new object is created\n    def __init__(self, name, breed):\n        self.name = name  # An attribute\n        self.breed = breed # An attribute\n\n    # A method (an action the object can perform)\n    def bark(self):\n        print("Woof!")' },
                    { type: 'paragraph', content: "To create an object (an instance of the class), you call the class like a function:" },
                    { type: 'code', language: 'python', content: '# Creating two Dog objects\ndog1 = Dog("Fido", "Golden Retriever")\ndog2 = Dog("Lucy", "Poodle")\n\n# Accessing attributes\nprint(dog1.name)\n\n# Calling a method\ndog2.bark()' },
                    { type: 'warning', content: "The `self` parameter is a reference to the current instance of the class and is used to access variables that belong to the class. It must be the first parameter of any method in the class."}
                ]
            },
            realWorldExample: {
                title: "User Account Class",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Classes are perfect for representing things like a user account in an application." },
                    { type: 'code', language: 'python', content: 'class UserAccount:\n    def __init__(self, username, email):\n        self.username = username\n        self.email = email\n        self.is_active = True\n\n    def deactivate(self):\n        self.is_active = False\n        print(self.username + " has been deactivated.")\n\n# Create a user and manage their account\nuser_profile = UserAccount("py_master", "master@email.com")\nprint(user_profile.username)\nprint(user_profile.is_active)\n\nuser_profile.deactivate()\nprint(user_profile.is_active)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting `self` as the first parameter in a method definition. This is a very common error for beginners." },
                    { type: 'code', language: 'python', content: '# INCORRECT\n# class Dog:\n#    def bark(): # Missing self\n#        print("Woof!")' },
                    { type: 'paragraph', content: "Forgetting to add `self.` when accessing or setting an attribute inside a class method." },
                    { type: 'code', language: 'python', content: '# INCORRECT in __init__\n# name = "Fido" # This is just a temporary local variable\n\n# CORRECT\n# self.name = "Fido" # This is an attribute of the object' },
                ]
            }
        },
        challenges: [
            { id: 'day9-core', title: 'Create and Use a Car Class', description: 'Define a `Car` class with an `__init__` method that accepts `make` and `model` as arguments and sets them as attributes. Create an instance of this class for a "Tesla" "Model S" and print its `make` attribute.', starterCode: '# Your code here\n', testCases: [{ input: [], expected: 'Tesla\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Beginner' },
            { id: 'day9-practice-instance', title: 'Create a Dog Instance', description: 'A `Dog` class is defined for you. Create an instance of this class named `my_dog` with the name "Buddy" and breed "Golden Retriever". Then, print the `name` of your dog.', starterCode: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n# Create your instance and print its name here\n', testCases: [{ input: [], expected: 'Buddy\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day9-practice-method', title: 'Add a Method to a Class', description: 'Starting with a `Book` class that has `title` and `author` attributes, add a method named `display_info` that prints "Title by Author". Create an instance and call the method.', starterCode: 'class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n\n    # Add your method here\n\n# Create an instance for "The Hobbit" by "J.R.R. Tolkien" and call the method', testCases: [{ input: [], expected: 'The Hobbit by J.R.R. Tolkien\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day9-practice-player-level-up', title: 'Player Level Up', description: 'Define a `Player` class with `name` and `level` attributes. Add a method `level_up` that increases the player\'s level by 1. Create a player, call `level_up`, and then print their new level.', starterCode: '# Define your class here\n\n# Create a Player named "Hero" at level 1\n# Call the level_up method\n# Print the new level', testCases: [{ input: [], expected: '2\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' },
        ]
    },
    {
        day: 10,
        title: 'Importing Modules',
        skill: 'Modules',
        tutorial: {
            coreConcept: {
                title: "What are Modules?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you're building something with LEGOs. You have your main creation, but you need a specific part, like a wheel. Instead of making a wheel from scratch, you grab a pre-made wheel from a LEGO Technic set. Modules in Python are like these specialized LEGO sets. They are files containing pre-written Python code (functions, classes, variables) that you can `import` and use in your own program." },
                    { type: 'paragraph', content: "This allows you to tap into a vast library of powerful tools without having to write them all yourself. Python comes with many built-in modules for things like math, random number generation, and working with dates and times." },
                ]
            },
            syntax: {
                title: "How to Import and Use Modules",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The most common way is to import the entire module using the `import` keyword." },
                    { type: 'code', language: 'python', content: 'import math\n\n# To use a function from the module, use module_name.function_name\nprint(math.sqrt(16)) # Prints 4.0' },
                    { type: 'paragraph', content: "You can also import just a specific function from a module." },
                    { type: 'code', language: 'python', content: 'from random import randint\n\n# Now you can use the function directly\nprint(randint(1, 10)) # Prints a random number between 1 and 10' },
                    { type: 'paragraph', content: "It's also common to give a module a shorter alias (a nickname)." },
                    { type: 'code', language: 'python', content: 'import numpy as np\nimport pandas as pd' },
                ]
            },
            realWorldExample: {
                title: "Simple Dice Roll",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's build a simple dice roll simulator by using the `random` module, which is perfect for tasks involving chance." },
                    { type: 'code', language: 'python', content: 'import random\n\nprint("Rolling the dice...")\n\n# Generate a random integer between 1 and 6 (inclusive)\ndice_roll = random.randint(1, 6)\n\nprint("You rolled a:")\nprint(dice_roll)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Trying to use a module's function without importing the module first. This results in a `NameError`." },
                    { type: 'paragraph', content: "Naming your own script the same as a standard module (e.g., creating your own `math.py`). When you `import math`, Python might import your file instead of the built-in one, leading to confusion and errors." },
                    { type: 'warning', content: "Using `from module import *` is generally discouraged in large projects because it can clutter your namespace and make it unclear where a function is coming from." },
                ]
            }
        },
        challenges: [
            { id: 'day10-core', title: 'Use the Math Module', description: 'Import the `math` module and print the value of pi (`math.pi`).', starterCode: '# Your code here', testCases: [{ input: [], expected: `${Math.PI}\n`, hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day10-practice-sqrt', title: 'Calculate Square Root', description: 'Import the `math` module and use its `sqrt()` function to find the square root of 81. Print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '9.0\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day10-practice-randint', title: 'Generate Random Integer', description: 'Import the `random` module and use its `randint()` function to print a random integer between 10 and 20 (inclusive). Since the output is random, we will just check if your code is correct.', starterCode: '# Your code here', testCases: [{ input: [], expected: 'A random number between 10 and 20\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day10-practice-choice', title: 'Random Choice', description: 'From the `random` module, import only the `choice` function. Use it to select and print a random element from the given `options` list.', starterCode: 'from random import choice\n\noptions = ["rock", "paper", "scissors"]\n# Your code here', testCases: [{ input: [], expected: 'rock|paper|scissors\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day10-practice-datetime', title: 'Get Current Date', description: 'Import the `datetime` module and use `datetime.date.today()` to get the current date. Print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: `${new Date().toISOString().split('T')[0]}\n`, hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 11,
        title: 'Reading Files',
        skill: 'File I/O',
        tutorial: {
            coreConcept: {
                title: "What is File I/O?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine your Python program is in a room, and all the data it creates disappears when the program ends. File I/O (Input/Output) is like opening a door to the outside world. It allows your program to read data from files (Input) and write data to files (Output). This way, data can be stored permanently and used again later." },
                ]
            },
            syntax: {
                title: "How to Read from a File",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The best practice for working with files is using the `with open(...)` statement. It automatically handles closing the file for you, even if errors occur." },
                    { type: 'code', language: 'python', content: '# The "r" stands for "read mode"\nwith open("my_file.txt", "r") as f:\n    content = f.read() # Reads the entire file into one string\n    print(content)' },
                    { type: 'paragraph', content: "If you want to read a file line by line, which is useful for very large files, you can loop directly over the file object." },
                    { type: 'code', language: 'python', content: 'with open("my_file.txt", "r") as f:\n    for line in f:\n        print(line)' },
                    { type: 'note', content: 'Writing to a file is similar, but you use `"w"` for write mode. Be careful, as this will overwrite the file if it already exists!'}
                ]
            },
            realWorldExample: {
                title: "Reading Configuration",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Many applications store settings in a configuration file. Here's how you could read a simple `config.txt` file. For this example, we'll imagine `config.txt` contains the line `username: admin`." },
                    { type: 'code', language: 'python', content: '# Assume a file named "config.txt" with the content "username: admin"\n\n# In a real program, you would do this:\n# with open("config.txt", "r") as f:\n#     config_line = f.readline()\n#     print(config_line)\n\n# For this mock example, we\'ll simulate the output:\nprint("username: admin")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "`FileNotFoundError`. This is the most common error and happens when the file does not exist in the location Python is looking for it." },
                    { type: 'paragraph', content: "Forgetting to `strip()` newlines. When you read lines from a file, they often have an invisible newline character (`\\n`) at the end. You might need to remove it using `.strip()`." },
                    { type: 'code', language: 'python', content: 'with open("my_file.txt", "r") as f:\n    for line in f:\n        clean_line = line.strip()\n        print(clean_line)' },
                ]
            }
        },
        challenges: [
            { id: 'day11-core', title: 'Read a Text File', description: 'The environment is set up to mock a file named `myfile.txt` that contains the text "Hello, file!". Write the Python code to open this file, read its content, and print it.', starterCode: '# Assume myfile.txt exists\n# Your code here', testCases: [{ input: [], expected: 'Hello, file!\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Beginner' },
            { id: 'day11-practice-uppercase', title: 'Uppercase File Content', description: 'Mock a file named `greeting.txt` with the text "Welcome to Python.". Read the content of the file, convert it to all uppercase, and print the result.', starterCode: '# Assume greeting.txt exists\n# Your code here', testCases: [{ input: [], expected: 'WELCOME TO PYTHON.\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day11-practice-count-lines', title: 'Count Lines in a File', description: 'Mock a file named `haiku.txt` with 3 lines of text. Write code to read the file and print the total number of lines.', starterCode: '# Assume haiku.txt exists with 3 lines\n# Your code here', testCases: [{ input: [], expected: '3\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day11-practice-find-line', title: 'Find a Specific Line', description: 'Mock a file named `users.txt` where each line is a username. Find and print only the line that contains the username "admin". The file contains:\nuser1\nguest\nadmin\nuser2', starterCode: '# Assume users.txt exists\n# Your code here', testCases: [{ input: [], expected: 'admin\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 12,
        title: 'List Comprehensions',
        skill: 'Advanced',
        tutorial: {
            coreConcept: {
                title: "What are List Comprehensions?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you have a list of numbers and you want to create a new list with each number doubled. You could use a `for` loop. But a list comprehension is like a shortcut—a single, elegant line of code that does the same thing. It's a concise way to create lists based on existing lists." },
                ]
            },
            syntax: {
                title: "How to Use Them",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The basic syntax is `[expression for item in iterable]`. It feels like writing a `for` loop inside of square brackets." },
                    { type: 'code', language: 'python', content: 'numbers = [1, 2, 3, 4, 5]\n\n# A for loop to get squared numbers\nsquares = []\nfor n in numbers:\n    squares.append(n * n)\n\n# The same logic as a list comprehension\nsquares_comp = [n * n for n in numbers]\n\nprint(squares_comp) # Prints [1, 4, 9, 16, 25]' },
                    { type: 'paragraph', content: "You can also add a condition to filter the items." },
                    { type: 'code', language: 'python', content: 'numbers = [1, 2, 3, 4, 5, 6]\n\n# Get only the even numbers, squared\neven_squares = [n * n for n in numbers if n % 2 == 0]\n\nprint(even_squares) # Prints [4, 16, 36]' },
                ]
            },
            realWorldExample: {
                title: "Cleaning Up Data",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "List comprehensions are fantastic for quick data manipulation tasks. Here, we take a list of names with inconsistent whitespace and create a clean, new list." },
                    { type: 'code', language: 'python', content: 'messy_names = ["  alice  ", " bob", "charlie "]\n\n# Use .strip() on each name to remove whitespace\nclean_names = [name.strip() for name in messy_names]\n\nprint(clean_names) # Prints [\'alice\', \'bob\', \'charlie\']' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Making them too complex. If your list comprehension becomes very long and hard to read, it's often better to use a regular `for` loop for clarity." },
                    { type: 'paragraph', content: "Using them for everything. They are best for creating a new list. If you just want to loop and perform actions without building a list, a standard `for` loop is more appropriate." },
                ]
            }
        },
        challenges: [
            { id: 'day12-core', title: 'Square All Numbers', description: 'Use a list comprehension to create a new list where each number from the original `numbers` list is squared. Print the new list.', starterCode: 'numbers = [1, 2, 3, 4, 5]\n# Your code here', testCases: [{ input: [], expected: '[1, 4, 9, 16, 25]\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Beginner' },
            { id: 'day12-practice-uppercase', title: 'Uppercase Words', description: 'Given a list of words, use a list comprehension to create a new list where each word is in uppercase. Print the new list.', starterCode: 'words = ["hello", "world"]\n# Your code here', testCases: [{ input: [], expected: "['HELLO', 'WORLD']\n", hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day12-practice-filter-evens', title: 'Filter Even Numbers', description: 'From a list of numbers `1` through `10`, create a new list containing only the even numbers, using a list comprehension. Print the new list.', starterCode: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# Your code here', testCases: [{ input: [], expected: '[2, 4, 6, 8, 10]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day12-practice-lengths', title: 'Word Lengths', description: 'Given a list of words, use a list comprehension to create a new list that contains the length of each word. Print the new list.', starterCode: 'words = ["hello", "world", "in", "python"]\n# Your code here', testCases: [{ input: [], expected: '[5, 5, 2, 6]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day12-practice-names-a', title: 'Filter Names', description: 'Given a list of names, create a new list containing only the names that start with the letter "A", using a list comprehension and the `.startswith()` string method. Print the new list.', starterCode: 'names = ["Alice", "Bob", "Anna", "Charlie", "Alex"]\n# Your code here', testCases: [{ input: [], expected: "['Alice', 'Anna', 'Alex']\n", hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 13,
        title: 'String Formatting & Methods',
        skill: 'Basics',
        tutorial: {
            coreConcept: {
                title: "What are String Methods?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of strings as clay. Python provides you with a set of tools, called methods, to shape and mold that clay however you like. You can change its case, trim off extra bits, split it into pieces, or join pieces together. These methods don't change the original string but instead give you a new, modified version to work with." },
                    { type: 'paragraph', content: "Mastering these methods is crucial for working with text data, whether you're cleaning up user input, parsing information, or preparing text for display." },
                ]
            },
            syntax: {
                title: "How to Use String Methods",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You call a method by adding a dot `.` and the method name after a string variable. Let's look at a few common ones:" },
                    { type: 'code', language: 'python', content: 'message = "   Hello, Python World!   "\n\n# .strip() removes leading/trailing whitespace\nprint(message.strip())\n\n# .lower() converts to lowercase\nprint(message.lower())\n\n# .upper() converts to uppercase\nprint(message.upper())\n\n# .replace() finds and replaces a substring\nprint(message.strip().replace("World", "Friend"))\n\n# .split() breaks a string into a list\nwords = message.strip().split(" ")\nprint(words)' },
                    { type: 'paragraph', content: "A modern and powerful way to format strings is with f-strings. You prefix the string with an `f` and put variables right inside curly braces `{}`." },
                    { type: 'code', language: 'python', content: 'name = "Alex"\nscore = 1250\n\nprint(f"Player {name} has a score of {score}.")' },
                ]
            },
            realWorldExample: {
                title: "Cleaning User Input",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine a user types their name into a form. They might accidentally add extra spaces or use inconsistent capitalization. We can use string methods to standardize it." },
                    { type: 'code', language: 'python', content: '# Raw user input\nraw_name = "  aLiCe  "\n\n# Clean it up\n# 1. Remove whitespace with .strip()\n# 2. Capitalize the first letter with .capitalize()\nclean_name = raw_name.strip().capitalize()\n\nprint(f"Welcome, {clean_name}!")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting that string methods are not 'in-place'. They don't change the original string; they return a new one. You must assign the result to a variable to keep the change." },
                    { type: 'code', language: 'python', content: 'my_string = "hello"\n# INCORRECT - this does nothing\nmy_string.upper()\nprint(my_string) # Still prints "hello"\n\n# CORRECT\nmy_string_upper = my_string.upper()\nprint(my_string_upper) # Prints "HELLO"' },
                    { type: 'warning', content: "Using the wrong method for the job, like using `.split()` when you need `.replace()`." },
                ]
            }
        },
        challenges: [
            { id: 'day13-core', title: 'Format a Welcome Message', description: 'Use an f-string to create a sentence that says "Hello, [name]! Welcome to Day 13." where `name` is the given variable. Print the result.', starterCode: 'name = "Explorer"\n# Your code here', testCases: [{ input: [], expected: 'Hello, Explorer! Welcome to Day 13.\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day13-practice-strip', title: 'Clean Up Whitespace', description: 'The variable `data` has extra spaces at the beginning and end. Use a string method to remove them and print the cleaned string.', starterCode: 'data = "   some important data   "\n# Your code here', testCases: [{ input: [], expected: 'some important data\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day13-practice-split', title: 'Split a Sentence', description: 'Use a string method to split the `sentence` into a list of words. Print the resulting list.', starterCode: 'sentence = "Python is a powerful language"\n# Your code here', testCases: [{ input: [], expected: "['Python', 'is', 'a', 'powerful', 'language']\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day13-practice-join', title: 'Join a List of Words', description: 'You are given a list of words. Join them together into a single string, with each word separated by a space. Print the result. Hint: Use the `join` method like this: `" ".join(list_of_words)`.', starterCode: 'words = ["Let\'s", "learn", "Python"]\n# Your code here', testCases: [{ input: [], expected: "Let's learn Python\n", hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' },
        ]
    },
    {
        day: 14,
        title: 'List Slicing & Methods',
        skill: 'Data Structures',
        tutorial: {
            coreConcept: {
                title: "What is List Slicing?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine your list is a loaf of bread. Slicing is the technique of cutting out a portion of that loaf. You can take a single slice (like accessing an element by index), or you can take a whole section of slices. It's a powerful way to get sub-sections of your list without creating a complicated loop." },
                ]
            },
            syntax: {
                title: "How to Slice and Dice",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "Slicing uses a `[start:stop:step]` notation. `start` is the index to begin, `stop` is the index to end *before*, and `step` is the interval. All parts are optional." },
                    { type: 'code', language: 'python', content: 'numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# Get elements from index 2 up to (but not including) index 5\nprint(numbers[2:5]) # Prints [2, 3, 4]\n\n# Get elements from the beginning up to index 4\nprint(numbers[:4]) # Prints [0, 1, 2, 3]\n\n# Get elements from index 6 to the end\nprint(numbers[6:]) # Prints [6, 7, 8, 9]\n\n# Get the whole list (a common way to create a copy)\nprint(numbers[:]) # Prints the full list\n\n# Get every second element\nprint(numbers[::2]) # Prints [0, 2, 4, 6, 8]\n\n# Reverse the list\nprint(numbers[::-1]) # Prints [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]' },
                    { type: 'paragraph', content: "There are also useful methods for modifying lists:" },
                    { type: 'code', language: 'python', content: 'letters = [\'a\', \'c\', \'d\']\n\n# .insert(index, element) adds an element at a specific position\nletters.insert(1, \'b\') # Inserts \'b\' at index 1\nprint(letters) # Prints [\'a\', \'b\', \'c\', \'d\']\n\n# .pop(index) removes and returns an element at an index (default is the last)\nremoved_letter = letters.pop(2)\nprint(removed_letter) # Prints \'c\'\nprint(letters) # Prints [\'a\', \'b\', \'d\']\n\n# .sort() sorts the list in place\nnumbers = [3, 1, 4, 2]\nnumbers.sort()\nprint(numbers) # Prints [1, 2, 3, 4]' },
                ]
            },
            realWorldExample: {
                title: "Getting Top Scores",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's say we have a list of player scores, and we want to display the top 3. We can sort the list in descending order and then take a slice." },
                    { type: 'code', language: 'python', content: 'scores = [88, 95, 102, 76, 115, 99]\n\n# Sort in descending order\nscores.sort(reverse=True)\n\n# Slice the first 3 elements\ntop_scores = scores[:3]\n\nprint("Top 3 scores:")\nprint(top_scores)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Confusing `sort()` and `sorted()`. `list.sort()` modifies the list in-place and returns `None`. The `sorted(list)` function returns a new sorted list and leaves the original untouched." },
                    { type: 'paragraph', content: "Forgetting the `stop` index in slicing is exclusive. `my_list[0:3]` gives you elements at index 0, 1, and 2, but NOT 3." },
                ]
            }
        },
        challenges: [
            { id: 'day14-core', title: 'Get First Three Items', description: 'Given the list `items`, use slicing to get a new list containing only the first three items. Print the new list.', starterCode: 'items = ["sword", "shield", "potion", "gold", "gem"]\n# Your code here', testCases: [{ input: [], expected: "['sword', 'shield', 'potion']\n", hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day14-practice-last-two', title: 'Get Last Two Items', description: 'Given the list `items`, use slicing to get the last two items. Print the new list. Hint: Negative indices can be useful here.', starterCode: 'items = ["sword", "shield", "potion", "gold", "gem"]\n# Your code here', testCases: [{ input: [], expected: "['gold', 'gem']\n", hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day14-practice-reverse', title: 'Reverse a List', description: 'Use slicing to reverse the `numbers` list. Print the reversed list.', starterCode: 'numbers = [1, 2, 3, 4, 5]\n# Your code here', testCases: [{ input: [], expected: '[5, 4, 3, 2, 1]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day14-practice-sort', title: 'Sort a List of Numbers', description: 'Use the `.sort()` method to sort the `scores` list in ascending order. Then print the sorted list.', starterCode: 'scores = [99, 81, 105, 92]\n# Your code here', testCases: [{ input: [], expected: '[81, 92, 99, 105]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day14-practice-insert-pop', title: 'Modify a Playlist', description: 'You have a playlist. First, `.insert()` the song "New Tune" at index 1. Then, `.pop()` the last song from the list. Print the final playlist.', starterCode: 'playlist = ["Song A", "Song B", "Song C"]\n# Your code here', testCases: [{ input: [], expected: "['Song A', 'New Tune', 'Song B']\n", hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 15,
        title: 'Tuples and Sets',
        skill: 'Data Structures',
        tutorial: {
            coreConcept: {
                title: "What are Tuples and Sets?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "If a list is a regular piece of paper you can write on and erase, a **tuple** is like a message carved in stone—it's ordered, but you can't change it once it's made (it's immutable). This is useful for data that should not be altered, like coordinates (x, y)." },
                    { type: 'paragraph', content: "A **set** is like a grab bag of unique items. The order doesn't matter, and there are no duplicates. Sets are incredibly fast for checking if an item is present in the collection, making them perfect for tasks like finding unique elements from a list." },
                ]
            },
            syntax: {
                title: "How to Use Them",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You create a tuple with parentheses `()`." },
                    { type: 'code', language: 'python', content: '# A tuple of coordinates\npoint = (10, 20)\n\n# Accessing elements works just like lists\nprint(point[0]) # Prints 10\n\n# But you cannot change an element\n# point[0] = 15 # This would cause a TypeError' },
                    { type: 'paragraph', content: "You create a set with curly braces `{}` or the `set()` function. Note: `{}` creates an empty dictionary, so use `set()` for an empty set." },
                    { type: 'code', language: 'python', content: '# A list with duplicates\nnumbers = [1, 2, 2, 3, 4, 3, 5]\n\n# Create a set to get unique numbers\nunique_numbers = set(numbers)\nprint(unique_numbers) # Prints {1, 2, 3, 4, 5}\n\n# Sets have useful methods\nunique_numbers.add(6)\nprint(unique_numbers)\n\nunique_numbers.remove(2)\nprint(unique_numbers)\n\n# Fast membership testing\nprint(4 in unique_numbers) # Prints True' },
                ]
            },
            realWorldExample: {
                title: "Storing Fixed Data and Finding Unique Tags",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "A tuple is great for storing something that shouldn't change, like the RGB values for a color. A set is great for managing a list of unique tags for a blog post." },
                    { type: 'code', language: 'python', content: '# Tuple for a color\nCOLOR_BLUE = (0, 0, 255)\n\n# Set for unique tags\ntags = [\'python\', \'code\', \'data\', \'python\']\nunique_tags = set(tags)\nprint(f"Color values: {COLOR_BLUE}")\nprint(f"Unique tags: {unique_tags}")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Trying to modify a tuple. Tuples are immutable. If you need to change the data, you should use a list." },
                    { type: 'paragraph', content: "Forgetting that sets are unordered. You cannot access elements by an index (e.g., `my_set[0]`). You must loop through a set or check for membership with `in`." },
                    { type: 'warning', content: "Creating a single-item tuple. `(1)` is just the number 1. To make it a tuple, you need a trailing comma: `(1,)`." },
                ]
            }
        },
        challenges: [
            { id: 'day15-core', title: 'Create a Tuple', description: 'Create a tuple named `my_tuple` containing the numbers 10, 20, and 30. Then, print the second element of the tuple.', starterCode: '# Your code here', testCases: [{ input: [], expected: '20\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day15-practice-set', title: 'Create a Set', description: 'Create a set named `my_set` containing the strings "apple", "banana", and "cherry". Print the set.', starterCode: '# Your code here', testCases: [{ input: [], expected: "{'apple', 'banana', 'cherry'}\n", hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day15-practice-uniques', title: 'Find Unique Numbers', description: 'You are given a list `numbers` with duplicates. Use a set to find the unique numbers, and then convert it back to a list and print it. Hint: `list(set(numbers))`', starterCode: 'numbers = [1, 5, 2, 3, 5, 1, 4]\n# Your code here', testCases: [{ input: [], expected: '[1, 2, 3, 4, 5]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day15-practice-add-to-set', title: 'Add to a Set', description: 'A set of `permissions` is provided. Add the permission "delete" to the set and print the updated set.', starterCode: 'permissions = {"read", "write"}\n# Your code here', testCases: [{ input: [], expected: "{'read', 'write', 'delete'}\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day15-practice-intersection', title: 'Find Common Elements', description: 'Given two sets, `set1` and `set2`, find their intersection (the elements that are in both sets). Print the result. Hint: Use the `&` operator or the `.intersection()` method.', starterCode: 'set1 = {1, 2, 3, 4}\nset2 = {3, 4, 5, 6}\n# Your code here', testCases: [{ input: [], expected: '{3, 4}\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 16,
        title: 'While Loops',
        skill: 'Control Flow',
        tutorial: {
            coreConcept: {
                title: "What are While Loops?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "A `for` loop is great when you know how many times you want to loop (e.g., for each item in a list). A `while` loop is for when you don't know how many times you need to loop, but you know the condition under which the loop should keep running. It's like telling your program, 'Keep doing this AS LONG AS this condition is true.'" },
                ]
            },
            syntax: {
                title: "How to Use While Loops",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The syntax is `while condition:`. The code inside the loop must be indented. It's crucial that something inside the loop eventually makes the condition false, otherwise you'll have an infinite loop!" },
                    { type: 'code', language: 'python', content: 'count = 0\n\nwhile count < 5:\n    print(f"Count is {count}")\n    count = count + 1  # This line is critical to eventually stop the loop\n\nprint("Loop finished!")' },
                    { type: 'paragraph', content: "You can use `break` to exit a loop early, and `continue` to skip the rest of the current iteration and go to the next one." },
                    { type: 'code', language: 'python', content: 'i = 0\nwhile True: # An intentionally infinite loop\n    i += 1\n    if i % 2 == 0: # If i is even\n        continue   # Skip the print for even numbers\n    if i > 10:\n        break      # Stop the loop when i is greater than 10\n    print(i)' },
                ]
            },
            realWorldExample: {
                title: "Simple Guessing Game",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "A `while` loop is perfect for a game where you keep asking for user input until they guess the right answer." },
                    { type: 'code', language: 'python', content: 'secret_number = 7\nguess = 0 # Initialize guess to a value that is not the secret number\n\n# In a real app, you\'d get user input, like: guess = int(input("Guess a number: "))\n# Here we simulate it.\nwhile guess != secret_number:\n    print("Guess was wrong, trying again...")\n    # Simulate the user guessing correctly on the third try\n    if guess == 2:\n        guess = 7\n    else:\n        guess += 1\n\nprint(f"You guessed it! The number was {secret_number}.")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Creating an accidental infinite loop. This happens if you forget to update the variable that's part of the `while` condition. Your program will freeze and you'll have to stop it manually." },
                    { type: 'code', language: 'python', content: '# DANGER: INFINITE LOOP\n# count = 0\n# while count < 5:\n#     print("Hello")\n#     # Forgetting to increment count' },
                    { type: 'warning', content: "Incorrect loop condition, causing the loop to never run or to stop too early." },
                ]
            }
        },
        challenges: [
            { id: 'day16-core', title: 'Count Up to 3', description: 'Use a `while` loop to print the numbers 0, 1, and 2, each on a new line. Remember to initialize a counter and increment it inside the loop.', starterCode: '# Your code here', testCases: [{ input: [], expected: '0\n1\n2\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day16-practice-countdown', title: 'Countdown from 5', description: 'Use a `while` loop to print a countdown from 5 down to 1. The output should be 5, 4, 3, 2, 1, each on a new line.', starterCode: '# Your code here', testCases: [{ input: [], expected: '5\n4\n3\n2\n1\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day16-practice-break', title: 'Loop with a Break', description: 'Create a `while` loop that increments a number. If the number reaches 5, `break` out of the loop. Print the number in each iteration before the check.', starterCode: 'num = 0\n# Your code here', testCases: [{ input: [], expected: '0\n1\n2\n3\n4\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day16-practice-continue', title: 'Skip Even Numbers', description: 'Use a `while` loop to print all ODD numbers from 1 to 10. Use the `continue` keyword to skip the even numbers.', starterCode: '# Your code here', testCases: [{ input: [], expected: '1\n3\n5\n7\n9\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 17,
        title: 'Looping Through Dictionaries',
        skill: 'Data Structures',
        tutorial: {
            coreConcept: {
                title: "How to Iterate Through Dictionaries",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "If a dictionary is like a phone book, you might want to look through it in different ways. You might want a list of all the names (the keys), a list of all the numbers (the values), or a list of both together. Python gives you simple and readable ways to loop through a dictionary's contents." },
                ]
            },
            syntax: {
                title: "Dictionary Looping Methods",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "By default, looping over a dictionary gives you its keys." },
                    { type: 'code', language: 'python', content: 'player_stats = {"name": "Knight", "hp": 100, "attack": 15}\n\nfor stat in player_stats:\n    print(stat) # Prints name, hp, attack' },
                    { type: 'paragraph', content: "To loop through the values, use the `.values()` method." },
                    { type: 'code', language: 'python', content: 'for value in player_stats.values():\n    print(value) # Prints Knight, 100, 15' },
                    { type: 'paragraph', content: "To get both the key and the value at the same time, use the `.items()` method. This is often the most useful way to loop." },
                    { type: 'code', language: 'python', content: 'for key, value in player_stats.items():\n    print(f"{key}: {value}")' },
                ]
            },
            realWorldExample: {
                title: "Displaying Product Information",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's say you have a product's information stored in a dictionary. You can use `.items()` to display it in a user-friendly format." },
                    { type: 'code', language: 'python', content: 'product = {\n    "name": "Laptop",\n    "price": 1200,\n    "in_stock": True\n}\n\nprint("Product Details:")\nfor key, value in product.items():\n    # Format the output nicely\n    print(f"- {key.capitalize()}: {value}")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Modifying a dictionary while iterating over it. This can sometimes lead to unexpected behavior or errors. It's safer to create a copy to iterate over if you need to make changes." },
                    { type: 'code', language: 'python', content: '# Safer to iterate over a copy if modifying\n# for key, value in my_dict.copy().items():\n#    if some_condition:\n#        del my_dict[key]' },
                ]
            }
        },
        challenges: [
            { id: 'day17-core', title: 'Print Dictionary Keys', description: 'Given the `student` dictionary, loop through it and print each key on a new line.', starterCode: 'student = {"name": "Maria", "subject": "Math", "grade": 95}\n# Your code here', testCases: [{ input: [], expected: 'name\nsubject\ngrade\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day17-practice-values', title: 'Print Dictionary Values', description: 'Use the `.values()` method to loop through the `student` dictionary and print each value on a new line.', starterCode: 'student = {"name": "Maria", "subject": "Math", "grade": 95}\n# Your code here', testCases: [{ input: [], expected: 'Maria\nMath\n95\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day17-practice-items', title: 'Print Key-Value Pairs', description: 'Use the `.items()` method to loop through the `student` dictionary. For each item, print it in the format "key: value".', starterCode: 'student = {"name": "Maria", "subject": "Math"}\n# Your code here', testCases: [{ input: [], expected: 'name: Maria\nsubject: Math\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day17-practice-sum-values', title: 'Sum Numeric Values', description: 'You have a dictionary representing items and their quantities. Loop through the values and calculate the total number of items. Print the total.', starterCode: 'inventory = {"apples": 10, "bananas": 5, "oranges": 8}\n# Your code here', testCases: [{ input: [], expected: '23\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 18,
        title: 'Advanced Function Arguments',
        skill: 'Functions',
        tutorial: {
            coreConcept: {
                title: "What are *args and **kwargs?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you're ordering a pizza. Some toppings are standard (like cheese), but you can add any number of extra toppings. `*args` and `**kwargs` are Python's way of letting functions accept a variable number of arguments, just like that pizza order." },
                    { type: 'paragraph', content: "`*args` (arguments) collects extra positional arguments into a tuple. `**kwargs` (keyword arguments) collects extra keyword arguments into a dictionary. This makes your functions incredibly flexible." },
                ]
            },
            syntax: {
                title: "How to Use Flexible Arguments",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "Here's a function that can accept any number of arguments and add them up." },
                    { type: 'code', language: 'python', content: '# *args collects extra arguments into a tuple called `numbers`\ndef add_all(*numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total\n\nprint(add_all(1, 2, 3)) # Prints 6\nprint(add_all(10, 20, 30, 40)) # Prints 100' },
                    { type: 'paragraph', content: "Here's a function that can accept any number of keyword arguments to build a profile." },
                    { type: 'code', language: 'python', content: '# **kwargs collects them into a dictionary called `user_data`\ndef build_profile(**user_data):\n    for key, value in user_data.items():\n        print(f"{key.capitalize()}: {value}")\n\nbuild_profile(name="Leo", age=30, city="Lisbon")' },
                    { type: 'note', content: "You can also define functions with default argument values, which makes those arguments optional when the function is called." },
                    { type: 'code', language: 'python', content: 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Ana") # Uses the default greeting\ngreet("Ben", "Hi") # Overrides the default' },
                ]
            },
            realWorldExample: {
                title: "Flexible Logger Function",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's create a logging function that can take a main message and then any number of additional key-value pairs for context." },
                    { type: 'code', language: 'python', content: 'import datetime\n\ndef log_event(message, **context):\n    timestamp = datetime.datetime.now()\n    print(f"[{timestamp}] - {message}")\n    if context:\n        print("  Context:")\n        for key, value in context.items():\n            print(f"    - {key}: {value}")\n\nlog_event("User logged in.", user_id=123)\nlog_event("Data processing failed.", error="file not found", task_id="abc-123")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "The order matters. Standard arguments must come first, then `*args`, then `**kwargs`. `def my_func(*args, name)` is invalid." },
                    { type: 'warning', content: "The names `args` and `kwargs` are just a convention. The important parts are the `*` and `**`. You could use `*numbers` or `**data`, and it would work the same." },
                ]
            }
        },
        challenges: [
            { id: 'day18-core', title: 'Function with Default Value', description: 'Create a function `power(base, exponent)` that calculates `base` to the power of `exponent`. Give `exponent` a default value of 2. Call it once with `power(5)` and print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '25\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day18-practice-args', title: 'Sum with *args', description: 'Write a function `sum_all` that takes any number of arguments using `*args` and returns their sum.', starterCode: '# Your code here\n# print(sum_all(1, 2, 3, 4, 5))', testCases: [{ input: [], expected: '15\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day18-practice-kwargs', title: 'Display with **kwargs', description: 'Write a function `display_info` that accepts any number of keyword arguments using `**kwargs`. The function should loop through the kwargs and print each key-value pair in the format "key: value".', starterCode: '# Your code here\n# display_info(name="Product", price=19.99)', testCases: [{ input: [], expected: 'name: Product\nprice: 19.99\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day18-practice-full-signature', title: 'Combined Function', description: 'Write a function `report(reporter_name, *observations, **details)` that prints the reporter\'s name, then each observation, and finally each detail. Test it with the provided call.', starterCode: '# Your code here\n# report("Agent X", "Target acquired", "Weather is clear", status="nominal", time="1800Z")', testCases: [{ input: [], expected: 'Report by: Agent X\n- Target acquired\n- Weather is clear\nDetails:\nstatus: nominal\ntime: 1800Z\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 19,
        title: 'Error and Exception Handling',
        skill: 'Concepts',
        tutorial: {
            coreConcept: {
                title: "What is Exception Handling?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you're a pilot. You have a flight plan, but you also have emergency procedures for things that could go wrong, like bad weather or engine trouble. Exception handling in Python is like having those emergency procedures for your code. You `try` to run your main code, and if something goes wrong (an `Exception`), you `except` it and run some backup code instead of letting the whole program crash." },
                ]
            },
            syntax: {
                title: "How to Use `try...except`",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The basic block is `try` and `except`. Python will attempt the code in the `try` block. If an error occurs, it will skip the rest of the `try` block and execute the `except` block." },
                    { type: 'code', language: 'python', content: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Oops! You can\'t divide by zero.")\n\nprint("The program continues on.")' },
                    { type: 'paragraph', content: "You can handle different types of errors with multiple `except` blocks." },
                    { type: 'code', language: 'python', content: 'my_dict = {"a": 1}\ntry:\n    value = my_dict["b"]\n    result = 10 / int(value)\nexcept KeyError:\n    print("That key does not exist.")\nexcept ValueError:\n    print("Cannot convert value to a number.")' },
                    { type: 'note', content: "An `else` block can be added to run code only if no exceptions were raised in the `try` block. A `finally` block will run no matter what, whether an exception occurred or not, which is great for cleanup tasks." },
                ]
            },
            realWorldExample: {
                title: "Safely Converting User Input",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "When you ask a user for their age, they might type letters instead of numbers. Using `try...except` prevents the program from crashing." },
                    { type: 'code', language: 'python', content: '# In a real app, this would be: user_input = input("Enter your age: ")\nuser_input = "twenty"\n\ntry:\n    age = int(user_input)\n    print(f"Next year you will be {age + 1}.")\nexcept ValueError:\n    print("Invalid input. Please enter a number for your age.")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Using a bare `except:`. This will catch *every* single error, including system-exiting errors like `KeyboardInterrupt` (when you press Ctrl+C). It's almost always better to specify the exact error you expect to handle, like `except ValueError:`." },
                    { type: 'warning', content: "Putting too much code in the `try` block. Only include the specific lines that might cause an error. This makes your code clearer and helps you pinpoint the source of the problem." },
                ]
            }
        },
        challenges: [
            { id: 'day19-core', title: 'Handle Division by Zero', description: 'The code provided attempts to divide by zero. Wrap it in a `try...except` block to catch the `ZeroDivisionError` and print "Error: Cannot divide by zero." instead of crashing.', starterCode: 'numerator = 10\ndenominator = 0\n# Your code here\nresult = numerator / denominator\nprint(result)', testCases: [{ input: [], expected: 'Error: Cannot divide by zero.\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day19-practice-value-error', title: 'Handle ValueError', description: 'The code tries to convert a non-numeric string to an integer. Use a `try...except` block to catch the `ValueError` and print "Invalid number".', starterCode: 'number_string = "hello"\n# Your code here\nnumber = int(number_string)\nprint(number)', testCases: [{ input: [], expected: 'Invalid number\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day19-practice-key-error', title: 'Handle KeyError', description: 'The code attempts to access a dictionary key that does not exist. Use `try...except` to catch the `KeyError` and print "Key not found".', starterCode: 'my_dict = {"name": "Test"}\n# Your code here\nprint(my_dict["age"])', testCases: [{ input: [], expected: 'Key not found\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day19-practice-else-finally', title: 'Using Else and Finally', description: 'Write a `try...except...else...finally` block. Inside the `try`, divide 10 by 2. The `except` should handle `ZeroDivisionError`. The `else` block should print "Calculation successful.". The `finally` block should print "Execution complete.". What is the output?', starterCode: '# Your code here', testCases: [{ input: [], expected: 'Calculation successful.\nExecution complete.\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 20,
        title: 'Writing to Files',
        skill: 'File I/O',
        tutorial: {
            coreConcept: {
                title: "How to Write and Append to Files",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "We've learned how to read from files, but what about creating our own or adding to them? Python allows you to open files in 'write' mode to create new content, or 'append' mode to add to existing content. This is how your programs can save their state, create logs, or generate reports." },
                ]
            },
            syntax: {
                title: "How to Use Write and Append Modes",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "To write to a file, open it in `'w'` mode. Be careful: if the file already exists, this will completely overwrite it!" },
                    { type: 'code', language: 'python', content: '# "w" for write mode\nwith open("greeting.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("This is a new file.")' },
                    { type: 'paragraph', content: "To add to the end of a file without deleting its contents, use `'a'` for append mode." },
                    { type: 'code', language: 'python', content: '# "a" for append mode\nwith open("greeting.txt", "a") as f:\n    f.write("\\nAppending a new line.")' },
                    { type: 'note', content: "The `.write()` method does not automatically add a newline character. You must add `\\n` yourself if you want to start a new line." },
                ]
            },
            realWorldExample: {
                title: "Creating a Simple Log File",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's create a simple logging system that appends a timestamped message to a file every time an event occurs." },
                    { type: 'code', language: 'python', content: 'import datetime\n\ndef log_event(message):\n    # Get the current time as a string\n    timestamp = str(datetime.datetime.now())\n    # Append the log message to the file\n    # In a real app, the file would be "app.log"\n    with open("app.log", "a") as f:\n        f.write(f"[{timestamp}] {message}\\n")\n\n# Simulate some events\nlog_event("Application started.")\nlog_event("User logged in.")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Accidentally using `'w'` (write) when you meant to use `'a'` (append). This is a common and destructive error, as it will wipe out your file's previous contents." },
                    { type: 'warning', content: "Forgetting to include the newline character `\\n`. Without it, everything you write will be on a single, long line." },
                    { type: 'paragraph', content: "Trying to write non-string data. You must convert numbers and other data types to a string (e.g., using `str()` or f-strings) before writing them to a file." },
                ]
            }
        },
        challenges: [
            { id: 'day20-core', title: 'Write to a New File', description: 'Write the string "First line of text." to a mock file named `new_file.txt`. The executor will check the file\'s content after your code runs.', starterCode: '# Your code here', testCases: [{ input: [], expected: 'First line of text.', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day20-practice-append', title: 'Append to a File', description: 'A mock file `log.txt` already contains "Event 1". Append the string "\\nEvent 2" to the file.', starterCode: '# Assume log.txt exists with "Event 1"\n# Your code here', testCases: [{ input: [], expected: 'Event 1\nEvent 2', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day20-practice-write-list', title: 'Write List Items to File', description: 'You have a list of `lines`. Loop through the list and write each item to a file named `shopping.txt`, making sure each item is on a new line.', starterCode: 'lines = ["apples", "bananas", "milk"]\n# Your code here', testCases: [{ input: [], expected: 'apples\nbananas\nmilk\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day20-practice-overwrite', title: 'Overwrite a File', description: 'A mock file `config.txt` contains "old_setting". Open it in the correct mode to overwrite it and write "new_setting" instead.', starterCode: '# Assume config.txt exists\n# Your code here', testCases: [{ input: [], expected: 'new_setting', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day20-practice-with-read', title: 'Read, Modify, and Write', description: 'A mock file `data.txt` contains the number `5`. Read the number, convert it to an integer, multiply it by 2, and then overwrite the file with the new number (as a string).', starterCode: '# Assume data.txt contains "5"\n# Your code here', testCases: [{ input: [], expected: '10', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 21,
        title: 'Class Inheritance',
        skill: 'OOP',
        tutorial: {
            coreConcept: {
                title: "What is Inheritance?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Think of inheritance in terms of family traits. You inherit characteristics like eye color from your parents. In Object-Oriented Programming, inheritance allows a new class (the 'child' or 'subclass') to inherit all the attributes and methods from an existing class (the 'parent' or 'superclass'). This is a cornerstone of OOP, promoting code reuse and logical structure." },
                ]
            },
            syntax: {
                title: "How to Inherit from a Class",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "To create a child class, you put the parent class's name in parentheses after the child class's name." },
                    { type: 'code', language: 'python', content: '# Parent class\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print("Some generic animal sound")\n\n# Child class inherits from Animal\nclass Dog(Animal):\n    def speak(self):\n        print("Woof!") # This overrides the parent\'s speak method\n\nmy_dog = Dog("Fido")\nmy_dog.speak() # Calls the Dog class\'s speak method\nprint(my_dog.name) # Accesses the name attribute from the parent Animal class' },
                    { type: 'paragraph', content: "Sometimes you want to use the parent's method within the child's method. You can do this with `super()`." },
                    { type: 'code', language: 'python', content: 'class Cat(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name) # Calls the parent\'s __init__ method\n        self.breed = breed # Add a new attribute\n\n    def speak(self):\n        print("Meow!")\n\nmy_cat = Cat("Whiskers", "Siamese")\nprint(my_cat.name) # "Whiskers"\nprint(my_cat.breed) # "Siamese"' },
                ]
            },
            realWorldExample: {
                title: "User and Admin Classes",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "In a web application, an `Admin` user might have all the properties of a regular `User`, plus some extra permissions. Inheritance is perfect for this." },
                    { type: 'code', language: 'python', content: 'class User:\n    def __init__(self, username):\n        self.username = username\n\n    def view_site(self):\n        print("Viewing the website.")\n\nclass Admin(User):\n    def delete_post(self):\n        print("Post deleted.")\n\n# A regular user\nregular_user = User("Bob")\nregular_user.view_site()\n\n# An admin user can do everything a regular user can, and more\nadmin_user = Admin("Alice")\nadmin_user.view_site()\nadmin_user.delete_post()' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting to call `super().__init__()` in the child's `__init__` method. If the parent class has an `__init__` method that sets up important attributes, you must call it from the child class, or those attributes will be missing." },
                    { type: 'warning', content: "Overriding a method by accident. If you give a method in the child class the same name as one in the parent, the child's version will always be used." },
                ]
            }
        },
        challenges: [
            { id: 'day21-core', title: 'Inherit from a Vehicle Class', description: 'A `Vehicle` class is provided. Create a `Car` class that inherits from `Vehicle`. Create an instance of `Car` and call the `start_engine` method.', starterCode: 'class Vehicle:\n    def start_engine(self):\n        print("Engine started.")\n\n# Your code here', testCases: [{ input: [], expected: 'Engine started.\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day21-practice-override', title: 'Override a Method', description: 'A `Bird` class has a `fly` method. Create a `Penguin` class that inherits from `Bird` but overrides the `fly` method to print "Cannot fly." instead. Create an instance and call its `fly` method.', starterCode: 'class Bird:\n    def fly(self):\n        print("Flying high!")\n\n# Your code here', testCases: [{ input: [], expected: 'Cannot fly.\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day21-practice-super', title: 'Use super() in __init__', description: 'Create an `Employee` parent class that takes `name` in its `__init__`. Then create a `Manager` child class that also takes a `department`. The `Manager`\'s `__init__` should use `super()` to set the name and then set its own `department` attribute. Create a Manager and print their name.', starterCode: '# Your code here', testCases: [{ input: [], expected: 'Alice\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 22,
        title: 'Working with JSON',
        skill: 'Modules',
        tutorial: {
            coreConcept: {
                title: "What is JSON?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "JSON (JavaScript Object Notation) is the universal language for data exchange on the web. Think of it as a plain-text format that is easy for humans to read and for computers to parse. It's how web servers send data to your browser and how different applications talk to each other. Python's `json` module makes it simple to translate between Python data structures (like dictionaries and lists) and JSON strings." },
                ]
            },
            syntax: {
                title: "How to Use the `json` Module",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "`json.dumps()` (dump string) turns a Python dictionary or list into a JSON formatted string." },
                    { type: 'code', language: 'python', content: 'import json\n\nplayer_data = {\n    "name": "Zelda",\n    "level": 10,\n    "inventory": ["sword", "shield"]\n}\n\n# Convert Python dict to JSON string\njson_string = json.dumps(player_data, indent=4)\nprint(json_string)' },
                    { type: 'paragraph', content: "`json.loads()` (load string) does the opposite, parsing a JSON string back into a Python dictionary or list." },
                    { type: 'code', language: 'python', content: 'json_data_from_web = \'{"username": "link", "is_active": true}\'\n\n# Convert JSON string to Python dict\npython_dict = json.loads(json_data_from_web)\nprint(python_dict["username"]) # Prints "link"' },
                    { type: 'note', content: "There are also `json.dump()` and `json.load()` (without the 's') for writing to and reading from file objects directly."}
                ]
            },
            realWorldExample: {
                title: "Parsing API Response",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "When you get data from a web API, it's almost always in JSON format. You need to parse this JSON to use the data in your program." },
                    { type: 'code', language: 'python', content: 'import json\n\n# A typical response from a weather API (as a string)\napi_response = \'{"city": "Hyrule", "temperature": 75, "conditions": "Sunny"}\'\n\n# Parse the string into a Python dictionary\nweather_data = json.loads(api_response)\n\n# Now we can easily work with the data\nprint(f"The weather in {weather_data[\'city\']} is {weather_data[\'conditions\']}.")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Confusing `json.load()` with `json.loads()`. `load` is for files, `loads` (with an 's' for string) is for string variables." },
                    { type: 'warning', content: "Invalid JSON format. A common issue is a trailing comma, which is allowed in Python dictionaries but not in the JSON standard. This will cause a `JSONDecodeError`." },
                ]
            }
        },
        challenges: [
            { id: 'day22-core', title: 'Python Dict to JSON', description: 'Import the `json` module. Convert the given Python dictionary `data` into a JSON formatted string and print it.', starterCode: 'import json\n\ndata = {"name": "Test", "value": 123}\n# Your code here', testCases: [{ input: [], expected: '{"name": "Test", "value": 123}\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day22-practice-loads', title: 'JSON to Python Dict', description: 'Import `json`. You are given a JSON string `json_str`. Parse it into a Python dictionary and print the value of the "city" key.', starterCode: 'import json\n\njson_str = \'{"name": "Alice", "city": "London"}\'\n# Your code here', testCases: [{ input: [], expected: 'London\n', hidden: false }], xp: 50, isOptional: true, difficulty: 'Beginner' },
            { id: 'day22-practice-indent', title: 'Pretty-Print JSON', description: 'Convert the `data` dictionary to a JSON string, but this time, use the `indent` parameter to make it more readable (pretty-print). Use an indent level of 4.', starterCode: 'import json\n\ndata = {"user": {"name": "Bob", "id": 456}}\n# Your code here', testCases: [{ input: [], expected: '{\n    "user": {\n        "name": "Bob",\n        "id": 456\n    }\n}\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day22-practice-nested-access', title: 'Access Nested JSON Data', description: 'Parse the `json_str`. Then, access the `title` of the second book in the `books` list and print it.', starterCode: 'import json\n\njson_str = \'{"user": "Eve", "books": [{"title": "Book A"}, {"title": "Book B"}]}\'\n# Your code here', testCases: [{ input: [], expected: 'Book B\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 23,
        title: 'Using External Libraries (`requests`)',
        skill: 'Modules',
        tutorial: {
            coreConcept: {
                title: "What are External Libraries?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Python's built-in modules are great, but the real power comes from the vast ecosystem of external libraries created by the community. These are installable packages that provide powerful tools for everything from web requests and data science to game development. The `requests` library is one of the most popular and makes interacting with the web incredibly simple." },
                    { type: 'note', content: "In a real environment, you would install a library using a package manager like `pip`, for example: `pip install requests`. For this lesson, the library is pre-installed for you."}
                ]
            },
            syntax: {
                title: "How to Use `requests`",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The most common task is making a `GET` request to a URL to fetch information. This is what your browser does when you visit a website." },
                    { type: 'code', language: 'python', content: 'import requests\n\n# The URL of the API endpoint\nurl = "https://api.quotable.io/random"\n\n# Make the GET request\nresponse = requests.get(url)\n\n# Check if the request was successful (status code 200 means OK)\nif response.status_code == 200:\n    # Get the response data as a Python dictionary\n    data = response.json()\n    print(f"Quote: {data[\'content\']}")\nelse:\n    print(f"Error: Failed to fetch data. Status code: {response.status_code}")' },
                ]
            },
            realWorldExample: {
                title: "Get Information About a Pokémon",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's use the free PokéAPI to get information about a specific Pokémon. This is a common task for any app that needs to display data from an external source." },
                    { type: 'code', language: 'python', content: 'import requests\n\n# We will use a mock API for this example\n# A real call would look like this:\n# pokemon_name = "ditto"\n# url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"\n# response = requests.get(url)\n# data = response.json()\n# print(f"Name: {data[\'name\'].capitalize()}")\n# print(f"ID: {data[\'id\']}")\n\n# Mocked output:\nprint("Name: Ditto")\nprint("ID: 132")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting to check the status code. Just because the request completed doesn't mean it was successful. An error on the server could return a 404 (Not Found) or 500 (Server Error) status code. Always check `response.status_code`." },
                    { type: 'warning', content: "Not handling potential `requests` errors. The request itself could fail due to network issues. It's good practice to wrap your `requests` calls in a `try...except` block." },
                ]
            }
        },
        challenges: [
            { id: 'day23-core', title: 'Make a GET Request', description: 'Import the `requests` library. Make a GET request to the mock URL "https://api.example.com/test". Our mock server will return a JSON with a "status" key. Check if `response.status_code` is 200, and if so, print the value of the "status" key from the JSON response.', starterCode: 'import requests\n\nurl = "https://api.example.com/test"\n# Your code here', testCases: [{ input: [], expected: 'ok\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Intermediate' },
            { id: 'day23-practice-fetch-user', title: 'Fetch User Data', description: 'Make a GET request to the mock URL "https://api.example.com/user". The response will be a JSON object with "name" and "email" keys. Print the user\'s name.', starterCode: 'import requests\n\nurl = "https://api.example.com/user"\n# Your code here', testCases: [{ input: [], expected: 'John Doe\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day23-practice-handle-404', title: 'Handle a 404 Error', description: 'Make a GET request to a mock URL that does not exist: "https://api.example.com/notfound". Write an if/else statement to check the `status_code`. If it\'s 404, print "Resource not found". Otherwise, print "Success".', starterCode: 'import requests\n\nurl = "https://api.example.com/notfound"\n# Your code here', testCases: [{ input: [], expected: 'Resource not found\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 24,
        title: 'Lambda Functions',
        skill: 'Advanced',
        tutorial: {
            coreConcept: {
                title: "What are Lambda Functions?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "A regular function is like a recipe you write on a full card, give it a name, and file away for later. A `lambda` function is like a quick note scribbled on a sticky pad for a one-time use. It's a small, anonymous (unnamed) function that can have any number of arguments but only one expression. They are useful when you need a simple function for a short period, often as an argument to another function." },
                ]
            },
            syntax: {
                title: "How to Use Lambdas",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The syntax is `lambda arguments: expression`." },
                    { type: 'code', language: 'python', content: '# A regular function to add 10\ndef add_ten(x):\n    return x + 10\n\n# The equivalent lambda function\nadd_ten_lambda = lambda x: x + 10\n\nprint(add_ten(5)) # Prints 15\nprint(add_ten_lambda(5)) # Prints 15' },
                    { type: 'paragraph', content: "Their real power shines when used with built-in functions like `map()` (applies a function to every item in an iterable) and `filter()` (creates a new iterable with elements that pass a test)." },
                    { type: 'code', language: 'python', content: 'numbers = [1, 2, 3, 4, 5]\n\n# Use map() with a lambda to square all numbers\nsquared_numbers = list(map(lambda x: x * x, numbers))\nprint(squared_numbers) # Prints [1, 4, 9, 16, 25]\n\n# Use filter() with a lambda to get only even numbers\neven_numbers = list(filter(lambda x: x % 2 == 0, numbers))\nprint(even_numbers) # Prints [2, 4]' },
                ]
            },
            realWorldExample: {
                title: "Sorting a List of Dictionaries",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Imagine you have a list of dictionaries and you want to sort it based on a value inside each dictionary. A `lambda` function is the perfect tool to provide a custom sort key." },
                    { type: 'code', language: 'python', content: 'players = [\n    {"name": "Alice", "score": 95},\n    {"name": "Bob", "score": 80},\n    {"name": "Charlie", "score": 100}\n]\n\n# Sort the list of players by their score\nplayers.sort(key=lambda player: player["score"])\n\nprint(players)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Overusing them. If your logic requires more than a single expression, or if it's complex, you should use a regular `def` function. Lambdas are for short, simple operations." },
                    { type: 'warning', content: "Assigning a lambda to a variable (like `my_lambda = lambda x: ...`) is often discouraged by style guides. If you need to give it a name, it's usually better to define it with `def`." },
                ]
            }
        },
        challenges: [
            { id: 'day24-core', title: 'Lambda for Multiplication', description: 'Create a lambda function that takes two arguments (`x`, `y`) and returns their product. Assign it to a variable `multiplier` and call it with 5 and 6. Print the result.', starterCode: '# Your code here', testCases: [{ input: [], expected: '30\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day24-practice-map', title: 'Use map() with Lambda', description: 'Given a list of `numbers`, use `map()` and a lambda function to create a new list where each number is doubled. Print the new list.', starterCode: 'numbers = [1, 2, 3, 4]\n# Your code here', testCases: [{ input: [], expected: '[2, 4, 6, 8]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day24-practice-filter', title: 'Use filter() with Lambda', description: 'Given a list of `numbers`, use `filter()` and a lambda to create a new list containing only the numbers greater than 10. Print the new list.', starterCode: 'numbers = [5, 12, 17, 8, 20]\n# Your code here', testCases: [{ input: [], expected: '[12, 17, 20]\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day24-practice-sort-key', title: 'Sort with a Lambda Key', description: 'You have a list of names. Use the `sort()` method with a lambda function as the `key` to sort the list by the length of each name. Print the sorted list.', starterCode: 'names = ["Leo", "Alexander", "Jo", "Mia"]\n# Your code here', testCases: [{ input: [], expected: "['Jo', 'Leo', 'Mia', 'Alexander']\n", hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 25,
        title: 'Introduction to Recursion',
        skill: 'Functions',
        tutorial: {
            coreConcept: {
                title: "What is Recursion?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Recursion is the process of a function calling itself. Imagine you have a set of nested Russian dolls. To find the smallest doll, your process is: 'Open the doll. If there's another doll inside, repeat the process with the inner doll. If it's empty, you're done.' A recursive function works similarly. It has a **base case** (the condition to stop, like the empty doll) and a **recursive step** (where the function calls itself with a modified argument, moving closer to the base case)." },
                ]
            },
            syntax: {
                title: "How to Write a Recursive Function",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "A classic example is calculating a factorial. The factorial of 5 (written as 5!) is 5 * 4 * 3 * 2 * 1." },
                    { type: 'code', language: 'python', content: 'def factorial(n):\n    # Base case: when n is 1, we stop.\n    if n == 1:\n        return 1\n    # Recursive step: n * factorial of (n-1)\n    else:\n        return n * factorial(n - 1)\n\nprint(factorial(5)) # Prints 120' },
                    { type: 'paragraph', content: "Here's how `factorial(4)` is executed:\n1. `factorial(4)` returns `4 * factorial(3)`\n2. `factorial(3)` returns `3 * factorial(2)`\n3. `factorial(2)` returns `2 * factorial(1)`\n4. `factorial(1)` returns `1` (base case)\n The calls then resolve: `2 * 1` = 2, then `3 * 2` = 6, then `4 * 6` = 24." },
                ]
            },
            realWorldExample: {
                title: "Navigating a File System",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Recursion is naturally suited for problems involving nested structures, like navigating a directory of folders and subfolders to find all files." },
                    { type: 'code', language: 'python', content: '# This is a conceptual example\ndef find_files(directory):\n    for item in directory:\n        if is_file(item):\n            print(f"Found file: {item}")\n        elif is_directory(item):\n            # Recursive call for the subdirectory\n            find_files(item)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting the base case. Without a base case, the function will call itself forever, leading to a `RecursionError: maximum recursion depth exceeded`." },
                    { type: 'warning', content: "Not changing the argument in the recursive call. The recursive call must work towards the base case. `factorial(n)` calling `factorial(n)` again will also cause an infinite loop." },
                ]
            }
        },
        challenges: [
            { id: 'day25-core', title: 'Recursive Countdown', description: 'Write a recursive function `countdown(n)` that prints numbers from `n` down to 1. The base case should be when `n` is 0.', starterCode: '# Your code here\n# countdown(3)', testCases: [{ input: [], expected: '3\n2\n1\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Intermediate' },
            { id: 'day25-practice-sum', title: 'Sum of Numbers', description: 'Write a recursive function `sum_recursive(n)` that computes the sum of all integers from 1 to `n`.', starterCode: '# Your code here\n# print(sum_recursive(5))', testCases: [{ input: [], expected: '15\n', hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day25-practice-fibonacci', title: 'Fibonacci Sequence', description: 'Write a recursive function `fibonacci(n)` that returns the nth Fibonacci number. The sequence starts 0, 1, 1, 2, 3, 5, ... where `fib(n) = fib(n-1) + fib(n-2)`. (Note: this is inefficient but a classic recursion exercise). Find the 6th number (index starts at 0).', starterCode: '# Your code here\n# print(fibonacci(6))', testCases: [{ input: [], expected: '8\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
     {
        day: 26,
        title: 'Decorators',
        skill: 'Advanced',
        tutorial: {
            coreConcept: {
                title: "What are Decorators?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "A decorator is like putting a fancy gift wrap around a present. The present (the original function) remains the same, but the wrapping adds extra flair or functionality (like logging, timing, or checking permissions) before and after the present is opened. In Python, a decorator is a function that takes another function as an argument, adds some functionality, and returns another function, all without altering the source code of the original function." },
                ]
            },
            syntax: {
                title: "How to Write a Decorator",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "A decorator is essentially a function that contains a wrapper function." },
                    { type: 'code', language: 'python', content: 'import time\n\ndef timer_decorator(func):\n    def wrapper(*args, **kwargs):\n        start_time = time.time()\n        result = func(*args, **kwargs) # Call the original function\n        end_time = time.time()\n        print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds to run.")\n        return result\n    return wrapper\n\n# Now, apply the decorator using the "@" symbol\n@timer_decorator\ndef slow_function():\n    time.sleep(1)\n    print("Function finished.")\n\nslow_function()' },
                ]
            },
            realWorldExample: {
                title: "Login Required Decorator",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "In web frameworks like Flask or Django, decorators are used constantly to check if a user is logged in before allowing them to access a specific page." },
                    { type: 'code', language: 'python', content: '# This is a conceptual example\ndef login_required(func):\n    def wrapper(user, *args, **kwargs):\n        if user.is_authenticated:\n            return func(user, *args, **kwargs)\n        else:\n            print("Access denied. Please log in.")\n            # In a real app, this would redirect to a login page\n    return wrapper\n\n@login_required\ndef view_profile(user):\n    print(f"Welcome to your profile, {user.name}!")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Forgetting to return the result from the original function inside the wrapper. If the decorated function returns a value, the wrapper must also return it." },
                    { type: 'warning', content: "Forgetting to use `*args` and `**kwargs` in the wrapper function's signature. This makes the decorator inflexible and it will fail if the decorated function takes any arguments." },
                ]
            }
        },
        challenges: [
            { id: 'day26-core', title: 'Simple Logger Decorator', description: 'Create a decorator `log_decorator` that prints "Calling function..." before the decorated function is called, and "Function finished." after. Apply it to the `say_hello` function.', starterCode: '# Define your decorator here\n\n@log_decorator\ndef say_hello():\n    print("Hello!")\n\nsay_hello()', testCases: [{ input: [], expected: 'Calling function...\nHello!\nFunction finished.\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Intermediate' },
            { id: 'day26-practice-uppercase', title: 'Uppercase Decorator', description: 'Create a decorator `uppercase_decorator` that takes the result of a function (which is assumed to be a string), converts it to uppercase, and returns it.', starterCode: '# Your decorator here\n\n@uppercase_decorator\ndef greet():\n    return "hello world"\n\nprint(greet())', testCases: [{ input: [], expected: 'HELLO WORLD\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 27,
        title: 'The `datetime` Module',
        skill: 'Modules',
        tutorial: {
            coreConcept: {
                title: "What is the `datetime` Module?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Time is a complex concept for computers—they have to deal with dates, times, time zones, and daylight saving. The `datetime` module is Python's built-in tool for handling all of these things. It provides classes for working with dates and times in a simple and powerful way." },
                ]
            },
            syntax: {
                title: "How to Use `datetime`",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "You can get the current date and time, create specific date objects, and format them into strings." },
                    { type: 'code', language: 'python', content: 'import datetime\n\n# Get the current date and time\nnow = datetime.datetime.now()\nprint(now)\n\n# Get just the current date\ntoday = datetime.date.today()\nprint(today)\n\n# Create a specific date\nsome_date = datetime.date(2025, 1, 31)\nprint(some_date)\n\n# Formatting dates into strings with strftime()\n# %Y = full year, %m = month, %d = day, %A = full weekday name\nprint(now.strftime("%Y-%m-%d"))\nprint(now.strftime("Today is %A, %B %d, %Y"))' },
                ]
            },
            realWorldExample: {
                title: "Calculating Age",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "You can perform arithmetic with `date` objects. This makes it easy to calculate things like the number of days until an event or a person's age." },
                    { type: 'code', language: 'python', content: 'import datetime\n\nbirthday = datetime.date(1995, 5, 15)\ntoday = datetime.date.today()\n\n# A simple way to calculate age in years\nage = today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))\n\nprint(f"This person is {age} years old.")' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Confusing `date`, `time`, and `datetime` objects. They are different classes within the module. A `datetime` object contains both date and time information, while a `date` object only has the date." },
                    { type: 'warning', content: "Ignoring time zones. By default, `datetime` objects are 'naive' (unaware of time zones). For complex applications, you should use libraries like `pytz` or Python 3.9+'s `zoneinfo` to create 'aware' objects." },
                ]
            }
        },
        challenges: [
            { id: 'day27-core', title: 'Print Today\'s Date', description: 'Import the `datetime` module and print today\'s date using `datetime.date.today()`.', starterCode: 'import datetime\n# Your code here', testCases: [{ input: [], expected: `${new Date().toISOString().split('T')[0]}\n`, hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day27-practice-format', title: 'Format the Date', description: 'Get today\'s date and format it to look like "MM/DD/YYYY" (e.g., "07/26/2023"). Print the formatted string.', starterCode: 'import datetime\n# Your code here', testCases: [{ input: [], expected: `${new Date().toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"})}\n`, hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day27-practice-timedelta', title: 'Calculate a Future Date', description: 'Import `datetime`. Get today\'s date. Then, create a `timedelta` of 10 days and add it to today\'s date to find out what the date will be in 10 days. Print the result.', starterCode: 'import datetime\n# Your code here', testCases: [{ input: [], expected: `${new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0]}\n`, hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 28,
        title: 'Regular Expressions',
        skill: 'Advanced',
        tutorial: {
            coreConcept: {
                title: "What are Regular Expressions?",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "Regular Expressions (or 'regex') are like a super-powered search tool for text. Instead of searching for a fixed string, you define a *pattern* of characters to search for. They are incredibly powerful for validating user input (like emails or phone numbers), scraping websites, and finding complex patterns in large amounts of text." },
                ]
            },
            syntax: {
                title: "How to Use the `re` Module",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "The `re` module is Python's interface for regular expressions. Two common functions are `re.search()` (finds the first match) and `re.findall()` (finds all matches)." },
                    { type: 'code', language: 'python', content: 'import re\n\ntext = "The quick brown fox jumps over the lazy dog."\n\n# Search for the word "fox"\nmatch = re.search(r"fox", text)\nif match:\n    print("Found a match!")\n\n# Find all words that start with "t" (case-insensitive)\nall_matches = re.findall(r"\\b[tT]\\w+", text)\nprint(all_matches) # Prints [\'The\', \'the\']' },
                     { type: 'paragraph', content: "Common regex patterns:\n- `\\d`: any digit (0-9)\n- `\\w`: any alphanumeric character (a-z, A-Z, 0-9, _)\n- `\\s`: any whitespace character\n- `.` : any character except newline\n- `+` : one or more occurrences\n- `*` : zero or more occurrences\n- `\\b`: word boundary" },
                ]
            },
            realWorldExample: {
                title: "Extracting Email Addresses from Text",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "A regular expression is the perfect tool for finding all email addresses within a block of text." },
                    { type: 'code', language: 'python', content: 'import re\n\ntext = "Contact us at support@example.com or for sales, email sales.info@company.co.uk."\n\n# A simple regex pattern for emails\nemail_pattern = r"[\\w.-]+@[\\w.-]+\\.\\w+"\n\nemails = re.findall(email_pattern, text)\nprint(emails)' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Overly complex patterns. Regex can become hard to read very quickly. Sometimes, using simple string methods is a better and more understandable solution." },
                    { type: 'warning', content: "Forgetting to use raw strings (`r\"...\"`). Backslashes are common in regex, and using a raw string tells Python not to interpret them as escape sequences, which prevents many bugs." },
                ]
            }
        },
        challenges: [
            { id: 'day28-core', title: 'Find a Word', description: 'Import the `re` module. Use `re.search()` to see if the word "Python" exists in the given `text`. Print "Found" if it does.', starterCode: 'import re\n\ntext = "I am learning Python and it is fun."\n# Your code here', testCases: [{ input: [], expected: 'Found\n', hidden: false }], xp: 50, isOptional: false, difficulty: 'Beginner' },
            { id: 'day28-practice-findall', title: 'Find All Numbers', description: 'Use `re.findall()` to extract all the numbers from the `text`. The pattern for one or more digits is `\\d+`. Print the resulting list.', starterCode: 'import re\n\ntext = "Order 123 was placed for user 45, costing $99."\n# Your code here', testCases: [{ input: [], expected: "['123', '45', '99']\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day28-practice-email', title: 'Validate an Email', description: 'Write a regex to check if the `email` string is a valid email format. A simple pattern is `r"\\S+@\\S+\\.\\S+"` (one or more non-whitespace characters, followed by @, etc.). Print "Valid" if it matches.', starterCode: 'import re\n\nemail = "test@example.com"\n# Your code here', testCases: [{ input: [], expected: 'Valid\n', hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 29,
        title: 'Project: Simple Contact Book',
        skill: 'Concepts',
        tutorial: {
            coreConcept: {
                title: "Putting It All Together",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "It's time to combine the concepts you've learned! Real-world applications are built by layering these fundamental building blocks—functions, dictionaries, loops, and file I/O—to create something useful. This project will guide you through building a simple contact book that runs in the command line, reinforcing how these different pieces interact." },
                ]
            },
            syntax: {
                title: "Project Structure",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "Our contact book will be a dictionary where keys are names and values are phone numbers. We'll create functions to perform specific actions:" },
                    { type: 'code', language: 'python', content: 'contacts = {}\n\ndef add_contact(name, number):\n    # Logic to add a contact\n\ndef view_contacts():\n    # Logic to display all contacts\n\ndef main():\n    # Main loop to ask the user what to do\n\n# To run the program\n# if __name__ == "__main__":\n#     main()' },
                    { type: 'note', content: "The `if __name__ == '__main__':` block is a standard Python convention. It ensures that the code inside it only runs when the script is executed directly (not when it's imported as a module into another script)." }
                ]
            },
            realWorldExample: {
                title: "A Basic Contact Book",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Below is a simplified, non-interactive version of the contact book to demonstrate the core functions working together." },
                    { type: 'code', language: 'python', content: 'contacts = {}\n\ndef add_contact(name, number):\n    contacts[name] = number\n    print(f"Added {name}.")\n\ndef view_contacts():\n    if not contacts:\n        print("No contacts to show.")\n    else:\n        print("--- Your Contacts ---")\n        for name, number in contacts.items():\n            print(f"- {name}: {number}")\n\n# Simulate using the functions\nadd_contact("Alice", "111-2222")\nadd_contact("Bob", "333-4444")\nview_contacts()' },
                ]
            },
            commonMistakes: {
                title: "Mistakes to Avoid",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "Mixing up logic. It's best to keep functions focused on a single task. For example, a function that adds a contact shouldn't also be responsible for printing the whole list." },
                    { type: 'warning', content: "Not handling edge cases. What happens if the user wants to view contacts but the list is empty? Or if they enter invalid input? Good programs anticipate these scenarios." },
                ]
            }
        },
        challenges: [
            { id: 'day29-core', title: 'Implement `view_contacts`', description: 'You are given a dictionary of contacts. Implement the `view_contacts` function. If the dictionary is empty, it should print "No contacts found.". Otherwise, it should print each contact on a new line in the format "Name: Number".', starterCode: 'contacts = {"Alice": "111", "Bob": "222"}\n\ndef view_contacts(book):\n    # Your code here\n\nview_contacts(contacts)', testCases: [{ input: [], expected: 'Alice: 111\nBob: 222\n', hidden: false }], xp: 75, isOptional: false, difficulty: 'Intermediate' },
            { id: 'day29-practice-add', title: 'Implement `add_contact`', description: 'Implement the `add_contact` function. It should take a dictionary, a name, and a number as arguments and add the new contact to the dictionary. Then print the updated dictionary.', starterCode: 'contacts = {"Alice": "111"}\n\ndef add_contact(book, name, number):\n    # Your code here\n    pass # Remove this line\n\nadd_contact(contacts, "Charlie", "333")\nprint(contacts)', testCases: [{ input: [], expected: "{'Alice': '111', 'Charlie': '333'}\n", hidden: false }], xp: 75, isOptional: true, difficulty: 'Intermediate' },
            { id: 'day29-practice-delete', title: 'Implement `delete_contact`', description: 'Implement the `delete_contact` function. It should safely delete a contact from the dictionary. If the contact exists, delete it. If not, do nothing. Use `del book[name]` inside a check. Print the dictionary after attempting to delete "Bob".', starterCode: 'contacts = {"Alice": "111", "Bob": "222"}\n\ndef delete_contact(book, name):\n    # Your code here\n\ndelete_contact(contacts, "Bob")\nprint(contacts)', testCases: [{ input: [], expected: "{'Alice': '111'}\n", hidden: false }], xp: 100, isOptional: true, difficulty: 'Advanced' }
        ]
    },
    {
        day: 30,
        title: 'Review and Next Steps',
        skill: 'Concepts',
        tutorial: {
            coreConcept: {
                title: "Congratulations!",
                icon: "CoreConceptIcon",
                blocks: [
                    { type: 'paragraph', content: "You've made it to the end of the 30-Day Python Quest! You have journeyed from printing 'Hello, World!' to understanding complex topics like object-oriented programming, file handling, and decorators. You have built a solid foundation upon which you can now construct amazing things. This is not the end of your journey, but the beginning of a new, exciting chapter as a developer." },
                ]
            },
            syntax: {
                title: "What We've Learned",
                icon: "SyntaxIcon",
                blocks: [
                    { type: 'paragraph', content: "Let's take a moment to review the key pillars of your new knowledge:" },
                    { type: 'note', content: "**Basics**: Variables, data types (strings, integers, floats, booleans), and arithmetic.\n**Data Structures**: Storing collections of data in lists, dictionaries, tuples, and sets.\n**Control Flow**: Making decisions with `if/elif/else` and repeating actions with `for` and `while` loops.\n**Functions**: Writing reusable blocks of code to keep your programs organized and efficient.\n**Object-Oriented Programming (OOP)**: Modeling real-world objects with classes and instances.\n**Modules & Files**: Using built-in and external libraries and interacting with the file system." },
                ]
            },
            realWorldExample: {
                title: "Where to Go From Here?",
                icon: "ExampleIcon",
                blocks: [
                    { type: 'paragraph', content: "Your Python skills are a passport to many exciting fields in technology. Here are a few paths you could explore next:" },
                    { type: 'code', language: 'python', content: '# Web Development (with frameworks like Django or Flask)\n# Build websites and web applications.\n\n# Data Science & Machine Learning (with libraries like Pandas, NumPy, Scikit-learn)\n# Analyze data, build predictive models, and work with AI.\n\n# Automation and Scripting\n# Write scripts to automate repetitive tasks on your computer.\n\n# Game Development (with libraries like Pygame)\n# Create your own 2D games.' },
                ]
            },
            commonMistakes: {
                title: "Keep Learning and Building",
                icon: "MistakeIcon",
                blocks: [
                    { type: 'paragraph', content: "The most important thing now is to keep practicing. The journey to becoming a proficient programmer is paved with projects. Don't be afraid to start small—build a calculator, a simple game, or a script to organize your files. Each project you build will solidify your knowledge and teach you new things. The developer community is vast and supportive; use resources like Stack Overflow, GitHub, and Reddit when you get stuck. Keep coding, stay curious, and happy building!" },
                ]
            }
        },
        challenges: [
            { id: 'day30-core', title: 'Final Challenge: Word Count', description: 'Write a function `word_count(text)` that takes a string, splits it into words, and returns a dictionary where keys are the words and values are their frequencies. Remember to handle punctuation and case by converting the text to lowercase and removing common punctuation. (This problem combines string methods, dictionaries, and loops).', starterCode: 'text = "Hello world! This is a test. Hello again."\n\n# Hint: you might want to use .lower(), .replace(), and .split()\ndef word_count(text):\n    # Your code here\n    pass\n\n# print(word_count(text))', testCases: [{ input: [], expected: "{'hello': 2, 'world': 1, 'this': 1, 'is': 1, 'a': 1, 'test': 1, 'again': 1}\n", hidden: false }], xp: 150, isOptional: false, difficulty: 'Advanced' }
        ]
    }
];
