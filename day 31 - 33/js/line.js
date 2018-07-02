function getData(){
	var initData = [];
    // 获取数据选中数据
	getUseData.forEach(function (item) {
		for (var i in clickedBtns.area){
			if (!clickedBtns.area[i]) continue;
			for (var j in clickedBtns.product) {
				if (!clickedBtns.product[j]) continue;
				if (item.product === j && item.region === i) initData.push({sale: item.sale, region: item.region, product: item.product});
			}
		}
	})
	return initData;
}

function drawLine(sourceData) {
	var canvas = document.getElementById("canvas"),
		cxt = canvas.getContext("2d"),
		yAixDistance = Math.floor((getYAxisRange(getData())[1] * 1 + getYAxisRange(getData())[0])/ 10),//根据数据范围设置点距
		yAixRate = 250 / getYAxisRange(getData())[1];// 根据数据范围设置比例
	// 设置canvas宽高
	canvas.width = 600;
	canvas.height = 350;
	// 每次画图前先清空canvas
	cxt.clearRect(0,0,514,350);
	// 设置字体大小样式
	cxt.font = "12px Arial";

	// 调用画x,y轴函数
	drawXYAix(cxt, yAixDistance, yAixRate);

	for (var i = 0; i < sourceData.length; i++){
		sourceData[i].sale.forEach(function (item, index, arr) {
			// 画数据点
			cxt.save();
			var yPosition = sourceData[i].sale[index] * yAixRate;
			cxt.beginPath();
			cxt.moveTo(0,0);
			cxt.strokeStyle = "rgba(0,0,0,0)";
			cxt.fillStyle = colorSet[i];
			cxt.arc(35 * (index+1), -yPosition, 5, 0, Math.PI * 2);
			cxt.stroke();
			cxt.fill();
			if (index + 1 === arr.length)  return;
			// 画数据点连线
			cxt.beginPath();
			cxt.strokeStyle = colorSet[i];
			cxt.moveTo(35 * (index+1), -yPosition);
			cxt.lineTo(35 * (index+2), -sourceData[i].sale[index+1] * yAixRate);
			cxt.stroke();
			cxt.restore();
			// 表格线段注释
			cxt.save();
			cxt.beginPath();
			cxt.fillStyle = "#000";
			cxt.fillText(`${sourceData[i].product}(${sourceData[i].region})`,450,-250 + (i * 30));
			cxt.fill();
			cxt.fillStyle = colorSet[i];
			cxt.fillRect(450, -270 + (i * 30), 50,5);
			cxt.fill();
			cxt.restore();
		})
	}

}

// 画x,y轴函数
function drawXYAix(cxt, yAixDistance, yAixRate){
	// 移动起始点
	cxt.translate(34, 300);
	cxt.save();
	// 描边样式
	cxt.strokeStyle = "#000";
	cxt.beginPath();
	cxt.moveTo(0,0);
	cxt.lineTo(0, -300);
	cxt.moveTo(0,0);
	cxt.lineTo(450, 0);
	cxt.stroke();
	cxt.beginPath();
	// 画圆
	cxt.arc(0,0, 5, 0, Math.PI * 2);
	cxt.fill();
	// 字体居中
	cxt.textAlign = "center";
	// x轴标识
	xAix.forEach(function (dis, i) {
		cxt.fillText(dis, 35 * (i+1), 20);
	})
	// y轴辅助线及标识
	for (var i = 1; i <= 10; i++){
		var yAxi = i * yAixDistance;
		cxt.beginPath();
		cxt.fillText(yAxi, -20, -yAxi * yAixRate);
		cxt.strokeStyle = "rgba(174,174,174, 0.5)";
		cxt.moveTo(0, -yAxi * yAixRate);
		cxt.lineTo(450,-yAxi * yAixRate);
		cxt.stroke();
	}
	cxt.restore();
}

// 获取数据的最大和最小值
function getYAxisRange(sourceData){
	var big = [];
	var low = [];
	for (var i in sourceData){
		var saleArr = sourceData[i].sale.concat();
		saleArr.sort(function (x,y) {
			return x-y;
		});
		big.push(saleArr[saleArr.length - 1] * 1);
		low.push(saleArr[0] * 1);
	}
	big.sort(function (x,y) {
		return x-y;
	})

	return [low[low.length - 1],big[big.length - 1]];
}
