//some global variables
let seed,
  // sides,
  // r,
  recurrences = 0,
  mpVariance,
  angleVariance,
  magVariance,
  numDesiredPaintLayers,
  numPaintLayersDrawn,
  numDeformationLayers,
  // vertices = [],
  // ogPolygon = [],
  // baseDeformedPolygon = [],
  // tmp = [],
  m = 1,
  sd = 1,
  imageScale = 1,
  frameCount = 1, //set to 0 for gif creation, else set to 1
  img;
let r,g,b
  let inkDrops = []

//seed = Math.round(Math.random() * Number.MAX_SAFE_INTEGER); //random seed
seed = 3693199348549950; //use this line for a specific seed

//edit this to increase the number of recursions
//on the deformation function
// numDeformationLayers = 10;

//choose a basic drawing mode, 0 for lines 1 for color fill


function mousePressed() {  
      // Generate random color values for red, green, and blue components
      let fillColor = color(random(255), random(255), random(255),2);

      let drawing = new InkDrop(seed, imageScale,numDeformationLayers,fillColor)
        inkDrops.push(drawing)
  // console.log(inkDrops)
  // redraw()
}

function getRandomDivisor() {
  const divisors = [];
  const number = 360; // The number you want to divide

  // Find divisors of 360
  for (let i = 1; i <= 20; i++) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }

  // Pick a random divisor from the list
  const randomIndex = floor(random(divisors.length));
  return divisors[randomIndex];
}


function setup() {
  let myCanvas = createCanvas(imageScale * 1100, imageScale * 930);
  background(100,100,100);
  angleMode(DEGREES);
  myCanvas.parent("container");
  noLoop();

  for (let i=0; i < 10; i++){
    //Create random sides number of base polygon
    // let sidesNum = Math.ceil( random(10, 15))
    let sidesNum = getRandomDivisor()

    // Set the fill color with the random values
    let fillColor = color(random(255), random(255), random(255),2);

    //Create random start position of each inkDrop
    let xCoord = random(width)
    let yCoord = random(height)
      console.log(width, height, xCoord, yCoord, sidesNum);


    let drawing = new InkDrop(seed, imageScale,numDeformationLayers,fillColor, sidesNum, xCoord, yCoord)
    inkDrops.push(drawing)
    seed++
  }
}

function draw() {
 
    noStroke();
 

for (let drawing of inkDrops){
  fill(drawing.fillColor)
  // drawing.initialize()
  
  drawing.draw()
}  
  
}

