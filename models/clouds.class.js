class clouds extends movableObject {
    y = 10;
    width = 500;
    height = 300;
  
    constructor(imagepath) {
      super().loadImage(imagepath);

      this.x = 0 + Math.random(20) * 2500;

      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }