class Endboss extends movableObject {
    height = 250;
    width = 200;
    y = 183;
    world;
    
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2000;
        this.offset = {
            left: 10,
            right: 10,
            top: 70,
            bottom: 30
        };

        this.animate();
    }

    animate() {
        this.intervalBossId = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                clearInterval(this.intervalBossId); // Interval stoppen
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.showVictoryScreen();
                }, 1000);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 200)
    }

    showVictoryScreen() {
        document.getElementById('canvas').style.display = 'none';
        closePopup('gamesettingspopupBackground', 'gamepopupContainer')
        openPopup('victoryscreenpopupBackground', 'victoryscreenpopupContainer');
    }
    getBounds() {
        return {
          left: this.x,
          right: this.x + this.width,
          top: this.y,
          bottom: this.y + this.height
        };
      }
}