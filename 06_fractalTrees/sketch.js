let angle = 0;
let slider, label;
let tree = [];
let count = 0;
let leaves = [];

function setup() {
  createCanvas(400, 500);
  label = createDiv("Branch angle");
  label.position(30, 30);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  slider.position(10, 10);
  slider.parent(label);

  //create first branch
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - 100);
  let root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }

    tree[i].finished = true;
  }
  count++;

  if (count === 5) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  angle = slider.value();
  background(50);

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
    // tree[i].jitter();
  }

  for (let i = 0; i < leaves.length; i++) {
    fill(255, 0, 100);
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    leaves[i].y += random(0, 2);
  }

  let len = 100;
}

// function branch(len) {
//   line(0, 0, 0, -len);
//   translate(0, -len);

//   if (len > 4) {
//     push();
//     rotate(angle);
//     branch(len * 0.67);
//     pop();
//     push();
//     rotate(-angle);
//     branch(len * 0.67);
//     pop();
//   }

// line(0, 0, 0, -len * 0.67);
// }
