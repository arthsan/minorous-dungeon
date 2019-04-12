// AUDIO
function screenAudio() {
    let horrorBGMs = document.getElementById('screen-audio');
    horrorBGMs.play();
}

function stopScreenAudio() {
    let horrorBGMs = document.getElementById('screen-audio');
    horrorBGMs.pause();
    horrorBGMs.currentTime = 0;
}

function wonAudio() {
    let horrorBGMw = document.getElementById('won-audio');
    horrorBGMw.play();
}

function stopstartAudio() {
    let horrorBGMw = document.getElementById('won-audio');
    horrorBGMw.pause();
    horrorBGMw.currentTime = 0;
}

function horrorAudio() {
    let horrorBGM = document.getElementById('horror-audio');
    horrorBGM.play();
}

function stopHorrorAudio() {
    let horrorBGM = document.getElementById('horror-audio');
    horrorBGM.pause();
    horrorBGM.currentTime = 0;
}

function gameOverAudio() {
    let horrorBGM = document.getElementById('game-over-audio');
    horrorBGM.play();
}