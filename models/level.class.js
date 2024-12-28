class Level {
    enemies;
    clouds;
    coin;
    bottle;
    backgroundobjects;
    level_end_x = 2220;

    constructor(enemies, coin, bottle, clouds, backgroundobjects) {
        this.enemies = enemies;
        this.coin = coin;
        this.bottle = bottle;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;
    };
}