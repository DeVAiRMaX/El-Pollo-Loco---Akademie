let level1;

function initLevel() {

    level1 = new Level(
        [
            new chicken(),
            new Smallchicken(),
            new Endboss()
        ],
        [
            new Coin('img/8_coin/coin_1.png', 400, 250),
            new Coin('img/8_coin/coin_1.png', 475, 200),
            new Coin('img/8_coin/coin_1.png', 575, 170),
            new Coin('img/8_coin/coin_1.png', 675, 200),
            new Coin('img/8_coin/coin_1.png', 750, 250),
            new Coin('img/8_coin/coin_1.png', 1200, 250),
            new Coin('img/8_coin/coin_1.png', 1275, 200),
            new Coin('img/8_coin/coin_1.png', 1375, 170),
            new Coin('img/8_coin/coin_1.png', 1475, 200),
            new Coin('img/8_coin/coin_1.png', 1550, 250)
        ],
        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 660, 350),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1000, 350),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1250, 350),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1550, 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1820, 350),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 860, 350),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1200, 350),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1450, 350),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 450, 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1720, 350)
        ],
        [
            new clouds(),
            new clouds(),
        ],
        [
            new backgroundObject('img/5_background/layers/air.png', -719),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new backgroundObject('img/5_background/layers/air.png', 0),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new backgroundObject('img/5_background/layers/air.png', 719),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new backgroundObject('img/5_background/layers/air.png', 719 * 2),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new backgroundObject('img/5_background/layers/air.png', 719 * 3),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ]
    );
}