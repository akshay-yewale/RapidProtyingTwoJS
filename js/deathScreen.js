var RapidPrototyping = RapidPrototyping || {};
 
RapidPrototyping.DeathState = function(){
	
};
var music;

RapidPrototyping.DeathState.prototype = {

	preload:function(){
			console.log("Preloading assets of deathScreen");
			this.load.image("deathScreenBckgrd","Content/Images/titleScreen.png");
			this.load.image("replaybutton","Content/Images/PressStart.png");
			this.game.load.audio("deathSound","Content/Sound/deathsound.mp3");
			this.load.image("fireRescue","Content/Images/firerescuelogo.png");
	},


  	create: function(){
  		console.log("%cStarting game title", "color:white; background:red");
		this.deathscreen = this.add.image(0,0,"deathScreenBckgrd");
		this.deathscreen.scale.set(2);
		this.fireRescueLogo = this.add.image(0,0,"fireRescue");
		this.fireRescueLogo.x = 600;
		this.fireRescueLogo.y = 50;
		this.fireRescueLogo.scale.set(2);
  		var playButton = this.add.button(880,740,"playbutton",this.playTheGame,this);
  		playButton.scale.setTo(2.5, 2.5);
		playButton.anchor.setTo(0.5,0.5);

		music= game.add.audio("deathSound");
				music.volume=0.5;
				music.play();

	},
	playTheGame: function(){
			startGame = true;
			//alert("Start the game!!");	
			music.destroy();
			game.cache.removeSound("deathSound");
			this.state.start("GameState");
	}
}

