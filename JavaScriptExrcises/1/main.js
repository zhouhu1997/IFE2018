// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// Create ball object
function Ball(x, y, velX, velY, exist, color, size) {
    Shape.call(this, x, y, velX, velY, exist);
    this.color = color;
    this.size = size;
  }

  // Create shape object
  function Shape(x, y, velX, velY, exist){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.exist = exist;
  }

  // Create evil object
  function EvilCircle(x, y, velX, velY, exist, color, size){
      Shape.call(this, x, y, velX, velY, exist);
      this.color = color;
      this.size = size;
  }

  var F = function(){};
  F.prototype = Shape.prototype;
  Ball.prototype = new F();
  Ball.prototype.constructor = Ball;

  


  // Draw the ball
  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Draw the evil ball
  

  // Check bound
  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }


  Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }


  var F = function(){};
  F.prototype = Shape.prototype;
  EvilCircle.prototype = new F();
  EvilCircle.prototype.constructor = EvilCircle;

  // Draw the evil cricle
  EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Check bound
  EvilCircle.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.x = (width- this.size)/2;
      }
    
      if ((this.x - this.size) < 0) {
        this.x = (width- this.size)/2;
      }
    
      if ((this.y + this.size) >= height) {
        this.y = (height- this.size)/2;
      }
    
      if ((this.y - this.size) < 0) {
        this.y = (height- this.size)/2;
      }
    

  }

  EvilCircle.prototype.setControll = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 65) {
          _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
          _this.x += _this.velX;
        } else if (e.keyCode === 87) {
          _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
          _this.y += _this.velY;
        }
      }
  }

  
  EvilCircle.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if( balls[j].exist ) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
      
            if (distance < this.size + balls[j].size) {
                balls[j].exist = false;
                console.log('false');
                marks++;
                ballCount.textContent = "Ball Count: "+marks+" and Ball remind: "+(numberOfBalls - marks);
            }
      }
    }
  }
 
  var balls = [];
  var marks = 0;
  var ballCount = document.getElementById("ball-count");
  var numberOfBalls = 0;
  ballCount.textContent = "Ball Count: 0 and Ball remind: 19";


  var evilCircle = new EvilCircle(
    random(0,width),
    random(0,height),
    random(10,15),
    random(10,15),
    true,
    '#fff',
    40
);
evilCircle.draw();
evilCircle.setControll();

  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    while (balls.length < 20) {
      var ball = new Ball(
        random(0,width),
        random(0,height),
        random(-10,10),
        random(-10,10),
        true,
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
      );
      numberOfBalls++;
      balls.push(ball);
    }
  
    for (var i = 0; i < balls.length; i++) {
      if(balls[i].exist){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
      }
    }

    evilCircle.draw();
    evilCircle.update();
    evilCircle.collisionDetect();
    // 使用 requestAnimationFrame() 方法再运行一次函数 — 
    //当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，从而得到一个平滑的动画效果。
    //这主要是通过递归完成的 — 也就是说函数每次运行的时候都会调用自己，从而可以一遍又一遍得运行。
    requestAnimationFrame(loop);
  }

  loop();