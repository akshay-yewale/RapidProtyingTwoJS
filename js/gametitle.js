var RapidPrototyping = RapidPrototyping || {};
 
RapidPrototyping.GameTitle = function(){
	startGame = false;
};
 
RapidPrototyping.GameTitle.prototype = {

	preload:function(){
			console.log("Preloading assets of gametitle");
			this.load.image("titleScreenBckgrd","Content/Images/titleScreen.png");
			this.load.image("playbutton","Content/Images/playbutton.png");
			
	},


  	create: function(){
  		console.log("%cStarting game title", "color:white; background:red");
		this.add.image(0,0,"titleScreenBckgrd");

  		var playButton = this.add.button(160,320,"playbutton",this.playTheGame,this);

		playButton.anchor.setTo(0.5,0.5);

	},
	playTheGame: function(){
		if(!startGame){
			startGame = true;
			alert("Start the game!!");	
			this.state.start("GameState");
		}
	}
}

var game = new Phaser.Game(1820, 820, Phaser.AUTO, 'game');
  game.state.add('GameTitle', RapidPrototyping.GameTitle);
  game.state.add('GameState',RapidPrototyping.GameState);
  game.state.add('DeathState',RapidPrototyping.DeathState);
  game.state.start("GameTitle");
  window.focus();