class Endboss extends movableObject {
    height = 350;
    width = 300;
    world;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
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
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'

    ];
    Endfight = false;
    isJumping = false;
    endbossattack_audio = new Audio('audio/endbossattack.mp3');
    victory_audio = new Audio('audio/victory.mp3');
    endbossattack_audioAdded = false;
    endbossIsDead = false;

    /**
     * Constructor for the endboss.
     * The constructor loads the different image states for the endboss, sets the offset for collision detection and sets the initial x and y coordinates of the endboss.
     * The endboss is placed at the right side of the screen and moves to the left with the speed of 10 pixels per frame.
     * The animate() method is called to start the animation of the endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);

        sounds.push(this.endbossattack_audio);

        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.offset = {
            left: 10,
            right: 10,
            top: 70,
            bottom: 30
        };

        this.x = 2000;
        this.y = 100;
        this.speed = 15;

        this.animate();
    }

    /**
     * Animates the endboss by setting up a recurring interval.
     * 
     * If the endboss is dead, the attack audio is paused and the dying animation is triggered.
     * Otherwise, it continues handling the animation state.
     * The interval runs every 200ms.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.endbossIsDead = true;
                world.endfight_audio.pause();
                this.endbossattack_audio.pause();
                this.playEndbossDieSound();
                this.endbossDie();
            } else {
                this.handleAnimationState();
            }
        }, 150);
    }

    playEndbossDieSound() {
        this.victory_audio.play();
        this.victory_audio.volume = 0.4;
    }


    /**
     * Handles the animation state of the endboss based on its current status.
     * 
     * If the endboss is hurt, it triggers the hurt animation sequence.
     * If the endboss is in the end fight mode (Endfight is true), it plays 
     * the attack audio in a loop, initiates the end boss fight sequence, 
     * and displays the attack animation.
     * If neither condition is met, it defaults to the alert animation.
     */
    handleAnimationState() {
        if (this.isHurt()) {
            this.handleHurtAnimation()
        } else if (this.Endfight) {
            if (!this.endbossattack_audioAdded) {
                this.endbossattack_audio.loop = true;
                this.endbossattack_audio.volume = 0.5;
                this.endbossattack_audio.play();
                this.endbossattack_audioAdded = true;
            }
            this.endBossFight();
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Handles the hurt animation sequence for the endboss.
     * 
     * This method is called when the endboss is hurt. It first stops the endboss fight mode, plays the hurt animation, and then waits for 0.5s before re-enabling the endboss fight mode.
     */
    handleHurtAnimation() {
        this.Endfight = false;
        this.playAnimation(this.IMAGES_HURT);

        setTimeout(() => {
            this.Endfight = true;
        }, 150);

    }


    /**
     * Animates the endboss dying and displays the victory screen after 1 second.
     * 
     * This method is called when the endboss is defeated. It will animate the endboss dying by playing the death animation every 100ms and then display the victory screen after 1 second.
     */
    endbossDie() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000 / 15);
        setTimeout(() => {
            showVictoryScreen();
        }, 1000);
    }


    /**
     * Starts moving the endboss to the left at a speed of 10 pixels per frame.
     * 
     * This method is called when the endboss is spawned and will make the endboss move from right to left across the screen until it is defeated.
     */
    startMoving() {
        return this.x -= this.speed;
    }


}