var tableWrapper = document.querySelector('#table');
var area = document.querySelector('#area');
var areaBtn = area.getElementsByTagName('input');
var product = document.querySelector('#product');
var productBtn = product.getElementsByTagName('input');
var selectedProduct = [];
var selectedArea = [];
var clickedBtns = {
	area: {
		'华北': false,
		'华南': false,
		'华东': false
	},
	product: {
		'手机': false,
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

// 检查localStorage是否存在函数
function setLocalStorage() {
	// 由于localstorage智能存储string对象, 所以要调用JSON.stringify来将object转换陈哥string
	if (!localStorage.dataSet) localStorage.dataSet = JSON.stringify(sourceData);
}
setLocalStorage();

// 将string转为object
var getUseData = JSON.parse(localStorage.dataSet) || sourceData;

// 检查输入是否为数字
function checkString(value) {
	return isNaN(Number(value));
}

// 改变数据函数
function changeData(inputData) {
	// 检查内容是否为数字
	if (checkString(inputData.value)) {
		// 更改为默认值
		inputData.value = inputData.defaultValue;
		return;
	}

	// 获取更改值的信息
	var insertInfo = inputData.getAttribute("data-position").split('-');
	var insertPlace = {
		place: insertInfo[0],
		region: insertInfo[1],
		product: insertInfo[2]
	}

	// 根据信息更改数据
	for (var i in getUseData){
		if (getUseData[i].region === insertPlace.region && getUseData[i].product === insertPlace.product){
			getUseData[i].sale[insertPlace.place] = inputData.value;
		}
	}

	// 更新localStorage数据
	localStorage.dataSet = JSON.stringify(getUseData);
	// input失去焦点
	inputData.blur();
	// 更新图表
	drawLine(getData());
}

// 监听事件
function setListener() {
	var table = document.getElementById("table");
	var inputs = table.getElementsByTagName("input");

	// 鼠标移入事件
	table.addEventListener("mouseover",function (e) {
		var ev = ev || e || window.event;
		var target = ev.target || ev.srcElement;
		var returnElement = "tbody,table,icon";
		var source = [{
			product: "",
			region: "",
			sale: []
		}];

		svg.innerHTML = "";
		// 如果鼠标移到tbody,table,icon 则返回
		if (returnElement.indexOf(target.tagName.toLowerCase()) >= 0) return;
		// 如果鼠标滑过input且该input不在输入状态的情况下, 显示铅笔icon
		if (target.tagName === "INPUT" && target !== document.activeElement)  target.previousElementSibling.style.display = "block";
		// 如果鼠标移动到对象不是tr则向上查找 直到找到tr
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
			// 如数据有误, 则清空表格, 并显示错误信息
			if (checkString(target.childNodes[i].childNodes[1].value)){
				emptyText(svg,"输入数据有误");
				return;
			}

			source[0].sale.push(target.childNodes[i].childNodes[1].value);
		}

		// 调用画x轴函数
		drawSVGAxis(position("50","250","520","2",'',"2","#000"));
		// 调用画y轴函数
		drawSVGAxis(position("50","10","2","240",'',"2","#000"));
		// 调用画x轴标识函数
		drawXText();
		// 调用画x轴标识函数
		drawYText(source);
		// 调用图表标题函数
		drawExpl(source);
		drawBar(source);
	});

	// 鼠标移除事件
	table.addEventListener("mouseout", function (e) {
		var ev = ev || e || window.event;
		var target = ev.target || ev.srcElement;
		// 隐藏小图标
		if (target.tagName === "INPUT" && target.tagName !== "I")  target.previousElementSibling.style.display = "none";
		// 更新表格内容
		emptyText(svg,"在表格上移动鼠标以获取相应数据");
	})

	// 点击事件
	table.addEventListener("click", function (e) {
		var ev = ev || e || window.event;
		var target = ev.target || ev.srcElement;
		// 点击input的事件
		if (target.tagName === "INPUT")  {
			// 隐藏小图标
			target.previousElementSibling.style.display = "none";
			// 显示按钮
			target.nextSibling.style.display = "flex";
		}

		// 按钮点击事件
		if (target.tagName.toLowerCase() === "button"){
			// 获取input对象
			var input = target.parentNode.previousSibling;
			// 点击取消, input失去焦点
			if (target.textContent === "取消") return input.blur();
			// 点击确定, 更新数据
			changeData(input);
		}
	})

	// 失去焦点事件
	for (var i = 0; i < inputs.length; i++){
		inputs[i].onblur = function () {
			var that = this;
			// 为blur设置timeout防止button点击无效
			setTimeout(function () {
				that.nextElementSibling.style.display = "none";
			},200);
			//if (checkString(this.value)) alert("输入不为数字");
		}
	}

	// 键盘事件
	table.addEventListener("keydown",function (e) {
		var ev = ev || e|| window.event;
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
					// 隐藏按钮
					target.nextElementSibling.style.display = "none";
					// 更新数据
					return changeData(target);
				}
			}
		}
	})
}

