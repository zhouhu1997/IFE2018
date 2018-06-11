var svgContainer = document.getElementById("svg-wrapper");
var SVG_NS = "http://www.w3.org/2000/svg";
var d = {};

var svg = createSVG();

function createSVG() {
	var svg1 = document.createElementNS(SVG_NS,'svg');
	svg1.setAttribute("width", "100%");
	svg1.setAttribute("height", "100%");
	svg1.setAttribute("style", "border:1px solid #000;");
	svg1.setAttribute("version", "1.1");
	svgContainer.appendChild(svg1);
	emptyText(svg1);

	return svg1;
}

function drawSVGAxis(d){
	var aix = document.createElementNS(SVG_NS,"rect");

	aix.setAttribute("x",d.x);
	aix.setAttribute("y",d.y);
	aix.setAttribute("height",d.height);
	aix.setAttribute("width",d.width);
	aix.setAttribute("stroke-width",d.strokeWidth);
	aix.setAttribute("stroke-style",d.strokeStyle);
	svg.appendChild(aix);
}

function position(x,y,width, height, fillStyle, strokeWidth, strokeStyle){
	d.x = x;
	d.y = y;
	d.width = width;
	d.height = height;
	d.strokeWidth = strokeWidth;
	d.strokeStyle = strokeStyle;
	d.fillStyle = fillStyle;
	d.xSet = data.xAix;
	return d;
}

function emptyText(svg) {
	svg.innerHTML = "";
	var aix = document.createElementNS(SVG_NS,"text");
	aix.setAttribute("x","65");
	aix.setAttribute("y","50%");
	aix.setAttribute("font-size","30px");
	aix.setAttribute("fill","#BB3922");
	aix.textContent = "在表格上移动鼠标以获取相应数据";
	svg.appendChild(aix);
}

function drawBar(source) {
	var d = getYAxisRange(source);
	var distance = Math.ceil(d[1] / 10);
	var rate = 400 / d[1];
	for (var i  = 0; i < 12; i++){
		var aix = document.createElementNS(SVG_NS,"rect");
		var aixText = document.createElementNS(SVG_NS,"text");
		console.log(450 - (i + 1) * distance * rate);
		var translateY = 450 - (source[0].sale[i] * rate);
		var color = colorSet[Math.floor(Math.random()*9)];
		console.log(color);
		aix.setAttribute("transform", "translate(0,"+translateY+")");
		aix.setAttribute("x", 69+ (i * 42));
		aix.setAttribute("y","0");
		aix.setAttribute("height", (source[0].sale[i]) * rate);
		aix.setAttribute("width", "30");
		aix.setAttribute("fill",color);
		svg.appendChild(aix);
		aixText.setAttribute("x", 71+ (i * 42));
		aixText.setAttribute("y", translateY);
		aixText.setAttribute("fill", "#000");
		aixText.textContent = source[0].sale[i];
		svg.appendChild(aixText);
	}
}

function drawXText(){
	for (var i in d.xSet){
		var aix = document.createElementNS(SVG_NS,"text");
		aix.setAttribute("x",67 + (i * 42));
		aix.setAttribute("y","470");
		aix.setAttribute("fill","#000");
		aix.textContent = d.xSet[i];
		svg.appendChild(aix);
	}
}

function drawExpl(source) {
	var aix = document.createElementNS(SVG_NS,"text");
	aix.setAttribute("font-size","20px");
	aix.setAttribute("x","40%");
	aix.setAttribute("y","510");
	aix.setAttribute("fill","#000");
	aix.textContent = source[0].product+"("+source[0].region+")";
	svg.appendChild(aix);
}

function drawYText(source){
	var d = getYAxisRange(source);
	var distance = Math.ceil(d[1] / 10);
	var rate = 400 / d[1];
	for (var i  = 0; i < 11; i++){
		var aix = document.createElementNS(SVG_NS,"text");
		aix.setAttribute("transform", "translate(0,450)");
		aix.setAttribute("x","20");
		aix.setAttribute("y", -(i * distance) * rate);
		aix.setAttribute("fill","#000");
		aix.textContent =  i * distance;
		svg.appendChild(aix);
	}
}

function setListener() {
	var table = document.getElementById("table");

	table.addEventListener("mouseover",function () {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		var source = [{
			product: "",
			region: "",
			sale: []
		}];

		svg.innerHTML = "";

		if (target.tagName.toLowerCase() === "tbody" || target.tagName.toLowerCase() === "table") return;
		while (target.tagName.toLowerCase() !== "tr"){
			target = target.parentNode;
		}
		for (var i = 0; i < target.childNodes.length; i++){
			if (target.childNodes[i].tagName === "TH") return;

			if (target.childNodes[i].className.indexOf("product") >= 0) {
				source[0].product = target.childNodes[i].textContent;
				continue;
			}

			if (target.childNodes[i].className.indexOf("region") >= 0) {
				source[0].region = target.childNodes[i].textContent;
				continue;
			}
			source[0].sale.push(target.childNodes[i].textContent);
		}

		drawSVGAxis(position("50","450","520","2",'',"2","#000"));
		drawSVGAxis(position("50","25","2","425",'',"2","#000"));
		drawXText();
		drawYText(source);
		drawExpl(source);
		drawBar(source);
	});

	table.addEventListener("mouseout", function () {
		emptyText(svg);
	})
}
