function addToTable() {
	getSelectedBtns();
	var str = '';
	var table = '<table class="dataintable"><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>';
	var combineFactor = 'productArea';
	var arrL = [selectedArea.length,selectedProduct.length];
	if (arrL[0] === 0 && arrL[1] === 0){
		return tableWrapper.innerHTML = '';
	} else {
		for (var i in sourceData){
			switch(arrL.join('').replace(/[2-999]/g, 'm')){
				case '11':
					str += tableStr('productArea', sourceData[i]);
					break;
				case '1m':
					table = '<table class="dataintable"><tr><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>';
					str += tableStr('areaProduct', sourceData[i]);
					combineFactor = 'areaProduct';
					break;
				case 'm1':
					str += tableStr('productArea', sourceData[i]);
					break;
				case 'mm':
					str += tableStr('productArea', sourceData[i]);
					break;
				default:
					break;

			}
		}
		table += str;
		tableWrapper.innerHTML = table + '</table>';
		return combineTable(combineFactor);
	}
}

function tableStr(order, obj) {
	var str = '',
		product = obj.product,
		sale = obj.sale,
		region = obj.region;
	if (selectedArea.indexOf(region) >= 0 && selectedProduct.indexOf(product) >= 0){
		switch (order){
			case 'productArea':
				str += '<tr><td class="header">'+product+'</td><td>'+region+'</td><td>'+sale[0]+'</td><td>'+sale[1]+'</td><td>'+sale[2]+'</td><td>'+sale[3]+'</td><td>'+sale[4]+'</td><td>'+sale[5]+'</td><td>'+sale[6]+'</td><td>'+sale[7]+'</td><td>'+sale[8]+'</td><td>'+sale[9]+'</td><td>'+sale[10]+'</td><td>'+sale[11]+'</td></tr>';
				break;
			case'areaProduct':
				str += '<tr><td class="header">'+region+'</td><td>'+product+'</td><td>'+sale[0]+'</td><td>'+sale[1]+'</td><td>'+sale[2]+'</td><td>'+sale[3]+'</td><td>'+sale[4]+'</td><td>'+sale[5]+'</td><td>'+sale[6]+'</td><td>'+sale[7]+'</td><td>'+sale[8]+'</td><td>'+sale[9]+'</td><td>'+sale[10]+'</td><td>'+sale[11]+'</td></tr>';
				break;
			default:
				break;
		}
	}
	return str;
}

function combineTable(combineFactor) {
	var head = document.querySelectorAll('.header');
	var productL = selectedProduct.length;
	var areaL = selectedArea.length;
	var totalRows = productL * areaL;
	var element = combineFactor === 'productArea' ? areaL : productL;
	var length = combineFactor === 'productArea' ? productL : areaL;
	var arr = [];
	for (var i = 0; i < length; i++){
		arr.push(element * i);
	}

	for (var i = 0; i < totalRows; i++){
		if (arr.indexOf(i) >= 0){
			head[i].setAttribute('rowspan', element.toString());
		}else{
			head[i].style.display = 'none';
		}
	}
}

function generateCheckboxs(parent, checkbox) {
	var innerCheckbox= '';
	for (var i in checkbox){
		var check = i === '0' ? 'checked=checked': '';
		innerCheckbox += '<input type=checkbox name='+checkbox[i].name+' value='+checkbox[i].value+' '+check+' />'+checkbox[i].text+' ';
	}
	parent.innerHTML = innerCheckbox;
}