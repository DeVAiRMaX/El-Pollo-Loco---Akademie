let canvas;
let world;
let keyboard = new Keyboard();
let gameStatus

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
    ClearAllInterVals(); // TODO: VictoryScreen anzeigen lassen.
    gameStatus = 'win';
    document.getElementById('canvas').style.display = 'none';
    closePopup('gamesettingspopupBackground', 'gamepopupContainer')
    openPopup('victoryscreenpopupBackground', 'victoryscreenpopupContainer');
    world = null; // Clear the world object
}

function showLoseScreen() {
    ClearAllInterVals(); // TODO: LoseScreen anzeigen lassen.
    gameStatus = 'lose';
    document.getElementById('canvas').style.display = 'none';
    closePopup('gamesettingspopupBackground', 'gamepopupContainer')
    openPopup('deathscreenpopupBackground', 'deathscreenpopupContainer');
    world = null; // Clear the world object
}

function retry(id, subid) {
    if (world) {
        console.log("Altes World-Objekt existiert:", world);
        world = null;
        console.log("Altes World-Objekt gelöscht:", world);
    } else {
        console.log("Kein altes World-Objekt existiert");
    }
    initLevel();
    init();
    closePopup(id, subid)
    openPopup('gamesettingspopupBackground', 'gamepopupContainer');
    document.getElementById("canvas").style.display = "block";
}



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

function openPopup(id, subid) {
    let popupBackground = document.getElementById(id);
    let popupContainer = document.getElementById(subid);
    popupBackground.style.display = "flex";
    popupContainer.style.display = "flex";
    if (subid === "gamepopupContainer") {
        startTimer(); // Starte den Timer, wenn das Popup geöffnet wird
    }
}

function closePopup(id, subid) {
    let popupBackground = document.getElementById(id);
    let popupContainer = document.getElementById(subid);
    popupBackground.style.display = "none";
    popupContainer.style.display = "none";
}

function reloadPage() {
    location.reload();
}