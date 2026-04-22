
import type { Challenge, TestResult } from '../types';

// This is a MOCK executor. It doesn't actually run Python.
// It uses simple string matching for predefined challenges.
// A real implementation would require a backend service or a client-side
// Python interpreter like Pyodide.

const MOCK_STDOUT: string[] = [];
const MOCK_FILES: { [key: string]: string } = {};

const mockPrint = (...args: any[]) => {
    // Emulate Python's print, which stringifies and joins with spaces.
    const output = args.map(arg => {
        if (arg === null) return 'None';
        if (typeof arg === 'boolean') return arg ? 'True' : 'False';
        if (arg instanceof Set) {
            const arr = Array.from(arg).sort((a,b) => String(a).localeCompare(String(b)));
            const setString = arr.map(v => typeof v === 'string' ? `'${v}'` : String(v)).join(', ');
            return `{${setString}}`;
        }
        if (Array.isArray(arg)) return `[${arg.map(v => typeof v === 'string' ? `'${v}'` : String(v)).join(', ')}]`;
        if (typeof arg === 'object' && arg !== null) {
             if (Object.keys(arg).length === 0) return '{}';
             const dictString = Object.entries(arg)
                .map(([k, v]) => `'${k}': ${typeof v === 'string' ? `'${v}'` : v}`)
                .join(', ');
             return `{${dictString}}`;
        }
        return String(arg);
    }).join(' ') + '\n';
    MOCK_STDOUT.push(output);
};

const mockOpenFile = (filename: string, mode: 'r' | 'w' | 'a') => {
    if (mode === 'r') {
        return MOCK_FILES[filename] || '';
    }
    if (mode === 'w') {
        MOCK_FILES[filename] = '';
    }
    return {
        write: (content: string) => {
            if (mode === 'a' && !MOCK_FILES[filename]) {
                 MOCK_FILES[filename] = '';
            }
            MOCK_FILES[filename] = (MOCK_FILES[filename] || '') + content;
        }
    };
};

/**
 * Normalizes a string output for comparison.
 * - Standardizes newlines to \n.
 * - Trims whitespace from each line.
 * - Trims leading/trailing empty lines from the whole string.
 */
const normalizeOutput = (str: string): string => {
    if (typeof str !== 'string') return '';

    const stableSort = (value: string): string => value
        .split(',')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        .join(', ');
    
    // Special handling for dictionary/set string representation sorting
    if (str.trim().startsWith('{') && str.trim().endsWith('}')) {
        try {
            // Attempt to sort keys for consistent comparison
            const content = str.trim().slice(1, -1);
            if (content.includes(':')) { // It's a dictionary
                 const sortedContent = stableSort(content);
                 return `{${sortedContent}}`.trim();
            } else { // It's a set
                const sortedContent = stableSort(content);
                 return `{${sortedContent}}`.trim();
            }
        } catch (e) {
            // fallback to default normalization
        }
    }
     if (str.trim().startsWith('[') && str.trim().endsWith(']')) {
        try {
             const content = str.trim().slice(1, -1);
             const sortedContent = stableSort(content);
             return `[${sortedContent}]`.trim();
        } catch(e) {
            // fallback
        }
    }

    return str
        .replace(/\r\n/g, '\n') // Standardize newlines
        .split('\n')
        .map(line => line.trim()) // Trim whitespace from each line
        .join('\n')
        .trim(); // Trim leading/trailing whitespace/newlines
};


export const executePython = async (code: string, challenge: Challenge): Promise<TestResult[]> => {
    if (code.length > 50000) {
        return challenge.testCases.map((testCase) => ({
            pass: false,
            actual: 'Error: Code input is too large for this in-browser runner.',
            expected: testCase.expected,
            input: testCase.input,
        }));
    }

    const results: TestResult[] = [];

    for (const testCase of challenge.testCases) {
        // Reset stdout for each test case run
        MOCK_STDOUT.length = 0;
        MOCK_FILES['myfile.txt'] = 'Hello, file!';
        MOCK_FILES['greeting.txt'] = 'Welcome to Python.';
        MOCK_FILES['haiku.txt'] = 'An old silent pond...\nA frog jumps into the pond—\nsplash! Silence again.';
        MOCK_FILES['users.txt'] = 'user1\nguest\nadmin\nuser2';
        MOCK_FILES['log.txt'] = 'Event 1';
        MOCK_FILES['config.txt'] = 'old_setting';
        MOCK_FILES['data.txt'] = '5';


        try {
            // Day 1
            if (challenge.id === 'day1-core') {
                if (code.includes('print("Hello, Python Quest!")') || code.includes("print('Hello, Python Quest!')")) mockPrint('Hello, Python Quest!');
            } else if (challenge.id === 'day1-practice-print-number') {
                if (code.includes('print(100)')) mockPrint(100);
            } else if (challenge.id === 'day1-bonus') {
                const printsFirst = /print\s*\(\s*['"]First line['"]\s*\)/.test(code);
                const printsSecond = /print\s*\(\s*['"]Second line['"]\s*\)/.test(code);
                const printsNewline = /print\s*\(\s*['"]First line\\nSecond line['"]\s*\)/.test(code);
                if ((printsFirst && printsSecond) || printsNewline) {
                    mockPrint('First line');
                    mockPrint('Second line');
                }
            } else if (challenge.id === 'day1-practice-print-with-sep') {
                if (code.includes('print(1, 2, 3, sep="-")') || code.includes("print(1, 2, 3, sep='-')")) mockPrint('1-2-3');
            }
            // Day 2
            else if (challenge.id === 'day2-core') {
                 if (code.match(/greeting\s*=\s*['"]Welcome to Day 2['"]/) && code.includes('print(greeting)')) {
                    mockPrint('Welcome to Day 2');
                 }
            } else if (challenge.id === 'day2-practice-types') {
                if (code.includes('print(player_name)') && code.includes('print(level)') && code.includes('print(is_ready)')) {
                    mockPrint('Hero');
                    mockPrint(10);
                    mockPrint(true);
                }
            } else if (challenge.id === 'day2-practice-reassign') {
                if (code.includes('score = 50') && code.includes('print(score)') && code.includes('score = 100')) {
                    mockPrint(50);
                    mockPrint(100);
                }
            } else if (challenge.id === 'day2-practice-concatenate') {
                if (code.includes('print(greeting + name)')) mockPrint('Hello, Alex');
            }
            // Day 3
            else if (challenge.id === 'day3-core') {
                 if (code.includes('print(a + b)') || code.includes('print(b + a)') || code.includes('print(10 + 35)')) {
                    mockPrint(45);
                 }
            } else if (challenge.id === 'day3-practice-area') {
                if (code.includes('width * height')) mockPrint(40);
            } else if (challenge.id === 'day3-practice-remainder') {
                if (code.includes('27 % 4')) mockPrint(3);
            } else if (challenge.id === 'day3-practice-temp') {
                if (code.includes('(celsius * 9/5) + 32') || code.includes('(celsius * 1.8) + 32')) mockPrint(77.0);
            } else if (challenge.id === 'day3-practice-exponent') {
                if (code.includes('2 ** 8')) mockPrint(256);
            }
            // Day 4
            else if (challenge.id === 'day4-core') {
                 if (/print\(\s*fruits\s*\)/.test(code) || /print\(\s*\[\s*['"]apple['"]\s*,\s*['"]banana['"]\s*,\s*['"]cherry['"]\s*\]\s*\)/.test(code)) {
                    mockPrint(['apple', 'banana', 'cherry']);
                 }
            } else if (challenge.id === 'day4-practice-access') {
                if (code.includes('print(planets[2])')) mockPrint('Earth');
            } else if (challenge.id === 'day4-practice-append') {
                if (code.includes('numbers.append(4)') && code.includes('print(numbers)')) {
                    mockPrint([1, 2, 3, 4]);
                }
            } else if (challenge.id === 'day4-practice-change-item') {
                if (code.includes('colors[1] = "yellow"') || code.includes("colors[1] = 'yellow'")) mockPrint(['red', 'yellow', 'blue']);
            } else if (challenge.id === 'day4-practice-length') {
                if (code.includes('len(inventory)')) mockPrint(4);
            }
            // Day 5
            else if (challenge.id === 'day5-core') {
                if (code.includes('if num > 0:')) {
                    mockPrint('Positive');
                }
            } else if (challenge.id === 'day5-practice-equality') {
                if (code.includes('color == "blue"') || code.includes("color == 'blue'")) mockPrint('The color is blue');
            } else if (challenge.id === 'day5-practice-even-odd') {
                 if (code.includes('% 2') && code.includes('print("Even")') && code.includes('print("Odd")')) {
                    mockPrint('Odd');
                 }
            } else if (challenge.id === 'day5-practice-grades') {
                if(code.includes('score >= 90') && code.includes('score >= 70') && code.includes('print("Excellent")') && code.includes('print("Good")')) {
                    mockPrint("Good");
                }
            } else if (challenge.id === 'day5-practice-discount') {
                if (code.includes('age < 12 or age > 65')) mockPrint('Discount applied');
            }
            // Day 6
            else if (challenge.id === 'day6-core') {
                 if (code.includes('def show_message():') && code.includes('show_message()')) {
                    mockPrint('I am learning functions!');
                 }
            } else if (challenge.id === 'day6-practice-greet-person') {
                if (code.includes('def greet_person(name):') && (code.includes('greet_person("World")') || code.includes("greet_person('World')")) ) {
                    mockPrint('Hello, World!');
                }
            } else if (challenge.id === 'day6-practice-add') {
                if (code.includes('def get_sum(num1, num2):') && code.includes('return') && code.includes('print(get_sum(10, 15)')) {
                    mockPrint(25);
                }
            } else if (challenge.id === 'day6-practice-square') {
                if (code.includes('def square(number):') && code.includes('return number * number') && code.includes('print(square(8))')) {
                    mockPrint(64);
                }
            } else if (challenge.id === 'day6-practice-find-max') {
                if (code.includes('def find_max') && code.includes('return') && code.includes('if') && code.includes('else')) {
                    mockPrint(250);
                }
            }
            // Day 7
            else if (challenge.id === 'day7-core') {
                 if (code.includes("print(user['name'])") || code.includes('print(user.get("name"))')) {
                    mockPrint('Alice');
                 }
            } else if (challenge.id === 'day7-practice-create-dict') {
                if (code.includes('book["title"]') || code.includes("book['title']")) {
                    mockPrint('The Hobbit');
                }
            } else if (challenge.id === 'day7-practice-add-key') {
                if (code.includes('movie["director"]') || code.includes("movie['director']")) {
                    mockPrint({'title': 'Home Alone', 'year': 1990, 'director': 'Chris Columbus'});
                }
            } else if (challenge.id === 'day7-practice-update-key') {
                if (code.includes('player["score"] = 150') || code.includes("player['score'] = 150")) {
                    mockPrint({'name': 'Zelda', 'score': 150});
                }
            } else if (challenge.id === 'day7-practice-check-key') {
                if (code.includes('"theme" in settings') || code.includes("'theme' in settings")) {
                    mockPrint(true);
                }
            }
            // Day 8
            else if (challenge.id === 'day8-core') {
                if (code.includes('for fruit in fruits:')) {
                    mockPrint('apple');
                    mockPrint('banana');
                    mockPrint('cherry');
                }
            } else if (challenge.id === 'day8-practice-range') {
                if (code.includes('for') && (code.includes('range(1, 6)') || code.includes('range(1,6)'))) {
                    mockPrint(1); mockPrint(2); mockPrint(3); mockPrint(4); mockPrint(5);
                }
            } else if (challenge.id === 'day8-practice-sum') {
                if (code.includes('for') && code.includes('total')) {
                    mockPrint(100);
                }
            } else if (challenge.id === 'day8-practice-find-evens') {
                if (code.includes('for') && code.includes('if number % 2 == 0:')) {
                    mockPrint(2); mockPrint(4); mockPrint(6); mockPrint(8);
                }
            } else if (challenge.id === 'day8-practice-dict-loop') {
                if (code.includes('for country in capitals:')) {
                    mockPrint('USA'); mockPrint('France'); mockPrint('Japan');
                }
            }
            // Day 9
            else if (challenge.id === 'day9-core') {
                if (code.includes('class Car:') && code.includes('__init__') && code.includes('self.make') && code.includes('print')){
                    mockPrint('Tesla');
                }
            } else if (challenge.id === 'day9-practice-instance') {
                if (code.includes('my_dog = Dog("Buddy", "Golden Retriever")') && code.includes('print(my_dog.name)')) {
                    mockPrint('Buddy');
                }
            } else if (challenge.id === 'day9-practice-method') {
                 if (code.includes('class Book:') && code.includes('def display_info(self):') && (code.includes('print(f') || code.includes('print(self.title'))) {
                    mockPrint('The Hobbit by J.R.R. Tolkien');
                 }
            } else if (challenge.id === 'day9-practice-player-level-up') {
                if (code.includes('class Player:') && code.includes('def level_up(self):') && code.includes('self.level += 1')) {
                    mockPrint(2);
                }
            }
            // Day 10
            else if (challenge.id === 'day10-core') {
                 if (code.includes('import math') && code.includes('print(math.pi)')) {
                    mockPrint(Math.PI);
                 }
            } else if (challenge.id === 'day10-practice-sqrt') {
                if(code.includes('import math') && code.includes('math.sqrt(81)')) mockPrint(9.0);
            } else if (challenge.id === 'day10-practice-randint') {
                if(code.includes('import random') && code.includes('random.randint(10, 20)')) mockPrint('A random number between 10 and 20');
            } else if (challenge.id === 'day10-practice-datetime') {
                if (code.includes('import datetime') && code.includes('datetime.date.today()')) {
                    mockPrint(new Date().toISOString().split('T')[0]);
                }
            } else if (challenge.id === 'day10-practice-choice') {
                if (code.includes('from random import choice') && code.includes('choice(options)')) {
                    const choice = testCase.expected.split('|')[0] // Just pick one for validation
                    mockPrint(choice); 
                }
            }
            // Day 11
            else if (challenge.id === 'day11-core') {
                if (code.includes('open("myfile.txt"') && code.includes('read')) {
                    mockPrint(mockOpenFile('myfile.txt', 'r'));
                }
            } else if (challenge.id === 'day11-practice-uppercase') {
                 if (code.includes('open("greeting.txt"') && code.includes('read()') && code.includes('.upper()')) {
                    const fileContent = mockOpenFile('greeting.txt', 'r');
                    if (typeof fileContent === 'string') {
                        mockPrint(fileContent.toUpperCase());
                    }
                 }
            } else if (challenge.id === 'day11-practice-count-lines') {
                 if (code.includes('open("haiku.txt"') && (code.includes('len(f.readlines())') || (code.includes('for line in') && code.includes('+= 1')))) {
                    const fileContent = mockOpenFile('haiku.txt', 'r');
                    if (typeof fileContent === 'string') {
                        mockPrint(fileContent.split('\n').length);
                    }
                 }
            } else if (challenge.id === 'day11-practice-find-line') {
                if (code.includes('open("users.txt"') && code.includes('for line in') && code.includes('if "admin" in line')) {
                    mockPrint('admin');
                }
            }
            // Day 12
            else if (challenge.id === 'day12-core') {
                if (code.includes('[') && code.includes('for n in numbers') && code.includes('n * n')) {
                    mockPrint([1, 4, 9, 16, 25]);
                }
            } else if (challenge.id === 'day12-practice-uppercase') {
                if (code.includes('[word.upper() for word in words]')) {
                    mockPrint(['HELLO', 'WORLD']);
                }
            } else if (challenge.id === 'day12-practice-filter-evens') {
                 if (code.includes('[') && code.includes('for') && code.includes('in numbers') && code.includes('if') && code.includes('% 2 == 0')) {
                    mockPrint([2, 4, 6, 8, 10]);
                 }
            } else if (challenge.id === 'day12-practice-lengths') {
                if (code.includes('[len(word) for word in words]')) {
                    mockPrint([5, 5, 2, 6]);
                }
            } else if (challenge.id === 'day12-practice-names-a') {
                if (code.includes('[') && code.includes('for name in names') && code.includes('.startswith("A")')) {
                    mockPrint(["Alice", "Anna", "Alex"]);
                }
            }
            // Day 13
            else if (challenge.id === 'day13-core') {
                if (code.includes('f"Hello, {name}! Welcome to Day 13."')) mockPrint('Hello, Explorer! Welcome to Day 13.');
            } else if (challenge.id === 'day13-practice-strip') {
                if (code.includes('data.strip()')) mockPrint('some important data');
            } else if (challenge.id === 'day13-practice-split') {
                if (code.includes('sentence.split(" ")')) mockPrint(['Python', 'is', 'a', 'powerful', 'language']);
            } else if (challenge.id === 'day13-practice-join') {
                if (code.includes('" ".join(words)')) mockPrint("Let's learn Python");
            }
            // Day 14
            else if (challenge.id === 'day14-core') {
                if (code.includes('items[:3]')) mockPrint(['sword', 'shield', 'potion']);
            } else if (challenge.id === 'day14-practice-last-two') {
                if (code.includes('items[-2:]')) mockPrint(['gold', 'gem']);
            } else if (challenge.id === 'day14-practice-reverse') {
                if (code.includes('numbers[::-1]')) mockPrint([5, 4, 3, 2, 1]);
            } else if (challenge.id === 'day14-practice-sort') {
                if (code.includes('scores.sort()')) mockPrint([81, 92, 99, 105]);
            } else if (challenge.id === 'day14-practice-insert-pop') {
                if (code.includes('playlist.insert(1,') && code.includes('playlist.pop()')) mockPrint(["Song A", "New Tune", "Song B"]);
            }
            // Day 15
            else if (challenge.id === 'day15-core') {
                if (code.includes('print(my_tuple[1])')) mockPrint(20);
            } else if (challenge.id === 'day15-practice-set') {
                if (code.includes('my_set = {') || code.includes('set([')) mockPrint(new Set(['apple', 'banana', 'cherry']));
            } else if (challenge.id === 'day15-practice-uniques') {
                if (code.includes('list(set(numbers))')) mockPrint([1, 2, 3, 4, 5]);
            } else if (challenge.id === 'day15-practice-add-to-set') {
                if (code.includes('permissions.add("delete")')) mockPrint(new Set(['read', 'write', 'delete']));
            } else if (challenge.id === 'day15-practice-intersection') {
                if (code.includes('set1 & set2') || code.includes('set1.intersection(set2)')) mockPrint(new Set([3, 4]));
            }
            // Day 16
            else if (challenge.id === 'day16-core') {
                if (code.includes('while') && code.includes('count < 3') && code.includes('+= 1')) { mockPrint(0); mockPrint(1); mockPrint(2); }
            } else if (challenge.id === 'day16-practice-countdown') {
                if (code.includes('while') && (code.includes('>= 1') || code.includes('> 0')) && code.includes('-= 1')) { mockPrint(5); mockPrint(4); mockPrint(3); mockPrint(2); mockPrint(1); }
            } else if (challenge.id === 'day16-practice-break') {
                if (code.includes('while') && code.includes('if num == 5:') && code.includes('break')) { mockPrint(0); mockPrint(1); mockPrint(2); mockPrint(3); mockPrint(4); }
            } else if (challenge.id === 'day16-practice-continue') {
                if (code.includes('while') && code.includes('if') && code.includes('% 2 == 0') && code.includes('continue')) { mockPrint(1); mockPrint(3); mockPrint(5); mockPrint(7); mockPrint(9); }
            }
            // Day 17
            else if (challenge.id === 'day17-core') {
                if (code.includes('for key in student:')) { mockPrint('name'); mockPrint('subject'); mockPrint('grade'); }
            } else if (challenge.id === 'day17-practice-values') {
                if (code.includes('.values()')) { mockPrint('Maria'); mockPrint('Math'); mockPrint(95); }
            } else if (challenge.id === 'day17-practice-items') {
                if (code.includes('.items()')) { mockPrint('name: Maria'); mockPrint('subject: Math'); }
            } else if (challenge.id === 'day17-practice-sum-values') {
                if (code.includes('for') && code.includes('.values()') && code.includes('+= val')) mockPrint(23);
            }
            // Day 18
            else if (challenge.id === 'day18-core') {
                if (code.includes('def power(base, exponent=2):') && code.includes('print(power(5))')) mockPrint(25);
            } else if (challenge.id === 'day18-practice-args') {
                if (code.includes('def sum_all(*args)') || code.includes('def sum_all(*numbers)')) mockPrint(15);
            } else if (challenge.id === 'day18-practice-kwargs') {
                if (code.includes('def display_info(**kwargs)') || code.includes('def display_info(**info)')) { mockPrint('name: Product'); mockPrint('price: 19.99'); }
            } else if (challenge.id === 'day18-practice-full-signature') {
                if (code.includes('def report(reporter_name, *observations, **details)')) { mockPrint('Report by: Agent X'); mockPrint('- Target acquired'); mockPrint('- Weather is clear'); mockPrint('Details:'); mockPrint('status: nominal'); mockPrint('time: 1800Z'); }
            }
            // Day 19
            else if (challenge.id === 'day19-core') {
                if (code.includes('try:') && code.includes('except ZeroDivisionError:')) mockPrint('Error: Cannot divide by zero.');
            } else if (challenge.id === 'day19-practice-value-error') {
                if (code.includes('try:') && code.includes('except ValueError:')) mockPrint('Invalid number');
            } else if (challenge.id === 'day19-practice-key-error') {
                if (code.includes('try:') && code.includes('except KeyError:')) mockPrint('Key not found');
            } else if (challenge.id === 'day19-practice-else-finally') {
                if (code.includes('try:') && code.includes('except') && code.includes('else:') && code.includes('finally:')) { mockPrint('Calculation successful.'); mockPrint('Execution complete.'); }
            }
            // Day 20
            else if (challenge.id === 'day20-core') {
                if (code.includes('open("new_file.txt", "w")') && code.includes('.write(')) {
                    const file = mockOpenFile('new_file.txt', 'w');
                    if (typeof file === 'object' && 'write' in file) {
                        file.write('First line of text.');
                    }
                    mockPrint(MOCK_FILES['new_file.txt']);
                }
            } else if (challenge.id === 'day20-practice-append') {
                if (code.includes('open("log.txt", "a")') && code.includes('.write(')) {
                    const file = mockOpenFile('log.txt', 'a');
                    if (typeof file === 'object' && 'write' in file) {
                        file.write('\nEvent 2');
                    }
                    mockPrint(MOCK_FILES['log.txt']);
                }
            } else if (challenge.id === 'day20-practice-write-list') {
                 if (code.includes('open("shopping.txt", "w")') && code.includes('for')) {
                     const file = mockOpenFile('shopping.txt', 'w');
                     if (typeof file === 'object' && 'write' in file) {
                        file.write('apples\n'); file.write('bananas\n'); file.write('milk\n');
                     }
                     mockPrint(MOCK_FILES['shopping.txt']);
                 }
            } else if (challenge.id === 'day20-practice-overwrite') {
                if (code.includes('open("config.txt", "w")') && code.includes('.write("new_setting")')) {
                     const file = mockOpenFile('config.txt', 'w');
                     if (typeof file === 'object' && 'write' in file) {
                        file.write('new_setting');
                     }
                     mockPrint(MOCK_FILES['config.txt']);
                }
            } else if (challenge.id === 'day20-practice-with-read') {
                 if (code.includes('open("data.txt", "r")') && code.includes('open("data.txt", "w")')) {
                     const file = mockOpenFile('data.txt', 'w');
                     if (typeof file === 'object' && 'write' in file) {
                        file.write('10');
                     }
                     mockPrint(MOCK_FILES['data.txt']);
                 }
            }
            // Day 21
            else if (challenge.id === 'day21-core') {
                if(code.includes('class Car(Vehicle):') && code.includes('my_car = Car()') && code.includes('my_car.start_engine()')) mockPrint('Engine started.');
            } else if (challenge.id === 'day21-practice-override') {
                 if(code.includes('class Penguin(Bird):') && code.includes('def fly(self):') && code.includes('print("Cannot fly.")')) mockPrint('Cannot fly.');
            } else if (challenge.id === 'day21-practice-super') {
                 if(code.includes('class Manager(Employee):') && code.includes('super().__init__(name)')) mockPrint('Alice');
            }
            // Day 22
            else if (challenge.id === 'day22-core') {
                if (code.includes('import json') && code.includes('json.dumps(data)')) mockPrint('{"name": "Test", "value": 123}');
            } else if (challenge.id === 'day22-practice-loads') {
                if (code.includes('import json') && code.includes('json.loads(json_str)')) mockPrint('London');
            } else if (challenge.id === 'day22-practice-indent') {
                if (code.includes('json.dumps(data, indent=4)')) mockPrint('{\n    "user": {\n        "name": "Bob",\n        "id": 456\n    }\n}');
            } else if (challenge.id === 'day22-practice-nested-access') {
                 if (code.includes('json.loads') && code.includes('["books"][1]["title"]')) mockPrint('Book B');
            }
            // Day 23
            else if (challenge.id === 'day23-core') {
                if (code.includes('import requests') && code.includes('response.status_code == 200')) mockPrint('ok');
            } else if (challenge.id === 'day23-practice-fetch-user') {
                if (code.includes('import requests') && code.includes('.json()')) mockPrint('John Doe');
            } else if (challenge.id === 'day23-practice-handle-404') {
                if (code.includes('import requests') && code.includes('if response.status_code == 404')) mockPrint('Resource not found');
            }
            // Day 24
            else if (challenge.id === 'day24-core') {
                if (code.includes('lambda x, y: x * y') && code.includes('multiplier(5, 6)')) mockPrint(30);
            } else if (challenge.id === 'day24-practice-map') {
                if (code.includes('map(lambda') && code.includes('x: x * 2')) mockPrint([2, 4, 6, 8]);
            } else if (challenge.id === 'day24-practice-filter') {
                if (code.includes('filter(lambda') && code.includes('x > 10')) mockPrint([12, 17, 20]);
            } else if (challenge.id === 'day24-practice-sort-key') {
                if (code.includes('.sort(key=lambda') && code.includes('len(name)')) mockPrint(["Jo", "Leo", "Mia", "Alexander"]);
            }
            // Day 25
            else if (challenge.id === 'day25-core') {
                if (code.includes('def countdown(n):') && code.includes('if n == 0:') && code.includes('countdown(n - 1)')) { mockPrint(3); mockPrint(2); mockPrint(1); }
            } else if (challenge.id === 'day25-practice-sum') {
                if (code.includes('def sum_recursive(n):') && code.includes('return n + sum_recursive(n - 1)')) mockPrint(15);
            } else if (challenge.id === 'day25-practice-fibonacci') {
                 if (code.includes('def fibonacci(n):') && code.includes('fibonacci(n - 1) + fibonacci(n - 2)')) mockPrint(8);
            }
            // Day 26
            else if (challenge.id === 'day26-core') {
                if (code.includes('def log_decorator(func):') && code.includes('@log_decorator')) {
                    mockPrint('Calling function...'); mockPrint('Hello!'); mockPrint('Function finished.');
                }
            } else if (challenge.id === 'day26-practice-uppercase') {
                if (code.includes('def uppercase_decorator(func):') && code.includes('return result.upper()')) mockPrint('HELLO WORLD');
            }
            // Day 27
            else if (challenge.id === 'day27-core') {
                if (code.includes('import datetime') && code.includes('datetime.date.today()')) mockPrint(new Date().toISOString().split('T')[0]);
            } else if (challenge.id === 'day27-practice-format') {
                if (code.includes('import datetime') && code.includes('.strftime("%m/%d/%Y")')) mockPrint(new Date().toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"}));
            } else if (challenge.id === 'day27-practice-timedelta') {
                 if (code.includes('import datetime') && code.includes('datetime.timedelta(days=10)')) mockPrint(new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0]);
            }
            // Day 28
            else if (challenge.id === 'day28-core') {
                if (code.includes('import re') && code.includes('re.search("Python"')) mockPrint('Found');
            } else if (challenge.id === 'day28-practice-findall') {
                 if (code.includes('import re') && code.includes('re.findall(r"\\d+"')) mockPrint(['123', '45', '99']);
            } else if (challenge.id === 'day28-practice-email') {
                if (code.includes('import re') && code.includes('re.search(r"\\S+@\\S+\\.\\S+"')) mockPrint('Valid');
            }
            // Day 29
            else if (challenge.id === 'day29-core') {
                if (code.includes('def view_contacts(book):') && code.includes('if not book:') && code.includes('for name, number in')) {
                    mockPrint('Alice: 111');
                    mockPrint('Bob: 222');
                }
            } else if (challenge.id === 'day29-practice-add') {
                if (code.includes('def add_contact(book, name, number):') && code.includes('book[name] = number')) {
                    mockPrint({'Alice': '111', 'Charlie': '333'});
                }
            } else if (challenge.id === 'day29-practice-delete') {
                 if (code.includes('def delete_contact(book, name):') && code.includes('if name in book:') && code.includes('del book[name]')) {
                    mockPrint({'Alice': '111'});
                 }
            }
            // Day 30
            else if (challenge.id === 'day30-core') {
                 if (code.includes('def word_count(text):') && code.includes('.lower()') && code.includes('split()') && code.includes('for word in')) {
                     mockPrint({'hello': 2, 'world': 1, 'this': 1, 'is': 1, 'a': 1, 'test': 1, 'again': 1});
                 }
            }
            else {
                 mockPrint('Execution not mocked for this challenge.');
            }

            const actualOutput = MOCK_STDOUT.join('');
            
            // Special cases for random validation
            if (challenge.id === 'day10-practice-choice') {
                const options = testCase.expected.split('|');
                const pass = options.some(opt => normalizeOutput(actualOutput) === normalizeOutput(opt + '\n'));
                 results.push({
                    pass: pass,
                    actual: actualOutput,
                    expected: 'One of: "rock", "paper", or "scissors"',
                    input: testCase.input,
                });
            } else if (challenge.id === 'day10-practice-randint') {
                results.push({ pass: true, actual: actualOutput, expected: testCase.expected, input: testCase.input });
            } else {
                const normalizedActual = normalizeOutput(actualOutput);
                const normalizedExpected = normalizeOutput(testCase.expected);
                
                results.push({
                    pass: normalizedActual === normalizedExpected,
                    actual: actualOutput,
                    expected: testCase.expected,
                    input: testCase.input,
                });
            }

        } catch (e: any) {
            results.push({
                pass: false,
                actual: `Error: ${e.message}`,
                expected: testCase.expected,
                input: testCase.input,
            });
        }
    }
    
    // Simulate network delay
    await new Promise(res => setTimeout(res, 150));

    return results;
};