/**
 * Adds event listeners for touch and keyboard events to control the game character.
 * This setup allows for both mobile touch controls and keyboard controls.
 * The `keyboard` object is used to track the state of various controls.
 */
const touchControls = {
    mobileRightButton: 'RIGHT',
    mobileLeftButton: 'LEFT',
    mobileUpButton: 'UP',
    mobileThrowButton: 'D',
    mobileHealButton: 'C'
};

const keyControls = {
    67: 'C',    
    39: 'RIGHT', 
    37: 'LEFT',  
    38: 'UP',    
    40: 'DOWN',  
    32: 'SPACE', 
    68: 'D'      
};

/**
 * Handles touch events for mobile controls.
 * @param {TouchEvent} event - The touch event object.
 * @param {boolean} isActive - Whether the control is active (true for touchstart, false for touchend).
 */
function handleTouchEvent(event, isActive) {
    const control = touchControls[event.target.id];
    if (control) {
        event.preventDefault();
        keyboard[control] = isActive;
    }
}

window.addEventListener("touchstart", (event) => handleTouchEvent(event, true));
window.addEventListener("touchend", (event) => handleTouchEvent(event, false));

/**
 * Handles keyboard events for controls.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @param {boolean} isActive - Whether the control is active (true for keydown, false for keyup).
 */
function handleKeyboardEvent(event, isActive) {
    const control = keyControls[event.keyCode];
    if (control) {
        keyboard[control] = isActive;
    }
}

window.addEventListener("keydown", (event) => handleKeyboardEvent(event, true));
window.addEventListener("keyup", (event) => handleKeyboardEvent(event, false));