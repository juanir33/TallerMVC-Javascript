(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.gameOver = false;
        this.ball = null;
        this.bars = [];
        this.playing = false;
    };
    self.Board.prototype = {
        get Elements() {
            let elements = this.bars.map((bar) => {
                return bar;
            });
            elements.push(this.ball);

            return elements;
        },
    };
})();
(function () {
    self.BoardView = function (board, canvas) {
        this.board = board;
        this.canvas = canvas;
        this.canvas.width = this.board.width;
        this.canvas.height = this.board.height;
        this.ctx = canvas.getContext("2d");
    };
    self.BoardView.prototype = {
        draw: function () {
            for (let index = this.board.Elements.length - 1; index >= 0; index--) {
                let element = this.board.Elements[index];

                draw(this.ctx, element);
            }
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        },
        
        checkCollision: function () {
            for (let i = this.board.bars.length - 1; i >= 0; i--) {
                let bars1 = this.board.bars[i];
                if (hite(bars1, this.board.ball)) {
                    this.board.ball.collision(bars1);
                }
            }
        },
        play: function () {
            if(this.board.playing){
            this.clear();
            this.draw();
            this.checkCollision();
            this.board.ball.move();}
        },
    };
    function draw(ctx, element) {
        switch (element.kind) {
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
(function () {
    self.Bar = function (x, y, width, height, board, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.speed = 15;
        this.color = color;

        this.kind = "rectangle";
    };

    self.Bar.prototype = {
        down: function () {
            this.y += this.speed;
            if (this.y + this.height / 2 >= this.board.height) {
                this.y = this.board.height - this.height / 2;
            }
        },
        up: function () {
            this.y -= this.speed;
            if (this.y <= 0) {
                this.y = this.height - this.height * 1.2;
            }
        },
    };
})();
(function () {
    self.Ball = function (x, y, radius, board, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.speedY = 1;
        this.speedX = 1;
        this.kind = "circle"; 
        board.ball = this;
        this.color = color;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;
        this.directionY = 1;
    };
    self.Ball.prototype = {
        move: function () {
            
            if(this.x  >= this.board.width){
                this.direction = -1;
            }
            if(this.x  <= 0){
                 this.direction = 1
            }
            
            if (this.y - this.radius <= 0) {
                this.directionY = 1;
            }
            if (this.y + this.radius >= this.board.height ) {
                this.directionY = -1;
            }
            this.x += this.speedX * this.direction;
            this.y += this.speedY * this.directionY;
            console.log(""+ball.x);
        },
        collision: function (bar) {
            var relative_intersect_y = bar.y + bar.height / 2 - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speedY = this.speed * -Math.sin(this.bounce_angle);
            this.speedX = this.speed * Math.cos(this.bounce_angle);
            //if (this.x > (this.board.width / 2)) this.direction = -1;
            //else this.direction = 1;
            
        },  
        get width(){
            return this.radius*2;

        },
        get height(){
            return this.radius*2;

        }
    };
})();

let canvas = document.querySelector("#pong");
let board = new Board(800, 400);
let bar = new Bar(3, 130, 23, 133, board, "tomato");
let bar1 = new Bar(774, 130, 23, 133, board, "green");
let ball = new Ball(350, 150, 10, board, "blue");

let boardV = new BoardView(board, canvas);
let hit = false;
function hite(a, b) {
     
    //Colisiones hirizontales
    if (b.x + b.radius >= a.x && b.x < a.x + a.width) {
        //Colisiona verticales
        if (b.y + b.radius >= a.y && b.y < a.y + a.height) hit = true;
    }

    //Colisión de a con b
    if (b.x <= a.x && b.x + b.radius >= a.x + a.width) {
        if (b.y <= a.y && b.y + b.radius >= a.y + a.height) hit = true;
    }

    //Colision b con a
    if (a.x <= b.x && a.x + a.width >= b.x + b.radius) {
        //Colisiona verticales
        if (a.y <= b.y && a.y + a.height >= b.y + b.radius) hit = true;
    }
    return hit;
}
document.addEventListener("keydown", handleKeyDown, false);

function handleKeyDown(e) {
    e.preventDefault();
    if (e.keyCode === 87) {
        bar.up();
        console.log("" + bar.y);
    } else if (e.keyCode === 79) {
        bar1.up();
        console.log("" + bar1.y);
    }
    if (e.keyCode === 88) {
        bar.down();
        console.log("" + bar.y);
    } else if (e.keyCode === 77) {
        bar1.down();
        console.log("" + bar1.y);
    }
    if(e.keyCode === 32){
        board.playing = !board.playing;
    }
}
window.requestAnimationFrame(main);
function main() {
    window.requestAnimationFrame(main);
    boardV.play();
}
