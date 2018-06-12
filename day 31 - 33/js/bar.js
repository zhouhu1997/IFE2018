var svgContainer = document.getElementById("svg-wrapper");
// svg标准
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
	// 默认svg样式
	emptyText(svg1,"在表格上移动鼠标以获取相应数据");

	return svg1;
}

// 画x,y轴函数
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

// 设置x,y轴位置函数
function position(x,y,width, height, fillStyle, strokeWidth, strokeStyle){
	d.x = x;
	d.y = y;
	d.width = width;
	d.height = height;
	d.strokeWidth = strokeWidth;
	d.strokeStyle = strokeStyle;
	d.fillStyle = fillStyle;
	d.xSet = xAix;
	return d;
}

// svg无数据信息样式
function emptyText(svg,text) {
	svg.innerHTML = "";
	var aix = document.createElementNS(SVG_NS,"text");
	aix.setAttribute("x","65");
	aix.setAttribute("y","50%");
	aix.setAttribute("font-size","30px");
	aix.setAttribute("fill","#BB3922");
	aix.textContent = text;
	svg.appendChild(aix);
}

// 画柱状图
function drawBar(source) {
	var d = getYAxisRange(source);
	var rate = 220 / d[1];
	for (var i  = 0; i < 12; i++){
		var aix = document.createElementNS(SVG_NS,"rect");
		var aixText = document.createElementNS(SVG_NS,"text");
		var translateY = 250 - (source[0].sale[i] * rate);
		var color = colorSet[Math.floor(Math.random()*9)];
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

//x轴标识
function drawXText(){
	for (var i in xAix){
		var aix = document.createElementNS(SVG_NS,"text");
		aix.setAttribute("x",67 + (i * 42));
		aix.setAttribute("y","270");
		aix.setAttribute("fill","#000");
		aix.textContent = xAix[i];
		svg.appendChild(aix);
	}
}

// 表格标题
function drawExpl(source) {
	var aix = document.createElementNS(SVG_NS,"text");
	aix.setAttribute("font-size","20px");
	aix.setAttribute("x","40%");
	aix.setAttribute("y","310");
	aix.setAttribute("fill","#000");
	aix.textContent = source[0].product+"("+source[0].region+")";
	svg.appendChild(aix);
}

// y轴标识
function drawYText(source){
	var d = getYAxisRange(source);
	var distance = Math.ceil(d[1] / 10);
	var rate = 220 / d[1];
	for (var i  = 0; i < 11; i++){
		var aix = document.createElementNS(SVG_NS,"text");
		var aixLine = document.createElementNS(SVG_NS, "rect");
		aix.setAttribute("transform", "translate(0,255)");
		aix.setAttribute("x","20");
		aix.setAttribute("y", -(i * distance) * rate);
		aix.setAttribute("fill","#000");
		aix.textContent =  i * distance;
		svg.appendChild(aix);
		aixLine.setAttribute("transform", "translate(0,250)");
		aixLine.setAttribute("x","50");
		aixLine.setAttribute("y",-(i * distance) * rate);
		aixLine.setAttribute("height","1");
		aixLine.setAttribute("width","520");
		aixLine.setAttribute("stroke-width","1");
		aixLine.setAttribute("stroke-style","#ccc");
		aixLine.setAttribute("opacity", "0.1");
		svg.appendChild(aixLine);
	}
}

