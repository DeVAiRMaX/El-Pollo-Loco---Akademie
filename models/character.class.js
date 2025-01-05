class Character extends movableObject {
    width = 155
    height = 250
    speed = 7

    IMAGES_STAND = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGE_SNORING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
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
    y = 190
    world;
    coinsAmmount = 0;
    BottlesAmmount = 0;
    walking_audio = new Audio('audio/walking.mp3');
    jump_audio = new Audio('audio/jump.mp3');
    throw_audio = new Audio('audio/throw.mp3');
    snoring_audio = new Audio('audio/snoring.mp3');
    hurt_audio = new Audio('audio/hurt.mp3');
    isJumping = true;
    groundLevel = 70;
    afkTimer = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STAND);
        this.loadImages(this.IMAGE_SNORING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.individualCounter = 0;
        this.animate();
        this.offset = { left: 32, right: 32, top: 90, bottom: 15 };
        this.applyGravity();
    }

    animate() {
        this.setAudioVolumes();
        this.handleCharakterAFK();
        this.setupMovementInterval();
        this.setupAnimationInterval();
    }

    handleCharakterAFK() {
        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.D) {
                this.afkTimer++;
            } }, 1000);
            setInterval(() => {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.D) {
                    this.resetAfkTimer();
                }
            }, 10);
        }

    resetAfkTimer() {
        this.afkTimer = 0;
    }

    setAudioVolumes() {
        this.walking_audio.volume = 0.4;
        this.jump_audio.volume = 0.4;
        this.throw_audio.volume = 0.4;
        this.hurt_audio.volume = 0.4;
        this.snoring_audio.volume = 0.4;
    }

    setupMovementInterval() {
        setInterval(() => {
            this.walking_audio.pause();
            if (this.world.keyboard.RIGHT) this.handleRightMovement();
            if (this.world.keyboard.LEFT) this.handleLeftMovement();
            if (this.world.keyboard.UP) this.handleUpMovement();
            if (this.world.keyboard.D) this.throw_audio.play();
            this.world.camera_x = -this.x + 75;
        }, 1000 / 30);
    }
    
    handleRightMovement() {
        if (this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirectoin = false;
            this.walking_audio.play();
        }
    }
    
    handleLeftMovement() {
        if (this.x > 0) {
            this.moveLeft();
            this.walking_audio.play();
            this.otherDirectoin = true;
        }
    }
    
    handleUpMovement() {
        if (!this.isInAboveGround()) {
            this.jump();
            this.jump_audio.play();
        }
    }

    setupAnimationInterval() {
        setInterval(() => {
            if (this.isDead()) this.charakterDie();
            else if (this.afkTimer >= 10) this.playSleepAnimation();
            else {
                this.stopSleepAnimation();
                if (this.isHurt()) this.playHurtAnimation();
                else if (this.isInAboveGround()) this.playJumpAnimation();
                else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playWalkAnimation();
                else this.playStandAnimation();
            }
        }, 150);
    }
    
    playSleepAnimation() {
        this.playAnimation(this.IMAGE_SNORING);
        this.snoring_audio.play();
        sounds.push(this.snoring_audio);
    }
    
    stopSleepAnimation() {
        this.playStandAnimation();
        this.snoring_audio.pause();
    }
    
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_audio.play();
        sounds.push(this.hurt_audio);
    }
    
    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }
    
    playStandAnimation() {
        this.playAnimation(this.IMAGES_STAND);
    }

    spendCoinsForEnergy() {
        if (this.energy === 100 || this.coinsAmmount <= 0) {
            return;
        }
        else {
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
        this.isJumping = true;
        this.speedY = 25;
    }

    charakterDie() {
        this.initiateDeathJump();
        this.animateDeath();
    }

    initiateDeathJump() {
        this.isJumping = true;
        this.speedY = 10;
        const jumpDuration = 250;

        setTimeout(() => {
            this.isJumping = false;
            this.speedY = 0;
            this.fallToGround();
        }, jumpDuration);
    }

    fallToGround() {
        const fallSpeed = 5;
        const groundLevel = 600;

        const fallInterval = setInterval(() => {
            if (this.y < groundLevel) {
                this.y += fallSpeed;
            } else {
                clearInterval(fallInterval);
                this.triggerDeathScreen();
            }
        }, 1000 / 30);
    }

    triggerDeathScreen() {
        setTimeout(() => {
            showLoseScreen();
        }, 300);
    }

    animateDeath() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
    }


    jumpAgain() {
        this.isJumping = true;
        this.speedY = 20;

        const fallInterval = setInterval(() => {
            if (this.y < this.groundLevel) {
                this.y += this.speedY;
            } else {
                this.y = this.groundLevel;
                clearInterval(fallInterval);
                this.isJumping = false;
            }
        }, 1000 / 30);
    }

}