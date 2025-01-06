class World {
    character = new Character();
    endboss = new Endboss();
    coin = new Coin();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    bossBar = new BossBar();
    ThrowableObject = [];
    gameisrunning = false;
    game_music = new Audio('audio/music.mp3');
    jump_on_chicken = new Audio('audio/jump_on_chicken.mp3');
    endfight_audio = new Audio('audio/endfight.mp3');


    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Initializes the world by setting up the canvas, drawing the world, setting
     * up the world objects, running the game loop, and starting the music.
     * @param {HTMLCanvasElement} canvas - The canvas element on which to draw the world.
     * @param {Keyboard} keyboard - The keyboard object to use for input.
     */
    /******  226050b6-11d1-43bf-93d0-6cbc693229ca  *******/
    constructor(canvas, keyboard) {
        this.keyboard = keyboard;
        this.gameisrunning = true;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.checkBottleCollision();
        this.checkBossBottleCollision();
        this.playmusic();
    }

    /**
     * Plays the background music for the game if the game is running.
     * Sets the loop attribute of the audio element to true, starts the audio,
     * and sets the volume to 0.1. Adds the audio element to the sounds array.
     * If the game is not running, does nothing.
     */
    playmusic() {
        if (this.gameisrunning) {
            this.game_music.loop = true;
            this.game_music.play();
            this.game_music.volume = 0.1;
            sounds.push(this.game_music);
        } else {
            return;
        }
    }

    /**
     * Sets the world of the character to this world.
     * This is necessary so that the character can access the world's objects.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Initiates the game loop by setting up recurring intervals.
     * 
     * Handles keyboard actions every 200ms to process player inputs
     * and checks for collisions every 50ms to manage interaction
     * between game objects.
     */

    run() {
        setInterval(() => this.handleKeyboardActions(), 200);
        setInterval(() => this.handleCollisions(), 50);
    }

    /**
     * Handles keyboard actions every 200ms to process player inputs.
     * 
     * Checks if the player is pressing the "D" key and if so, calls the
     * `checkThrowObject` method to check if the player can throw an object
     * and if so, throws the object.
     * Checks if the player is pressing the "C" key and if so, calls the
     * `spendCoinsForEnergy` method on the character object to spend one coin
     * for 10 energy points if the player has at least one coin and less than
     * 100 energy points. Updates the coin bar and status bar accordingly.
     */
    handleKeyboardActions() {
        if (this.keyboard.D) {
            this.checkThrowObject();
        }
        if (this.keyboard.C) {
            this.character.spendCoinsForEnergy();
            this.coinBar.setCoinAmmount(this.character.coinsAmmount);
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks for collisions between the character and other game objects.
     * 
     * Calls the `checkCollisions` method to check for collisions between the
     * character and other enemies, the `checkCoinCollision` method to check
     * for collisions with coins, and the `checkJumpCollision` method to check
     * for collisions with enemies if the character is jumping.
     */
    handleCollisions() {
        this.checkCollisions();
        this.checkCoinCollision();
        this.checkJumpCollision();
    }

    /**
     * Checks if the character is at the end of the level and if so, 
     * triggers the end boss fight by setting the Endfight property
     * of the end boss to true and playing the end fight audio.
     * Pauses the game music and adds the end fight audio to the sounds
     * array to be stopped later.
     */
    checkCharakterEndbossFight() {
        if (this.character.x >= 1500) {
            this.level.enemies.forEach(endboss => {
                if (endboss instanceof Endboss) {
                    this.game_music.pause();
                    this.endfight_audio.loop = true;
                    this.endfight_audio.volume = 0.1;
                    this.endfight_audio.play();
                    sounds.push(this.endfight_audio);
                    endboss.Endfight = true;
                }
            });
        }
    }

    /**
     * Checks if the character is jumping on an enemy.
     * 
     * Loops through all enemies in the level and checks if the character is
     * jumping on any of them by calling the `isCharacterJumpingOnEnemy` method.
     * If the character is jumping on an enemy, the `handleJumpOnEnemy` method
     * is called and the method returns true. If no collision is detected, false
     * is returned.
     * @returns {boolean} True if the character is jumping on an enemy, false otherwise.
     */
    checkJumpCollision() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (this.isCharacterJumpingOnEnemy(enemy)) {
                this.handleJumpOnEnemy(i, enemy);
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the character is jumping on a given enemy.
     * 
     * The character is jumping on an enemy if the character is colliding with the enemy, the character is above the ground, the character is jumping, and the character's vertical speed is negative.
     * @param {Object} enemy The enemy to check
     * @returns {boolean} True if the character is jumping on the enemy, false otherwise.
     */
    isCharacterJumpingOnEnemy(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isInAboveGround() &&
            this.character.isJumping &&
            this.character.speedY < 0;
    }

    /**
     * Handles the character jumping on an enemy.
     * 
     * Plays a sound effect if the character jumps on a chicken or small chicken.
     * Calls the `collisionsJumpAttack` method to handle the character jumping on the enemy.
     * Removes the enemy from the level after 500ms.
     * @param {number} index The index of the enemy in the level's enemies array.
     * @param {Object} enemy The enemy that the character is jumping on.
     */
    handleJumpOnEnemy(index, enemy) {
        if (enemy instanceof Endboss) return;
        if (enemy instanceof chicken || enemy instanceof Smallchicken) {
            this.jump_on_chicken.play();
            this.jump_on_chicken.volume = 0.1;
        }
        this.collisionsJumpAttack(index, this.character.y);
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Handles the character jumping on an enemy by calling the `jumpDemage` and `isHurt` methods on the enemy, and then calling the `jumpAgain` method on the character.
     * @param {number} index The index of the enemy that the character is jumping on.
     * @param {number} characterY The y position of the character. This is used to set the y position of the character after jumping.
     */
    collisionsJumpAttack(index, characterY) {
        this.level.enemies[index].jumpDemage(this.character);
        this.level.enemies[index].isHurt();
        this.character.jumpAgain(characterY);
    }

    /**
     * Checks for collisions between the character and all enemies in the level.
     * 
     * Loops through all enemies in the level and checks if the character is
     * colliding with them. If the character is colliding with an enemy, the
     * character is hit and the character's energy is reduced. If the character's
     * energy reaches 0, the character is killed. The method also returns true
     * if the character is jumping on an enemy, false otherwise.
     * @returns {boolean} True if the character is jumping on an enemy, false otherwise.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.checkJumpCollision()) {
                return;
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between throwable bottles and enemies.
     * 
     * Sets up a recurring interval to iterate over all throwable bottles and enemies in the level.
     * If a collision is detected between a bottle and an enemy, the `handleBottleCollision` method is called
     * to process the collision. The interval runs every 200 milliseconds.
     */

    checkBossBottleCollision() {
        setInterval(() => {
            this.ThrowableObject.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if (enemy.isColliding(bottle)) {
                        this.handleBottleCollision(enemy, enemyIndex, bottleIndex);
                    }
                });
            });
        }, 200);
    }

    /**
     * Handles the collision between a bottle and an enemy.
     *
     * If the enemy is an instance of chicken or Smallchicken, the enemy's energy
     * is reduced by 100 and the enemy is removed from the level after a delay of 500ms.
     * If the enemy is not an instance of chicken or Smallchicken, the enemy's bottleHit method is called to reduce its energy
     * and the boss bar's percentage is updated. After that, the checkCharakterEndbossFight method is called to check if the
     * character has won the game. Finally, the bottle is removed from the list of throwable objects.
     * @param {Object} enemy The enemy object that was hit by the bottle
     * @param {Number} enemyIndex The index of the enemy in the level's enemies array
     * @param {Number} bottleIndex The index of the bottle in the list of throwable objects
     */
    handleBottleCollision(enemy, enemyIndex, bottleIndex) {
        if (enemy instanceof chicken || enemy instanceof Smallchicken) {
            enemy.energy -= 100;
            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
            }, 500);
        } else {
            enemy.bottleHit(enemy.energy);
            this.bossBar.setBossPercentage(enemy.energy);
            this.checkCharakterEndbossFight();
        }
        this.ThrowableObject.splice(bottleIndex, 1);
    }

    /**
     * Checks for collisions between the character and coins in the level.
     *
     * Iterates over all coins in the level and checks if the character is colliding with any of them.
     * If a collision is detected, the character's coin amount is increased by one and the coin is removed from the level.
     */
    checkCoinCollision() {
        for (let i = 0; i < this.level.coin.length; i++) {
            const coin = this.level.coin[i];
            if (this.character.isColliding(coin)) {
                this.character.coinsAmmount++;
                this.coinBar.setCoinAmmount(this.character.coinsAmmount);
                this.level.coin.splice(i, 1);
            }

        }

    }

    /**
     * Checks if the character has any bottles left to throw.
     *
     * If the character has no bottles left, a console log message is printed.
     * If the character has bottles left, a new instance of ThrowableObject is created and added to the list of throwable objects.
     * The character's bottle count is decremented by one and the new bottle count is set in the bottle bar.
     */
    checkThrowObject() {
        if (this.character.BottlesAmmount <= 0) {
            console.log('No more bottles');
            return;
        } else {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObject.push(bottle);
            this.character.BottlesAmmount--;
            this.bottleBar.setBottleAmmount(this.character.BottlesAmmount);
        }
    }

    /**
     * Checks for collisions between the character and bottles in the level.
     * 
     * Every 200 milliseconds, it iterates over all bottles in the level and checks if the character is colliding with any of them.
     * If a collision is detected, the character's bottle count is increased by one and the bottle is removed from the level.
     */
    checkBottleCollision() {
        setInterval(() => {
            this.level.bottle.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.BottlesAmmount++;
                    this.bottleBar.setBottleAmmount(this.character.BottlesAmmount);
                    this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
                }
            });
        }, 200)
    }

    /**
     * Draws the current frame of the game.
     *
     * This function is the main entry point for drawing the game. It clears the canvas, translates the context to the camera's position,
     * draws the background and game objects, and then translates back to the original position to draw the status bars.
     * Finally, it calls requestNextFrame() to schedule the next frame to be drawn.
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);

        this.drawBackground();
        this.drawGameObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();

        this.requestNextFrame();
    }

    /**
     * Clears the entire canvas.
     *
     * This function removes all content from the canvas by setting every pixel to transparent black,
     * effectively resetting the canvas to an empty state.
     */

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background of the game.
     *
     * This function draws all the elements that make up the background of the game, such as the sky, the ground, and any other
     * background objects. It does this by calling addObjectsToMap() with the level's backgroundobjects as the argument.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundobjects);
    }

    /**
     * Draws all the game objects in the game.
     *
     * This function draws all the game objects in the game, which includes the character, any
     * throwable objects the character may have, all enemies, all coins, all bottles and all clouds.
     * It does this by calling addToMap() with the character and addObjectsToMap() with the
     * other game objects as arguments.
     */
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.ThrowableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws all the status bars in the game.
     *
     * This function draws all the status bars in the game, which includes the health bar, the bottle bar, the coin bar and the boss bar.
     * It does this by calling addToMap() with each of the status bars as arguments.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
    }

    /**
     * Requests the next frame of the game to be drawn.
     *
     * This function calls requestAnimationFrame() with a callback function that calls draw() on the current object.
     * This is necessary because requestAnimationFrame() requires a callback function, and we want to call draw() on the current object.
     */
    requestNextFrame() {
        let updatesDrawMethod = this;
        requestAnimationFrame(function () {
            updatesDrawMethod.draw();
        });
    }


    /**
     * Adds multiple objects to the map.
     *
     * This function takes an array of objects and calls addToMap() on each of them.
     * It is used to add all the objects in a level to the map at once.
     * @param {Object[]} objects - The objects to add to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMap(element);
        });
    }

    /**
     * Adds a movable object to the map.
     *
     * This function draws a movable object on the canvas, taking into account the object's direction and offset.
     * It also draws a frame around the object if it is an instanceof Character, chicken, Endboss, Coin, Bottle, or Smallchicken.
     * @param {movableObject} movableObject - The movable object to add to the map
     */
    addToMap(movableObject) {
        if (movableObject.otherDirectoin) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);
        if (movableObject.otherDirectoin) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips a movable object's image horizontally.
     *
     * This function flips a movable object's image horizontally by translating the canvas to the right by the object's width, then scaling the canvas by -1 horizontally and 1 vertically. This has the effect of flipping the object's image horizontally without changing its position on the screen.
     * @param {movableObject} movableObject - The movable object to flip
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the canvas to its original state after flipping a movable object's image horizontally.
     *
     * This function is used to restore the canvas to its original state after calling flipImage() on a movable object.
     * It works by restoring the state of the canvas that was saved in flipImage().
     * @param {movableObject} movableObject - The movable object whose image was flipped
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

}