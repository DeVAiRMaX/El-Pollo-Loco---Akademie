class Bottle extends movableObject {
    width = 90;
    height = 90;
    level = level1;

    IMAGES_SHAKING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


/**
 * Constructs a new Bottle object.
 * @param {string} imagePath - The path to the image representing the bottle.
 * @param {number} y - The y-coordinate where the bottle is placed.
 */
    constructor(imagePath, y) {
        super().loadImage(imagePath);

        this.x = 250 + Math.random(15) * 1400;

        this.y = y;
        this.offset = {
            left: 25,
            right: 25,
            top: 10,
            bottom: 5
        };
        this.loadImages(this.IMAGES_SHAKING);

        this.animate();
    }

    /**
     * Animates the bottle object by playing the shaking animation every 250 ms.
     * The animation is a sequence of two images which are played in an infinite loop.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SHAKING);
        }, 250);
    }

}