$(document).ready(function() {
	$("#submit").click(function() {
		key=$("#key").val();
		$.post("/listings/search/",{key: key}, function(dataList) {
			var resultList = document.getElementById('resultlist');
			$('#resultlist').empty();
			for (var i = 0; i < dataList.length; i++) {
				var listItem = document.createElement('li'); 
				var titlePara = document.createElement('h4'); 
				var thumbnailImg = document.createElement('img'); 
				var descrPara = document.createElement('p'); 
				var addrPara = document.createElement('p'); 
				var zipcodePara = document.createElement('p'); 
				titlePara.textContent = dataList[i].title;
				descrPara.textContent = dataList[i].description;
				addrPara.textContent = dataList[i].address;
				zipcodePara.textContent = dataList[i].zipcode;
				thumbnailImg.src = dataList[i].picture;
				thumbnailImg.width='80';
				thumbnailImg.height='80'
				listItem.appendChild(titlePara);
				listItem.appendChild(thumbnailImg);
				listItem.appendChild(descrPara);
				listItem.appendChild(addrPara);
				listItem.appendChild(zipcodePara);
				resultlist.appendChild(listItem);
			}
			var urlStr = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDg-AaiQ6fJN0KvJvmT9lfCwJ7qPBFIUS4&zoom=14";
			var latitude = dataList[0].latitude;
			var longitude = dataList[0].longitude;
			document.getElementById('mapiframe').src = urlStr + "&q="+latitude+","+longitude;  
			$(document).ready(function () {
				$("ul#resultlist li").click(function() {
					var latitude = dataList[$(this).index()].latitude;
					var longitude = dataList[$(this).index()].longitude;
					document.getElementById('mapiframe').src = urlStr + "&q="+latitude+","+longitude;   
				});
			});
		});
	});
});