class BossBar extends DrawableObject {

    IMAGES_BOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    bossPercentage = 100;

    /**
     * Constructor for BossBar class
     * @constructor
     * @param {number} [x=510] - x position of the boss bar
     * @param {number} [y=-10] - y position of the boss bar
     * @param {number} [width=200] - width of the boss bar
     * @param {number} [height=70] - height of the boss bar
     * @param {number} [bossPercentage=100] - boss percentage of the boss bar
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSSBAR);
        this.x = 510;
        this.y = -10;
        this.width = 200;
        this.height = 70;
        this.setBossPercentage(100);
    }

    /**
     * Sets the boss percentage and updates the boss bar image accordingly.
     * @param {number} bossPercentage - The current percentage of the boss's health.
     */
    setBossPercentage(bossPercentage) {
        this.bossPercentage = bossPercentage;
        let path = this.IMAGES_BOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the current index of the boss bar image based on the boss's current percentage.
     * @return {number} - The index of the current boss bar image.
     */
    resolveImageIndex() {
        if (this.bossPercentage == 100) {
            return 5;
        } else if (this.bossPercentage > 80) {
            return 4;
        } else if (this.bossPercentage > 60) {
            return 3;
        } else if (this.bossPercentage > 40) {
            return 2;
        } else if (this.bossPercentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

