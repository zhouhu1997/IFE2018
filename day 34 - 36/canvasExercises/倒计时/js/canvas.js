var canvas3 = document.getElementById("canvas3");
var largest = false;
var context2 = canvas3.getContext("2d");
var light = new Light(400, 450, 400);

canvas3.width = 800;
canvas3.height = 800;

setInterval(function () {
	drawLight(context2);
	lightUpdate();
}, 50)


function drawLight(cxt){
	cxt.save();
	cxt.beginPath();
	cxt.fillStyle = "#000";

	cxt.save();
	cxt.fillRect(0,0,800,800);
	cxt.translate(light.x,light.y);
	cxt.scale(light.r,light.r);
	for (var i = 0; i < 5; i++){
		cxt.lineTo(Math.cos((18 + i*72)/180 * Math.PI),
			-Math.sin((18 + i*72)/180 * Math.PI));
		cxt.lineTo(Math.cos((54 + i*72)/180 * Math.PI) * 0.5,
			-Math.sin((54 + i*72)/180 * Math.PI) * 0.5);

	}
	cxt.fillStyle = "#fff";

	cxt.fill();
	cxt.restore();
	cxt.clip();

	cxt.font = "bold 60px Arial";
	cxt.fillStyle = "#fb5";
	cxt.fillText("Hello World", 200, 250);
	cxt.fillText("Hello World", 200, 400);
	cxt.fillText("Hello World", 200, 550);
	cxt.restore();
}

function Light(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
}


function lightUpdate(){
	if (light.r >= 400){
		largest = true;
	} else if (light.r <= 150){
		largest = false;
	}

	if (largest){
		light.r -= 5;
	} else {
		light.r += 5;
	}

}

