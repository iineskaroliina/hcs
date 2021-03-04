passcode = ["1", "2", "3", "4"];
enteredPasscode = [];
text = [];
startTime = new Date();
// temp saved: the randomized array, time taken, number of errors
temp = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]];
data = [];
errors = 0;

//rearrange array to get random order:
function shuffle(arr) {
  var current = arr.length, temp, rand;
  while (0 !== current) {
    rand = Math.floor(Math.random() * current);
    current -= 1;
    temp = arr[current];
    arr[current] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}

function getTime(start) {
  var end = new Date();
  var timeTaken = end - start;
  return timeTaken;
}

// get array of numbers
function getRandOrder() {
  randArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // rearrange targets to get random order
  randArr = this.shuffle(randArr);
  return randArr;
}

function changeNumPad(){
  randArr = this.getRandOrder();
  temp.push(randArr);
  document.getElementById("one").setAttribute("value", randArr[0]);
  document.getElementById("two").setAttribute("value", randArr[1]);
  document.getElementById("three").setAttribute("value", randArr[2]);
  document.getElementById("four").setAttribute("value", randArr[3]);
  document.getElementById("five").setAttribute("value", randArr[4]);
  document.getElementById("six").setAttribute("value", randArr[5]);
  document.getElementById("seven").setAttribute("value", randArr[6]);
  document.getElementById("eight").setAttribute("value", randArr[7]);
  document.getElementById("nine").setAttribute("value", randArr[8]);
  document.getElementById("zero").setAttribute("value", randArr[9]);
}

// Comparing the arrays:
function compareArrays(array1, array2){
  if (array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})){
    return true;
  }
}

// If wrong passcode entered:
function wrongPasscode(){
  errors += 1;
  setTimeout(function() {alert("Incorrect PIN, try again.");},1);
  this.changeNumPad();
  enteredPasscode = [];
  text = [];
  document.getElementById("passcode").innerHTML = text.join("");
  this.changeNumPad();
}

// Click on back button:
function onBackClick(){
  if (enteredPasscode.length >0){
    errors +=1;
    enteredPasscode.pop();
    text.pop();
    document.getElementById("passcode").innerHTML = text.join("");
  }
}

// Click on enter button:
function onEnter(){
  // check if the length of the entered passcode matches the passcode
  if (enteredPasscode.length == passcode.length){
    // if yes, check if the passcode matches
    if (compareArrays(enteredPasscode, passcode)){
      // save important info:
      var timeTaken = this.getTime(startTime);
      temp.push(errors, timeTaken);
      console.log(temp);
      data.push(temp);

      // if participant has completed the inital PIN entry and then 5 of the randomised ones, save data and redirect participant to questionnaire:
      if (data.length == 5){
        // save to database
        // redirect user to questionnaire
      }
      
      // else, reset and keep going:
      else{
        // feedback to user and reset variables for next round, reshuffle numpad:
        temp = [];
        errors = 0;
        setTimeout(function() {alert("Correct passcode, device unlocked.");},1);
        this.changeNumPad();
        enteredPasscode = [];
        text = [];
        document.getElementById("passcode").innerHTML = text.join("");
      }
    }
    // if no, wrong passcode
    else{
      this.wrongPasscode();
    }
  }
  else{
    this.wrongPasscode();
  }
}

// MAIN BUTTON CLICK METHOD:
function onButtonClick(enteredNum){
  if (enteredPasscode.length == 0){
    startTime = new Date();
  }
  // save the number that was just entered
  enteredPasscode.push(enteredNum);
  // give user feedback that number entered was registered:
  text.push("*");
  document.getElementById("passcode").innerHTML = text.join("");
}
