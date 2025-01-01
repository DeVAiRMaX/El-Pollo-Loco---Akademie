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
        this.checkBottleCollision();
        this.checkBossBottleCollision();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => this.handleKeyboardActions(), 250);
        setInterval(() => this.handleCollisions(), 50);
    }

    handleKeyboardActions() {
        if (this.keyboard.D) {
            this.checkThrowObject();
        }
        if (this.keyboard.C) {
            this.character.spendCoinsForEnergy();
            this.coinBar.setCoinAmmount(this.character.coinsAmmount);
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    handleCollisions() {
        this.checkCollisions();
        this.checkCoinCollision();
        this.checkJumpCollision();
    }

    checkCharakterEndbossFight() {
        if (this.character.x >= 1500) {
            this.level.enemies.forEach(endboss => {
                if (endboss instanceof Endboss) {
                    endboss.Endfight = true;
                }
            });
        }
    }

    checkJumpCollision() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if (this.isCharacterJumpingOnEnemy(enemy)) {
                this.handleJumpOnEnemy(i, enemy);
                return true;
            }
        }
        return false;
    }

    isCharacterJumpingOnEnemy(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isInAboveGround() &&
            this.character.isJumping &&
            this.character.speedY < 0;
    }

    handleJumpOnEnemy(index, enemy) {
        if (enemy instanceof Endboss) return;
        if (enemy instanceof chicken || enemy instanceof Smallchicken) {
            // TODO: Sound einfügen
        }
        this.collisionsJumpAttack(index, this.character.y);
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    collisionsJumpAttack(index, characterY) {
        this.level.enemies[index].jumpDemage(this.character);
        this.level.enemies[index].isHurt();
        this.character.jumpAgain(characterY);
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

    checkBossBottleCollision() {
        setInterval(() => {
            this.ThrowableObject.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((endboss) => {
                    if (endboss.isColliding(bottle)) {
                        endboss.bottleHit(endboss.energy);
                        this.bossBar.setBossPercentage(endboss.energy);
                        this.ThrowableObject.splice(bottleIndex, 1);
                        this.checkCharakterEndbossFight();
                    }
                });
            });
        }, 200);
    }

    checkCoinCollision() {
        for (let i = 0; i < this.level.coin.length; i++) {
            const coin = this.level.coin[i];
            if (this.character.isColliding(coin)) {
                this.character.coinsAmmount++;
                this.coinBar.setCoinAmmount(this.character.coinsAmmount);
                this.level.coin.splice(i, 1);
            }

        }

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
                    this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
                }
            });
        }, 200)
    }

    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);

        this.drawBackground();
        this.drawGameObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();

        this.requestNextFrame();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        this.addObjectsToMap(this.level.backgroundobjects);
    }

    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.ThrowableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);
    }

    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
    }

    requestNextFrame() {
        let updatesDrawMethod = this;
        requestAnimationFrame(function () {
            updatesDrawMethod.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMap(element);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirectoin) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
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