
//creating the engine and world
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

//creating the objects
var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;


//adds images and animations
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  //to start and stop animations
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

// setting the locations for the objects 
function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
// creating a farme delay
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  //bunny location and size
  bunny = createSprite(270,620,100,100);
  bunny.scale = 0.2;

  // bunny animations 
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  //adding the rope and ground blueprints
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  //creating a tie between the fruit and the rope
  fruit_con = new Link(rope,fruit);

  // allows to make everything in the center
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

// calling all the objects 
function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);


  // displaying the rope
  rope.show();
  Engine.update(engine);
  ground.show();

  //checking for the collision between the ground and fruit or bunny and fruit
  if(collide(fruit, bunny)== true) {
    bunny.changeAnimation('eating')
  }

  if(collide(fruit, ground.body)== true) {
    bunny.changeAnimation('crying')
  }


if(fruit != null) {

  image(food,fruit.position.x,fruit.position.y,70,70);
}

   drawSprites();

   
}

// cutting the rope to drop the fruit
function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

//checking for the collsion distance between the 2 objects
function collide(body, sprite) 
{
  if(body!= null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d<=80) {
      World.remove(engine.world, fruit)
      fruit = null
      return true
    }
    else{
      return false
    }
  }
}