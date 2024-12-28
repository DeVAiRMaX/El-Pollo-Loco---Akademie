class movableObject extends DrawableObject {

    speed = 0.15;
    otherDirectoin = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    jumpDemage(enemy) {
        this.energy -= 100;
    }
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); //Speichern der aktuellen Zeit in Zahlenform
        }

    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; // in Sekunden umrechnen
        return timePassed < 1
    }
    isDead() {
        return this.energy == 0;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isInAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isInAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 165;
        }
    }


    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // % = Mathematischer Rest z.b.
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    stopmoving() {
        this.speed = 0;
    }

}