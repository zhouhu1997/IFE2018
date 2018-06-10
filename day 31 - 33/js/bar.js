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

function drawBar() {

}

function drawXText(){
	for (var i in d.xSet){
		var aix = document.createElementNS(SVG_NS,"text");
		aix.setAttribute("x",67 + (i * 42));
		aix.setAttribute("y","420");
		aix.setAttribute("fill","#000");
		aix.textContent = d.xSet[i];
		svg.appendChild(aix);
	}
}

function drawYText(source){
	var d = getYAxisRange(source);
	var distance = (d[1] + d[0]) / 10;
	var rate = 400 / d[1];
	for (var i  = 0; i < 10; i++){
		var aix = document.createElementNS(SVG_NS,"text");
		aix.setAttribute("x","25");
		aix.setAttribute("y", );
		aix.setAttribute("fill","#000");
		aix.textContent = source.sale[i];
		svg.appendChild(aix);
	}

}

drawSVGAxis(position("50","400","520","2",'',"2","#000"));
drawSVGAxis(position("50","50","2","350",'',"2","#000"));
drawXText();

var table = document.getElementById("table");

table.addEventListener("mouseover",function () {
	var ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	var source = {
		product: "",
		region: "",
		sale: []
	};

	if (target.tagName.toLowerCase() === "tbody" || target.tagName.toLowerCase() === "table") return;
	while (target.tagName.toLowerCase() !== "tr"){
		target = target.parentNode;
	}
	for (var i = 0; i < target.childNodes.length; i++){
		if (target.childNodes[i].tagName === "TH") return;

		if (target.childNodes[i].className.indexOf("product") > 0) {
			source.product = target.childNodes[i].textContent;
			continue;
		}

		if (target.childNodes[i].className.indexOf("region") >= 0) {
			source.region = target.childNodes[i].textContent;
			continue;
		}
		source.sale.push(target.childNodes[i].textContent);
	}

})