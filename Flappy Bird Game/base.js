// va background

let base= function (game) {
    this.game= game; // de truy xuat context trong frame "game"
    this.image= null;
    this.loaded= false;
    this.baseX =0;
    this.baseWidth = 336;
    this.baseHeight= 112;

    let self= this;

    this.init= function(){
        this.loadImage();
    };

    this.loadImage= function(){

        this.image= new Image();  // ham Image() la ham co san trong javascript
        this.image.onload= function () {
            self.loaded= true;
           // console.log('image loaded');
        };
        self.image.src= 'base.png';
    };

    this.update= function () {
        //console.log('Update background');
        if(this.game.gameOver)
            return;
        this.baseX-=3;
        if(this.baseX== -this.baseWidth)
            this.baseX= 0;
    };

    this.draw= function () {
        if(this.loaded==false)
            return;
        self.game.context.drawImage(this.image,this.baseX, this.game.height - this.baseHeight);
        self.game.context.drawImage(this.image,this.baseX + this.game.width, this.game.height - this.baseHeight);
    };
};