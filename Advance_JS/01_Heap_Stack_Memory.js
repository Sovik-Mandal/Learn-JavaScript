/************** Stack Memory ************************/

/*
    Stack Memory (fast, short-lived)
    The stack is where JavaScript stores:
        Primitive values
        Function calls (call stack)
        Local variables and parameters
*/

let a = 10;
let b = a;
b = 20;

console.log(a); // 10
console.log(b); // 20

// Call stack example: //

function foo() {
  bar();
}

function bar() {
  console.log("Hello");
}

foo();
/*
    Call stack flow:
        foo() pushed
        bar() pushed
        console.log() runs
        bar() popped
        foo() popped

    Stack = LIFO (Last In, First Out)
    Very fast
    Automatically cleaned up when functions finish
*/

/************** Heap Memory ************************/

/*
    The heap is where JavaScript stores:
        Objects
        Arrays
        Functions
        Reference types
*/

let obj1 = { name: "Alice" };
let obj2 = obj1;

obj2.name = "Bob";

console.log(obj1.name); // "Bob"
console.log(obj2.name); // "Bob"

/*
    Heap memory is used for reference types. When we assign obj1 to obj2, they both point to the same object in the heap. Changing the name property through obj2 also changes it for obj1 because they reference the same object.
    Heap memory is slower than stack memory but can store larger and more complex data structures. It is managed by the JavaScript engine's garbage collector, which automatically frees up memory that is no longer in use.
*/