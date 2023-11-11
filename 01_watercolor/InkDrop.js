class InkDrop {
    constructor(seed, imageScale,numDeformationLayers, fillColor, sidesNum, xCoord, yCoord) {
        this.ogPolygon = []
        this.baseDeformedPolygon = []
        this.tmp= []
        this.vertices = []
        this.seed = seed
        this.imageScale = imageScale
        this.vert=[]
        this.numDeformationLayers = numDeformationLayers
        this.fillColor = fillColor
        this.sidesNum = sidesNum
        this.xCoord = xCoord
        this.yCoord = yCoord
    }

    initialize(){

        randomSeed(this.seed)
        let sides = 360 / this.sidesNum;
        let r = this.imageScale * 160;
        

   // this generates a set of (x,y)
  // coordinates that define a 10 sided ellipse like polygon

  for (let a = 0; a <= 360; a += sides) {
    let x = r * sin(a + 18) + this.xCoord;
    let y = r * cos(a + 18) + this.yCoord;
     this.vert = [x, y];
    this.vertices.push(this.vert);
    this.ogPolygon.push(this.vert); 
  }

    }

    draw() {

        this.initialize()
        for (let i = 1; i <= 3; i++) {
            this.numDeformationLayers = i;
            this.baseDeformedPolygon = this.deform(this.vertices);
            this.tmp = [...this.baseDeformedPolygon];
        
            for (let i = 0; i < 17; i++) {
              this.numDeformationLayers = 3;
              this.splotch(this.baseDeformedPolygon);
              this.vertices = [...this.tmp];
            }
          }

    }



      deform(arg) {
        
        push();
        //deep copy arg array
        let arr = [];
        for (let i = 0; i < arg.length; i++) {
          arr.push(arg[i]);
        }
      
        for (let i = 0; i < arr.length - 1; i += 2) {
          //for fine tuning the randomness on polygon deformation
           mpVariance = 0; //randomGaussian(1, 10)
           angleVariance = 0; //randomGaussian(1, 10);
           magVariance = 1; //posRandomGaussian(20, 50);
      
          let midpoint = this.calcMidpoint(arr[i], arr[i + 1]);
          midpoint.add(mpVariance); //this adds imperfection to the midpoint location
          //point(midpoint);
      
          //angleMode(RADIANS);
      
             
          let vect = createVector(arr[i + 1][0] - arr[i][0], arr[i + 1][1] - arr[i][1]);
          vect.mult(random()); // / (numDeformationLayers - 1));
          //vect.setMag( vect.mag()*magVariance / (1 * numDeformationLayers)); //add imperfection to the mag of jut
          vect.rotate(90 + angleVariance); //add imperfection to the rotation of the jut
          vect.add(midpoint);   
         
      
      
          let jut = [vect.x, vect.y];
          //console.log(jut);
          arr.splice(i + 1, 0, jut);
          //i++;
      
          
        }
      
        pop();
      
        recurrences++;
        if (recurrences == this.numDeformationLayers) {
          recurrences = 0;
          return arr;
        } else {
          return this.deform(arr);
        }

      }
//calculate the midpoint between two vertices in a 2d pixel plane
      calcMidpoint(v1, v2) {
        let midpoint = createVector(0, 0);
        midpoint.add(v1);
        midpoint.add(v2);
        return midpoint.div(this.vert.length);
      }

      //truncate random gaussian, making mean value more likely(?)
 posRandomGaussian(m, sd) {
    let s = randomGaussian(m, sd);
    if (s < 0) {
      s = 0;
    }
    return s;
  }

  splotch(arg) {        
   let deformed = this.deform(arg);

   //recursively deformed polygon
   beginShape();
   deformed.forEach((vert) => vertex(vert[0], vert[1]));
   endShape();        
}

}