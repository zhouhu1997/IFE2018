var data = {
	xAix : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
	yAixDistance : Math.floor((getYAxisRange(sourceData)[1] + getYAxisRange(sourceData)[0])/ 10),
	yAixRate : 350 / getYAxisRange(sourceData)[1]
}

function getData(){
	var initData = [];

	sourceData.forEach(function (item) {
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

function drawLine(data, sourceData) {
	var canvas = document.getElementById("canvas"),
		cxt = canvas.getContext("2d"),
		colorSet = ["#3759C8","#FFF954","#5BB54A","#D04E34","#FFC620","#C5DDEB","#979495","#222F3E","#B0F566"];

	canvas.width = 600;
	canvas.height = 450;
	cxt.clearRect(0,0,514,450);
	cxt.font = "12px Arial";

	drawXYAix(cxt, data);

	for (var i = 0; i < sourceData.length; i++){
		sourceData[i].sale.forEach(function (item, index, arr) {
			// 根据数据画点和连线
			cxt.save();
			var yPosition = sourceData[i].sale[index] * data.yAixRate;
			cxt.beginPath();
			cxt.moveTo(0,0);
			cxt.strokeStyle = "rgba(0,0,0,0)";
			cxt.fillStyle = colorSet[i];
			cxt.arc(35 * (index+1), -yPosition, 5, 0, Math.PI * 2);
			cxt.stroke();
			cxt.fill();
			if (index + 1 === arr.length)  return;
			cxt.beginPath();
			cxt.strokeStyle = colorSet[i];
			cxt.moveTo(35 * (index+1), -yPosition);
			cxt.lineTo(35 * (index+2), -sourceData[i].sale[index+1] * data.yAixRate);
			cxt.stroke();
			cxt.restore();
			// 注释
			cxt.save();
			cxt.beginPath();
			cxt.fillStyle = "#000";
			cxt.fillText(`${sourceData[i].product}(${sourceData[i].region})`,450,-300 + (i * 30));
			cxt.fill();
			cxt.fillStyle = colorSet[i];
			cxt.fillRect(450, -320 + (i * 30), 50,5);
			cxt.fill();
			cxt.restore();
		})
	}

}


function drawXYAix(cxt,data){
	cxt.translate(34, 400);
	cxt.save();
	cxt.strokeStyle = "#000";
	cxt.beginPath();
	cxt.moveTo(0,0);
	cxt.lineTo(0, -400);
	cxt.stroke();
	cxt.beginPath();
	cxt.lineTo(450, 0);
	cxt.arc(0,0, 5, 0, Math.PI * 2);
	cxt.fill();
	cxt.textAlign = "center";
	data.xAix.forEach(function (dis, i) {
		cxt.fillText(dis, 35 * (i+1), 20);
	})
	for (var i = 1; i <= 10; i++){
		var yAxi = i * data.yAixDistance;
		cxt.fillText(yAxi, -20, -yAxi * data.yAixRate);
	}
	cxt.stroke();
	cxt.restore();
}

function getYAxisRange(sourceData){
	var big = [];
	var low = [];
	for (var i in sourceData){
		var sale = sourceData[i].sale;
		sale.sort(function (x,y) {
			return x-y;
		});
		big.push(sale[sale.length - 1]);
		low.push(sale[0]);
	}
	big.sort(function (x,y) {
		return x-y;
	})
	return [low[low.length - 1],big[big.length - 1]];
}

drawLine(data, getData());
