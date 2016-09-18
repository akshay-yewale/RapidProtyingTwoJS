var RapidPrototyping = RapidPrototyping || {};


RapidPrototyping.GameState = function(game) {
  };


//global variables

var livesText;
var livesLeft;
var music;

  RapidPrototyping.GameState.prototype.preload = function() {
  		console.log("Adding GameState. preload");
  		  this.game.load.image('playerObject','Content/Images/personObject.png');
  		  this.game.load.image('background','Content/Images/gamePlayBackground.png');
  		  this.game.load.image('ground','Content/Images/ground.png');
  		  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json');
  		  this.game.load.audio("backgrdSound","Content/Sound/bckgrdsound.mp3");

  };

RapidPrototyping.GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				
				this.GRAVITY = 30;
			  	game.stage.backgroundColor = "#4488AA";
				//adding player object to screen
				this.player = this.game.add.sprite(75,75,'playerObject');
				this.player.anchor.setTo(0.5,0.5);
				this.player.angle=0;
				this.player.x= 450;
				this.player.y = 750;
			
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
      			//this.person.body.checkCollision.up = true;
				this.person.body.bounce.setTo(1,1);


				//this.game.time.advancedTiming = true;
				// adding text to screen
				livesLeft = 10;
				//not working 
				livesText= game.add.text(500,500,'LIVES LEFT : '+livesLeft, { font: "37px Arial", fill: "#4488AA" });

				music= game.add.audio("backgrdSound");
				music.loop = true;
				music.volume=0.2;
				music.play();

};


function updateUI()
{

	//not working
		livesText= game.add.text(10,10,'LIVES LEFT : '+livesLeft, { font: "20px Arial", fill: "#4488AA" });	
		this.livesText.setText("Fuel: " + livesLeft);
};


function playerDead()
{
		music.destroy();
		game.cache.removeSound("backgrdSound");
		game.state.start("DeathState");
}

 RapidPrototyping.GameState.prototype.update = function() {

		game.physics.arcade.collide(this.person,this.player);
 		 if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
 			//this.player.body.velocity.setTo(-40, 0);
 			this.player.x-=2;
 		}
 		else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
 		  	//this.player.body.velocity.setTo(40,0);
 		  	this.player.x+=2;
 		  	// implement additional speed variation in game
 		}
 		else if(this.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			playerDead();
		}			
 		this.person.body.velocity.y=+50;
 		updateUI();
 }



