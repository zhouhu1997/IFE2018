var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT = 500;
var RADIUS = 8;
var MARGIN_LEFT = 200;
var MARGIN_TOP = 30;
var balls = [];
var hour = document.querySelector('#hour-select');
var minute = document.querySelector('#minute-select');
var second = document.querySelector('#second-select');
var curShowTimeSeconds = 0;

const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CC0000","#DC3202"];

window.onload = function(){

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(function () {
		render( context );
		update();
	}, 50)

}

function getCurrentShowTimeSeconds() {
	var curTime = new Date();
	var endTime = new Date();
	endTime.setHours(hour.value);
	endTime.setMinutes(minute.value);
	endTime.setSeconds(second.value);
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round( ret/1000 );
	return ret >= 0 ? ret : Math.abs(ret);
}

function render( cxt ){

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt( curShowTimeSeconds / 3600);
	var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
	var seconds = curShowTimeSeconds % 60;

	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
	renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
	renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
	renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
	renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
	renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
	renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
	renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

	for (var i = 0; i < balls.length; i++){
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgba(0,102,153)";

	for (var i = 0; i < digit[num].length; i++){
		for (var j = 0; j < digit[num][i].length; j++){
			if (digit[num][i][j] === 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0 , 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}

function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt( nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
	var nextSeconds = nextShowTimeSeconds % 60;
    //console.log(`${nextHours} and ${nextMinutes} and ${nextSeconds}`);
	var hours = parseInt( curShowTimeSeconds / 3600);
	var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
	var seconds = curShowTimeSeconds % 60;
	//console.log(`${hours} and ${minutes} and ${seconds}`);


	if (nextSeconds !== seconds){
		if (parseInt(hours/10) !== parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours/10));
		}

		if (parseInt(hours%10) !== parseInt(nextHours%10)){
			addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(nextHours%10));
		}

		if (parseInt(minutes/10) !== parseInt(nextMinutes/10)){
			addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes/10));
		}

		if (parseInt(minutes%10) !== parseInt(nextMinutes%10)){
			addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes%10));
		}

		if (parseInt(seconds/10) !== parseInt(nextSeconds/10)){
			addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds/10));
		}

		if (parseInt(seconds%10) !== parseInt(nextSeconds%10)){
			addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10));
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = - balls[i].vy * 0.75;
		}
	}

	var cnt = 0;
	for (var i = 0; i < balls.length; i++){
		if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}

	while (balls.length > cnt){
		balls.pop();
	}
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++){
		for (var j = 0; j < digit[num][i].length; j++){
			if (digit[num][i][j] === 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 7,
					vy: -5,
					color: colors[Math.floor(Math.random() * colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function toTwo(i)
{
	if (i<10)
	{i="0" + i}
	return i;
}

var initHtml = function dateSelector(startNumber, endNumber){
	var string = '';
	for (var i = startNumber; i <= endNumber; i++){
		string += '\<option value\='+i+'\>'+toTwo(i)+'\<\/option\>\n';
	}
	return string;
}

// 写入html函数
function init() {
	hour.innerHTML =  initHtml(0,23);
	minute.innerHTML =  initHtml(0,59);
	second.innerHTML =  initHtml(0,59);
}
//初始化, 写入html
init();
