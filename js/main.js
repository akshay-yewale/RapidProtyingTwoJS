var RapidPrototyping = RapidPrototyping || {};


RapidPrototyping.GameState = function(game) {
  };


//global variables

var livesText;
var scoreText;

var livesLeft;
var score;

var music;
var group1;
var group2;
var group3;
var left;
var anim;
var right;
var personAlive;
var personInAmbulance;
var personInHelicopter;
var heliOnScene;
var timeoutHelicopter;
var timeElasped;
var deltaTime;

var ambulanceLeftToRight;

var rotatingSpeed;
var rotating = false;

var player;
var person;
var tower;
var tower2;
var ambulance;
var wingsOfFreedom;
var personCollisionGroup;
var direction;
var haveLeftPlayerHitbox;

var playerCollisionGroup;
var personCollisionGroup;
var groundCollisionGroup;
var towerCollisionGroup;
var ambulanceCollisionGroup;
var helicopterCollisionGroup;
var backgroundObjectsGroup;

RapidPrototyping.GameState.prototype.preload = function() {
  		console.log("Adding GameState. preload");
  		  //this.game.load.image('playerObject','Content/Images/personObject.png');
  		  this.game.load.image('background','Content/Images/background.png');
  		  
  		  this.game.load.image('bench', 'Content/Images/Buildings/Bench.png');
  		  this.game.load.image('clock', 'Content/Images/Buildings/Clock.png');
  		  this.game.load.image('mailbox', 'Content/Images/Buildings/mailbox.png');
  		  this.game.load.image('StreetLight', 'Content/Images/Buildings/StreetLight.png');

  		  this.game.load.spritesheet('playerObject','Content/Images/playerSpritePNG.png.',320,64,4);
  		  this.game.load.physics('player_physicsIdle', 'Content/Images/SpriteSheets/Firefighters/fireFighterIdle.json')
  		  this.game.load.physics('player_physicsLeft', 'Content/Images/SpriteSheets/Firefighters/fireFighterLeft.json')
  		  this.game.load.physics('player_physicsRight', 'Content/Images/SpriteSheets/Firefighters/fireFighterRight.json')
  		  this.game.load.spritesheet('Firefighters_Final_180x80', 'Content/Images/SpriteSheets/Firefighters/Firefighters_Final_180x80.png', 180, 80, 6);
// add person object sprite
  		  this.game.load.spritesheet('personObjectInAir','Content/Images/SpriteSheets/Peeps/B_Man_In_Air.png.',80,80,4); 
  		  this.game.load.spritesheet('personObjectDead','Content/Images/SpriteSheets/Peeps/B_Man_Dead.png.',80,80,1);
  		  this.game.load.spritesheet('personGhost', 'Content/Images/SpriteSheets/Peeps/Businessman_wings.png', 80,80, 7);

  		  this.game.load.image('ground','Content/Images/ground.png');
  		//  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json'); 
  		  this.game.load.audio("backgrdSound","Content/Sound/bckgrdsound.ogg");
  		  this.game.load.image('tower', 'Content/Images/Buildings/Apartment.png');
  		  this.game.load.image('tower2', 'Content/Images/Buildings/ApartmentRed.png');
  		  this.game.load.spritesheet('ambulance','Content/Images/SpriteSheets/Ambulance/ambulance.png',256,256,10);
  		  this.game.load.spritesheet('helicopter','Content/Images/SpriteSheets/Helicopter/helicopter.png',256,256,1);
  		  //this.game.load.spritesheet('wingsOfFreedom','');
  };

RapidPrototyping.GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				console.log("Adding GameState create");

				this.GRAVITY = 200;
			  	//this.game.stage.backgroundColor = "#4488AA";

			  	this.backgroundImage = this.game.add.sprite(0,0,'background',1);
			  	this.backgroundImage.scale.set(2);

				this.game.physics.startSystem(Phaser.Physics.P2JS);
				this.game.physics.p2.restitution = 1;


				this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
				this.personCollisionGroup = game.physics.p2.createCollisionGroup();
   				this.groundCollisionGroup = game.physics.p2.createCollisionGroup();
   				this.towerCollisionGroup = game.physics.p2.createCollisionGroup();
				this.ambulanceCollisionGroup =game.physics.p2.createCollisionGroup();
   				this.helicopterCollisionGroup = game.physics.p2.createCollisionGroup();
   				this.backgroundObjectsGroup = game.physics.p2.createCollisionGroup();

 				this.game.physics.p2.updateBoundsCollisionGroup();

 				console.log("Adding GameState creating tower1");
      			this.tower = this.game.add.sprite(0,0,'tower',1);
      			this.tower.enableBody = true;
      			this.tower.x= 100;
				this.tower.y = 450;
      			this.game.physics.p2.enable(this.tower);
				this.tower.anchor.setTo(0.5,0.5);
				this.tower.angle=0;
				this.tower.body.kinematic = true;
				this.tower.body.setCollisionGroup(this.towerCollisionGroup);
				this.tower.body.collides([this.personCollisionGroup, this.playerCollisionGroup]);

 				this.tower2 = this.game.add.sprite(0,0,'tower2',1);
 				this.tower2.enableBody = true;
 				this.tower2.x= 1682;
				this.tower2.y = 500;	
				this.tower2.anchor.setTo(0.5,0.5);

				this.tower2.angle=0;	
				this.game.physics.p2.enable(this.tower2);
				this.tower2.body.kinematic = true;
				this.tower2.body.setCollisionGroup(this.towerCollisionGroup);
				this.tower2.body.collides([this.personCollisionGroup, this.playerCollisionGroup]);

				this.StreetLight = this.game.add.sprite(0,0,'StreetLight',1);
	 			this.StreetLight.x=1300;
				this.StreetLight.y=560;


				console.log("Adding GameState creating ground");
				// adding ground blocks
      			this.ground = this.game.add.sprite(0, 0, 'ground', 1);
      			this.ground.x=910;
				this.ground.y=910;
      			this.ground.scale.set(1);
      			this.ground.anchor.setTo(0.0,1);
      			this.game.physics.p2.enable(this.ground, false);

      			this.ground.body.kinematic = true;
          		this.ground.body.immovable = true;
          		this.ground.body.allowGravity=false;
          		this.ground.body.setCollisionGroup(this.groundCollisionGroup)
          		this.ground.body.collides(this.personCollisionGroup, loseLife, this);

	 			this.bench = this.game.add.sprite(0,0,'bench',1);
	 			this.bench.x=21;
				this.bench.y=885;

				this.clock = this.game.add.sprite(0,0,'clock',1);
	 			this.clock.x=600;
				this.clock.y=760;
				this.clock.scale.set(0.5);

				this.mailbox = this.game.add.sprite(0,0,'mailbox',1);
	 			this.mailbox.x=1520;
				this.mailbox.y=870;

      			console.log("Adding GameState creating player state");
				//adding player object to screen
				this.player = this.game.add.sprite(0,0,'Firefighters_Final_180x80',1);
				this.player.scale.set(1.1);
				this.player.anchor.setTo(0.5,0.5);
				this.player.angle=0;
				this.player.x= 800;
				this.player.y = 870;
				this.player.scale.set(1);
				this.player.animations.add('idle',[0,1],2, true);
				this.player.animations.add('left', [2,3], 2, true);
				this.player.animations.add('right', [4,5], 2, true);	
				this.game.input.keyboard.addKeyCapture([
          				Phaser.Keyboard.LEFT,
          				Phaser.Keyboard.RIGHT
          				]);
				this.game.physics.p2.enable(this.player, true);
 				this.game.physics.p2.gravity.y = this.GRAVITY*2;


 				this.player.enableBody = true;
 				this.player.body.collideWorldBounds = true;
 				this.player.body.kinematic = true;
				this.player.body.drag = 0.1;

				this.player.body.clearShapes();
				this.player.body.loadPolygon('player_physicsIdle', 'Firefighters_Final_180x80');
				this.player.animations.add('idle',[0,1],2, true);
				this.player.animations.play('idle', 5, true);
				//this.player.body.setRectangle(200, 50, 0, 10);
				this.player.body.setCollisionGroup(this.playerCollisionGroup);
				this.player.body.collides([this.personCollisionGroup, this.towerCollisionGroup]);	

				this.groupPerson = this.game.add.group();
				// adding persons into scene
				this.person= game.add.sprite(0,0,'personObjectInAir',1);
				this.person.enableBody = true;
				this.person.x= 1000;
				this.person.y = 500;
				this.person.scale.set(1);
				this.person.anchor.setTo(0.5,0.5);
				this.game.physics.enable(this.person,Phaser.Physics.P2JS, false);

				this.person.animations.add('inair',[0,1,2,3],4, true);
				this.person.animations.play('inair');		

		      	this.person.body.collideWorldBounds = true;
                this.person.body.velocity.x = 90;
                this.person.body.velocity.y = -100;

                
			    this.person.body.setCollisionGroup(this.personCollisionGroup);
			    this.person.body.collides([this.backgroundObjectsGroup])
			    this.person.body.collides(this.groundCollisionGroup, null,this);
			    this.person.body.collides(this.ambulanceCollisionGroup,null,this);
			    this.person.body.collides(this.helicopterCollisionGroup,null,this);
			    this.person.body.collides(this.personCollisionGroup,BouncePoints,this);
			    this.person.body.collides(this.towerCollisionGroup, BouncePoints, this);
			    this.person.body.collides(this.playerCollisionGroup, BouncePoints, this);
                this.groupPerson.add(this.person);

				//anim =this.person.animations.add('anim',[1,2,3,4,5,6,7,8],8,true);
				//anim.enableUpdate=true;

				this.ambulance = game.add.sprite(0,0,'ambulance',1);
				this.ambulance.enableBody=true;
				this.ambulance.x=-200;
				this.ambulance.y=845;
				this.game.physics.p2.enable(this.ambulance,false);
 				this.ambulance.body.collideWorldBounds = true;
 				this.ambulance.body.kinematic = true;
				this.ambulance.body.drag = 0.1;
				this.ambulance.body.velocity.x =100;
				this.ambulance.body.setRectangle(200, 200, 0, 10);
				this.ambulance.body.setCollisionGroup(this.ambulanceCollisionGroup);
				//this.ambulance.body.collides(playerCollisionGroup,null,this);
				this.ambulance.body.collides(this.personCollisionGroup,AddPersonToAmbulance,this);
				personInAmbulance=0;
				ambulanceLeftToRight=true;

				this.helicopter = game.add.sprite(0,0,'helicopter',1);
				this.helicopter.enableBody=true;
				this.helicopter.x=-200;
				this.helicopter.y=200;
				this.game.physics.p2.enable(this.helicopter,false);
 				this.helicopter.body.collideWorldBounds = true;
 				this.helicopter.body.kinematic = true;
				this.helicopter.body.drag = 0.1;
				this.helicopter.body.velocity.x =100;
				this.helicopter.body.clearShapes();
				this.helicopter.body.setRectangle(100, 64, 0, 10);
				this.helicopter.body.setCollisionGroup(this.helicopterCollisionGroup);
				//this.ambulance.body.collides(playerCollisionGroup,null,this);
				this.helicopter.body.collides(this.personCollisionGroup,AddPersonToHelicopter,this);
				personInHelicopter=0;
				heliOnScene=true;
				timeoutHelicopter=15000;

				personAlive = true;
				rotatingSpeed = 10;




				//adding timers
				this.game.time.events.loop(Phaser.Timer.SECOND*10, spawnAmbulance, this);
				this.game.time.events.loop(Phaser.Timer.SECOND*85,	spawnHelicopter,this);
				this.game.time.events.loop(Phaser.Timer.SECOND*5, makeNewPerson, this);

				this.score = 0;
				this.livesText = this.game.add.text(10,10, "LIVES: 10");
				this.scoreText = this.game.add.text(1650,10, "Score:" + this.score)
				this.livesText.anchor.setTo(0, 0);
				//adding text to screen
				livesLeft = 30;	
				music= game.add.audio("backgrdSound");
				music.loop = true;
				music.volume=0.3;
				music.play();

				game.physics.p2.setImpactEvents(true);
 				console.log(this.player.body.debug);

};

function loseLife(ground, person)
{
	person.sprite.body.setRectangle(75, 20, 0, 23);
	person.sprite.body.setCollisionGroup(this.personCollisionGroup);
	person.sprite.body.velocity.x = 0;
	person.sprite.body.velocity.y = 0;
	person.sprite.body.angle = 0;
	person.sprite.body.kinematic = true;
	person.sprite.body.angularVelocity = 0;
	//person.sprite.body.x = 300;
	person.sprite.body.y = 870;
	person.sprite.body.enable = false;

	this.game.time.events.add(Phaser.Timer.SECOND * 20,removePerson, this, person.sprite);
	/*person.sprite.body.enable = true;
	person.sprite.body.velocity.x = 90;
	person.sprite.body.velocity.y = -200;*/
	//person.sprite.kill();
	person.sprite.loadTexture('personObjectDead', 0);

	this.ghost = game.add.sprite(0,0,'personGhost', 1);
	this.person.enableBody = true;
	this.ghost.x = person.x;
	this.ghost.y = person.y;
	this.game.physics.enable(this.ghost,Phaser.Physics.P2JS);
	this.ghost.animations.add('inair',[0,1,2,3,4,5,6],7, true);
	this.ghost.animations.play('inair');
	this.ghost.body.velocity.y = -100;
	this.ghost.alpha = 0.2;
	this.ghost.body.kinematic = true;
	livesLeft = livesLeft-1;
	if(livesLeft==0)
		playerDead();
}

function removePerson(person)
{
	person.kill();
}

function makeNewPerson()
{
	this.person= game.add.sprite(0,0,'personObjectInAir',1);
	this.person.enableBody = true;
	this.person.scale.set(1);
	this.person.anchor.setTo(0.5,0.5);
	
	var randomNumber = game.rnd.integerInRange(0,3);
	if (randomNumber == 0)
	{	
	this.person.x= 400;
	this.person.y = 200;
	}
	else if (randomNumber == 1)
	{	
	this.person.x= 400;
	this.person.y = 400;
	}
	else if (randomNumber == 2)
	{	
	this.person.x= 1500;
	this.person.y = 200;
	}
	else if (randomNumber == 3)
	{	
	this.person.x= 1500;
	this.person.y = 400;
	}
	this.game.physics.enable(this.person,Phaser.Physics.P2JS);
	this.person.animations.add('inair',[0,1,2,3],4, true);
	this.person.animations.play('inair');
	if (randomNumber == 0)
	{	
	this.person.body.velocity.x = 90;
    this.person.body.velocity.y = -100;
	}
	else if (randomNumber == 1)
	{	
	this.person.body.velocity.x = 90;
    this.person.body.velocity.y = -100;
	}
	else if (randomNumber == 2)
	{
	this.person.body.velocity.x = -90;
    this.person.body.velocity.y = 100;
	}
	else if (randomNumber == 3)
	{	
	this.person.body.velocity.x = -90;
    this.person.body.velocity.y = 100;
	}

  	this.person.body.collideWorldBounds = true;
    this.person.body.setCollisionGroup(this.personCollisionGroup);
    this.person.body.collides([this.backgroundObjectsGroup])
    this.person.body.collides(this.groundCollisionGroup, null,this);
    this.person.body.collides(this.ambulanceCollisionGroup,null,this);
    this.person.body.collides(this.helicopterCollisionGroup,null,this);
    this.person.body.collides(this.personCollisionGroup,BouncePoints,this);
    this.person.body.collides(this.towerCollisionGroup, BouncePoints, this);
    this.person.body.collides(this.playerCollisionGroup, BouncePoints, this);

	this.groupPerson.add(this.person);
}

function playerDead()
{
	music.destroy();
	game.cache.removeSound("backgrdSound");
	game.state.start("DeathState");
}


function spawnHelicopter(){
	this.helicopter.body.x=-400;
	this.helicopter.body.velocity.x=200;
	personInHelicopter=0;
	heliOnScene=true;
	timeoutHelicopter=15000;
	
}


function spawnAmbulance(){

	var randomNumber = game.rnd.integerInRange(0,1);
	if (randomNumber == 0)
	{	
		if(ambulanceLeftToRight==false)
		{
			this.ambulance.scale.x*=-1;	
			ambulanceLeftToRight=true;
		}
	this.ambulance.body.x= -200;
	this.ambulance.body.velocity.x=100;
	}
	// need to work on these
	
	else if (randomNumber == 1)
	{	
		if(ambulanceLeftToRight==true)
		{
		this.ambulance.scale.x*=-1;	
		ambulanceLeftToRight=false;
		}
	
	this.ambulance.body.x= 2200;
	this.ambulance.body.velocity.x=-100;

	}
	personInAmbulance=0;
	this.ambulance.animations.add('ambulance',[0,1,2,3],6, true);
	this.ambulance.animations.play('ambulance');
	
}

function AddPersonToAmbulance(ambulance, person)
{
	if(personInAmbulance<4)
	{
		personInAmbulance++;
		person.sprite.body.enable = false;
		person.sprite.body.x = 300;
		person.sprite.body.y = 200;
		person.sprite.body.enable = true;
		person.sprite.body.velocity.x = 90;
		person.sprite.body.velocity.y = -200;

		this.score += 50;
	}
	else
	{
		
	}
	
}

function BouncePoints(first, second)
{
	this.score += 1;
}

function AddPersonToHelicopter(helicopter, person)
{
	if(personInHelicopter<1 && timeoutHelicopter>0)
	{
		personInHelicopter++;
		person.sprite.body.enable = false;
		person.sprite.body.x = 300;
		person.sprite.body.y = 200;
		person.sprite.body.enable = true;
		person.sprite.body.velocity.x = 90;
		person.sprite.body.velocity.y = -200;
		this.score += 50;
	}
	else
	{
		

	}	
}


function findAngle(a, b)
{
	var vector = [a.x - b.x, a.y - b.y];
	var length = Math.sqrt((vector[0]*vector[0])+ (vector[1]*vector[1]));
	if (length < 0)
		length *= -1;

	vector[0] /=length;
	vector[1] /=length;

	return vector;
}


 RapidPrototyping.GameState.prototype.update = function() {

 	//game.debug.body(this.player); 	game.debug.body(this.person);

	timeElasped=this.game.time.totalElapsedSeconds()
	//if(this.ambulance.body.x > 300){
 	//	this.ambulance.body.velocity.x=0;
 //	}	
//
 	if(heliOnScene)	
	{
		deltaTime = (this.game.time.elapsedMS * this.game.time.fps) / 1000;
		timeoutHelicopter-=deltaTime;

		if(this.helicopter.body.x>this.game.width)
			heliOnScene=false;
	}

	this.player.body.velocity.x = 0;
	 if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !Phaser.Rectangle.intersects(this.player, this.tower)) 
	 {
	 	this.player.body.moveLeft(1000);
	 	if (this.player.animations.currentAnim.name != 'left')
		{	
			this.player.animations.play('left', 10, true);
			this.player.body.clearShapes();
			this.player.body.loadPolygon('player_physicsLeft', 'Firefighters_Final_180x80');
			this.player.body.setCollisionGroup(this.playerCollisionGroup);
			this.direction = -1;

			this.player.body.shapeChanged();
		}
	}
	else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !Phaser.Rectangle.intersects(this.player, this.tower2))
	{
		this.player.body.moveRight(1000);
		if (this.player.animations.currentAnim.name != 'right')
		{	
			this.player.animations.play('right', 10, true);
			this.player.body.clearShapes();
			this.player.body.loadPolygon('player_physicsRight', 'Firefighters_Final_180x80');
			this.player.body.setCollisionGroup(this.playerCollisionGroup);
			this.direction = 1;

			this.player.body.shapeChanged();
		}
	}
	else
	{
		this.direction = 0;
		if (this.player.animations.currentAnim.name != 'idle')
		{			
			this.player.animations.play('idle');
			this.player.body.clearShapes();
			this.player.body.loadPolygon('player_physicsIdle', 'Firefighters_Final_180x80');
			this.player.body.setCollisionGroup(this.playerCollisionGroup);
			this.player.body.shapeChanged();
		}

	}

	if (this.person.body.velocity.x > 1500)
			this.person.body.velocity.x = 1500;
	if (this.person.body.velocity.y > 1500)
		this.person.body.velocity.y = 1500;
	
	this.livesText.setText("LIVES: "+ livesLeft);
	this.scoreText.setText("Score: " + this.score);
 }

