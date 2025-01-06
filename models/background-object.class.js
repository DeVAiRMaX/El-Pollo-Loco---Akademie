class backgroundObject extends movableObject {
    width = 720;
    height = 480;

/**
 * Constructs a backgroundObject with an image loaded from the specified path.
 * @param {string} imagepath - The path to the image to be loaded.
 * @param {number} x - The x-coordinate for the position of the background object.
 */

    constructor(imagepath, x) {
        super().loadImage(imagepath);
        this.x = x;
        this.y = 480 - this.height;
    }
}