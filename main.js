
    class Board {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.playing = false;
            this.gameOver = false;
            this.ball = null;
            this.bars = [];

        }
        getElements() {
            let elements = this.bars;
            elements.push(ball);
            return elements;

        }
    }
    


   class BoardView {
        constructor(board, canvas) {
            console.log(canvas);
            this.board = board;
            this.canvas = canvas;
            this.canvas.width = this.board.width;
            this.canvas.height = this.board.height;
            this.ctx = canvas.getContext("2d");

        }
    }


function main() {
    let canvas = document.querySelector("#pong");
    let board = new Board (800, 400);
    let boardView = new BoardView(board, canvas)
    
}
main();
