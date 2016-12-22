
window.addEventListener('load', createTiles);

function createTiles() {
    const body = document.body;
    const keys = document.querySelector(".keys");

    const numberOfTiles = 60;
    const dataKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76];

    for(let i = 0; i < numberOfTiles; ++i) {
        var oneKey = document.createElement('div');
        var att = document.createAttribute('data-key');
        att.value = dataKeys[Math.floor(Math.random() * dataKeys.length)];
        oneKey.setAttributeNode(att);
        oneKey.classList.add('tile');
        keys.appendChild(oneKey);
    }

    const tiles = document.querySelectorAll(".tile");
    for(var t of tiles) {
        t.addEventListener('transitionend', removeTransition);
    }
}

window.addEventListener('keydown', playSound);

function playSound(e) {
    const audio = document.querySelector('audio[data-key="' + e.keyCode + '"]');
    const tile = document.querySelectorAll('.tile[data-key="' + e.keyCode + '"]');

    //Return if no audio element exists with this key-code
    if(!audio) return;

    //Restart audio and plays it again
    audio.currentTime = 0;
    audio.play();

    for(var t of tile) {
        t.classList.add('playing');
    }
}

function removeTransition(e){

    //Skip if transition is not a "transform" property
    if(e.propertyName !== "transform")
        return;

    //Removing class to return to previous styling
    this.classList.remove('playing');
}
