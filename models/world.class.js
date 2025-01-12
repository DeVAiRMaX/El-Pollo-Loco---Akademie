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
    throw_audio = new Audio('audio/throw.mp3');
    jumpAttack = false;

    /**
    * Initializes the world by setting up the canvas, setting up the keyboard and sounds, and starting the game loop.
     */
    constructor(canvas, keyboard) {
        this.keyboard = keyboard;

        sounds.push(this.jump_on_chicken);
        sounds.push(this.throw_audio);
        sounds.push(this.endfight_audio);
        sounds.push(this.game_music);

        this.gameisrunning = true;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.checkBottleCollision();
        this.checkBossBottleCollision();
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
     * Handles keyboard actions every 200ms to process player inputs
     * and checks for collisions every 50ms to manage interaction
     * between game objects.
     */
    run() {
        setInterval(() => this.handleKeyboardActions(), 500);
        setInterval(() => this.handleCollisions(), 50);
        setInterval(() => this.checkCollisions(), 50);
        if (this.gameisrunning) {
            this.game_music.loop = true;
            this.game_music.play();
            this.game_music.volume = 0.1;
        } else {
            return;
        }
    }

    /**
     * Handles keyboard actions to process player inputs.
     * Checks if the 'D' key is pressed and if so, checks for a throw object.
     * Checks if the 'C' key is pressed and if so, makes the character spend
     * coins for energy, updates the coin bar and sets the percentage of the
     * status bar to the character's energy.
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
     * Handles collision detection for the character.
     * Checks for collisions between the character and enemies, coins and
     * the ground level. Manages the character's state and updates the
     * level's state accordingly.
     */
    handleCollisions() {
        this.checkCoinCollision();
        this.checkJumpCollision();
    }

    /**
     * Checks if the character has entered the endboss fight zone and initiates the endboss fight.
     * When the character's x-coordinate reaches 1500 or more, the function iterates over the level's 
     * enemies to find an instance of the Endboss. If an Endboss is found, the game music is paused, 
     * the endfight audio is set to loop and played at a low volume, and the endboss's Endfight state 
     * is set to true. Additionally, it checks if the character is jumping on an enemy.
     */
    checkCharakterEndbossFight() {
        if (this.character.x >= 1500) {
            this.level.enemies.forEach(endboss => {
                if (endboss instanceof Endboss) {
                    this.game_music.pause();
                    this.endfight_audio.loop = true;
                    this.endfight_audio.volume = 0.1;
                    this.endfight_audio.play();
                    endboss.Endfight = true;
                }
            });
        }
    }

    /**
     * Checks for a collision where the character is jumping on an enemy.
     * Iterates through all enemies in the level and determines if the character
     * has landed on any of them. If a jump collision is detected, it handles the
     * collision by calling the appropriate method and returns true. Otherwise,
     * returns false.
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
     * The character is jumping on an enemy if the character is colliding with the enemy, the character is above the ground, the character is jumping, and the character's vertical speed is negative.
     */
    isCharacterJumpingOnEnemy(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isInAboveGround() &&
            this.character.speedY < 0;
    }

    /**
     * Handles the character jumping on an enemy.
     * Plays a sound effect if the character jumps on a chicken or small chicken.
     * Calls the `collisionsJumpAttack` method to handle the character jumping on the enemy.
     * Removes the enemy from the level after 500ms.
     */
    handleJumpOnEnemy(index, enemy) {
        if (enemy instanceof Endboss) return;
        if (enemy instanceof chicken || enemy instanceof Smallchicken) {
            this.jump_on_chicken.play();
            this.jump_on_chicken.volume = 0.1;
        }
        this.collisionsJumpAttack(index, this.character.y);
        this.setJumpAttackTimeouts(index);
    }

    /**
     * Sets two timeouts to run after the character jumps on an enemy. The first timeout,
     * after 500ms, removes the enemy from the level. The second timeout, after 10ms,
     * sets the jumpAttack flag to false. The jumpAttack flag is used to prevent the
     * character from jumping on the same enemy multiple times.
     */
    setJumpAttackTimeouts(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
        setTimeout(() => {
            this.jumpAttack = false;
        }, 10);
    }

    /**
     * Handles the character jumping on an enemy by calling the `jumpDemage` and `isHurt` methods on the enemy, and then calling the `jumpAgain` method on the character..
     */
    collisionsJumpAttack(index, characterY) {
        this.jumpAttack = true;
        this.level.enemies[index].jumpDemage();
        this.level.enemies[index].isHurt();
        this.character.jumpAgain(characterY);
    }

    /**
     * Checks for collisions between the character and enemies in the level.
     * Iterates through all enemies and checks if the character is jumping on them
     * using the `checkJumpCollision` method. If the character is jumping on an enemy,
     * returns early to avoid further collision checks.
     * If the character is colliding with an enemy and has not been hit in the last 500ms,
     * the character's `hit` method is called to reduce its energy and the last hit time is updated.
     * The status bar is also updated to reflect the character's current energy.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.checkJumpCollision() && this.character.isInAboveGround()) {
                return;
            } else if (this.character.isColliding(enemy)) {
                if (this.lastHitTime === undefined || Date.now() - this.lastHitTime >= 250) {
                    if (this.jumpAttack) return;
                    this.character.hit();
                    this.lastHitTime = Date.now();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks for collisions between throwable bottles and enemies.
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
     * If the enemy is an instance of chicken or Smallchicken, the enemy's energy
     * is reduced by 100 and the enemy is removed from the level after a delay of 500ms.
     * If the enemy is not an instance of chicken or Smallchicken, the enemy's bottleHit method is called to reduce its energy
     * and the boss bar's percentage is updated. After that, the checkCharakterEndbossFight method is called to check if the
     * character has won the game. Finally, the bottle is removed from the list of throwable objects.
     */
    handleBottleCollision(enemy, enemyIndex, bottleIndex) {
        if (enemy instanceof chicken || enemy instanceof Smallchicken) {
            enemy.energy -= 100;
            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
            }, 500);
        } else {
            enemy.lastHit = true;
            enemy.bottleHit(enemy.energy);
            this.bossBar.setBossPercentage(enemy.energy);
            this.checkCharakterEndbossFight();
        }
        this.ThrowableObject.splice(bottleIndex, 1);
    }

    /**
     * Checks for collisions between the character and coins in the level.
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
     * If the character has no bottles left, a console log message is printed.
     * If the character has bottles left, a new instance of ThrowableObject is created and added to the list of throwable objects.
     * The character's bottle count is decremented by one and the new bottle count is set in the bottle bar.
     */
    checkThrowObject() {
        if (this.character.BottlesAmmount <= 0) {
            return;
        } else {
            this.character.bottleIsFlying = true;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throw_audio.volume = 0.4;
            this.throw_audio.play();
            this.ThrowableObject.push(bottle);
            this.character.BottlesAmmount--;
            this.bottleBar.setBottleAmmount(this.character.BottlesAmmount);
        }
    }

    /**
     * Checks for collisions between the character and bottles in the level.
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
     * Draws the game world and its objects on the canvas.
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
     * Clears the canvas for the next frame.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background objects on the canvas.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundobjects);
    }

    /**
     * Draws all game objects on the canvas.
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
     * Draws the status bars on the canvas.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
    }

    /**
    * Requests the next animation frame for drawing.
    */
    requestNextFrame() {
        let updatesDrawMethod = this;
        requestAnimationFrame(function () {
            updatesDrawMethod.draw();
        });
    }

    /**
     * Adds multiple objects to the map for rendering.
     * @param {Array} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMap(element);
        });
    }

    /**
     * Adds a single object to the map for rendering.
     * @param {Object} movableObject - The object to add.
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
    * Flips the image of a movable object for rendering.
    * @param {Object} movableObject - The object to flip.
    */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the image orientation of a movable object after flipping.
     * @param {Object} movableObject - The object to restore.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}