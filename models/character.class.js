class Character extends movableObject {
    width = 155
    height = 250
    speed = 7

    IMAGES_STAND = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGE_SNORING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    y = 190
    world;
    coinsAmmount = 0;
    BottlesAmmount = 0;
    walking_audio = new Audio('audio/walking.mp3');
    jump_audio = new Audio('audio/jump.mp3');
    snoring_audio = new Audio('audio/snoring.mp3');
    hurt_audio = new Audio('audio/hurt.mp3');
    isJumping = true;
    groundLevel = 70;
    afkTimer = 0;
    lose_audio = new Audio('audio/lose.mp3');
    bottleIsFlying = false;

    /**
     * Creates a new instance of the character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STAND);
        this.loadImages(this.IMAGE_SNORING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        sounds.push(this.walking_audio);
        sounds.push(this.hurt_audio);
        sounds.push(this.jump_audio);
        sounds.push(this.snoring_audio);
        sounds.push(this.lose_audio);

        this.individualCounter = 0;
        this.animate();
        this.offset = { left: 32, right: 32, top: 90, bottom: 15 };
        this.applyGravity();
    }


    /**
     * Animates the character by setting audio volumes, handling AFK state, 
     * setting up movement intervals, and configuring animation intervals.
     */
    animate() {
        this.setAudioVolumes();
        this.handleCharakterAFK();
        this.setupMovementInterval();
        this.setupAnimationInterval();
    }

    /**
     * Handles the AFK state of the character by checking if the user hasn't
     * pressed any of the movement keys in the last second. If the user hasn't
     * pressed any of the keys, the AFK timer will be incremented by one.
     * If the user presses any of the keys, the AFK timer will be reset to zero.
     */
    handleCharakterAFK() {
        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.D) {
                this.afkTimer++;
            }
        }, 1000);
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.D) {
                this.resetAfkTimer();
            }
        }, 10);
    }

    /**
     * Resets the AFK timer to zero, indicating that the user has pressed
     * a movement key within the last second.
     */
    resetAfkTimer() {
        this.afkTimer = 0;
    }

    /**
     * Sets the volume of all audio elements of the character to 0.4.
     */
    setAudioVolumes() {
        this.walking_audio.volume = 0.4;
        this.jump_audio.volume = 0.4;
        this.hurt_audio.volume = 0.4;
        this.snoring_audio.volume = 0.3;
        this.lose_audio.volume = 0.4;
    }

    /**
     * Sets up an interval to handle character movement based on keyboard input.
     * 
     * Pauses walking audio and checks for specific keyboard inputs to trigger
     * character movements such as moving right, left, or up. Also plays throw
     * audio if the corresponding key is pressed and adjusts the camera position
     * based on the character's x-coordinate.
     */
    setupMovementInterval() {
        setInterval(() => {
            this.walking_audio.pause();
            if (this.world.keyboard.RIGHT) this.handleRightMovement();
            if (this.world.keyboard.LEFT) this.handleLeftMovement();
            if (this.world.keyboard.UP) this.handleUpMovement();
            this.world.camera_x = -this.x + 75;
        }, 1000 / 30);
    }

    /**
     * Handles the right arrow key press by moving the character right and
     * playing the walking audio if the character is not at the end of the level.
     * The character's direction will be set to false, which indicates that the
     * character is facing right.
     */
    handleRightMovement() {
        if (this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirectoin = false;
            this.walking_audio.play();
        }
    }

    /**
     * Handles the left arrow key press by moving the character left,
     * playing the walking audio, and setting the character's direction
     * to indicate that it is facing left. Ensures the character does not
     * move beyond the left boundary of the game world.
     */
    handleLeftMovement() {
        if (this.x > 0) {
            this.moveLeft();
            this.walking_audio.play();
            this.otherDirectoin = true;
        }
    }

    /**
     * Handles the up arrow key press by making the character jump if the character
     * is not in the air and playing the jump audio. If the character is already in
     * the air, the character will not jump again.
     */
    handleUpMovement() {
        if (!this.isInAboveGround()) {
            this.jump();
            this.jump_audio.play();
        }
    }

    /**
     * Plays the audio when the character dies.
     * The audio's volume is set to 0.4.
     */
    playDieSound() {
        this.lose_audio.play();
    }

    /**
     * Sets up an interval to handle character animations based on the character's state.
     * 
     * Checks every 150ms if the character is dead, AFK (by checking the afkTimer), hurt, jumping, moving right or left, or standing still.
     * If the character is dead, the character die animation is played. If the character is AFK, the sleep animation is played.
     * If the character is hurt, the hurt animation is played. If the character is jumping, the jump animation is played.
     * If the character is moving right or left, the walk animation is played. If the character is standing still, the stand animation is played.
     */
    setupAnimationInterval() {
        setInterval(() => {
            if (this.isDead()) this.playDieSound(), this.charakterDie();
            else if (this.afkTimer >= 10) this.playSleepAnimation();
            else {
                this.stopSleepAnimation();
                if (this.isHurt()) this.playHurtAnimation();
                else if (this.isInAboveGround()) this.playJumpAnimation();
                else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playWalkAnimation();
                else this.playStandAnimation();
            }
        }, 150);
    }

    /**
     * Plays the sleep animation (character snoring) and plays the snoring audio.
     * The snoring audio is added to the sounds array.
     */
    playSleepAnimation() {
        this.playAnimation(this.IMAGE_SNORING);
        this.snoring_audio.play();
    }

    /**
     * Stops the sleep animation (character snoring) and pauses the snoring audio.
     * Plays the stand animation instead.
     */
    stopSleepAnimation() {
        this.playStandAnimation();
        this.snoring_audio.pause();
    }

    /**
     * Plays the jump animation (character jumping).
     */
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * Plays the hurt animation (character hurt) and plays the hurt audio.
     * The hurt audio is added to the sounds array.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_audio.play();
    }

    /**
     * Plays the walk animation (character walking).
     */
    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    playStandAnimation() {
        /**
         * Plays the stand animation (character standing still).
         */
        this.playAnimation(this.IMAGES_STAND);
    }

    /**
     * Spends one coin to gain 10 energy points, unless the player has 100 energy points
     * or no coins left. If the player has more than 10 energy points missing, the energy
     * is increased by 10 points. If the player has 10 energy points or less missing, the
     * energy is set to 100.
     */
    spendCoinsForEnergy() {
        if (this.energy === 100 || this.coinsAmmount <= 0) {
            return;
        }
        else {
            this.coinsAmmount = Math.max(0, this.coinsAmmount - 1);
            this.energy = Math.min(100, this.energy + 10);
        }
    }

    /**
     * Shows the death screen after a game over.
     * Hides the canvas, closes the game settings popup and opens the death screen popup.
     */
    showDeathScreen() {
        document.getElementById('canvas').style.display = 'none';
        closePopup('gamesettingspopupBackground', 'gamepopupContainer')
        openPopup('deathscreenpopupBackground', 'deathscreenpopupContainer');
    }

    /**
     * Initiates a jump by setting the character's jumping state to true 
     * and giving it an upward speed.
     */
    jump() {
        this.isJumping = true;
        this.speedY = 25;
    }

    /**
     * Initiates the character's death animation by starting a short jump and then animating the death.
     */
    charakterDie() {
        resetSounds();
        this.initiateDeathJump();
        this.animateDeath();
    }

    /**
     * Initiates a short jump before the character dies. The character jumps upwards for a short duration
     * and then falls back down to the ground. This is an animation that is played before the character dies finally.
     */
    initiateDeathJump() {
        this.isJumping = true;
        this.speedY = 10;
        const jumpDuration = 250;

        setTimeout(() => {
            this.isJumping = false;
            this.speedY = 0;
            this.fallToGround();
        }, jumpDuration);
    }

    /**
     * Animates the character falling to the ground. This is an animation that is played when the character dies.
     * The character is moved downwards until it reaches the ground level. When the character reaches the ground level,
     * the death screen is triggered.
     */
    fallToGround() {
        const fallSpeed = 5;
        const groundLevel = 600;

        const fallInterval = setInterval(() => {
            if (this.y < groundLevel) {
                this.y += fallSpeed;
            } else {
                clearInterval(fallInterval);
                this.triggerDeathScreen();
            }
        }, 1000 / 30);
    }

    /**
     * Triggers the death screen after a short delay of 300ms, after the character has finished falling to the ground.
     * The death screen is displayed by calling the showLoseScreen() function.
     */
    triggerDeathScreen() {
        setTimeout(() => {
            showLoseScreen();
        }, 300);
    }

    /**
     * Animates the character dying. This animation is played when the character dies.
     * The animation is played by setting an interval that calls the playAnimation() function
     * every 200ms and passes the IMAGES_DEAD array as an argument.
     */
    animateDeath() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
    }

    /**
     * Animates the character jumping again after it has been hit by an enemy.
     * The character is moved upwards until it reaches the ground level. When the character reaches the ground level,
     * the jumping animation is stopped and the character is set to not be jumping anymore.
     */
    jumpAgain() {
        this.isJumping = true;
        this.speedY = 20;

        const fallInterval = setInterval(() => {
            if (this.y < this.groundLevel) {
                this.y += this.speedY;
            } else {
                this.y = this.groundLevel;
                clearInterval(fallInterval);
                this.isJumping = false;
            }
        }, 1000 / 30);
    }

}