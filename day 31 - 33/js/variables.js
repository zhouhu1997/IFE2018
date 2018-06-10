var tableWrapper = document.querySelector('#table-wrapper');
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

