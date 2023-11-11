let walkers =[];

function setup() {
  createCanvas(600, 1200);

  for(let i =0; i < 50; i++){
walkers.push(new Walker());
  }
  
  background(50);
}

function draw() {
  // background(50);
  for(let walker of walkers){  
  walker.update();
  walker.wander()  
  walker.borders()
  walker.display();


  }
  
}