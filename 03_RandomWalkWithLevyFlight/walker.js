class Walker {
    constructor() {
      this.pos = createVector(random(width), random(height));
      this.vel= createVector(0.0)
      this.acc = createVector(0,0)
      this.prev = this.pos.copy();
      this.step;
      this.r = 1
      this.color = color(random(255));
    }
  
    display() {
      stroke(this.color);
      fill(255)
      push()
      if (this.r < 1) {
        strokeWeight(0);
      } else {
        strokeWeight(10);        
      }

      // line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
      translate(this.pos.x, this.pos.y)
      rotate(this.vel.heading())
      triangle(10,-10/2,-10,10/2,10,0)
      pop()
    }
  
    update() {
      this.prev.set(this.pos);
      this.step = p5.Vector.random2D();
      this.r = random(100);  

      if (this.r < 1) {
        this.step.mult(random(25, 100));
      } else {
      
        this.step.setMag(10);
      }
  
      this.pos.add(this.step);
      // Constrain the walker to stay within the canvas
    this.pos.x = constrain(this.pos.x, 0, width - 1);
    this.pos.y = constrain(this.pos.y, 0, height - 1);
    }

    applyForce(force){
      this.acc.add(force)
    }
  }
  