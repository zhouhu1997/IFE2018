// 添加地区checkbox监听事件
area.addEventListener('click',function () {
	var ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	if (target.nodeName.toLowerCase() === 'input') {
		switch (target.value) {
			case 'huabei':
				clickedItems('area','华北',target);
				break;
			case 'huanan':
				clickedItems('area','华南',target);
				break;
			case 'huadong':
				clickedItems('area','华东',target);
				break;
			case 'all':
				if (target.checked){
					// 勾选所有地图checkbox的选项
					checkAll(areaBtn);
				} else{
					// 取消勾选所有checkbox的选项
					uncheckAll(areaBtn);
				}
				break;
			default:
				break;
		}
		// 在地区checkbox点击地事件之后检查是否所有checkbox选中
		if (checkSelectedAll(areaBtn)) checkAll(areaBtn);// 勾选所有地图checkbox的选项
		// 渲染新的表格
		addToTable();
		getHash(clickedBtns);
	}
});

// 添加产品checkbox监听事件
product.addEventListener('click',function () {
	var ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	if (target.nodeName.toLowerCase() === 'input'){
		switch (target.value){
			case 'mobile':
				clickedItems('product','手机',target);
				break;
			case 'laptop':
				clickedItems('product','笔记本',target);
				break;
			case 'speaker':
				clickedItems('product','智能音箱',target);
				break;
			case 'all':
				if (target.checked){
					// 勾选所有地图checkbox的选项
					checkAll(productBtn);
				} else{
					// 取消勾选所有checkbox的选项
					uncheckAll(productBtn);
				}
				break;
			default:
				break;
		}
		if (checkSelectedAll(productBtn)) checkAll(productBtn);// 勾选所有地图checkbox的选项
		// 渲染新的表格
		addToTable();
		getHash(clickedBtns);
	}
})

// 获取选中的checkbox
function getSelectedBtns() {
	// 获取area中选中的选项
	for (var i in clickedBtns.area) {
		if (clickedBtns.area[i]) {
			// 如果selectedArea中没有该元素 则将其加入arr
			if (selectedArea.indexOf(i) < 0){
				selectedArea.push(i);
			}

		}else{
			// 如果selectedArea中存在该元素 则将其移除arr
			if (selectedArea.indexOf(i) >= 0){
				selectedArea.splice(selectedArea.indexOf(i), 1);
			}
		}
	}
	// 获取product中选中的选项
	for (var i in clickedBtns.product){
		if (clickedBtns.product[i]) {
			// 如果selectedArea中没有该元素 则将其加入arr
			if (selectedProduct.indexOf(i) < 0){
				selectedProduct.push(i);
			}
		}else{
			// 如果selectedArea中存在该元素 则将其移除arr
			if (selectedProduct.indexOf(i) >= 0){
				selectedProduct.splice(selectedProduct.indexOf(i), 1);
			}
		}
	}
}

// 检查最后选项函数
function checkLastSelection(type) {
	// 初始选中number为0
	selectionNumber = 0;
	for (var i = 0 ; i < type.length; i++){
		// 如果选中项的value不为all且选项选中的话, number加一
		if (type[i].value !== 'all'){
			if (type[i].checked) selectionNumber += 1;
		}
	}
	// 返回number是否小于1
	return selectionNumber < 1;
}


// 点击事件
function clickedItems(type, targetValue, target) {
	if (type === 'area'){
		// 如果点击的checkbox是最后一个勾选则设置为不可勾选
		if (checkLastSelection(areaBtn))  target.checked = true;
		if (target.checked){
			//如果是勾选 设置clickedBtn中的对应选项为true
			clickedBtns.area[targetValue] = true;
		}else {
			//如果是取消勾选 设置clickedBtn中的对应选项为false
			clickedBtns.area[targetValue] = false;
		}
	}else {
		// 如果点击的checkbox是最后一个勾选则设置为不可勾选
		if (checkLastSelection(productBtn)) target.checked = true;
		if (target.checked) {
			//如果是勾选 设置clickedBtn中的对应选项为true
			clickedBtns.product[targetValue] = true;
		} else{
			//如果是取消勾选 设置clickedBtn中的对应选项为false
			clickedBtns.product[targetValue] = false;
		}
	}
}

// 根据是否勾选设置clickedBtn中对应选项为true
function checkAllItems(obj) {
	if (obj === areaBtn){
		// 把如果传入参数为areaBtn clickedBtn中所有设置为true
		for (var i in clickedBtns.area){
			clickedBtns.area[i] = true;
		}
	} else{
		// 把如果传入参数为productBtn clickedBtn中所有设置为true
		for (var i in clickedBtns.product){
			clickedBtns.product[i] = true;
		}
	}
}

// 根据是否勾选设置clickedBtn中对应选项为false
function uncheckAllItems(obj) {
	if (obj === areaBtn){
		// 把如果传入参数为areaBtn clickedBtn中所有设置为false (第一个华北选项除外)
		for (var i in clickedBtns.area){
			clickedBtns.area[i] = i === '华北';
		}
	} else{
		// 把如果传入参数为productBtn clickedBtn中所有设置为false (第一个手机选项除外)
		for (var i  in clickedBtns.product){
			clickedBtns.product[i] = i === '手机';
		}
	}
}

// 当勾选全选时调用的函数
function checkAll(obj) {
	for (var i = 0; i < obj.length; i++){
		// 勾选area中的checkbox
		obj[i].checked = true;
	}
	//调用checkAllItems函数
	checkAllItems(obj);
}

// 当取消勾选全选时调用函数
function uncheckAll(obj) {
	selectionNumber = 0;
	for (var i = 1; i < obj.length; i++){
		// 取消勾选除了第一个之外的所有选项
		obj[i].checked = false;
	}
	//调用uncheckAllItems函数
	uncheckAllItems(obj);
}

// 检查checkbox是否全部选中
function checkSelectedAll(obj){
	for (var i = 0; i < obj.length; i++){
		// 把全选选项排除检查
		if (i === 3){
			break;
		}
		// 如果检查到有选项没有选中 返回false
		if (!obj[i].checked){
			// 取消勾选全选选项
			obj[3].checked = false;
			return false;
		}
	}
	return true;//如果全部选中返回true
}

// 根据点击项获取hash值
function getHash(obj) {
	var str = '';
	for (var i in obj.product){
		if (obj.product[i]){
			str += i;
		}
	}

	for (var i in obj.area){
		if (obj.area[i]) str += i;
	}
	return location.hash = str;
}

//
function displayHashInfo() {
	var hash = location.hash.split("#")[1];
	hash = decodeURI(hash);
	for (var i in clickedBtns.area) {
		if (hash.indexOf(i) >= 0){ clickedBtns.area[i] = true;
		console.log(clickedBtns.area[i]);}
	}

	for (var i in clickedBtns.product) {
		if (hash.indexOf(i) >= 0) {clickedBtns.product[i] = true;
			console.log(clickedBtns.product[i]);}

	}
}