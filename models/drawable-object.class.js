class DrawableObject {
    x = 120;
    y = 190;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    loadImage(path) {
        this.img = new Image(); // gleich wie: this.img = document.createElement('image');
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(paths) {
        paths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof Smallchicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'rgba(255, 0, 0, 0)';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }


}