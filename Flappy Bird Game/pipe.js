// khai bao doi tuong pipe
let Pipe= function (game) {
    this.game= game; // de truy xuat context trong frame "game"
    this.pipeUp= null;
    this.pipeDown= null;
    this.loaded= false;
    this._pipe=[];
    this.score = [];
    this.pHeight= 320; // chieu cao cua pipe
    this.pWidth = 52;
    //this.Y=0;
    this.X=0;
    this.countScore= 0;
    this.scorePosX=10;
    this.scorePosY= 20;
    this.STEP=2;
    // khoi tao chieu cao
    this._pipe[0] = {
        pX : this.game.canvas.width,
        pY: 0,
    };

    this.score[0]={
        realScore: this.countScore
    };

    this.gap= 115; // Khoang cach khe ho giua hai pipe
    this.constant= this.pHeight + this.gap;
    // toa do cua pipeUp se la pipeUp = this.pY + this.constant

    let self= this;

    this.init= function(){
        self.loadImage();
        self.displayScore();
    };
    //khoi tao anh pipe trong canvas
    this.loadImage= function(){
        self.pipeDown= new Image();  // ham Image() la ham co san trong javascript
        self.pipeDown.onload= function () {
            self.loaded= true;
            console.log('image loaded');
        };
        self.pipeDown.src= 'pipe-down.png';
        self.pipeUp= new Image();  // ham Image() la ham co san trong javascript
        self.pipeUp.onload= function () {
            self.loaded= true;
            console.log('image loaded');
        };
        self.pipeUp.src= 'pipe-up.png';
    };
    // Cap nhat pipe
    this.update= function () {
        //console.log('Update background');
        if(this.game.gameOver)
            return;
        for(let i= 0; i< this._pipe.length; i++) {
            self._pipe[i].pX -=self.STEP;
            if (self._pipe[i].pX == 50) {
                self._pipe.push({
                    pX: this.game.canvas.width,
                    pY: Math.floor(Math.random() * self.pHeight) - self.pHeight,
                });

            }
            self.X= self._pipe[i].pX;
            // check collision
            if ((this.game.bird.bX + this.game.bird.bWidth >= self.X) && (this.game.bird.bX <= self.X+ self.pWidth)&&
                (this.game.bird.bY <= self._pipe[i].pY + self.pHeight || this.game.bird.bY + this.game.bird.bHeight >= self._pipe[i].pY + self.constant) ||
                ( this.game.bird.bY + this.game.bird.bHeight>= this.game.canvas.height - this.game.bs.baseHeight) )
            {
                this.game.checkGame.hitsound.play();
                this.game.checkGame.diesound.play();
                //console.log('OK MEN');
                let overgame =document.getElementById("startpausegame");
                this.game.gameOver = true;
                this.game.bird.bY = this.game.height - this.game.bs.baseHeight -this.game.bird.bHeight;
                this.game.bird.initDegree =0;
                overgame.value ="Game Over";
                this.game.checkGame.draw();
            }
            else if( this.game.bird.bX == this.X + this.pWidth){
                self.countScore++;
                self.score.push({
                    realScore: this.countScore
                });
                let audio = new Audio("score-sound.mp3");
                audio.play();
            }
        }
    };

    // Ve lai tat ca trang thai cua pipe moi khi update lai
    this.draw= function () {
        if(self.loaded==false)
            return;
        for(let i=0; i< self._pipe.length; i++) {
            self.game.context.drawImage(self.pipeDown, self._pipe[i].pX, self._pipe[i].pY);
            self.game.context.drawImage(self.pipeUp, self._pipe[i].pX, self._pipe[i].pY + self.constant);
        }
        self.displayScore();
    };

    // Hien thi diem so tren canvas
    this.displayScore=function()
    {
        this.game.context.font= "20px black";
        console.log("Score is:" + this.countScore);
        this.game.context.fillText("Score: " +  self.score[self.score.length-1].realScore, self.scorePosX,self.scorePosY);
    };



};