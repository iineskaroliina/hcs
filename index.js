passcode = ["1", "2", "3", "4"];

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

// get array of numbers
function getRandOrder() {
  randArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // rearrange targets to get random order
  randArr = this.shuffle(randArr);
  return randArr;
}

function changeNumPad(){
  randArr = this.getRandOrder();
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

function compareArrays(array1, array2){
  if (array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})){
    return true;
  }
}

enteredPasscode = [];
text = [];

function onButtonClick(enteredNum){
  text.push("*");
  document.getElementById("passcode").innerHTML = text.join("");
  // save the number that was just entered
  enteredPasscode.push(enteredNum);
  console.log(enteredPasscode);
}

function onBackClick(){
  enteredPasscode.pop();
  text.pop();
  document.getElementById("passcode").innerHTML = text.join("");
}

function wrongPasscode(){
  setTimeout(function() {alert("Incorrect passcode, try again.");},1);
  this.changeNumPad();
  enteredPasscode = [];
  text = [];
  document.getElementById("passcode").innerHTML = text.join("");
}

function onEnter(){
  // check if the length of the entered passcode matches the passcode
  if (enteredPasscode.length == passcode.length){
    // if yes, check if the passcode matches
    if (compareArrays(enteredPasscode, passcode)){
      setTimeout(function() {alert("Correct passcode, device unlocked.");},1);
      this.changeNumPad();
      enteredPasscode = [];
      text = [];
      document.getElementById("passcode").innerHTML = text.join("");
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

this.changeNumPad();
