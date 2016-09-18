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
var right;

var numberOfBalloons = 37;

RapidPrototyping.GameState.prototype.preload = function() {
  		console.log("Adding GameState. preload");
  		  //this.game.load.image('playerObject','Content/Images/personObject.png');
  		  this.game.load.spritesheet('playerObject','Content/Images/playerSpritePNG.png.',37,45,18); 
  		  this.game.load.image('background','Content/Images/gamePlayBackground.png');
  		  this.game.load.image('ground','Content/Images/ground.png');
  		  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json');
  		  this.game.load.spritesheet('player')
  		  this.game.load.audio("backgrdSound","Content/Sound/bckgrdsound.ogg");
  		  this.game.load.image('balloon','Content/Images/Balloon.png');
  };

RapidPrototyping.GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				console.log("Adding GameState. create");

				this.GRAVITY = 500;
			  	game.stage.backgroundColor = "#4488AA";

				game.physics.startSystem(Phaser.Physics.ARCADE);

				//adding player object to screen
				this.player = this.game.add.sprite(75,75,'playerObject',1);
				this.player.scale.set(4);
				this.player.anchor.setTo(0.5,0.5);
				this.player.angle=0;
				this.player.x= 450;
				this.player.y = 750;
			
				left =this.player.animations.add('left',[1,2,3,4],10,true);				
				right =this.player.animations.add('right',[6,7,8],10,true);
				left.enableUpdate = true;
    			right.enableUpdate = true;

				this.game.input.keyboard.addKeyCapture([
          				Phaser.Keyboard.LEFT,
          				Phaser.Keyboard.RIGHT,
          				Phaser.Keyboard.UP
          				]);
				game.physics.enable(this.player,Phaser.Physics.ARCADE);
 				game.physics.arcade.gravity.y = this.GRAVITY;

 				this.player.body.allowGravity=false;
 				//this.player.body.immovable=false;
 				this.player.collideWorldBounds = true;
 				this.player.body.collideWorldBounds = true;
 				this.player.body.immovable = true;

				
				// adding ground blocks
 				this.ground = this.game.add.group();
      			for(var x = 0; x < this.game.width; x += 32) {
          		// Creating multiple ground blocks, and enabling physics on each of them.
          			var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
          			this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
	          		groundBlock.body.immovable = true;
	          		groundBlock.body.allowGravity = false;
          	   		this.ground.add(groundBlock);
      			}

				// adding persons into scene
				this.person= game.add.sprite(75,75,'playerObject');
				this.person.anchor.setTo(0.5,0.5);
				game.physics.enable(this.person,Phaser.Physics.ARCADE);
				this.person.x= 200;
				this.person.y = 20;
				this.person.body.immovable = false;
     			//this.person.body.allowGravity=true;
		      	
		      	this.person.collideWorldBounds = true;
      			//this.person.body.checkCollision.down = true;
				this.person.y = 200;
     			this.person.body.allowGravity=true;
		      	this.person.body.collideWorldBounds = true;
                this.person.body.velocity.setTo(90, 240);
      			//this.person.body.checkCollision.up = true;
				this.person.body.bounce.setTo(1.05);

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
						
						
						game.physics.enable(this.balloon,Phaser.Physics.ARCADE);
		 				game.physics.arcade.gravity.y = this.GRAVITY;

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



				//this.game.time.advancedTiming = true;
				// adding text to screen
				livesLeft = 10;
				music= game.add.audio("backgrdSound");
				music.loop = true;
				music.volume=0.3;
				music.play();

};


function updateUI()
{

	//Change color
		livesText= game.add.text(10,0,'LIVES LEFT : '+livesLeft, { font: "37px Arial", fill: "#000000" });	
		this.livesText.setText("LIVES"+ livesLeft);
};


function playerDead()
{
		music.destroy();
		game.cache.removeSound("backgrdSound");
		game.state.start("DeathState");
}

function dotproduct(a, b)
{
            return (a.x * b.x) + (a.y * b.y);
}

 RapidPrototyping.GameState.prototype.update = function() {

		if (game.physics.arcade.collide(this.person,this.player))
		{
			//var addedSpeed = this.player.body.velocity.x;
			//if (addedSpeed < 0)
			//	addedSpeed *=-1;
			//this.person.body.velocity.x -= addedSpeed/5;

			//this.person.body.velocity.y -= addedSpeed/5;

			var vector = [this.person.body.position.x - this.player.body.position.x, this.person.body.position.y - this.player.body.position.y];
			var length = Math.sqrt((vector[0]*vector[0])+ (vector[1]*vector[1]));
			if (length < 0)
				length *= -1;

			vector[0] /=length;
			vector[1] /=length;

			this.person.body.velocity.x *= -vector[0];
			this.person.body.velocity.y	*= -vector[1];
		}
		if (game.physics.arcade.collide(this.person,this.ground))
		{
				this.person.body.velocity.setTo(0, 0);
				this.person.game.physics.enable(false);
		}


		this.player.body.velocity.x = 0;
 		 if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
 			this.player.body.velocity.x = -1000;
 			this.player.play('left');
 		}
 		else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				this.player.body.velocity.x = 1000;
 				this.player.play('right');
 		}

 		// this is placeholder to decide deadstate
 		else if(this.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			this.player.animations.stop();
			playerDead();
		}			
 		this.person.body.velocity.y=+50;

	 		for (var i = 0; i < this.group1.length; i++)
	 		{
	 			if (this.group1.children[i].x > game.width)
	 			{
	 				this.group1.children[i].x = -20;
	 			}
	 			if (game.physics.arcade.collide(this.person,this.group1.children[i]))
	 			{
	 				this.group1.remove(this.group1.children[i]);
	 				return;
	 			}
	 		}
	 		for (var i = 0; i < this.group2.length; i++)
	 		{
	 			if (this.group2.children[i].x < 0)
	 			{
	 				this.group2.children[i].x = game.width+25;
	 			}

	 			if (game.physics.arcade.collide(this.person,this.group2.children[i]))
	 			{
	 				this.group2.remove(this.group2.children[i]);
	 				return;
	 			}
	 		}
	 		for (var i = 0; i < this.group3.length; i++)
	 		{
	 			if (this.group3.children[i].x > game.width)
	 			{
	 				this.group3.children[i].x = -20;
	 			}
	 			if (game.physics.arcade.collide(this.person,this.group3.children[i]))
	 			{
	 				this.group3.remove(this.group3.children[i]);
	 				return;
	 			}
	 		}

 		  
 		updateUI();
 }

