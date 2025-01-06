class Level {
    enemies;
    clouds;
    coin;
    bottle;
    backgroundobjects;
    level_end_x = 2220;

    /**
     * Constructs a new Level object.
     * 
     * @param {Array} enemies - An array of enemy objects for the level.
     * @param {Array} coin - An array of coin objects present in the level.
     * @param {Array} bottle - An array of bottle objects present in the level.
     * @param {Array} clouds - An array of cloud objects for the level's background.
     * @param {Array} backgroundobjects - An array of background objects in the level.
     */
    constructor(enemies, coin, bottle, clouds, backgroundobjects) {
        this.enemies = enemies;
        this.coin = coin;
        this.bottle = bottle;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;
    };
}