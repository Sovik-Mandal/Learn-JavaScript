console.log("Program Started");

setTimeout(() => console.log("Time Out"), 0);
setInterval(() => console.log("Interval Tick"), 1000);

Promise.resolve()
.then(() => {
    console.log("Promise Resolved")
});

console.log("Program End");

// +++++++ Starvation Problem ++++++++++++ //

/*
    This creates infinite microtasks.
    Result:
        Macrotasks never execute
        UI freezes
        Browser crash
    Called Microtask starvation
*/

function loop() {
    Promise.resolve().then(loop);
}

loop();

// async/await = Promises + Event Loop //

async function test() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}
console.log(0);
test();
console.log(3);

// fetch() vs setTimeout //
