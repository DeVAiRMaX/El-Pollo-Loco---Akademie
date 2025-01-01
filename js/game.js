let canvas;
let world;
let keyboard = new Keyboard();
let gameStatus = false;
let gameSetting = false;
let gameFinish = false;

function init() {
    gameStatus = 'playing';
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function ClearAllInterVals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function showVictoryScreen() {
    ClearAllInterVals();
    gameFinish = true;
    world = null;
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('gbaScreen').style.display = 'flex';
    document.getElementById('victoryscreen').style.display = 'flex';
    document.getElementById('mobileButtonContainer').style.display = "none";
}

function showLoseScreen() {
    gameFinish = true;
    ClearAllInterVals();
    world = null;
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('gbaScreen').style.display = 'flex';
    document.getElementById('deathscreen').style.display = 'flex';
    document.getElementById('mobileButtonContainer').style.display = "none";
}

function retry() {
    initLevel();
    init();
    document.getElementById("canvas").style.display = "block";
}
 // TODO: afk-timer läuft trotzdem bewegung weiter!
window.addEventListener("touchstart", (event) => {
    if (event.target.id === 'mobileRightButton') {
        event.preventDefault();
        keyboard.RIGHT = true;
    }
    if (event.target.id === 'mobileLeftButton') {
        event.preventDefault();
        keyboard.LEFT = true;
    }
    if (event.target.id === 'mobileUpButton') {
        event.preventDefault();
        keyboard.UP = true;
    }
    if (event.target.id === 'mobileThrowButton') {
        event.preventDefault();
        keyboard.D = true;
    }
    if (event.target.id === 'mobileHealButton') {
        event.preventDefault();
        keyboard.C = true;
    }
});


window.addEventListener("touchend", (event) => {
    if (event.target.id === 'mobileRightButton') {
        event.preventDefault();
        keyboard.RIGHT = false;
    }
    if (event.target.id === 'mobileLeftButton') {
        event.preventDefault();
        keyboard.LEFT = false;
    }
    if (event.target.id === 'mobileUpButton') {
        event.preventDefault();
        keyboard.UP = false;
    }
    if (event.target.id === 'mobileThrowButton') {
        event.preventDefault();
        keyboard.D = false;
    }
    if (event.target.id === 'mobileHealButton') {
        event.preventDefault();
        keyboard.C = false;
    }
});

window.addEventListener("keydown", (key) => {
    if (key.keyCode == 67) {
        keyboard.C = true;
    }
    if (key.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (key.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (key.keyCode == 38) {
        keyboard.UP = true;
    }
    if (key.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (key.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (key.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (key) => {
    if (key.keyCode == 67) {
        keyboard.C = false;
    }
    if (key.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (key.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (key.keyCode == 38) {
        keyboard.UP = false;
    }
    if (key.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (key.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (key.keyCode == 68) {
        keyboard.D = false;
    }
});

function startGame() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    }
    gameStatus = true;
    document.getElementById('gbaScreen').style.display = "flex";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('fullscreenicon').style.display = "block";
    initLevel();
    init();
}

function startMobileGame() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    }
    gameStatus = true;
    document.getElementById('mobileButtonContainer').style.display = "flex";
    document.getElementById('gbaScreen').style.display = "flex";
    document.getElementById('canvas').style.display = "block";
    initLevel();
    init();
}

function gameSettings() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    } else {
        gameSetting = true;
        let gbaScreen = document.getElementById('gbaScreen');
        let settings = document.getElementById('settings');
        let canvas = document.getElementById('canvas');
        gbaScreen.style.display = "flex";
        settings.style.display = "flex";
        canvas.style.display = "none";
    }
}

function mobileGameSettings() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    } else {
        gameSetting = true;
        document.getElementById('mobileSettings').style.display = "flex";
    }
}

function makeFullscreen() {
    const canvas = document.getElementById('canvas');
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { // Firefox
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
        canvas.msRequestFullscreen();
    }
}

function closeSettings() {
    let gbaScreen = document.getElementById('gbaScreen');
    let settings = document.getElementById('settings');
    gbaScreen.style.display = "none";
    settings.style.display = "none";
    gameSetting = false;
}

function closeMobileSettings() {
    document.getElementById('mobileSettings').style.display = "none";
    gameSetting = false;
}

function reloadPage() {
    location.reload();
}
