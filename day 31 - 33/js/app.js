//displayHashInfo();
if (history.pushState){
	window.addEventListener("popstate",function () {
		pushState();
		// 生成地区 checkbox
		updateCheckBox(areaBtn);
		// 生成产品 checkbox
		updateCheckBox(productBtn);
		// 初始化 table
		addToTable();
	})
	//默认加载
	pushState();
	// 生成地区 checkbox
	generateCheckboxs(area,areaArr,areaBtn);
// 生成产品 checkbox
	generateCheckboxs(product,productArr, productBtn);
// 初始化 table
	addToTable();
}
//
// window.onhashchange = function () {
// 	// 根据hash值来确定选中项
// 	displayHashInfo();
// 	// 生成地区 checkbox
// 	updateCheckBox(areaBtn);
// 	// 生成产品 checkbox
// 	updateCheckBox(productBtn);
// 	// 初始化 table
// 	addToTable();
// }


