var canvas2 = document.getElementById("canvas2");
var stars = [];

canvas2.width = 800;
canvas2.height = 800;

var context = canvas2.getContext("2d");
var interval;

canvasInit();

canvas2.addEventListener("mouseover",function () {
	interval = setInterval(function () {
		//线性渐变
		//var skyStyle = context.createLinearGradient(0,0,0,canvas2.height);
		var skyStyle = context.createRadialGradient(canvas2.width / 2, canvas2.height, 0 , canvas2.width / 2, canvas2.height, canvas2.height);
		skyStyle.addColorStop(0.0,"#000");
		skyStyle.addColorStop(1.0,"#035");


		context.fillStyle = skyStyle;
		context.fillRect(0,0, 800, 800);
		drawLand(context);
		drawMoon(context, 600, 200, 80, 30);

		drawStar(context);
		starUpdate();
	},50);
});

canvas2.addEventListener("mouseout",function () {
	clearInterval(interval);
	canvasInit();
})


function canvasInit() {
	var skyStyle = context.createRadialGradient(canvas2.width / 2, canvas2.height, 0 , canvas2.width / 2, canvas2.height, canvas2.height);
	skyStyle.addColorStop(0.0,"#000");
	skyStyle.addColorStop(1.0,"#035");

	context.fillStyle = skyStyle;
	context.fillRect(0,0, 800, 800);

	context.font="bold 60px Verdana";
// 创建渐变
	var gradient=context.createLinearGradient(0,0,canvas2.width,0);
	gradient.addColorStop(0.0,"magenta");
	gradient.addColorStop(0.5,"#fb5");
	gradient.addColorStop(1.0,"red");
// 用渐变填色
	context.fillStyle=gradient;
	context.fillText("把鼠标放进来看看星空吧!",50,400);
}


function drawMoon(cxt, x, y, r, deg) {
	cxt.save();
	cxt.translate(x,y);
	cxt.rotate(deg * Math.PI / 180);
	cxt.scale(r,r);

	cxt.beginPath();
	cxt.arc(0,0,1,0.5*Math.PI, 1.5 * Math.PI, true);
	cxt.moveTo(0,-1);
	cxt.quadraticCurveTo(1, 0, 0, 1);
	cxt.fillStyle = "#fb5";
	cxt.fill();
	cxt.restore();
}


function drawLand(cxt) {
	cxt.save();
	cxt.beginPath();
	cxt.moveTo(0 ,700);
	cxt.bezierCurveTo(300, 500, 500, 900, 800, 700);
	cxt.lineTo(800,800);
	cxt.lineTo(0,800);
	cxt.closePath();
	var landStyle = cxt.createLinearGradient(0, 800, 0, 0);
	landStyle.addColorStop(0.0,"#030");
	landStyle.addColorStop(1.0,"#580");
	cxt.fillStyle = landStyle;
	cxt.fill();
	cxt.restore();
}

function drawStar(cxt){
	while (stars.length < 200) {
		var r = Math.random() * 5 + 5;
		var x = Math.random() * 800;
		var y = Math.random() * 800 * 0.65;
		var velY = Math.random() * 5 + 1;
		var deg = Math.random() * 360;
		stars.push(new Star(x, y, velY, r, deg));

	}


	for (var i = 0; i < stars.length; i++){
		cxt.save();
		cxt.translate(stars[i].x,stars[i].y);
		cxt.rotate(stars[i].deg/ 180 * Math.PI);
		cxt.scale(stars[i].r,stars[i].r);

		starPath(cxt);
		cxt.fillStyle = "#FFF954";

		cxt.fill();

		cxt.restore();
	}
}

function Star(x, y, velY, r, deg){
	this.x = x;
	this.y = y;
	this.velY = velY;
	this.r = r;
	this.deg = deg;
}


function starUpdate(){
	for (var i = 0; i < stars.length; i++){
		stars[i].y += stars[i].velY;
		if (stars[i].y + stars[i].r > 600){
			stars.splice(stars[i],1);
		}
	}
}

function starPath(cxt) {
	cxt.beginPath();
	for (var i = 0; i < 5; i++){
		cxt.lineTo(Math.cos((18 + i*72)/180 * Math.PI),
			-Math.sin((18 + i*72)/180 * Math.PI));
		cxt.lineTo(Math.cos((54 + i*72)/180 * Math.PI) * 0.5,
			-Math.sin((54 + i*72)/180 * Math.PI) * 0.5);

	}
	cxt.closePath();
}