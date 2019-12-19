//Khai bao doi tuong Background
let bg= function (game) {
    this.game= game; // de truy xuat context trong frame "game"
    this.backgroundImage= [];
    this.backgroundImage[0]=null;
    this.backgroundImage[1]=null;
    this.loaded= false;
    this.x =0;
    let self= this;

    this.init= function(){
        self.loadImage();
    };

    this.loadImage= function(){

        self.backgroundImage[0]= new Image();  // ham Image() la ham co san trong javascript
        self.backgroundImage[0].onload= function () {
            self.loaded= true;
            console.log('backgroundImage loaded');
        };
        self.backgroundImage[0].src= 'background-day.png';

        self.backgroundImage[1]= new Image();  // ham Image() la ham co san trong javascript
        self.backgroundImage[1].onload= function () {
            self.loaded= true;
            console.log('getReadyImage loaded');
        };
        self.backgroundImage[1].src= 'flappyBirdgetReady.png';
    };
    // update background
    this.update= function () {
        //console.log('Update background');
        if(this.game.gameOver)
            return;
        self.x--;
        if(self.x== -288)
            self.x= 0;
    };
    // ve lai background moi khi update
    this.draw= function () {
        if(self.loaded==false)
            return;
        if(self.game.gameOver==true&&self.game.bird.positionChange==false)
            self.game.context.drawImage(this.backgroundImage[1],0,0);
        else {
            self.game.context.drawImage(this.backgroundImage[0], this.x, 0);
            self.game.context.drawImage(this.backgroundImage[0], this.x + 288, 0);
        }
    };
};