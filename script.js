

let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

function shuffle(array) {
                                    /*** Knuth Shuffle Algorithm */
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}


function initialiseImages() {
  arr = shuffle(arr); // shuffling array of images 
  console.log(arr);
  let imgarr = document.getElementsByClassName("img"); // adding the shuffled images to tiles
  for (let i = 0; i < arr.length; i++) {
    let cssTxt = "url(images/" + arr[i] + ".jpg)";
    imgarr[i].style.backgroundImage = cssTxt;
  }

}
initialiseImages();



let actvList = document.getElementsByClassName('img-cover'); // array of all tiles whose child has background-image
console.log(actvList);





                                                  /******   START  BUTTON   and TIMER   ******/

let alertShown = false; // to ensure alert is shown only once
function startTimer(duration, display) {
  var timer = duration,
    /***minutes, */ seconds;
  setInterval(function () {

    seconds = parseInt(timer, 10);

    // minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = seconds;

    if (--timer < 0) {
      timer = 0;

      let message = "Time Up! Your Score is " + score;
      if (alertShown == false) {
        window.alert(message);
        alertShown = true;
      }


    }
  }, 1000);
}
var isStarted = false;

  document.getElementById('startbtn').addEventListener('click', function () { // adding click event to start button
  document.getElementById('startbtn').classList.add('deactivated');

  if (isStarted == false) {
    var timeLim = 100;   // time limit is 100 seconds
    display = document.querySelector('#time');
    startTimer(timeLim, display);
  }
  isStarted = true;
  startt();      /////////  started the game   //////////
}); //finished timer function 



                                                        /********* MATCH IT FUNCTION ********/

let matchitpsd = false;    // initialising match-it variables
let matchitavail = true;

function matchIt(parent1) { // not optimising and looping whole array cause me lazy
  let im1 = parent1.childNodes[1];
  //console.log('parent1 is ');
  //console.log(parent1);
  style1 = im1.currentStyle || window.getComputedStyle(im1, false), // extracting url of background image of passed node
    url1 = style1.backgroundImage.slice(4, -1).replace(/"/g, "");
  //console.log(url1);

  if (matchitavail == true)
    for (let i = 0; i < 20; i++) { // looping to find matching image 
      let im2 = actvList[i].childNodes[1];
      //console.log(im2);
      style2 = im2.currentStyle || window.getComputedStyle(im2, false), // extracting url of background image 
        url2 = style2.backgroundImage.slice(4, -1).replace(/"/g, "");
      //console.log(url2);

      if (url1 == url2) {   // deleting that image which is same as one passed to match-it function 
        parent1.classList.add('deleted');
        actvList[i].classList.add('deleted');
      }
    }

  actvItm = [];  // emptied active item array
  score = score + 30; // +30 score when match-it powerup is used
  document.getElementById('score').innerText = score; // updating score

  matchitavail = false;   // to ensure match-it powerup can't be used twice
}

document.getElementById('matchbtn').addEventListener('click', function () { // adding click event on match it button and calling function
  matchitpsd = true;
  if (oneselected) this.classList.add('deactivated');
  //console.log('matchit is pressed');
  if (actvItm.length == 1 && matchitpsd == true) { // when match-it is pressed call the function
    if (matchitavail == true) {
      matchIt(actvItm[0]);
    }
    //console.log('match it processing');
    //console.log(matchitpsd);
  }
});






                                                        /*********   REVEAL FUNCTION   **********/

function reveal() {             // makes tiles visible for 1.2 seconds
  for (let i = 0; i < 20; i++) {
    actvList[i].classList.add('flipped');
  }
  setTimeout(function () {
    for (let i = 0; i < 20; i++) {
      actvList[i].classList.remove('flipped');
    }
  }, 1200);                      
}

document.getElementById('reveal').addEventListener('click', function () { // adding click event in reveal button
  if (this.classList.contains('deactivated') == false && isStarted == true) {
    this.classList.add('deactivated');
    reveal();
  }
});




let actvItm = []; // will store two divs which contains cover and nests a child div which has image. ie. contains curreltly clicked tiles, upto 2
let score = 0;
let oneselected = false;






                                          /************* MAIN LOGIC ******************/


function startt() { // starting the game
  let content = document.getElementsByClassName("img-cover");
  for (let i = 0; i < 20; i++) { // adding click event to all tiles
    content[i].addEventListener('click', function () {

      if (actvItm.length < 2 && this != actvItm[actvItm.length - 1]) { // pushing clicked image to array, second condition prevents same image from pushed twice
        this.classList.add('flipped');
        actvItm.push(this);
        console.log(this);
      }


      if (actvItm.length == 1) oneselected = true;  // to help match-it function, as match-it works only when 1 tile flipped
      if (actvItm.length == 2) { // checking if images match when 2 tiles are flipped
        let img1 = actvItm[0].childNodes[1];  // got inner div of tile, which has background image
        console.log(img1);
        let img2 = actvItm[1].childNodes[1];
        console.log(img2);

        style1 = img1.currentStyle || window.getComputedStyle(img1, false), // extracting url of background image 
          url1 = style1.backgroundImage.slice(4, -1).replace(/"/g, "");
        console.log(url1);

        style2 = img2.currentStyle || window.getComputedStyle(img2, false), // extracting url of background image 
          url2 = style2.backgroundImage.slice(4, -1).replace(/"/g, "");
        console.log(url2);
        oneselected = false;

        if (url1 == url2) { // when images match
          setTimeout(function () {
            console.log("images matched");
            actvItm[0].classList.add('deleted');   // deleting the matched item from screen
            actvItm[1].classList.add('deleted');
            actvItm = [];
            score = score + 10 + Number(document.getElementById('time').innerText); // score is 10 + time
            document.getElementById('score').innerText = score;
          }, 400); // wait for 0.4 sec, then delete the matched images

        } 
        else if (url1 != url2) { // when images don't match
          setTimeout(function () {
            for (let i = 0; i < actvItm.length; i++) {
              actvItm[i].classList.remove('flipped');
            }
            actvItm = [];   // cleared active  item array
            //console.log('wrong answer');
          }, 500);    // wait 0.5 seconds, and unflip both images
        }

      }


    });
  }// adding click events to all tiles over



}// function start game over



/********* RESTART BUTTON, RESETTING VALUES TO DEFAULT *************/

function reset() {
  location.reload();
}

document.getElementById('resetbtn').addEventListener('click', function () {
  reset();
  console.log('reset to default');
});