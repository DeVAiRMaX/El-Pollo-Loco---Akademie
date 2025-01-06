class clouds extends movableObject {
  y = 10;
  width = 500;
  height = 300;

  /**
   * Creates a new instance of the clouds class.
   * @param {string} imagepath - The path to the image of the clouds.
   */

  constructor(imagepath) {
    super().loadImage(imagepath);

    this.x = 0 + Math.random(20) * 2500;

    this.animate();
  }

  /**
   * Animates the clouds by moving them to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}