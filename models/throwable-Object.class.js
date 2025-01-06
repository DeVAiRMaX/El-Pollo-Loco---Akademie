class ThrowableObject extends movableObject {
    bottles = [];

/**
 * Creates an instance of ThrowableObject.
 * Loads the initial image for the throwable object, sets its x and y positions,
 * initializes the flying and splash animation images, and starts the throw action.
 *
 * @param {number} x - The initial x-coordinate of the throwable object.
 * @param {number} y - The initial y-coordinate of the throwable object.
 */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.throw();
    }

    IMAGES_FLYING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Animates the throwing of the bottle.
     *
     * The bottle is thrown by applying gravity to it and moving it to the right.
     * The bottle is animated by calling playAnimation() with the IMAGES_FLYING array.
     * When the bottle hits the ground, the animation is stopped and the bottle splash
     * animation is played once.
     */
    throw() {
        this.speedY = 25;
        super.applyGravity();
        this.intervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_FLYING);
            this.x += 20;
            if (this.y >= 340) {
                this.playAnimation(this.IMAGES_SPLASH);
                clearInterval(this.intervalId); // clearInterval, um die Animation zu stoppen
            }
        }, 1000 / 10);
    }

}