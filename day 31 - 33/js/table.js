// 渲染表格
function addToTable() {
	//调用函数获得选中的checkbox的集合
	getSelectedBtns();
	//设置表头
	var table = '<tr><th id="header">商品</th><th id="sub-header">地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>';
	//根据表格语句生成表格
	tableWrapper.innerHTML = table;
	// 初始化融合表格参数为商品列在前, 地区列在后
	var combineFactor = 'productArea';
	var arrL = [selectedArea.length, selectedProduct.length];
	var header = document.getElementById("header");
	var subHeader = document.getElementById("sub-header");
	// 遍历数据

	for (var i in getUseData) {
		// 转换arr为string, 并把选中项大于2的长度替换为m
		switch (arrL.join('').replace(/[2-999]/g, 'm')) {
			// 选中商品和地区数为 倒计时
			case '11':
				tableStr('productArea', getUseData[i]);
				break;
			// 选中地区数为1 , 商品数大于2
			case '1m':
				// 更改表头为地区前, 商品后
				header.textContent = "地区";
				subHeader.textContent = "商品";
				// 设置融合表格参数为地区在前, 商品在后
				combineFactor = 'areaProduct';
				tableStr('areaProduct', getUseData[i]);
				break;
			// 选中地区数大于2, 商品数为1
			case 'm1':
				tableStr('productArea', getUseData[i]);
				break;
			// 选中地区和商品数都大于2
			case 'mm':
				tableStr('productArea', getUseData[i]);
				break;
			default:
				break;
		}
	}
	// 更新表格
	drawLine(getData());
	// 为动态添加的表格内容绑定事件
	setListener();
	// 调用融合表格函数
	return combineTable(combineFactor);
}

// 获得表格语句
function tableStr(order, obj) {
	var product = obj.product,
		sale = obj.sale,
		region = obj.region;
	// 判断地区和商品是否存在于selectedArea和selectedProduct中
	if (selectedArea.indexOf(region) >= 0 && selectedProduct.indexOf(product) >= 0) {
		var tr = document.createElement("tr");
		for (var i = 0; i < 14; i++){
			var td = document.createElement("td");
			var input = document.createElement("input");
			var icon = document.createElement("i");
			var btnWrapper = document.createElement("div");
			td.style.position = "relative";
			if (i===0) {
				// 生成商品在前, 地区在后的数据行
				order === "productArea" ? td.setAttribute("class", "header product") : td.setAttribute("class", "header region");
				td.textContent = order === "productArea" ? product : region;
				tr.appendChild(td);
				continue;
			}
			if (i===1) {
				// 生成地区在前, 商品在后的数据行
				order === "productArea" ? td.setAttribute("class", "region") : td.setAttribute("class", "product");
				td.textContent = order === "productArea" ? region : product;
				tr.appendChild(td);
				continue;
			}
			// 设置input属性
			input.setAttribute("type","text");
			input.setAttribute("value", sale[i - 2]);
			input.setAttribute("data-position",(i-2)+"-"+region+"-"+product);
			// 将icon,input, 按钮组添加进td里
			td.appendChild(setIcon(icon));
			td.appendChild(input);
			td.appendChild(setButton(btnWrapper));
			// 将td添加进tr中
			tr.appendChild(td);
		}

		tableWrapper.childNodes[0].appendChild(tr);
	}
}

// 融合表格函数
function combineTable(combineFactor) {
	//获取所有class名为header的项
	var head = document.querySelectorAll('.header');
	var productL = selectedProduct.length;
	var areaL = selectedArea.length;
	// 相应数据的行数
	var totalRows = productL * areaL;
	var element = combineFactor === 'productArea' ? areaL : productL;
	var length = combineFactor === 'productArea' ? productL : areaL;
	var arr = [];
	// 根据选项获得需要设置row span的index项
	for (var i = 0; i < length; i++) {
		arr.push(element * i);
	}

	for (var i = 0; i < totalRows; i++) {
		// 遍历所有的行, 如果行数存在arr中则为其添加rowspan属性
		if (arr.indexOf(i) >= 0) {
			head[i].setAttribute('rowspan', element.toString());
		} else {
			head[i].style.display = 'none';// 如果不存在则隐藏class为header的th
		}
	}
}

// 生成checkbox
function generateCheckboxs(parent, checkbox, btns) {
	var innerCheckbox = '';
	for (var i in checkbox) {
		// 根据clickedBtn中的true和false设置checkHash
		var	checkHash = clickedBtns.product[checkbox[i].text] || clickedBtns.area[checkbox[i].text];
		// 设置checkbox中第一个选项为check
		var check = checkHash ? 'checked=checked' : '';
		innerCheckbox += '<input type=checkbox name=' + checkbox[i].name + ' data-text = '+checkbox[i].text+' value=' + checkbox[i].value + ' ' + check + ' />' + checkbox[i].text + ' ';
	}
	// 设置innerHTML
	parent.innerHTML = innerCheckbox;
	if (checkSelectedAll(btns)) checkAll(btns);
}

function updateCheckBox(checkbox) {
	for (var i = 0; i < checkbox.length - 1; i++) {
		// 根据clickedBtn中的true和false设置checkHash
		var	checkHash = clickedBtns.product[checkbox[i].getAttribute("data-text")] || clickedBtns.area[checkbox[i].getAttribute("data-text")];
		// 设置checkbox中第一个选项为check
		if (checkHash) {
			checkbox[i].checked = true;
		} else {
			checkbox[i].checked = false;
		}
	}
	if (checkSelectedAll(checkbox)) checkAll(checkbox);
}

// 设置icon及其属性
function setIcon(icon) {
	icon.setAttribute("class","fa fa-pencil");
	return icon;
}

// 设置按钮及其属性
function setButton(wrapper){
	var btnYes = document.createElement("button");
	var btnNo = document.createElement("button");
	btnYes.setAttribute("class","btn-left");
	btnYes.setAttribute("type","button");
	btnYes.textContent = "确定"
	btnNo.setAttribute("class","btn-right");
	btnNo.setAttribute("type","button");
	btnNo.textContent = "取消"
	wrapper.setAttribute("class", "btn-wrapper");
	wrapper.appendChild(btnYes);
	wrapper.appendChild(btnNo);
	return wrapper;
}