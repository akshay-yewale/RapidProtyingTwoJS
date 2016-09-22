var RapidPrototyping = RapidPrototyping || {};


RapidPrototyping.GameState = function(game) {
  };


//global variables

var livesText;
var livesLeft;
var music;
var group1;
var group2;
var group3;
var left;
var anim;
var right;
var personAlive;

var rotatingSpeed;
var rotating = false;
var numberOfBalloons = 37;

var player;
var person;
var tower;
var tower2;
var balloon;

var direction;
var haveLeftPlayerHitbox;

RapidPrototyping.GameState.prototype.preload = function() {
  		console.log("Adding GameState. preload");
  		  //this.game.load.image('playerObject','Content/Images/personObject.png');

  		  this.game.load.spritesheet('playerObject','Content/Images/playerSpritePNG.png.',320,64,4); 
  		  // add person object sprite
  		  this.game.load.spritesheet('personObject','Content/Images/personAnimation.png.',64,64,4); 
  		  this.game.load.spritesheet('fireFighter', 'Content/Images/SpriteSheets/Firefighters/Firefighters_AllSprites_150x64.png', 150, 64, 6);

  		  this.game.load.image('ground','Content/Images/ground.png');
  		//  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json'); 
  		  this.game.load.audio("backgrdSound","Content/Sound/bckgrdsound.ogg");
  		  this.game.load.image('balloon','Content/Images/Balloon.png');
  		  this.game.load.image('tower', 'Content/Images/Buildings/Apartment.png');
  		  this.game.load.image('tower2', 'Content/Images/Buildings/Apartment.png');
  };

RapidPrototyping.GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				console.log("Adding GameState. create");

				this.GRAVITY = 200;
			  	this.game.stage.backgroundColor = "#4488AA";
				this.game.physics.startSystem(Phaser.Physics.P2JS);
				this.game.physics.p2.restitution = 1;

				var playerCollisionGroup = game.physics.p2.createCollisionGroup();
				var personCollisionGroup = game.physics.p2.createCollisionGroup();
   				var groundCollisionGroup = game.physics.p2.createCollisionGroup();
   				var balloonCollisionGroup = game.physics.p2.createCollisionGroup();
   				var towerCollisionGroup = game.physics.p2.createCollisionGroup();

 				this.game.physics.p2.updateBoundsCollisionGroup();

				// adding ground blocks
 				this.ground = this.game.add.group();
      			for(var x = 0; x < this.game.width; x += 32) {
          		// Creating multiple ground blocks, and enabling physics on each of them.
          			var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');

          			this.game.physics.p2.enable(groundBlock);
          			groundBlock.body.kinematic = true;
	          		groundBlock.body.immovable = true;
	          		groundBlock.body.allowGravity=false;
	          		groundBlock.body.setCollisionGroup(groundCollisionGroup)
	          		groundBlock.body.collides(personCollisionGroup, loseLife, this);
          	   		this.ground.add(groundBlock);
      			}
				//adding player object to screen
				this.player = this.game.add.sprite(0,0,'fireFighter',1);
				this.player.scale.set(1.1);
				this.player.anchor.setTo(0.5,0.5);
				this.player.angle=0;
				this.player.x= 800;
				this.player.y = 800;
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
				this.player.body.setRectangle(150, 10, 0, 10);
				this.player.body.setCollisionGroup(playerCollisionGroup);
				this.player.body.collides([personCollisionGroup, towerCollisionGroup]);

      			this.tower = this.game.add.sprite(0,0,'tower',1);
      			this.tower.enableBody = true;
      			this.tower.x= 50;
				this.tower.y = 450;
      			this.game.physics.p2.enable(this.tower);
				this.tower.anchor.setTo(0.5,0.5);
				this.tower.angle=0;
				this.tower.body.kinematic = true;
				this.tower.body.setCollisionGroup(towerCollisionGroup);
				this.tower.body.collides([personCollisionGroup, playerCollisionGroup]);

 				this.tower2 = this.game.add.sprite(0,0,'tower2',1);
 				this.tower2.enableBody = true;
 				this.tower2.x= 1750;
				this.tower2.y = 450;	
				this.tower2.anchor.setTo(0.5,0.5);

				this.tower2.angle=0;	
				this.game.physics.p2.enable(this.tower2);
				this.tower2.body.kinematic = true;
				this.tower2.body.setCollisionGroup(towerCollisionGroup);
				this.tower2.body.collides([personCollisionGroup, playerCollisionGroup]);	

				// adding persons into scene
				this.person= game.add.sprite(0,0,'personObject',1);
				this.person.enableBody = true;
				this.person.x= 1000;
				this.person.y = 500;
				this.person.scale.set(1);
				this.person.anchor.setTo(0.5,0.5);
				this.game.physics.enable(this.person,Phaser.Physics.P2JS);

		      	this.person.body.collideWorldBounds = true;
                this.person.body.velocity.x = 90;
                this.person.body.velocity.y = -100;
                this.person.body.setCollisionGroup(personCollisionGroup);
                this.person.body.collides([playerCollisionGroup, towerCollisionGroup]);
                this.person.body.collides(groundCollisionGroup, null, this);
                this.person.body.collides(balloonCollisionGroup, hitBalloon, this);
				//anim =this.person.animations.add('anim',[1,2,3,4,5,6,7,8],8,true);
				//anim.enableUpdate=true;
				personAlive = true;
				rotatingSpeed = 10;

            	this.group1 = this.game.add.group();
            	this.group2 = this.game.add.group();
				this.group3 = this.game.add.group();
            	var i;
            	for (var j = 0; j < 3; j++)
            	{	            	
            		for (i = 0; i < numberOfBalloons; i++)
	            	{				
	            		this.balloon = this.game.add.sprite(75,75,'balloon');
	            		this.balloon.x= 50*i;

	            		this.balloon.enableBody = true;
						this.balloon.anchor.setTo(0.5,0.5);
						
						if (j == 0)
	                	{
	                		this.balloon.y = this.balloon.height/2;
	                	}
	                	else if (j == 1)
	                	{
	                		this.balloon.y = (this.balloon.height/2)+this.balloon.height;
	                	}
	                	else if (j == 2)
	                	{
	                		this.balloon.y = (this.balloon.height/2)+(this.balloon.height*2);
	                	}

						this.game.physics.enable(this.balloon,Phaser.Physics.P2JS);
						this.balloon.body.setCollisionGroup(balloonCollisionGroup);
						this.balloon.body.collides(personCollisionGroup, null, this);
	                	if (j == 0)
	                	{
	                		this.balloon.body.velocity.x =100;
	                		this.balloon.body.kinematic = true;	
	                		this.group1.add(this.balloon);
	                	}
	                	else if (j == 1)
	                	{
	                		this.balloon.body.velocity.x = -100;
	                		this.balloon.body.kinematic = true;	
	                		this.group2.add(this.balloon);
	                	}
	                	else if (j == 2)
	                	{
	                		this.balloon.body.velocity.x = 100;
	                		this.balloon.body.kinematic = true;	
	                		this.group3.add(this.balloon);
	                	}

	 				}
	 			}


				this.livesText = this.game.add.text(10,10, "LIVES: 3");
				this.livesText.anchor.setTo(0, 0);
				//adding text to screen
				livesLeft = 3;	
				music= game.add.audio("backgrdSound");
				music.loop = true;
				music.volume=0.3;
				music.play();

				game.physics.p2.setImpactEvents(true);
 	console.log(this.player.body.debug);
};

function loseLife(ground, person)
{
	person.sprite.body.enable = false;
	person.sprite.body.x = 300;
	person.sprite.body.y = 200;
	person.sprite.body.enable = true;
	person.sprite.body.velocity.x = 90;
	person.sprite.body.velocity.y = -200;
	//livesLeft = livesLeft-1;
	//if(livesLeft==0)
		//playerDead();
}

function playerDead()
{
	music.destroy();
	game.cache.removeSound("backgrdSound");
	game.state.start("DeathState");
}

function hitBalloon(person, balloon)
{
	balloon.sprite.kill();
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

 	game.debug.body(this.player); 	game.debug.body(this.person);


	this.player.body.velocity.x = 0;
	 if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !Phaser.Rectangle.intersects(this.player, this.tower)) {
		
		this.player.body.moveLeft(1000);
		this.player.animations.play('left', 10, true);

		//this.player.body.setRectangle(150, 10, 0, 10, );

		this.direction = -1;
	}
	else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !Phaser.Rectangle.intersects(this.player, this.tower2)){
		
		this.player.body.moveRight(1000);
		this.player.animations.play('right', 10, true);

		//this.player.body.angle= 45;
		this.direction = 1;
	}
	else
	{
		this.direction = 0;
		this.player.body.angle = 0;
		this.player.animations.play('idle');
	}

	for (var i = 0; i < this.group1.length; i++)
	{
		if (this.group1.children[i].x > game.width)
		{
			this.group1.children[i].body.enable = false;
			this.group1.children[i].body.x = -20;
			this.group1.children[i].body.enable = true;
		}
		/*
		if (this.game.physics.p2.collide(this.person, this.group1.children[i]))
		{
			var vector = findAngle(this.person.body.position, this.group1.children[i].position);
			this.person.body.velocity.x *= vector[0];
			this.group1.remove(this.group1.children[i]);
			rotating = true;
			return;
		}*/
	}

	for (var i = 0; i < this.group2.length; i++)
	{
		if (this.group2.children[i].x < 0)
		{
			this.group2.children[i].body.enable = false;
			this.group2.children[i].body.x = game.width+25;
			this.group2.children[i].body.enable = true;
		}
		/*
		if (this.game.physics.p2.collide(this.person, this.group2.children[i]))
		{
			var vector = findAngle(this.person.body.position, this.group2.children[i].position);
			this.person.body.velocity.x *= vector[0];
			this.group2.remove(this.group2.children[i]);
			rotating = true;
			return;
		}*/
	}

	for (var i = 0; i < this.group3.length; i++)
	{
		if (this.group3.children[i].x > game.width)
		{
			this.group3.children[i].body.enable = false;
			this.group3.children[i].body.x = -20;
			this.group3.children[i].body.enable = true;
		}
		/*
		if (this.game.physics.p2.collide(this.person, this.group3.children[i]))
		{
			var vector = findAngle(this.person.body.position, this.group3.children[i].position);
			this.person.body.velocity.x *= vector[0];
			this.group3.remove(this.group3.children[i]);
			rotating = true;
			return;
		}*/
	}

	if (this.person.body.velocity.x > 1500)
			this.person.body.velocity.x = 1500;
	if (this.person.body.velocity.y > 1500)
		this.person.body.velocity.y = 1500;
	
	this.livesText.setText("LIVES: "+ livesLeft);
 }

