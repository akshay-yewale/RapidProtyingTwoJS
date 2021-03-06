var RapidPrototyping = RapidPrototyping || {};
 
RapidPrototyping.GameTitle = function(){
	startGame = false;
};
 
RapidPrototyping.GameTitle.prototype = {

	preload:function(){
			console.log("Preloading assets of gametitle");
			this.load.image("titleScreenBckgrd","Content/Images/titleScreen.png");
			this.load.image("playbutton","Content/Images/PressStart.png");
			this.load.image("fireRescue","Content/Images/firerescuelogo.png");
	},


  	create: function(){
  		console.log("%cStarting game title", "color:white; background:red");
		this.background = this.add.image(0,0,"titleScreenBckgrd");
		this.background.scale.set(2);
		this.fireRescueLogo = this.add.image(0,0,"fireRescue");
		this.fireRescueLogo.x = 600;
		this.fireRescueLogo.y = 50;
		this.fireRescueLogo.scale.set(2);
  		var playButton = this.add.button(880,740,"playbutton",this.playTheGame,this);
  		playButton.scale.setTo(2.5, 2.5);
		playButton.anchor.setTo(0.5,0.5);

	},
	playTheGame: function(){
		if(!startGame){
			startGame = true;
			this.state.start("GameState");
		}
	}
}

var game = new Phaser.Game(1820, 920, Phaser.AUTO, 'game');
  game.state.add('GameTitle', RapidPrototyping.GameTitle);
  game.state.add('GameState',RapidPrototyping.GameState);
  game.state.add('DeathState',RapidPrototyping.DeathState);
  game.state.start("GameTitle");
  window.focus();