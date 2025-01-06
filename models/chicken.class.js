class chicken extends movableObject {
    width = 90;
    height = 100;
    y = 330;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];
    
    /**
     * Constructor for chicken
     * @param {number} x - The x position of the chicken.
     */

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
    }
    
    /**
     * Animates the chicken.
     * The chicken moves to the left by calling moveLeft() every 60th of a second.
     * Every 150ms, the chicken's animation is updated. If the chicken is dead,
     * the animation is stopped and the dead animation is played once.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.intervalChickenId = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                clearInterval(this.intervalBossId);
                this.playAnimation(this.IMAGES_DEAD);
                this.stopmoving();
            }
        }, 150)
    }
}