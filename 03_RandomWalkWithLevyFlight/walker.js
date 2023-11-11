class Walker {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    // this.prev = this.pos.copy();
    // this.step;
    this.r = 1;
    this.color = color(random(255));
    this.wanderTheta = PI / 2;
    this.size = 2;

    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  display() {
    stroke(this.color);
    strokeWeight(2);
    fill(255);
    push();
    // if (this.r < 1) {
    //   strokeWeight(0);
    // } else {
    //   strokeWeight(10);
    // }

    // line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    // triangle(-this.size,-this.size/2,-this.size,this.size/2,this.size,0)
    pop();

    let rNum = random(50);
    if (rNum < 1) {
      noFill();
      if (rNum < 0.1) {
        fill(this.color);
      }
      this.setLineDash([random(10), random(10)]);
      // translate(this.pos.x, this.pos.y)

      if (rNum < 1) {
        ellipse(this.pos.x, this.pos.y, random(50));
      } else if (rNum < 0.5) {
        console.log("test");
        push();
        translate(this.pos.x, this.pos.y);
        pop();
      }
    } else if (rNum < 1.1) {
      noFill();
      translate(this.pos.x, this.pos.y);
      triangle(
        -this.size * 10,
        -this.size * 10,
        -this.size * 10,
        this.size * 10,
        this.size * 10,
        10
      );
    }

    // for (let path of this.paths){
    //   beginShape()
    //   noFill()
    //   for(let v of path) {
    //     vertex(v.x, v.y)
    //     //
    //   }
    //   endShape()
    // }
  }

  setLineDash(list) {
    drawingContext.setLineDash(list);
  }

  wander() {
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.pos);

    let wanderRadius = 50;

    let theta = this.wanderTheta + this.vel.heading();
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);

    let steer = wanderPoint.sub(this.pos);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    let displaceRange = 0.3;
    this.wanderTheta += random(-displaceRange, displaceRange);
  }

  update() {
    //Random walk with levy flight
    // this.prev.set(this.pos);
    // this.step = p5.Vector.random2D();
    // this.r = random(100);

    // if (this.r < 1) {
    //   this.step.mult(random(25, 100));
    // } else {

    //   this.step.setMag(10);
    // }
    // this.pos.add(this.step);

    // random wander with vectors
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.currentPath.push(this.pos.copy());

    // Constrain the walker to stay within the canvas

    // this.pos.x = constrain(this.pos.x, 0, width - 1);
    // this.pos.y = constrain(this.pos.y, 0, height - 1);
  }

  borders() {
    let hitEdge = false;
    if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
      hitEdge = true;
    }
    if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
      hitEdge = true;
    }
    if (this.pos.x > width + this.size) {
      this.pos.x = -this.size;
      hitEdge = true;
    }
    if (this.pos.y > height + this.size) {
      this.pos.y = -this.size;
      hitEdge = true;
    }

    if (hitEdge) {
      this.currentPath = [];
      this.paths.push(this.currentPath);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }
}
