// 渲染表格
function addToTable() {
	//调用函数获得选中的checkbox的集合
	getSelectedBtns();
	var str = '';
	//设置表头
	var table = '<table class="dataintable"><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>';
	// 初始化融合表格参数为商品列在前, 地区列在后
	var combineFactor = 'productArea';
	var arrL = [selectedArea.length, selectedProduct.length];
	// 遍历数据
	for (var i in sourceData) {
		// 转换arr为string, 并把选中项大于2的长度替换为m
		switch (arrL.join('').replace(/[2-999]/g, 'm')) {
			// 选中商品和地区数为 1
			case '11':
				str += tableStr('productArea', sourceData[i]);
				break;
			// 选中地区数为1 , 商品数大于2
			case '1m':
				// 更改表头为地区前, 商品后
				table = '<table class="dataintable"><tr><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>';
				str += tableStr('areaProduct', sourceData[i]);
				// 设置融合表格参数为地区在前, 商品在后
				combineFactor = 'areaProduct';
				break;
			// 选中地区数大于2, 商品数为1
			case 'm1':
				str += tableStr('productArea', sourceData[i]);
				break;
			// 选中地区和商品数都大于2
			case 'mm':
				str += tableStr('productArea', sourceData[i]);
				break;
			default:
				break;
		}
	}
	table += str;
	//根据表格语句生成表格
	tableWrapper.innerHTML = table + '</table>';
	// 调用融合表格函数
	return combineTable(combineFactor);
}

// 获得表格语句
function tableStr(order, obj) {
	var str = '',
		product = obj.product,
		sale = obj.sale,
		region = obj.region;
	// 判断地区和商品是否存在于selectedArea和selectedProduct中
	if (selectedArea.indexOf(region) >= 0 && selectedProduct.indexOf(product) >= 0) {
		switch (order) {
			// 生成商品在前, 地区在后的数据行
			case 'productArea':
				str += '<tr><td class="header">' + product + '</td><td>' + region + '</td><td>' + sale[0] + '</td><td>' + sale[1] + '</td><td>' + sale[2] + '</td><td>' + sale[3] + '</td><td>' + sale[4] + '</td><td>' + sale[5] + '</td><td>' + sale[6] + '</td><td>' + sale[7] + '</td><td>' + sale[8] + '</td><td>' + sale[9] + '</td><td>' + sale[10] + '</td><td>' + sale[11] + '</td></tr>';
				break;
			// 生成地区在前, 商品在后的数据行
			case'areaProduct':
				str += '<tr><td class="header">' + region + '</td><td>' + product + '</td><td>' + sale[0] + '</td><td>' + sale[1] + '</td><td>' + sale[2] + '</td><td>' + sale[3] + '</td><td>' + sale[4] + '</td><td>' + sale[5] + '</td><td>' + sale[6] + '</td><td>' + sale[7] + '</td><td>' + sale[8] + '</td><td>' + sale[9] + '</td><td>' + sale[10] + '</td><td>' + sale[11] + '</td></tr>';
				break;
			default:
				break;
		}
	}
	// 返回表格语句
	return str;
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
function generateCheckboxs(parent, checkbox) {
	var innerCheckbox = '';
	for (var i in checkbox) {
		// 设置checkbox中第一个选项为check
		var check = i === '0' ? 'checked=checked' : '';
		innerCheckbox += '<input type=checkbox name=' + checkbox[i].name + ' value=' + checkbox[i].value + ' ' + check + ' />' + checkbox[i].text + ' ';
	}
	// 设置innerHTML
	parent.innerHTML = innerCheckbox;
}