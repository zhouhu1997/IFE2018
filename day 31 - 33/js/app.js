displayHashInfo();
console.log(decodeURI(location.hash)+" 1");
// 生成地区 checkbox
generateCheckboxs(area,areaArr);
console.log(decodeURI(location.hash)+" 2");
// 生成产品 checkbox
generateCheckboxs(product,productArr);
console.log(decodeURI(location.hash)+" 3");
// 初始化 table
addToTable();
// 初始化 hash
/*getHash(clickedBtns);*/


