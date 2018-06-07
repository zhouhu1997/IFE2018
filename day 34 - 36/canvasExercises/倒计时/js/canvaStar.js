var canvas2 = document.getElementById("canvas2");

canvas2.width = 800;
canvas2.height = 800;

var context = canvas2.getContext("2d");
context.fillStyle = "#"
context.fillRect(0,0, 800, 800);



context.lineWidth = 10;
for (var i = 0; i < 100; i++){
	var r = Math.random() * 10 + 10;
	var x = Math.random() * 800;
	var y = Math.random() * 800;
	var deg = Math.random() * 360;
	drawStar(context, x, y, r, deg);
}

function drawStar(cxt, x, y, r, deg){
	cxt.save()
	cxt.translate(x,y);
	cxt.rotate(deg/ 180 * Math.PI);
	cxt.scale(r,r);

	starPath(cxt);
	cxt.fillStyle = "#FFF954";

	cxt.fill();

	cxt.restore();
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