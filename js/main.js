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

  		  this.game.load.spritesheet('ladyObjectInAir','Content/Images/SpriteSheets/Peeps/Woman_In_Air.png.',80,80,4); 
  		  this.game.load.spritesheet('ladyObjectDead','Content/Images/SpriteSheets/Peeps/Woman_Dead.png.',80,80,1);
  		  this.game.load.spritesheet('ladyGhost', 'Content/Images/SpriteSheets/Peeps/Woman_Fly.png', 80,80, 7);

  		  this.game.load.image('ground','Content/Images/ground.png');
  		//  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json'); 

  		  this.game.load.spritesheet('fire','Content/Images/SpriteSheets/Flame_sprite sheet.png', 256,256, 6)

  		  this.game.load.image('tower', 'Content/Images/Buildings/Apartment.png');
  		  this.game.load.image('tower2', 'Content/Images/Buildings/ApartmentRed.png');
  		  this.game.load.spritesheet('ambulance','Content/Images/SpriteSheets/Ambulance/ambulance.png',256,256,14);
  		  this.game.load.spritesheet('helicopter','Content/Images/SpriteSheets/Helicopter/Helicopter256.png',256,128,8);



  		  // loading sounds
  		  this.game.load.audio("backgrdSound","Content/Sound/bckgrdsound.m4a");
  		  this.game.load.audio("helicopterSound","Content/Sound/helicopter.wav");
  		  this.game.load.audio("ambulanceSound","Content/Sound/ambulance.wav");

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
      			this.tower.x= 180;
				this.tower.y = 450;
      			this.game.physics.p2.enable(this.tower, false);
				this.tower.anchor.setTo(0.5,0.5);
				this.tower.angle=0;
				this.tower.body.kinematic = true;
				this.tower.body.clearShapes();
				this.tower.body.setRectangle(200, 2000, 100, 0);
				this.tower.body.setCollisionGroup(this.towerCollisionGroup);
				this.tower.body.collides([this.personCollisionGroup, this.playerCollisionGroup]);

 				this.tower2 = this.game.add.sprite(0,0,'tower2',1);
 				this.tower2.enableBody = true;
 				this.tower2.x= 1682;
				this.tower2.y = 500;	
				this.tower2.anchor.setTo(0.5,0.5);

				this.tower2.angle=0;	
				this.game.physics.p2.enable(this.tower2, false);
				this.tower2.body.kinematic = true;
				this.tower2.body.clearShapes();
				this.tower2.body.setRectangle(200, 2000, -50, 0);
				this.tower2.body.setCollisionGroup(this.towerCollisionGroup);
				this.tower2.body.collides([this.personCollisionGroup, this.playerCollisionGroup]);


				this.fire = game.add.sprite(0,0, 'fire', 1);
				this.fire.x=1610;
				this.fire.y=210;
				this.fire.scale.set(0.9);
				this.fire.animations.add('flameOn',[0,1,2,3,5],6, true);
				this.fire.animations.play('flameOn', 4, true);	

				this.fire1 = game.add.sprite(0,0, 'fire', 1);
				this.fire1.x=20;
				this.fire1.y=583;
				this.fire1.scale.set(0.4);
				this.fire1.animations.add('flameOn',[0,1,2,3,5],6, true);
				this.fire1.animations.play('flameOn', 10, true);	

				this.fire2 = game.add.sprite(0,0, 'fire', 1);
				this.fire2.x=110;
				this.fire2.y=160;
				this.fire2.scale.set(0.5);
				this.fire2.animations.add('flameOn',[0,1,2,3,5],6, true);
				this.fire2.animations.play('flameOn', 3, true);	

				this.fire3 = game.add.sprite(0,0, 'fire', 1);
				this.fire3.x=1710;
				this.fire3.y=50;
				this.fire3.scale.set(0.7);
				this.fire3.animations.add('flameOn',[0,1,2,3,5],6, true);
				this.fire3.animations.play('flameOn', 5, true);	

				this.fire4 = game.add.sprite(0,0, 'fire', 1);
				this.fire4.x=200;
				this.fire4.y=290;
				this.fire4.scale.set(0.8);
				this.fire4.animations.add('flameOn',[0,1,2,3,5],6, true);
				this.fire4.animations.play('flameOn', 6, true);	

				this.fire5 = game.add.sprite(0,0, 'fire', 1);
				this.fire5.x=1528;
				this.fire5.y=583;
				this.fire5.scale.set(0.4);
				this.fire5.animations.add('flameOn',[0,1,2,3,5],6, true);
				this.fire5.animations.play('flameOn', 8, true);	


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
				this.game.physics.p2.enable(this.player, false);
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
				this.ambulance.body.clearShapes();
				this.ambulance.body.setRectangle(200, 200, 0, 10);
				this.ambulance.body.setCollisionGroup(this.ambulanceCollisionGroup);
				//this.ambulance.body.collides(playerCollisionGroup,null,this);
				this.ambulance.body.collides(this.personCollisionGroup,AddPersonToAmbulance,this);
				personInAmbulance=0;
				ambulanceLeftToRight=true;

				this.ambulance.animations.add('ambulanceNoPerson',[0,1,2,3],6, true);
				this.ambulance.animations.play('ambulanceNoPerson');

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
				this.helicopter.animations.add('helicopinAir',[0,1,2,3],4, true);
				this.helicopter.animations.play('helicopinAir', 5, true);		


				personAlive = true;
				rotatingSpeed = 10;
				//adding timers
				this.game.time.events.loop(Phaser.Timer.SECOND*40, spawnAmbulance, this);
				this.game.time.events.add(Phaser.Timer.SECOND*50,spawnHelicopter,this);
				this.game.time.events.loop(Phaser.Timer.SECOND*5, makeNewPerson, this);

				this.score = 0;
				this.livesText = this.game.add.text(10,10, "LIVES: 10");
				this.scoreText = this.game.add.text(1650,10, "Score:" + this.score)
				this.livesText.anchor.setTo(0, 0);
				//adding text to screen
				livesLeft = 5;	
				music= game.add.audio("backgrdSound");
				music.loop = true;
				music.volume=0.2;
				music.play();

				heliMusic= game.add.audio("helicopterSound");
				heliMusic.loop = false;
				heliMusic.volume=0.4;
				heliMusic.play();

				ambulanceMusic = game.add.audio("ambulanceSound");
				ambulanceMusic.loop=false;
				ambulanceMusic.volume=0.2;
				ambulanceMusic.play();

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
	if (person.sprite.key == 'personObjectInAir')
	{
		person.sprite.loadTexture('personObjectDead', 0);
		this.ghost = game.add.sprite(0,0,'personGhost', 1);
	}
	else if (person.sprite.key == 'ladyObjectInAir')
	{
		person.sprite.loadTexture('ladyObjectDead', 0);
		this.ghost = game.add.sprite(0,0,'ladyGhost', 1);
	}

	
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
	var anotherRandomNumber = game.rnd.integerInRange(0,1);
	if (anotherRandomNumber == 0)
		this.person= game.add.sprite(0,0,'personObjectInAir',1);
	else if (anotherRandomNumber == 1)
		this.person= game.add.sprite(0,0,'ladyObjectInAir',1);
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
	this.helicopter.animations.stop(null,this);
	this.helicopter.body.x=-400;
	this.helicopter.body.velocity.x=200;
	personInHelicopter=0;
	heliOnScene=true;
	timeoutHelicopter=15000;

	heliMusic= game.add.audio("helicopterSound");
				heliMusic.loop = false;
				heliMusic.volume=0.4;
				heliMusic.play();

	this.helicopter.animations.add('helicopinAir',[0,1,2,3],4, true);
				this.helicopter.animations.play('helicopinAir', 5, true);		
	
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
	this.ambulance.animations.add('ambulanceNoPerson',[0,1,2,3],4, true);
	this.ambulance.animations.play('ambulanceNoPerson');

		ambulanceMusic = game.add.audio("ambulanceSound");
				ambulanceMusic.loop=false;
				ambulanceMusic.volume=0.2;
				ambulanceMusic.play();
	
}

function AddPersonToAmbulance(ambulance, person)
{



	if(personInAmbulance<4)
	{

		personInAmbulance++;
	//	alert("entered ambulance");
		this.score += 1;
		person.sprite.body.enable = false;
		person.sprite.kill();
		this.score += 50;
	this.ambulance.animations.stop(null,this);

		if(ambulance==1)
		{
			this.ambulance.animations.add('ambulance11person',[4,5],3,true);
			this.ambulance.animations.play('ambulance11person');
		}
		else if(personInAmbulance==2){
			
			this.ambulance.animations.add('ambulance1person',[4,5],3,true);
			this.ambulance.animations.play('ambulance1person');
		}
		else if(personInAmbulance==3){
			this.ambulance.animations.add('ambulance2person',[6,7],3,true);
			this.ambulance.animations.play('ambulance2person');
		}
		else if (personInAmbulance==4){
			this.ambulance.animations.add('ambulance3person',[8,9,10,11],6,true);
			this.ambulance.animations.play('ambulance3person');
		}
	}
	else
	{
		
	}
	
}

function BouncePoints(first, second)
{
	this.score+=50;
}

function AddPersonToHelicopter(helicopter, person)
{
	if(personInHelicopter<1 && timeoutHelicopter>0)
	{
		personInHelicopter++;
		person.sprite.body.enable = false;
		person.sprite.kill();
		this.score += 50;
		this.helicopter.animations.stop(null,this);
		this.helicopter.animations.add('helicopPersoninAir',[4,5,6,7],4, true);
		this.helicopter.animations.play('helicopPersoninAir', 5, true);		
	
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

