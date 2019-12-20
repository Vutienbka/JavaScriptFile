//khai bao doi tuong kiem tra trang thai game
function checkGameOver(game) {
    this.game = game;
    this.gameOverImage = null;
    this.loaded = false;
    this.hitsound= new Audio();
    this.diesound = new Audio();
    let self = this;
    this.hitsound.src='hit-sound.mp3';
    this.diesound.src='birddie -sound.mp3';
    // khoi tao hinh anh "Game Over" va ve len canvas
    this.draw = function(){
        if(this.game.gameOver == true &&(this.game.bird.bY >= this.game.height - this.game.bs.baseHeight -this.game.bird.bHeight)) {
            self.gameOverImage = new Image();
            self.gameOverImage.onload = function () {
                self.loaded = true;
                console.log("gameover is loaded");
            };
            self.gameOverImage.src = 'gameover.png';
            if (self.loaded == true)
                this.game.context.drawImage(self.gameOverImage, 50, 230);
        }
    };
    // kiem tra Bird da va cham vao pipe hay base chua
    this.checkGameOver= function(){
        let overgame = document.getElementById('startpausegame');
        if(this.game.bird.bY >= this.game.height - this.game.bs.baseHeight) {
            this.game.gameOver = true;
            self.hitsound.play();
            self.diesound.play();
            overgame.value= "Game Over";
            this.game.bird.bY = this.game.height - this.game.bs.baseHeight-this.game.bird.bHeight;
            this.game.bird.initDegree= 0;
        }
    };


}