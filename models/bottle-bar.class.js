class BottleBar extends DrawableObject {
    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    bottleAmmount = 0;

    /**
     * Initializes a new BottleBar object.
     *
     * Loads the images for the bottle bar, sets the position and size of the bar
     * and sets the ammount of bottles to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 10;
        this.y = 35;
        this.width = 200;
        this.height = 70;
        this.setBottleAmmount(0);
    }

    /**
     * Sets the ammount of bottles for the bottle bar.
     *
     * @param {number} bottleAmmount - The ammount of bottles to set.
     *
     * Sets the ammount of bottles to the given value, makes sure it is within the range of 0 to 10 and sets the image to be rendered accordingly.
     */
    setBottleAmmount(bottleAmmount) {
        this.bottleAmmount = Math.max(0, Math.min(bottleAmmount, 10));
        let i = Math.floor(this.bottleAmmount / 2);
        let path = this.IMAGES_BOTTLEBAR[i];
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the index of the image to be rendered for the bottle bar
     * based on the current bottle ammount.
     *
     * @returns {number} The index of the image to be rendered.
     */
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