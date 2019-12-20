// Khai bao doi tuong bird
let Bird= function (game) {
    this.game = game; // de co the lay cac tham so cua game nhu width, height...
    this.birdImages = [];
    this.midFlapImage = false; // check midFlapImage loaded or not
    this.upFlapImage = false; // check upFlapImage loaded or not
    this.downFlapImage = false; // check downFlapImage loaded or not
    this.positionChange=false;
    let k=0;
    this.currentFrame = 0;
    this.currentImageIndex = 0;
    this.currentImage = null;
    this.direction = 'down';
    this.bWidth = 34;
    this.bHeight = 24;
    this.bX = 72; // toa do x cua Bird
    this.bY=  247; // toa do y cua Bird
    this.degree= Math.PI/180;
    this.initDegree = 0;
    this.rotation= [];
    this.rotation[0]= {
        rotation: this.initDegree
    };
    this.flapY= 0;
    this.gravity=5;

    let self = this;

    // moi vi tri deu cap nhat lai doi tuong bird
    this.init = function () {
        self.loadImage();
    };
    // khoi tao anh Bird theo cac trang thai khi Flap gom "midFlap-upFlap-downFlap"
    this.loadImage = function () {
        let midFlapImage = new Image();
        let upFlapImage = new Image();
        let downFlapImage = new Image();

        midFlapImage.onload = function () {
            self.midFlapImage = true;
            //console.log('midFlapImage loaded');
            self.birdImages.push(midFlapImage);
        };
        upFlapImage.onload = function () {
            self.upFlapImage = true;
            //console.log('upFlapImage loaded');
            self.birdImages.push(upFlapImage);
        };
        downFlapImage.onload = function () {
            self.downFlapImage = true;
            //console.log('downFlapImage loaded');
            self.birdImages.push(downFlapImage);
        };

        midFlapImage.src = 'yellowbird-midflap.png';
        upFlapImage.src = 'yellowbird-upflap.png';
        downFlapImage.src = 'yellowbird-downflap.png';

    };
    // thay doi trang thai bird khi flap "midFlap-upFlap-downFlap"
    this.update = function () {
        //console.log('bird update');
        if (!self.midFlapImage || !self.upFlapImage || !self.downFlapImage){
            return;
        }
        self.currentFrame++;
        if(self.currentFrame %5==0) {
            self.changeImage();
        }
    };
    //Moi trang thai Bird khi flap la 5 frame sau do se thay doi trang thai midFlap->upFlap-downFlap
    this.changeImage= function(){
        if(this.game.gameOver && self.positionChange==true)
            return;
        if(self.currentImageIndex==2) {
            self.currentImageIndex = 0;
        }
        else {
            self.currentImageIndex++;
        }
        k=self.currentImageIndex;
        self.currentImage= self.birdImages[k];
        //cap nhat vi tri cua Bird
        if(self.positionChange==true) {
            if (self.bY <= 480) {
                if (self.direction == 'down') {
                    self.flapY += self.gravity;
                    self.initDegree = 0;
                    self.rotation.push({
                        rotation: self.initDegree
                    });
                } else {
                    self.flapY -= self.gravity;
                    let audio = new Audio("fly-sound.mp3");
                    self.flap();
                    audio.play();
                    self.direction = 'down';
                }
                self.bY += self.flapY; // cap nhat vi tri cua bird
                this.game.checkGame.checkGameOver();
            }
        }
    };
    // ve Bird tren canvas
    this.draw = function () {
        if (self.midFlapImage && self.upFlapImage && self.downFlapImage) {
            self.game.context.save();
            self.game.context.translate(self.bX, self.bY);
            self.game.context.rotate(self.rotation[self.rotation.length - 1].rotation* self.degree);
            self.game.context.drawImage(self.birdImages[k], 0, 0);
            self.game.context.restore();
        }
    };

    // Moi khi click vao canvas se thiet lap buoc nhay cua bird khi bay len
    this.flap= function(){
        this.game.click = true;
        if(this.game.gameOver)
            return;
        self.flapY= -15;
    };


};

