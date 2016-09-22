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
  		  this.game.load.image('ground','Content/Images/ground.png');
  		//  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json'); 
  		  this.game.load.audio("backgrdSound","Content/Sound/bckgrdsound.ogg");
  		  this.game.load.image('balloon','Content/Images/Balloon.png');
  		  this.game.load.image('tower', 'Content/Images/abandon_chinese_tower.png');
  		  this.game.load.image('tower2', 'Content/Images/abandon_chinese_tower.png');
  };

RapidPrototyping.GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				console.log("Adding GameState. create");

				this.GRAVITY = 500;
			  	this.game.stage.backgroundColor = "#4488AA";

				this.game.physics.startSystem(Phaser.Physics.ARCADE);
				// adding ground blocks
 				this.ground = this.game.add.group();
      			for(var x = 0; x < this.game.width; x += 32) {
          		// Creating multiple ground blocks, and enabling physics on each of them.
          			var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
          			this.game.physics.arcade.enable(groundBlock);
	          		groundBlock.body.immovable = true;
	          		groundBlock.body.allowGravity=false;
          	   		this.ground.add(groundBlock);
      			}

      			this.game.physics.startSystem(Phaser.Physics.P2JS);

      			}
				//adding player object to screen
				this.player = this.game.add.sprite(0,0,'playerObject',1);
				this.player.scale.set(1.1);
				this.player.anchor.setTo(0.5,0.5);
				this.player.angle=0;
				this.player.x= 450;
				this.player.y = 800;
				//this.player.animations.add('left',[1,2,3,4,5,6,7,8],8,true);				
				//this.player.animations.play('left');
    		
				
			
				//left =this.player.animations.add('left',[1,2,3,4,5,6,7,8],8,true);				
				//left.enableUpdate = true;
    			
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

      			this.tower = this.game.add.sprite(0,0,'tower',1);
				this.tower.scale.set(1);
				this.tower.anchor.setTo(0.5,0.5);
				this.tower.angle=0;
				this.tower.x= 50;
				this.tower.y = 450;

				this.game.physics.arcade.enable(this.tower);			

 				this.tower.body.allowGravity=false;
 				this.tower.body.immovable = true;

 				this.tower2 = this.game.add.sprite(0,0,'tower2',1);
				this.tower2.scale.set(1);
				this.tower2.anchor.setTo(0.5,0.5);
				this.tower2.angle=0;
				this.tower2.x= 1750;
				this.tower2.y = 450;			
				this.game.physics.arcade.enable(this.tower2);
 				this.game.physics.arcade.gravity.y = this.GRAVITY;

 				this.tower2.body.allowGravity=false;
 				this.tower2.body.immovable = true;

				// adding persons into scene
				this.person= game.add.sprite(0,0,'personObject',1);
				this.person.scale.set(1);
				this.person.anchor.setTo(0.5,0.5);
				this.game.physics.enable(this.person,Phaser.Physics.ARCADE);

				//this.game.physics.p2.enable(this.person, true);

				this.person.x= 300;
				this.person.y = 200;

     			this.person.body.allowGravity=true;
		      	this.person.body.collideWorldBounds = true;
                this.person.body.velocity.setTo(90, -200);
				this.person.body.bounce.setTo(1.1);
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
						this.balloon.anchor.setTo(0.5,0.5);
						this.balloon.x= 50*i;
						this.balloon.enableBody = true;
						
						this.game.physics.enable(this.balloon,Phaser.Physics.ARCADE);

		 				this.balloon.body.allowGravity=false;
		 				this.balloon.body.immovable = true;

	                	if (j == 0)
	                	{
	                		this.balloon.body.velocity.setTo(100, 0);
	                		this.balloon.y = this.balloon.height/2;
	                		this.group1.add(this.balloon);
	                	}
	                	else if (j == 1)
	                	{
	                		this.balloon.body.velocity.setTo(-100, 0);
	                		this.balloon.y = (this.balloon.height/2)+this.balloon.height;
	                		this.group2.add(this.balloon);
	                	}
	                	else if (j == 2)
	                	{
	                		this.balloon.body.velocity.setTo(100, 0);
	                		this.balloon.y = (this.balloon.height/2)+(this.balloon.height*2);
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
 	console.log(this.player.body.debug);
};



function playerDead()
{
		music.destroy();
		game.cache.removeSound("backgrdSound");
		game.state.start("DeathState");
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


	if (this.game.physics.arcade.collide(this.tower, this.person))
 	{
		rotatingSpeed = -rotatingSpeed;
		rotating = true;
	}
	
 	if (this.game.physics.arcade.collide(this.tower2, this.person))
 	{
		rotatingSpeed = -rotatingSpeed;
		rotating = true;
	}


	//Rotate 
	if (rotating)
		this.person.angle += rotatingSpeed;
/*
	if (this.game.physics.ninja.collide(this.person, this.player))
	{
		var vector = findAngle(this.person.body.position, this.player.body.position);
		this.person.body.velocity.x *= vector[0]*2;
		this.person.animations.play("anim");
		rotating = false;
	}

		if (this.game.physics.ninja.collide(this.person, this.player))
	{
		var vector = findAngle(this.person.body.position, this.player.body.position);
		this.person.body.velocity.x *= vector[0]*2;
		this.person.animations.play("anim");
		rotating = false;
	}*/



	if (this.game.physics.arcade.collide(this.person, this.ground))
	{
			this.person.x= 300;
			this.person.y = 200;
	        this.person.body.velocity.setTo(90, -200);
			livesLeft = livesLeft-1;
			if(livesLeft==0)
				playerDead();
	}

	this.player.body.velocity.x = 0;
	 if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !Phaser.Rectangle.intersects(this.player, this.tower)) {
		
		this.player.body.moveLeft(700);
		this.player.play('left');
		if (this.player.body.angle > -45)
		{
			this.player.body.angle-= 5;
		}

		this.direction = -1;
	}
	else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !Phaser.Rectangle.intersects(this.player, this.tower2)){
		
		this.player.body.moveRight(700);
		this.player.play('left');
		if (this.player.body.angle < 45)
		{
			this.player.body.angle+= 5;
		}
		this.direction = 1;
	}
	else
	{
		this.direction = 0;
		this.player.body.angle = 0;
	}

	
	if (Phaser.Rectangle.intersects(this.player.getBounds(), this.person.getBounds()))
	{
		if (haveLeftPlayerHitbox)
		{		
			if (this.direction == 1 ||this.direction == -1)
			{	
				var closestPoint = new Phaser.Point();

				contactPoint = this.player.position;

				var oneSide= new Phaser.Point();
				oneSide.x = contactPoint + this.player.width/2*this.direction;
				oneSide.y = contactPoint + this.player.height*this.direction;


				var otherSide= new Phaser.Point();
				oneSide.x = contactPoint + this.player.width/2*this.direction;
				oneSide.y = contactPoint + this.player.height*this.direction;

				var closestDistance = game.physics.arcade.distanceBetween(contactPoint, this.person);
				var competingDistance = game.physics.arcade.distanceBetween(otherSide, this.person);
				if(closestDistance > competingDistance)
					closestDistance = competingDistance;
				var competingDistance = game.physics.arcade.distanceBetween(oneSide, this.person);
				if(closestDistance > competingDistance)
					closestDistance = competingDistance;

				var length = game.physics.arcade.distanceBetween(closestDistance, this.person.position);
				if (length < (this.player.height+this.person.height))
				{					
					var contactPoint = new Phaser.Point();
					contactPoint.x = this.person.position.x+(this.person.width*this.direction);
					contactPoint.y = this.person.position.y+this.person.height;
					var vector = findAngle(contactPoint, this.person.position);
					this.person.body.velocity.setTo(((this.person.body.velocity.x*vector[0])*2),-this.person.body.velocity.y*vector[1]*1.1);
				}

			}
			else
			{
				var vector = findAngle(this.player.position, this.person.position);
				this.person.body.velocity.setTo((this.person.body.velocity.x),-this.person.body.velocity.y*1.5);

			}
			haveLeftPlayerHitbox = false;}
	}
	else
		haveLeftPlayerHitbox = true;

	for (var i = 0; i < this.group1.length; i++)
	{
		if (this.group1.children[i].x > game.width)
		{
			this.group1.children[i].x = -20;
		}
		if (this.game.physics.arcade.collide(this.person, this.group1.children[i]))
		{
			var vector = findAngle(this.person.body.position, this.group1.children[i].position);
			this.person.body.velocity.x *= vector[0];
			this.group1.remove(this.group1.children[i]);
			rotating = true;
			return;
		}
	}

	for (var i = 0; i < this.group2.length; i++)
	{
		if (this.group2.children[i].x < 0)
		{
			this.group2.children[i].x = game.width+25;
		}

		if (this.game.physics.arcade.collide(this.person, this.group2.children[i]))
		{
			var vector = findAngle(this.person.body.position, this.group2.children[i].position);
			this.person.body.velocity.x *= vector[0];
			this.group2.remove(this.group2.children[i]);
			rotating = true;
			return;
		}
	}

	for (var i = 0; i < this.group3.length; i++)
	{
		if (this.group3.children[i].x > game.width)
		{
			this.group3.children[i].x = -20;
		}
		if (this.game.physics.arcade.collide(this.person, this.group3.children[i]))
		{
			var vector = findAngle(this.person.body.position, this.group3.children[i].position);
			this.person.body.velocity.x *= vector[0];
			this.group3.remove(this.group3.children[i]);
			rotating = true;
			return;
		}
	}

	if (this.person.body.velocity.x > 1500)
			this.person.body.velocity.x = 1500;
	if (this.person.body.velocity.y > 1500)
		this.person.body.velocity.y = 1500;
	
	//this.livesText.setText("LIVES: "+ livesLeft);
 }

