class Character extends movableObject {
    width = 155
    height = 250
    speed = 7
    isJumping = true;


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
    world;
    coinsAmmount = 0;
    BottlesAmmount = 0;
    walking_audio = new Audio('audio/walking.mp3');
    jump_audio = new Audio('audio/jump.mp3');
    throw_audio = new Audio('audio/throw.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.animate();
        this.offset = {
            left: 32,
            right: 32,
            top: 90,
            bottom: 15
        };

        this.applyGravity();

    }

    animate() {
        setInterval(() => {
            this.walking_audio.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirectoin = false;
                this.walking_audio.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walking_audio.play();
                this.otherDirectoin = true;
            }

            if (this.world.keyboard.UP && !this.isInAboveGround()) {
                this.jump();
                this.jump_audio.play();
            }

            if (this.world.keyboard.D) {
                this.throw_audio.play();
            }

            this.world.camera_x = -this.x + 75;
        }, 1000 / 40);

        this.intervalId = setInterval(() => {
            if (this.isDead()) {
                clearInterval(this.intervalId); // Interval stoppen
                this.world.gameOver = true; // Spielablauf stoppen
                this.world.draw(); // Letztes Mal das Spiel zeichnen
                this.playAnimation(this.IMAGES_DEAD);
                this.showDeathScreen();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isInAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50)
    }

    spendCoinsForEnergy() {
        if (this.energy == 100) {
            return;
        } else {
            this.coinsAmmount = Math.max(0, this.coinsAmmount - 1);
            this.energy = Math.min(100, this.energy + 10);
        }
    }

    showDeathScreen() {
        document.getElementById('canvas').style.display = 'none';
        closePopup('gamesettingspopupBackground', 'gamepopupContainer')
        openPopup('deathscreenpopupBackground', 'deathscreenpopupContainer');
    }

    jump() {
        this.speedY = 20;
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