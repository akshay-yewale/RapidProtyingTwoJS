var RapidPrototyping = RapidPrototyping || {};
 
RapidPrototyping.DeathState = function(){
	
};
var music;

RapidPrototyping.DeathState.prototype = {

	preload:function(){
			console.log("Preloading assets of deathScreen");
			this.load.image("deathScreenBckgrd","Content/Images/deathScreen.png");
			this.load.image("replaybutton","Content/Images/replaybutton.png");
			this.game.load.audio("deathSound","Content/Sound/deathsound.mp3");
	},


  	create: function(){
  		console.log("%cStarting game title", "color:white; background:red");
		this.add.image(0,0,"deathScreenBckgrd");
  		var replayButton = this.add.button(900,720,"replaybutton",this.replayTheGame,this);
		replayButton.anchor.setTo(0.5,0.5);
		music= game.add.audio("deathSound");
				music.volume=0.5;
				music.play();

	},
	replayTheGame: function(){
			startGame = true;
			//alert("Start the game!!");	
			music.destroy();
			game.cache.removeSound("deathSound");
			this.state.start("GameState");
	}
}

