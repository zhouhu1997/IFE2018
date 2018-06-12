var tableWrapper = document.querySelector('#table');
var area = document.querySelector('#area');
var areaBtn = area.getElementsByTagName('input');
var product = document.querySelector('#product');
var productBtn = product.getElementsByTagName('input');
var selectedProduct = [];
var selectedArea = [];
var clickedBtns = {
	area: {
		'华北': true,
		'华南': false,
		'华东': false
	},
	product: {
		'手机': true,
		'笔记本': false,
		'智能音箱': false
	}
};
var areaArr = [{name:'area', value:'huabei', text:'华北'},
	{name:'area', value:'huanan', text:'华南'},
	{name:'area', value:'huadong', text:'华东'},
	{name:'area', value:'all', text:'全选'}];

var productArr = [{name:'prodcut', value:'mobile', text:'手机'},
	{name:'product', value:'laptop', text:'笔记本'},
	{name:'product', value:'speaker', text:'智能音箱'},
	{name:'product', value:'all', text:'全选'}];
var selectionNumber = 0;
var colorSet = ["#3759C8","#FFF954","#5BB54A","#D04E34","#FFC620","#C5DDEB","#979495","#222F3E","#B0F566"];
var xAix = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

function setLocalStorage() {
	if (!localStorage.dataSet) localStorage.dataSet = JSON.stringify(sourceData);
}

setLocalStorage();
var getUseData = JSON.parse(localStorage.dataSet) || sourceData;

function checkString(value) {
	return isNaN(Number(value));
}

function changeData(inputData) {
	if (checkString(inputData.value)) {
		inputData.value = inputData.defaultValue;
		return;
	}
	var insertInfo = inputData.getAttribute("data-position").split('-');
	var insertPlace = {
		place: insertInfo[0],
		region: insertInfo[1],
		product: insertInfo[2]
	}

	for (var i in getUseData){
		if (getUseData[i].region === insertPlace.region && getUseData[i].product === insertPlace.product){
			getUseData[i].sale[insertPlace.place] = inputData.value;
		}
	}
	localStorage.dataSet = JSON.stringify(getUseData);
	inputData.blur();
	drawLine(getData());
}

function setListener() {
	var table = document.getElementById("table");
	var inputs = table.getElementsByTagName("input");

	table.addEventListener("mouseover",function () {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		var returnElement = "tbody,table,icon";
		var source = [{
			product: "",
			region: "",
			sale: []
		}];

		svg.innerHTML = "";

		if (returnElement.indexOf(target.tagName.toLowerCase()) >= 0) return;
		// 如果鼠标滑过input且该input不在输入状态的情况下, 显示铅笔icon
		if (target.tagName === "INPUT" && target !== document.activeElement)  target.previousElementSibling.style.display = "block";
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

			if (checkString(target.childNodes[i].childNodes[1].value)){
				emptyText(svg,"输入数据有误");
				return;
			}

			source[0].sale.push(target.childNodes[i].childNodes[1].value);
		}

		drawSVGAxis(position("50","250","520","2",'',"2","#000"));
		drawSVGAxis(position("50","10","2","240",'',"2","#000"));
		drawXText();
		drawYText(source);
		drawExpl(source);
		drawBar(source);
	});

	table.addEventListener("mouseout", function () {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if (target.tagName === "INPUT" && target.tagName !== "I")  target.previousElementSibling.style.display = "none";
		emptyText(svg,"在表格上移动鼠标以获取相应数据");
	})

	// 点击事件
	table.addEventListener("click", function () {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if (target.tagName === "INPUT")  {
			target.previousElementSibling.style.display = "none";
			target.nextSibling.style.display = "flex";
		}

		if (target.tagName.toLowerCase() === "button"){
			var input = target.parentNode.previousSibling;
			if (target.textContent === "取消") return input.blur();
			console.log(input);
			changeData(input);
		}
	})

	// 失去焦点事件
	for (var i = 0; i < inputs.length; i++){
		inputs[i].onblur = function () {
			var that = this;
			setTimeout(function () {
				that.nextElementSibling.style.display = "none";
			},100);
			//if (checkString(this.value)) alert("输入不为数字");
		}
	}

	table.addEventListener("keydown",function (e) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if (target.tagName.toLowerCase() === "input"){
			// 获取keycode
			var keyCode = e.keyCode;
			if (keyCode === 27){
				// 阻止事件传递
				e.preventDefault();
				// 隐藏按钮
				target.nextElementSibling.style.display = "none";
				// 按下Esc键(27) 全选输入框内容
				return target.blur();
			} else if (/^13|38|40$/.test(keyCode)) {
				if (keyCode === 13){
					// 阻止事件传递
					e.preventDefault();
					target.nextElementSibling.style.display = "none";
					return changeData(target);
				}
			}
		}
	})
}

