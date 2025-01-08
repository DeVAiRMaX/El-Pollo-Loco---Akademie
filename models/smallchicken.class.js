class Smallchicken extends movableObject {
    width = 55;
    height = 60;
    y = 365;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    alreadyHit = false;

    /**
     * Creates an instance of Smallchicken.
     * Loads the initial image for the small chicken, sets its x position,
     * assigns a random speed, and initializes the walking and dead animation images.
     * Starts the chicken's animation.
     * 
     * @param {number} x - The x-coordinate for the small chicken's initial position.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = x;
        this.speed = 0.55 + Math.random() * 0.5;

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
    }

    /**
     * Animates the small chicken.
     * The small chicken moves to the left by calling moveLeft() every 60th of a second.
     * Every 150ms, the small chicken's walking animation is updated.
     * If the small chicken is dead, the walking animation interval is cleared,
     * the dead animation is played once, and movement is stopped.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.stopmoving();
            }
        }, 150)
    }

}