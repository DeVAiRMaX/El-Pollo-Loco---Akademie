class Coin extends movableObject {
    height = 60;
    width = 60;
    level = level1;
    IMAGES_SHAKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_SHAKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SHAKING);
        }, 100);
    }
    
}