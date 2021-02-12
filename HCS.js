// SET UP DATABASE
var firebaseConfig = {
  apiKey: "AIzaSyDIzIi2JhGpck3StYQJBV5lzvGLqnTtVCo",
  authDomain: "usability-experiment.firebaseapp.com",
  databaseURL: "https://usability-experiment-default-rtdb.firebaseio.com",
  projectId: "usability-experiment",
  storageBucket: "usability-experiment.appspot.com",
  messagingSenderId: "787908919179",
  appId: "1:787908919179:web:e6d3e7140dc4e4e222f98e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// FUNCTION: create user id
function generateUserID() {
  var result = '';
  var characters = '0123456789';
  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
  if (mobile) {
    result = "M"
  }
  else {
    result = "PC"
  }
  for ( var i = 0; i < 8; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// FUNCTION: generate random number
function generateRandNum(numOfPages){
  var randValue = (Math.floor(Math.random() * numOfPages)) + 1;
  return randValue;
}

// FUNCTION: get time elapsed in each comparison
function getTime(startTime) {
  var end = new Date();
  var timeTaken = end - start;
  return timeTaken;
}

// FUNCTION: check the page isn't being compared to itself
function checkComparisons(val1, val2){
  if (val1 == val2){
    newVal2 = this.generateRandNum(29);
    return newVal2;
  }
}

// FUNCTION: get random numbers to select pages for comparison. Check that the same comparisons are not appearing twice in the experimnent for the same participant.
function getAndCheckRandImageNums(pageArray){
  var randValueLeft = this.generateRandNum(29);
  var randValueRight = this.generateRandNum(29);
  while (randValueLeft == randValueRight){
    randValueRight = this.checkComparisons(randValueLeft, randValueRight);
  }
  var previousArray = pageArray[pageArray.length-1];
  if ((randValueLeft != previousArray[0] || randValueLeft != previousArray[1]) && (randValueRight != previousArray[0] || randValueRight != previousArray[1])) {
    pageArray.push([randValueLeft, randValueRight]);
    return pageArray;
  }
  else {
    this.getAndCheckRandImageNums(pageArray);
  }
}

// FUNCTION: generate an array of the comparisons in a random order
function getRandomPageArray(){
  var pageArray = [[31, 32], [33, 34], [35, 36]]; // push 3 practice comparisons to array
  // FIRST BLOCK OF COMPARISONS: (push 8 comparisons, so 3 practice + 7 actual + 1 sanity check in this block)
  for (var i=0; i<9; i++){
      pageArray = this.getAndCheckRandImageNums(pageArray);
    }
  pageArray.push([pageArray[4][1], pageArray[4][0]]);
  pageArray.push([100, 101]);

  // SECOND AND THIRD BLOCKS: (push 11 comparisons for each block, + appropriate sanity check)
  for (var n=0; n<2; n++){
    for (var i=0; i<12; i++){
      pageArray = this.getAndCheckRandImageNums(pageArray);
    }
    if (n==0){
      pageArray.push([pageArray[14][1], pageArray[14][0]]);
      pageArray.push([100, 101]);
    }
    else {
      pageArray.push([pageArray[25][1], pageArray[25][0]]);
    }
  }
  return pageArray;
}

// change the images based on next comparisons in array
function changeImages(){
  pageArray.shift();
  var nextArray = pageArray[0];
  var left = nextArray[0];
  var right = nextArray[1];

  document.getElementById("left").src = "./wp/"+left+".JPG";
  document.getElementById("left").setAttribute("value", Number(left));
  document.getElementById("right").src = "./wp/"+right+".JPG";
  document.getElementById("right").setAttribute("value", Number(right));
}

function onImageClick(selectedPage, selectedID){
  var selectedName = Number(selectedPage);
  if (pageArray.length>1){
    var timeTaken = this.getTime();
    var tempArr = [document.getElementById("left").value, document.getElementById("right").value, selectedName, timeTaken];
    arrayForDB.push(tempArr);
    console.log(arrayForDB);
    this.changeImages();
    start = new Date();
  }
  else {
    var timeTaken = this.getTime();
    var tempArr = [document.getElementById("left").value, document.getElementById("right").value, selectedName, timeTaken];
    arrayForDB.push(tempArr);
    db.ref(userId).set(arrayForDB);
    window.location.href = "./questionnaire.html";
  }
}

// 1. Create user id
userId = this.generateUserID();
// 2. Get time and convert to string to push to database
// get time and convert to string to push to database
var start = new Date();
var time = start.getDate().toString();
var hours = start.getHours().toString();
var min = start.getMinutes().toString();
var sec = start.getSeconds().toString();
time = time.concat(".", hours,".", min, ".", sec);
var arrayForDB = [[time]];
// 3. Push practice comparisons to page array (done in next section)
// 4. Randomize actual comparisons and push to page array
var pageArray = this.getRandomPageArray();
// 5. Parse through comparisons as participant clicks through images
// 6. Save all data to DB
// --> Both done in html
