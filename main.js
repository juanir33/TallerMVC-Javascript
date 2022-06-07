(function() {
    self.Board = function(width, height) {
         this.width = width;
         this.height = height;
         this.playing = false;
         this.gameOver = false;
         this.ball = null;
         this.bars = []; 

    }
    self.Board.prototype = {
        get Elements(){
            let elements = this.bars.map(bar => {return bar});
           elements.push(this.ball);
            
        return elements;

        }
    }
    
})();
(function(){
    self.BoardView = function(board, canvas){
        this.board = board;
        this.canvas = canvas;
        this.canvas.width = this.board.width;
        this.canvas.height = this.board.height;
        this.ctx = canvas.getContext("2d");
       
    }
    self.BoardView.prototype={
        draw: function(){
            
            for (let index = (this.board.Elements.length - 1); index >= 0 ; index--) {
              let element = this.board.Elements[index];
              
              draw(this.ctx, element)
                
            }
        },
        clear: function(){
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        },
        play: function(){
            this.clear();
            this.draw();
            this.board.ball.move();
        }
    }
    function draw(ctx, element) {
        
      
        switch(element.kind){
            
            case "rectangle":
                ctx.fillStyle = element.color;
                
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
           case "circle":
                    
                    ctx.beginPath();
                    ctx.fillStyle = element.color;
                    ctx.arc(element.x, element.y, element.radius, 0, 7);
                    ctx.fill();
                    ctx.closePath();
                    break;
        }
        
    }
})();
(function(){
    self.Bar = function(x, y, width, height, board, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.speed = 10;
        this.color = color;

        this.kind = "rectangle"
    }

        self.Bar.prototype ={
            down: function(){
                this.y += this.speed;
                if(this.y + this.height/2 >= this.board.height){
                    this.y = this.board.height - this.height/2;
                }
                

            },
            up: function(){
                this.y -= this.speed; 
                if(this.y <= 0){
                    this.y = this.height - this.height*1.2;
                }

            }

       }
        


    
})();
(function(){
    self.Ball = function(x, y, radius, board, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.speedY = 0.4;
        this.speedX = 1;
        this.kind = 'circle';
        board.ball = this;
        this.color = color;
        this.direction = -1;
        


    }
   self.Ball.prototype = {
       move: function(){
           //this.x += (this.speedX * this.direction);
           if(this.y - this.radius <= 0 ){
               this.direction = 1;
             }
             if(this.y + this.radius >= this.board.height){
                  this.direction = -1;
             }
             this.y += this.speedY * this.direction;
             //console.log(""+ball.y);
             
            }
        }})();


    let canvas = document.querySelector("#pong");
    let board = new Board (800, 400);
    let bar = new Bar (3, 130, 23, 133, board, "tomato");
    let bar1 = new Bar (774, 130, 23, 133, board, "green");
    let ball = new Ball (350, 150, 10, board, "blue");
    
    let boardV =  new BoardView(board, canvas);


document.addEventListener("keydown", handleKeyDown, false);
//document.addEventListener("keyup", handleKeyUp, false);
function handleKeyDown(e){
    e.preventDefault();
    if(e.keyCode === 87){
        bar.up();
        console.log(""+bar.y);

    }else if(e.keyCode === 79){
        bar1.up();
       console.log(""+bar1.y);
    }
    if(e.keyCode === 88){
        bar.down();
        console.log(""+bar.y);

    }else if(e.keyCode === 77){
        bar1.down();
       console.log(""+bar1.y);
    }

}
   window.requestAnimationFrame(main) 
function main() {
   
    window.requestAnimationFrame(main);
    boardV.play();
    
}


