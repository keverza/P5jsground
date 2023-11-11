let walkers =[];

function setup() {
  createCanvas(600, 1200);

  for(let i =0; i < 10; i++){
walkers.push(new Walker());
  }
  
  background(50);
}

function draw() {
  for(let walker of walkers){
  walker.display();
  walker.update();
  }
  
}