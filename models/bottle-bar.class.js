class BottleBar extends DrawableObject{
    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    bottleAmmount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x  = 10;
        this.y  = 35;
        this.width = 200;
        this.height = 70;
        this.setBottleAmmount(0);
    }

    setBottleAmmount(bottleAmmount) {
        this.bottleAmmount = Math.max(0, Math.min(bottleAmmount, 10));
        let i = Math.floor(this.bottleAmmount / 2);
        let path = this.IMAGES_BOTTLEBAR[i];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottleAmmount >= 95) {
            return 5;
        } else if (this.bottleAmmount >= 75) {
            return 4;
        } else if (this.bottleAmmount >= 55) {
            return 3;
        } else if (this.bottleAmmount >= 35) {
            return 2;
        } else if (this.bottleAmmount > 15) {
            return 1;
        } else {
            return 0;
        }
    }
}