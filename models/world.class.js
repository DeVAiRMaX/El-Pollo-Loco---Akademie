class World {
    character = new Character();
    endboss = new Endboss();
    coin = new Coin();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    bossBar = new BossBar();
    ThrowableObject = [];


    constructor(canvas, keyboard) {
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkBossCollision();
        this.checkJumpCollision();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            console.log(this.character.y);
            if (this.keyboard.C) {
                this.character.spendCoinsForEnergy();
                this.coinBar.setCoinAmmount(this.character.coinsAmmount);
                this.statusBar.setPercentage(this.character.energy);
            }
            this.checkCollisions();
            if (this.keyboard.D) {
                this.checkThrowObject();
            }
        }, 50);
    }

    checkJumpCollision() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy) && this.character.isInAboveGround() && this.character.speedY < 0) {
                if (enemy instanceof chicken || enemy instanceof Smallchicken) {
                    this.level.enemies[i].jumpDemage(enemy);
                    // this.character.jumpAgain(this.character.y);
                    this.character.jump(); // nochmal drüber schauen! Y-wert des charakters ändert sich!
                }
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 500);
                return true;
            }
        }
        return false;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.checkJumpCollision()) {
                return;
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkBossCollision() {
        setInterval(() => {
            this.ThrowableObject.forEach((bottle) => {
                this.level.enemies.forEach((endboss) => {
                    if (endboss.isColliding(bottle)) {
                        endboss.hit(endboss.energy);
                        this.bossBar.setBossPercentage(endboss.energy);
                    }
                })
            })
        }, 200);
    }

    checkCoinCollision() {
        setInterval(() => {
            this.level.coin.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.character.coinsAmmount++;
                    this.coinBar.setCoinAmmount(this.character.coinsAmmount);
                    this.level.coin.splice(0, 1);
                }
            });
        }, 200)
    }

    checkThrowObject() {
        if (this.character.BottlesAmmount <= 0) {
            console.log('No more bottles');
            return;
        } else {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObject.push(bottle);
            this.character.BottlesAmmount--;
            this.bottleBar.setBottleAmmount(this.character.BottlesAmmount);
        }
    }

    checkBottleCollision() {
        setInterval(() => {
            this.level.bottle.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.BottlesAmmount++;
                    this.bottleBar.setBottleAmmount(this.character.BottlesAmmount);
                    this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1); // entferne die Flasche aus dem Array
                }
            });
        }, 200)
    }

    /**
     * Draws the current state of the game on the canvas.
     * Clears the canvas, then draws the character, enemies, clouds and backgrounds in that order.
     * At the end, it schedules itself to be called again with the next animation frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundobjects);
        this.addToMap(this.character);

        this.addObjectsToMap(this.ThrowableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);  //Back
        // Space for fixxed Objects //
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0);  //Forwards

        this.ctx.translate(-this.camera_x, 0);

        let updatesDrawMethod = this;
        requestAnimationFrame(function () {
            updatesDrawMethod.draw();
        });
    }

    /**
     * Adds multiple objects to the map by drawing each object on the canvas.
     * Iterates through the provided array of objects and calls addToMap for each.
     * 
     * @param {Array} objects - An array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMap(element);
        });
    }


    /**
     * Draws the movableObject on the canvas at its current position.
     * If the movableObject has the property otherDirectoin set to true, it will be drawn mirrored horizontally.
     * @param {movableObject} movableObject - The movableObject to draw.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirectoin) {
            this.flipImage(movableObject);

        }
        movableObject.draw(this.ctx);
        // this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);


        movableObject.drawFrame(this.ctx);

        if (movableObject.otherDirectoin) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

}