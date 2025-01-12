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
    restoreMuteStatus();
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
        return true;
    } else {
        document.getElementById('rotateScreen').style.display = 'none';
        document.getElementById('gbagif').style.display = 'block';
        return false;
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
    restoreMuteStatus();
}

/**
 * Shows the victory screen after winning the game.
 * 
 * Mutes all sounds, plays the victory audio, clears all intervals, and sets the game finish flag to true.
 * Sets the world object to null and hides the canvas element and mobile buttons.
 * Displays the victory screen and gba screen.
 */
function showVictoryScreen() {
    ClearAllInterVals();
    gameFinish = true;
    world = null;
    document.getElementById('muteButton').style.display = 'none';
    document.getElementById('fullscreenicon').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('gbaScreen').style.display = 'flex';
    document.getElementById('victoryscreen').style.display = 'flex';
    document.getElementById('mobileButtonContainer').style.display = "none";
    document.getElementById('mobileHeaderButtons').style.display = "flex";
}

/**
 * Displays the lose screen after losing the game.
 * 
 * Mutes all sounds, plays the lose audio, and sets the game finish flag to true.
 * Clears all intervals, sets the world object to null, and hides the canvas element
 * and mobile buttons. Displays the death screen and gba screen.
 */
function showLoseScreen() {
    gameFinish = true;
    ClearAllInterVals();
    world = null;
    document.getElementById('muteButton').style.display = 'none';
    document.getElementById('fullscreenicon').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('gbaScreen').style.display = 'flex';
    document.getElementById('deathscreen').style.display = 'flex';
    document.getElementById('mobileButtonContainer').style.display = "none";
    document.getElementById('mobileHeaderButtons').style.display = "flex";
}

/**
 * Toggles the mute status of all sounds and updates the visual state of the mute buttons.
 *
 * Iterates over all sound objects and toggles their mute state. It then updates the class
 * list of the mute button and the mobile mute button accordingly to reflect the new
 * mute status. Finally, it sets the global muted variable to the current state and
 * stores the mute status in localStorage.
 */
function fullMute() {
    sounds.forEach(sound => {
        sound.muted = !sound.muted;
        muted = sound.muted;
    });
    const muteButton = document.getElementById('muteButton');
    const mobileMuteButton = document.getElementById('mobileMuteButton');

    if (muted) {
        muteButton.classList.add('active');
        mobileMuteButton.classList.add('active');
        localStorage.setItem('muteStatus', 'true');
    } else {
        muteButton.classList.remove('active');
        mobileMuteButton.classList.remove('active');
        localStorage.setItem('muteStatus', 'false');
    }
}

/**
 * Restores the mute status of all sounds from localStorage and updates the visual state of the mute buttons.
 *
 * Gets the current mute status from localStorage and adds or removes the 'active' class
 * from the mute button and the mobile mute button accordingly. It then iterates over all sound objects
 * and sets their mute state to the current status. Finally, it sets the global muted variable
 * to the current state.
 */
function restoreMuteStatus() {
    const muteStatus = localStorage.getItem('muteStatus');
    const muteButton = document.getElementById('muteButton');
    const mobileMuteButton = document.getElementById('mobileMuteButton');

    if (muteStatus === 'true') {
        muteButton.classList.add('active');
        mobileMuteButton.classList.add('active');
        sounds.forEach(sound => {
            sound.muted = true;
        });
        muted = true;
    }
}

/**
 * Resets all sound objects by pausing them and setting their playback position to 0.
 * Clears the sounds array.
 */
function resetSounds() {
    sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    sounds = [];
}

/**
 * Toggles the display of an element with the given element ID.
 * 
 * @param {string} elementId The ID of the element to toggle the display for.
 * @param {string} displayStyle The display style to set the element to, e.g. 'block', 'flex', 'none', etc.
 */
function toggleDisplay(elementId, displayStyle) {
    document.getElementById(elementId).style.display = displayStyle;
}


/**
 * Resets the game state and restarts the game.
 *
 * Called when the player dies or completes a level. Resets the sound objects, toggles
 * the display of certain elements, and calls initLevel() and init() to restart the game.
 */
function retry() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    if (windowWidth < 1400 || windowHeight < 800) {
        startMobileGame();
        return;
    }
    resetSounds();
    toggleDisplay('muteButton', 'flex');
    toggleDisplay('fullscreenicon', 'flex');
    toggleDisplay('mobileButtonContainer', isScreenWidthLessThan1000() ? 'flex' : 'none');
    toggleDisplay('mobileHeaderButtons', 'flex');
    toggleDisplay('victoryscreen', 'none');
    toggleDisplay('deathscreen', 'none');
    toggleDisplay('canvas', 'block');
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
    restoreMuteStatus();
}



/**
 * Starts the mobile version of the game by setting up the display and initializing game components.
 * 
 * Checks if the game is already running, and if so, alerts the user and exits the function.
 * Sets the game status to true, makes the mobile button container, GBA screen, and canvas visible, and initializes the game level and components.
 */
function startMobileGame() {
    resetSounds();
    gameStatus = true;
    document.getElementById('settings').style.display = "none";
    document.getElementById('victoryscreen').style.display = "none";
    document.getElementById('deathscreen').style.display = "none";
    document.getElementById('mobileHeaderButtons').style.display = "none";
    document.getElementById('mobileButtonContainer').style.display = "flex";
    document.getElementById('gbaScreen').style.display = "flex";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('impressumButton').style.display = "none";
    ClearAllInterVals();
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
        let mobileHeaderButtons = document.getElementById('mobileHeaderButtons');
        let gbaScreen = document.getElementById('gbaScreen');
        let settings = document.getElementById('settings');
        let canvas = document.getElementById('canvas');
        let impressum = document.getElementById('impressumContainer');
        mobileHeaderButtons.style.display = "none";
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
 * Toggles the display of the game's impressum (legal information) on mobile devices.
 * If the impressum is currently displayed, this function hides it and shows the mobile
 * header buttons. If the impressum is not displayed, it shows the impressum and hides
 * the mobile header buttons.
 */
function toggleImpressum() {
    let gbaScreen = document.getElementById('gbaScreen');
    let impressumContainer = document.getElementById('impressumContainer');
    let settings = document.getElementById('settings');
    let mobileHeaderButtons = document.getElementById('mobileHeaderButtons');

    if (gbaScreen.style.display === "block" && impressumContainer.style.display === "flex") {
        gbaScreen.style.display = "none";
        gbaScreen.style.height = "auto";
        impressumContainer.style.display = "none";
        settings.style.display = "none";
        mobileHeaderButtons.style.display = "flex";
    } else {
        gbaScreen.style.display = "block";
        gbaScreen.style.height = "330px";
        mobileHeaderButtons.style.display = "none";
        impressumContainer.style.display = "flex";
        settings.style.display = "none";
    }
}
