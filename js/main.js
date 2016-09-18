var GameState = function(game) {
  };


//global variables

var livesText;
var livesLeft;
var group1;
var group2;
var group3;
var numberOfBalloons = 37;

  GameState.prototype.preload = function() {

  		  this.game.load.image('playerObject','Content/Images/personObject.png');
  		  this.game.load.image('background','Content/Images/gamePlayBackground.png');
  		  this.game.load.image('ground','Content/Images/ground.png');
  		  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json');
  		  this.game.load.image('balloon','Content/Images/Balloon.png');

  };

GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				
				this.GRAVITY = 500;
			  	game.stage.backgroundColor = "#4488AA";
				game.physics.startSystem(Phaser.Physics.ARCADE);

				//adding player object to screen
				this.player = this.game.add.sprite(75,75,'playerObject');
				this.player.anchor.setTo(0.5,0.5);
				this.player.angle=0;
				this.player.x= 450;
				this.player.y = 750;
				
			
				this.game.input.keyboard.addKeyCapture([
          				Phaser.Keyboard.LEFT,
          				Phaser.Keyboard.RIGHT
          				]);
				game.physics.enable(this.player,Phaser.Physics.ARCADE);
 				game.physics.arcade.gravity.y = this.GRAVITY;

 				this.player.body.allowGravity=false;
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
				//not working 


};


function updateUI()
{

	//Change color
		livesText= game.add.text(10,0,'LIVES LEFT : '+livesLeft, { font: "37px Arial", fill: "#000000" });	
		this.livesText.setText("Fuel: " + livesLeft);

};

 GameState.prototype.update = function() {

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
 		}
 		else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				this.player.body.velocity.x = 1000;
 		}

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




var game = new Phaser.Game(1820, 820, Phaser.AUTO, 'game');
  game.state.add('game', GameState, true);

  window.focus();