class CoinBar extends DrawableObject{
    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    coinAmmount = 0;

    /**
     * Initializes a new CoinBar object.
     *
     * Loads the images for the coin bar, sets the position and size of the bar
     * and sets the ammount of coins to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x  = 10;
        this.y  = 90;
        this.width = 200;
        this.height = 70;
        this.setCoinAmmount(0);
    }

    /**
     * Sets the ammount of coins for the coin bar.
     *
     * @param {number} coinAmmount - The ammount of coins to set.
     *
     * Sets the ammount of coins to the given value, makes sure it is within the range of 0 to 10 and sets the image to be rendered accordingly.
     */
    setCoinAmmount(coinAmmount) {
        this.coinAmmount = coinAmmount * 10;
        let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the index of the image to be rendered for the coin bar
     * based on the current coin ammount.
     *
     * @returns {number} The index of the image to be rendered.
     */
    resolveImageIndex() {
        if (this.coinAmmount >= 95) {
            return 5;
        } else if (this.coinAmmount >= 75) {
            return 4;
        } else if (this.coinAmmount >= 55) {
            return 3;
        } else if (this.coinAmmount >= 35) {
            return 2;
        } else if (this.coinAmmount > 15) {
            return 1;
        } else {
            return 0;
        }
    }
}