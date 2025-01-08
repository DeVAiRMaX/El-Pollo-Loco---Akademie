let canvas;
let world;
let keyboard = new Keyboard();
let gameStatus = false;
let gameSetting = false;
let gameFinish = false;
let sounds = [];
let muted = false;


setInterval(() => {
    isScreenWidthLessThan1000();
}, 10);


/**
 * Toggles the display of elements based on the screen width.
 * 
 * If the screen width is less than 1000 pixels, it displays the 'rotateScreen'
 * element and hides the 'gbagif' element. Otherwise, it hides the 'rotateScreen'
 * element and displays the 'gbagif' element.
 */
function isScreenWidthLessThan1000() {
    if (window.innerWidth < 1000) {
        document.getElementById('rotateScreen').style.display = 'flex';
        document.getElementById('gbagif').style.display = 'none';
    } else {
        document.getElementById('rotateScreen').style.display = 'none';
        document.getElementById('gbagif').style.display = 'block';
    }
}

/**
 * Initializes the game by setting up the canvas and world objects.
 * 
 * Retrieves and assigns the canvas element from the DOM to the global variable `canvas`.
 * Instantiates a new `World` object with the canvas and keyboard, and assigns it to the
 * global variable `world`.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Shows the victory screen after winning the game.
 * 
 * Mutes all sounds, plays the victory audio, clears all intervals, and sets the game finish flag to true.
 * Sets the world object to null and hides the canvas element and mobile buttons.
 * Displays the victory screen and gba screen.
 */
function showVictoryScreen() {
    sounds.forEach(sound => {
        sound.muted = true;
    });
    ClearAllInterVals();
    gameFinish = true;
    world = null;

    document.getElementById('mobileHeaderButtons').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('gbaScreen').style.display = 'flex';
    document.getElementById('victoryscreen').style.display = 'flex';
    document.getElementById('mobileButtonContainer').style.display = "none";
}

/**
 * Displays the lose screen after losing the game.
 * 
 * Mutes all sounds, plays the lose audio, and sets the game finish flag to true.
 * Clears all intervals, sets the world object to null, and hides the canvas element
 * and mobile buttons. Displays the death screen and gba screen.
 */
function showLoseScreen() {
    sounds.forEach(sound => {
        sound.muted = true;
    });
    gameFinish = true;
    ClearAllInterVals();
    world = null;
    document.getElementById('mobileHeaderButtons').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('gbaScreen').style.display = 'flex';
    document.getElementById('deathscreen').style.display = 'flex';
    document.getElementById('mobileButtonContainer').style.display = "none";
}

/**
 * Toggles the mute state of all sounds and updates the visual state of the mute buttons.
 *
 * Iterates over all sound objects and toggles their mute state. Also sets the global muted variable
 * to the current state of the last sound object. Then updates the class of the mute button and the
 * mobile mute button to reflect the current state.
 */
function fullMute() {
    sounds.forEach(sound => {
        sound.muted = !sound.muted;
        muted = sound.muted;
    });
    const muteButton = document.getElementById('muteButton');

    if (muted) {
        muteButton.classList.add('active');
        mobileMuteButton.classList.add('active');
    } else {
        muteButton.classList.remove('active');
        mobileMuteButton.classList.remove('active');
    }
}

/**
 * Resets the game state to the starting state.
 * 
 * Removes all current sounds, hides the victory and death screens, and shows the canvas element.
 * Clears all intervals, and calls the initLevel and init functions to reset the game state.
 */
function retry() {
    sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    sounds = [];
    document.getElementById('mobileHeaderButtons').style.display = "flex";
    document.getElementById('victoryscreen').style.display = 'none';
    document.getElementById('deathscreen').style.display = 'none';
    document.getElementById("canvas").style.display = "block";
    ClearAllInterVals();
    initLevel();
    init();
}

/**
 * Clears all active intervals by iterating through a large range of interval IDs.
 * 
 * This function attempts to clear intervals by assuming a maximum possible interval ID,
 * effectively stopping any ongoing interval that may be running in the application.
 */
function ClearAllInterVals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

/**
 * handles the functions of the touchbuttons.
 */
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

/**
* handles the functions keybuttons.
*/

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


/**
 * Starts the game by setting up the display and initializing game components.
 * 
 * Checks if the game is already running, and if so, alerts the user and exits the function.
 * Determines the window dimensions and decides whether to start the mobile version of the game
 * if the dimensions are below specified thresholds. If not, it sets the game status to true,
 * makes the GBA screen, canvas, and mobile header buttons visible, and initializes the game level and components.
 */
function startGame() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    }
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    if (windowWidth < 1400 || windowHeight < 800) {
        startMobileGame();
        return;
    }
    gameStatus = true;
    document.getElementById('gbaScreen').style.display = "flex";
    document.getElementById('impressumContainer').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('mobileHeaderButtons').style.display = "flex";
    document.getElementById('impressumButton').style.display = "none";
    initLevel();
    init();
}



/**
 * Starts the mobile version of the game by setting up the display and initializing game components.
 * 
 * Checks if the game is already running, and if so, alerts the user and exits the function.
 * Sets the game status to true, makes the mobile button container, GBA screen, and canvas visible, and initializes the game level and components.
 */
function startMobileGame() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    }
    gameStatus = true;
    document.getElementById('mobileButtonContainer').style.display = "flex";
    document.getElementById('gbaScreen').style.display = "flex";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('impressumButton').style.display = "none";
    initLevel();
    init();
}

/**
 * Opens the game settings screen by displaying the settings div and hiding the canvas element.
 * 
 * Checks if the game is already running, and if so, alerts the user and exits the function.
 * Sets the game setting flag to true, retrieves the GBA screen, settings, and canvas elements from the DOM, and sets their display properties accordingly.
 */
function gameSettings() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    } else {
        gameSetting = true;
        let gbaScreen = document.getElementById('gbaScreen');
        let settings = document.getElementById('settings');
        let canvas = document.getElementById('canvas');
        let impressum = document.getElementById('impressumContainer');
        gbaScreen.style.display = "flex";
        gbaScreen.style.height = "330px";
        settings.style.display = "flex";
        impressum.style.display = "none";
        canvas.style.display = "none";
    }
}

/**
 * Opens the mobile game settings screen by displaying the mobileSettings div.
 * 
 * Checks if the game is already running, and if so, alerts the user and exits the function.
 * Sets the game setting flag to true and makes the mobile settings element visible.
 */
function mobileGameSettings() {
    if (gameStatus) {
        alert('Spiel läuft bereits!')
        return;
    } else {
        gameSetting = true;
        document.getElementById('mobileSettings').style.display = "flex";
    }
}

/**
 * Tries to make the canvas element go into fullscreen mode.
 * 
 * Checks all different fullscreen modes for each browser and
 * calls the appropriate function for the current browser.
 */
function makeFullscreen() {
    const canvas = document.getElementById('canvas');
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { 
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { 
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { 
        canvas.msRequestFullscreen();
    }
}

/**
 * Closes the game settings screen by hiding the settings and GBA screen elements.
 * 
 * Sets the display properties of the GBA screen and settings div elements to "none"
 * and resets the game setting flag to false.
 */
function closeSettings() {
    let gbaScreen = document.getElementById('gbaScreen');
    let settings = document.getElementById('settings');
    gbaScreen.style.display = "none";
    gbaScreen.style.height = "auto";
    settings.style.display = "none";
    gameSetting = false;
}

/**
 * Closes the mobile game settings screen by hiding the settings div element.
 * 
 * Sets the display property of the settings element to "none" and resets the game setting flag to false.
 */
function closeMobileSettings() {
    document.getElementById('mobileSettings').style.display = "none";
    gameSetting = false;
}

/**
 * Reloads the current page.
 * 
 * This function refreshes the entire page by reloading it from the server,
 * effectively resetting all states and data on the page.
 */
function reloadPage() {
    location.reload();
}

/**
 * Toggles the display of the Impressum and the GBA screen.
 * 
 * Checks if the GBA screen is currently visible and the Impressum container is visible.
 * If so, hides the GBA screen and Impressum container, and hides the settings element.
 * Otherwise, shows the GBA screen and Impressum container, and hides the settings element.
 * 
 */
function toggleImpressum() {
    let gbaScreen = document.getElementById('gbaScreen');
    let impressumContainer = document.getElementById('impressumContainer');
    let settings = document.getElementById('settings');

    if (gbaScreen.style.display === "block" && impressumContainer.style.display === "flex") {
        gbaScreen.style.display = "none";
        gbaScreen.style.height = "auto";
        impressumContainer.style.display = "none";
        settings.style.display = "none";
    } else {
        gbaScreen.style.display = "block";
        gbaScreen.style.height = "330px";
        impressumContainer.style.display = "flex";
        settings.style.display = "none";
    }
}
