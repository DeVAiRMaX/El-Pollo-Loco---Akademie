class Coin extends movableObject {
    height = 60;
    width = 60;
    level = level1;
    IMAGES_SHAKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new Coin instance.
     * @param {string} imagePath - path to the image to use for the coin
     * @param {number} x - x coordinate of the coin
     * @param {number} y - y coordinate of the coin
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_SHAKING);
        this.animate();
    }

    /**
     * Animates the coin by playing the shaking animation every 100ms.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SHAKING);
        }, 100);
    }
    
}