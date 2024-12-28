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

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSSBAR);
        this.x = 510;
        this.y = -10;
        this.width = 200;
        this.height = 70;
        this.setBossPercentage(100);
    }


    setBossPercentage(bossPercentage) {
        this.bossPercentage = bossPercentage;
        let path = this.IMAGES_BOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    
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

