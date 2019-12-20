//Tao frame cho game
let Game =function () {
    this.canvas = null;
    this.context = null;
    this.width= 288;
    this.height= 512;
    this.checkGame = null;
    this.gameOver= true;
    this.click = false;
    let self= this;

    // start Game
    this.gameStart= function () {
        this.bird.positionChange=true;
        let startpausegame= document.getElementById('startpausegame');
        if(this.gameOver==false){
            self.gameOver=true;
            startpausegame.value="Pausing Game";
        }
        else {
            self.gameOver = false;
            startpausegame.value="Starting Game";
        }
    };

    //replay Game
    this.replayGame =function(){
        location.reload();
    };

    this.init=function(){
        self.canvas= document.createElement('canvas');
        self.context= self.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        self.canvas.width= this.width;// dat chieu rong canvas
        self.canvas.height= this.height; // dat chieu cao canvas
        // Tao mot tuong background trong frame
        this.bg= new bg(this);
        this.bg.init();

        // khoi tao base tren frame
        this.bs= new Base(this);
        this.bs.init();

        // khoi tao  pipe tren frame
        this.pipe= new Pipe(this);
        this.pipe.init();


        // khoi tao mot tuong bird trong frame
        this.bird= new Bird(this);
        this.bird.init();
        // khoi tao doi tuong de check trang thai game
        this.checkGame = new checkGameOver(this);

        self.mouseListener();
        self.repeatFrame();

    };
// tao vong lap vo han
    this.repeatFrame= function () {
        //console.log('loop');
        self.update();
        self.draw();
        setTimeout(self.repeatFrame, 33);
    };

    // tao su kien click chuot vao canvas
    this.mouseListener= function () {
        let audio = new Audio("fly-sound.mp3");
        this.canvas.addEventListener('click',function (){
            self.bird.direction='up';
            self.bird.initDegree = -10;
            self.bird.rotation.push({
                rotation: self.bird.initDegree
            });
            self.bird.flap();
            audio.play();
            console.log('click');
        })
    };

    // Sau moi frame ta se update lai toan bo doi tuong trong game
    this.update= function () {
        this.bg.update();
        this.pipe.update();
        this.bs.update();
        this.bird.update();
    };
    this.draw= function(){
        this.bg.draw();
        this.pipe.draw();
        this.bs.draw();
        this.bird.draw();
        this.checkGame.draw();
    };

};

let game = new Game();
game.init();


