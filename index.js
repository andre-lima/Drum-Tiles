//GLOBAL VARIABLES
var clampMin = 5;
var clampMax = 250;
const dataKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76];
var tiles;
var multis = [(Math.random() > 0.5 ? 1 : -1), (Math.random() > 0.5 ? 1 : -1), (Math.random() > 0.5 ? 1 : -1)];
var colors = [ Math.floor(Math.random()*(clampMax-10)), Math.floor(Math.random()*(clampMax-10)), Math.floor(Math.random()*(clampMax-10))];

window.addEventListener('load', function(){
    populateTiles(140);
    randomizeColors();
});

function randomizeColors(){
    colors = [ Math.floor(Math.random()*clampMax), Math.floor(Math.random()*clampMax), Math.floor(Math.random()*clampMax)];
    setTimeout(randomizeColors, 5000);
    updateColors();
}

function populateTiles(amount) {
  var parent = document.querySelector(".keys");
  for(let i = 0; i < amount; ++i) {
    createTile(parent);
  }

  tiles = document.querySelectorAll(".tile");
  updateColors();
}

function createTile(parent) {
  //var parent = document.querySelector(".keys");
  var tile = document.createElement("div");

  tile.classList.add('tile');

  att = document.createAttribute('data-key');
  att.value = dataKeys[Math.floor(Math.random() * dataKeys.length)];
  tile.setAttributeNode(att);

  parent.appendChild(tile);

  tile.addEventListener('transitionend', removeTransition);
  tile.addEventListener('click', playSound);
  //tile.addEventListener('mouseover', playSound);
}

window.addEventListener('keydown', playSound);

function playSound(e) {
    var audio;
    var tile;
    if(e.keyCode) {
        audio = document.querySelector('audio[data-key="' + e.keyCode + '"]');
        tile = document.querySelectorAll('.tile[data-key="' + e.keyCode + '"]');
    } else { //If clicking with a mouse or tapping
        var dk = e.toElement.getAttribute("data-key");
        audio = document.querySelector('audio[data-key="' + dk + '"]');
        tile = document.querySelectorAll('.tile[data-key="' + dk + '"]');
    }

    //Return if no audio element exists with this key-code
    if(!audio) return;

    //Restart audio and plays it again
    audio.currentTime = 0;
    audio.play();

    for(var t of tile) {
        t.classList.add('playing');
    }
    updateColors();
}

function updateColors() {

  for(let t of tiles) {
    for(let c in colors){
      colors[c] = clamp(clampMin, clampMax, colors[c] + multis[c]);

      if(colors[c] >= clampMax || colors[c] <= clampMin)
        multis[c] *= -1;  //Reverse the direction of color change
    }

    t.style.background = "rgba("+ colors[0] + "," + colors[1] + "," + colors[2] + ",0.9)";
  }
}

function removeTransition(e){

    //Skip if transition is not a "transform" property
    if(e.propertyName !== "transform")
        return;

    //Removing class to return to previous styling
    this.classList.remove('playing');
}

function clamp(min, max, value) {
  return Math.min(Math.max(value, min), max);
};
