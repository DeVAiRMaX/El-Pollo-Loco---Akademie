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

    /**
     * Loads an image from the given path and assigns it to the current object
     * @param {string} path - The path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current object on the given context
     * @param {CanvasRenderingContext2D} ctx - The context on which to draw
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * Loads all images from the given paths and stores them in the image cache
     * @param {string[]} paths - The paths to the images to load
     */
    loadImages(paths) {
        paths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws a frame around the current object on the given context if it is an instance
     * of Character, chicken, Endboss, Coin, Bottle, or Smallchicken. The frame is drawn
     * based on the object's position and dimensions, taking into account any offsets.
     * @param {CanvasRenderingContext2D} ctx - The context on which to draw the frame
     */
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