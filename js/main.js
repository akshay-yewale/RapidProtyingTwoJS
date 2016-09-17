var GameState = function(game) {
  };


//global variables

var livesText;
var livesLeft;

  GameState.prototype.preload = function() {

  		  this.game.load.image('playerObject','Content/Images/personObject.png');
  		  this.game.load.image('background','Content/Images/gamePlayBackground.png');
  		  this.game.load.image('ground','Content/Images/ground.png');
  		  this.game.load.atlas('person', 'Content/Images/personObject.png', 'Content/Images/fallingman.json');

  };

GameState.prototype.create = function() {
//				game.add.sprite(0,0,'background');
				
				this.GRAVITY = 300;
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
				this.person.y = 20;

     			this.person.body.allowGravity=true;
		      	this.person.body.collideWorldBounds = true;
                this.person.body.velocity.setTo(90, 240);
      			//this.person.body.checkCollision.up = true;
				this.person.body.bounce.setTo(1.01);


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

function dotproduct(a, b)
{
            return (a.x * b.x) + (a.y * b.y);
}

 GameState.prototype.update = function() {

		if (game.physics.arcade.collide(this.person,this.player))
		{
			var norma = new Phaser.Point(); 
			norma = (this.person.body.position.x - this.player.body.position.x, this.person.body.position.y - this.player.body.position.y);
			norma.normalize();
		}
		if (game.physics.arcade.collide(this.person,this.ground))
		{
				this.person.body.velocity.setTo(0, 0);
				this.person.game.physics.enable(false);
		}


		this.player.body.velocity.x = 0;
 		 if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
 			this.player.body.velocity.x = -300;
 		}
 		else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				this.player.body.velocity.x = 300;
 		}

 		  
 		updateUI();
 }




var game = new Phaser.Game(1820, 820, Phaser.AUTO, 'game');
  game.state.add('game', GameState, true);

  window.focus();