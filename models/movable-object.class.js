class movableObject extends DrawableObject {

    speed = 0.15;
    otherDirectoin = false;
    speedY = 0;
    acceleration = 2.0;
    energy = 100;
    lastHit = 0;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    /**
     * Handles the character jumping on the enemy and deducts energy from the enemy. If the enemy's energy reaches 0, the enemy is killed.
     * @param {Object} enemy The enemy object to be attacked
     */
    jumpDemage() {
        this.energy -= 100;
    }

    /**
     * Reduces the energy of the enemy by 5. If the energy reaches 0, the enemy is killed.
     * The time of the last hit is stored in the `lastHit` property.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the energy of the enemy by 10. If the energy reaches 0, the enemy is killed.
     * The time of the last hit is stored in the `lastHit` property.
     */
    bottleHit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object has been hit recently.
     * 
     * Calculates the time passed since the last hit in seconds and returns true if 
     * the time passed is less than 1 second, indicating that the object is still hurt.
     *
     * @returns {boolean} True if the object was hit within the last second, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1
    }
    isDead() {
        return this.energy == 0;
    }

    /**
     * Applies gravity to the object by adjusting its vertical position and speed.
     * 
     * Sets up an interval that continuously decreases the object's vertical position (`y`)
     * and speed (`speedY`) if the object is above ground or moving upwards.
     * The speed is decreased by the object's acceleration to simulate gravity.
     * The interval runs at 25 frames per second.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isInAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * Checks if the object is above the ground level. If the object is an instanceof
     * ThrowableObject, it is always considered above the ground. Otherwise, the object
     * is above the ground if its y position is less than 175.
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isInAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 175;
        }
    }


    /**
     * Checks if the object is colliding with another movable object.
     * 
     * Calculates whether the object is overlapping with the given movable object by
     * comparing the object's position, size and offset with the other object's
     * position, size and offset. If the object is not overlapping, false is returned.
     * 
     * @param {MovableObject} movableObject - The movable object to check for collision.
     * @returns {boolean} True if the object is colliding with the movable object, false otherwise.
     */
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    /**
     * Plays an animation by cycling through the provided images array.
     *
     * This function updates the object's current image by using the currentImage index
     * to select an image from the images array. The image is retrieved from the image
     * cache and assigned to the object's img property. The currentImage index is then
     * incremented to prepare for the next frame in the animation sequence.
     *
     * @param {string[]} images - An array of image paths to be used in the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by adding the speed value to the x position.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by subtracting the speed value from the x position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Sets the object's speed to 0, effectively stopping it from moving.
     */
    stopmoving() {
        this.speed = 0;
    }

    /**
     * Initiates the end boss fight sequence by moving the boss to the left and triggering periodic attacks.
     * 
     * Decreases the boss's x position by its speed, simulating movement to the left. 
     * Sets up an interval that calls the jumpBossAttack method every 2 seconds, 
     * causing the boss to perform a jumping attack.
     */
    endBossFight() {
        this.x -= 20;
        this.playAnimation(this.IMAGES_ATTACK);
        setInterval(() => {
            this.jumpBossAttack();
        }, 100);
    }

    /**
     * Initiates a jumping attack sequence for the end boss. Sets the speedY to a positive value if the boss is not in the air, causing the boss to jump.
     * This method is called every 2 seconds by the endBossFight method to simulate the boss jumping and attacking.
     */
    jumpBossAttack() {
        if (this.isInAboveGround()) {
            this.isJumping = true;
            
        }
    }


}