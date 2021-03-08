// set up database:
var firebaseConfig = {
  apiKey: "AIzaSyC4J-wxKmkLh3wem22R0MMlS_Qa6k_R4jY",
  authDomain: "hcs-ax.firebaseapp.com",
  projectId: "hcs-ax",
  databaseURL: "https://hcs-ax-default-rtdb.firebaseio.com/",
  storageBucket: "hcs-ax.appspot.com",
  messagingSenderId: "468649954217",
  appId: "1:468649954217:web:6db18abd0be4e1ec0212b8"
};
var db = firebase.initializeApp(firebaseConfig).database();

// global variables:
passcode = ["2", "6", "4", "8"];
enteredPasscode = [];
text = [];
startTime = new Date();
// temp saved: the randomized array, time taken, number of errors
temp = [startTime, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]];
data = [];
errors = 0;

// generate userid for easier saving to db
function generateUserID() {
  var result = '';
  var characters = '0123456789';
  for ( var i = 0; i < 8; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
userId = this.generateUserID();

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

// calculate time taken to enter PIN
function getTime(start) {
  var end = new Date();
  var timeTaken = end - start;
  return timeTaken;
}

// get randomised array of numbers
function getRandOrder() {
  randArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // rearrange targets to get random order
  randArr = this.shuffle(randArr);
  return randArr;
}

// edit values of the numpad
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
  enteredPasscode = [];
  text = [];
  document.getElementById("passcode").innerHTML = text.join("");
  if (data.length > 2){
    this.changeNumPad();
  }
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
  if (compareArrays(enteredPasscode, passcode)){
    // save important info:
    var timeTaken = this.getTime(startTime);
    temp.push(errors, timeTaken);
    data.push(temp);

    // if participant has completed the 3 standard PIN entries and then 5 of the randomised ones, save data and redirect participant to questionnaire:
    if (data.length == 8){
      // save to database
      db.ref(userId).set(data);
      // redirect user to questionnaire
      window.location.href = "https://forms.gle/c9BTCbPZMxd8woSA7";
    }

    // else, reset and keep going:
    else{
      // feedback to user and reset variables for next round, reshuffle numpad:
      temp = [];
      errors = 0;
      setTimeout(function() {alert("Correct passcode, device unlocked.");},1);
      enteredPasscode = [];
      text = [];
      document.getElementById("passcode").innerHTML = text.join("");

      // if the participant has completed 3 entries on the standard numpad, start shuffling the numpad
      if (data.length > 2){
        this.changeNumPad();
      }
    }
  }
  // if no, wrong passcode
  else{
    this.wrongPasscode();
  }
}

// MAIN BUTTON CLICK METHOD:
function onButtonClick(enteredNum){
  // if no numbers previously entered, start timer
  if (enteredPasscode.length == 0){
    startTime = new Date();
  }

  // save the number that was just entered
  enteredPasscode.push(enteredNum);
  // give user feedback that number entered was registered:
  text.push("*");
  document.getElementById("passcode").innerHTML = text.join("");

  // check length of passcode, if length matches, treat as pressing enter button
  if (enteredPasscode.length == passcode.length){
    this.onEnter();
  }
}
