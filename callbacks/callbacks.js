class Clock {
  constructor() { 
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.

    let date = new Date(); 
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.printTime();

    const tick = this._tick.bind(this);

    setInterval(function(){
      tick();
    }, 1000);
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    this.seconds++; 

    if ((this.seconds%60) === 0 ) {
       this.minutes++; 
    }
    if ((this.minutes%60) === 0 ) {
      this.hours++;       
    }
    if ((this.hours%24) === 0 ) {
      this.hours = 0; 
      this.minutes = 0;
      this.seconds = 0;
    }

    this.printTime(); 
  }
}

// // const clock = new Clock();  
const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) { 
  if (numsLeft === 0) {
    rl.close();
    return completionCallback(sum);
  }
  rl.question(`Enter a number.`, (answer) => { 
          sum += parseInt(answer);
          numsLeft -= 1;
          addNumbers(sum, numsLeft, completionCallback);
      });
    }
 // this is responsible for closing the loop. 

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}` ));
//dont orge rl.close();

function askIfGreaterThan(el1, el2, callback) {
 rl.question(`is ${el1} greater than ${el2}? `, (res) => {
   return callback(res === 'yes');
});
}

  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i === arr.length - 1){
    console.log("goodbye");
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    console.log("hello");
    askIfGreaterThan(arr[i], arr[i + 1], (bool) => {
      if (bool){
        console.log("about to swap...");
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        madeAnySwaps = true;
        innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
        //make swap
        //set madeAnySwaps to true
      } else {
        console.log("didn't have to swap...");
        innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
      }
    });
  }
}

 // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps=true) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if (madeAnySwaps){
      console.log("in outer sort");
      madeAnySwaps = false;
      let i = 0;
      innerBubbleSortLoop(arr, i , madeAnySwaps, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop();
}



absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  rl.close();
});

// askIfGreaterThan(1,2, function(ele) {console.log(ele);});