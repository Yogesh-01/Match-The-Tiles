console.log("hehe");

let arr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

function shuffle(array) {                                  /*** Knuth Shuffle Algorithm */
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  arr = shuffle(arr);                     // shuffling array of images 
  console.log(arr);

let imgarr=document.getElementsByClassName("img");  // adding the shuffled images to tiles
  for(let i=0;i<arr.length ; i++){
     let cssTxt = "url(images/"+arr[i]+".jpg)";
      imgarr[i].style.backgroundImage = cssTxt; 
  }




let actvList=document.getElementsByClassName('img-cover');
console.log(actvList);






                             /**** starting timer  */

  function startTimer(duration, display) {
    var timer = duration,/***minutes, */ seconds;
    setInterval(function () {
        
      seconds = parseInt(timer , 10);

        // minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}
var isStarted =false;


document.getElementById('startbtn').addEventListener('click', function(){
  document.getElementById('startbtn').classList.add('deactivated');
  if(!isStarted){
    var timeLim = 10,
    display = document.querySelector('#time');
    startTimer(timeLim, display);
  }
  isStarted=true;
});            //finished timer function 




let actvItm=[];   // will store two divs which contains cover and nests a child div which has image
let score=0;


                         /******* Main LOGIC ******************/

let content = document.getElementsByClassName("img-cover");
for(let i=0;i<20;i++){  // adding click event to all tiles
content[i].addEventListener('click', function(){
    
    if(actvItm.length<2 && this!=actvItm[actvItm.length-1]){  // pushing clicked image to array, second condition prevents same image from pushed twice
       this.classList.add('flipped');
       actvItm.push(this);
       console.log(this);
      }
      // else{
      //    for(let i=0;i<actvItm.length;i++){
      //      actvItm[i].classList.remove('flipped');
      //    }  
      //    actvItm=[];
      //    console.log(actvItm.length);
      // }
     
    if(actvItm.length==2){                  // checking if images match
        let img1 = actvItm[0].childNodes[1];
        console.log(img1);
        let img2 = actvItm[1].childNodes[1];
        console.log(img2);
  
        style1 = img1.currentStyle || window.getComputedStyle(img1, false),   // extracting url of background image 
        url1 = style1.backgroundImage.slice(4, -1).replace(/"/g, "");
        console.log(url1);
  
        style2 = img2.currentStyle || window.getComputedStyle(img2, false),   // extracting url of background image 
        url2 = style2.backgroundImage.slice(4, -1).replace(/"/g, "");
        console.log(url2);
  
    
        if(url1== url2){                           // when images match
          setTimeout(function(){
            console.log("images matched");
            actvItm[0].classList.add('deleted');
            actvItm[1].classList.add('deleted');
            actvItm=[];
            score= score+10;
            document.getElementById('score').innerText=score;
        },500);  // wait for 0.5 sec, then delete the matched images
        
         }
         else if(url1= url2){                                     // when images don't match
          setTimeout(function(){
          for(let i=0;i<actvItm.length;i++){
                 actvItm[i].classList.remove('flipped');
               }  
               actvItm=[];
               console.log('wrong bitch');
              },500);
         }
  
      }
  
     
});
}
// window.onload = function () {
//     var timeLim = 100,
//         display = document.querySelector('#time');
//     startTimer(timeLim, display);
// };