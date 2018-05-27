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
					checkAll(areaBtn);
				} else{
					uncheckAll(areaBtn);
				}
				break;
			default:
				break;
		}
		if (checkSelectedAll(areaBtn)){
			checkAll(areaBtn);
		}
		addToTable();
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
					checkAll(productBtn);
				} else{
					uncheckAll(productBtn);
				}
				break;
			default:
				break;
		}
		if (checkSelectedAll(productBtn)) checkAll(productBtn);
		addToTable();
	}
})

function getSelectedBtns() {
	// 获取area中选中的选项
	for (var i in clickedBtns.area) {
		if (clickedBtns.area[i]) {
			if (selectedArea.indexOf(i) < 0){
				selectedArea.push(i);
			}

		}else{
			if (selectedArea.indexOf(i) >= 0){
				selectedArea.splice(selectedArea.indexOf(i), 1);
			}
		}
	}
	// 获取product中选中的选项
	for (var i in clickedBtns.product){
		if (clickedBtns.product[i]) {
			if (selectedProduct.indexOf(i) < 0){
				selectedProduct.push(i);
			}
		}else{
			if (selectedProduct.indexOf(i) >= 0){
				selectedProduct.splice(selectedProduct.indexOf(i), 1);
			}
		}
	}
}

function checkLastSelection(type) {
	selectionNumber = 0;
	for (var i = 0 ; i < type.length; i++){
		if (type[i].value !== 'all'){
			if (type[i].checked) selectionNumber += 1;
		}
	}
	return selectionNumber < 1;
}

function clickedItems(type, targetValue, target) {
	if (type === 'area'){
		if (checkLastSelection(areaBtn))  target.checked = true;
		if (target.checked){
			clickedBtns.area[targetValue] = true;
		}else {
			clickedBtns.area[targetValue] = false;
		}
	}else {
		if (checkLastSelection(productBtn)) target.checked = true;
		if (target.checked) {
			clickedBtns.product[targetValue] = true;
		} else{
			clickedBtns.product[targetValue] = false;
		}
	}
}

function checkAllItems(obj) {
	if (obj === areaBtn){
		for (var i in clickedBtns.area){
			clickedBtns.area[i] = true;
		}
	} else{
		for (var i in clickedBtns.product){
			clickedBtns.product[i] = true;
		}
	}
}

function uncheckAllItems(obj) {
	if (obj === areaBtn){
		for (var i in clickedBtns.area){
			clickedBtns.area[i] = i === '华北';
		}
	} else{
		for (var i  in clickedBtns.product){
			clickedBtns.product[i] = i === '手机';
		}
	}
}

function checkAll(obj) {
	for (var i = 0; i < obj.length; i++){
		obj[i].checked = true;
	}
	checkAllItems(obj);
}

function uncheckAll(obj) {
	selectionNumber = 0;
	for (var i = 1; i < obj.length; i++){
		obj[i].checked = false;
	}
	uncheckAllItems(obj);
}

function checkSelectedAll(obj){
	for (var i = 0; i < obj.length; i++){
		if (i === 3){
			break;
		}

		if (!obj[i].checked){
			obj[3].checked = false;
			return false;
		}
	}
	return true;
}
