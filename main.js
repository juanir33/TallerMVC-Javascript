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
            let elements = this.bars;
           //elements.push(this.bars);
            
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
            
            for (let index =0;  this.board.Elements.length - 1 > index ; index++) {
              let element = this.board.Elements[index];
              
              draw(this.ctx, element)
                
            }
        }
    }
    function draw(ctx, element) {
       
        if(element !== null && element.hasOwnProperty("kind")){
        switch(element.kind){
            
            case "rectangle":
                
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
        }
        }
    }
})();
(function(){
    self.Bar = function(x, y, width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.speed = 10;

        this.kind = "rectangle"
    }

        self.Bar.prototype ={
            down: function(){
                this.y += this.speed;
                

            },
            up: function(){
                this.y -= this.speed; 

            }

       }
        


    
})();
    let canvas = document.querySelector("#pong");
    let board = new Board (800, 400);
    let bar = new Bar (12, 130, 12, 33, board);
    let bar1 = new Bar (500, 130, 23, 33, board);
    
    let boardV =  new BoardView(board, canvas);
document.addEventListener("keydown", handleKeyDown);
//document.addEventListener("keyup", handleKeyUp, false);
function handleKeyDown(e){
    console.log(e);
    if(e.target.keyCode === 87){
        bar.up();
        console.log(this.yw);

    }

}
    
function main() {
    
    boardV.draw();

    
}

window.addEventListener("load", main);

(function(){})();