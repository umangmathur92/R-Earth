$(document).ready(function () {

	$.post("/listings",function (dataList) {
		createListItem(dataList);
	});

	$("#submit").click(function () {

		key = $("#key").val();

		$.post("/listings/search/", { key: key }, function (dataList) {
			createListItem(dataList)
;		});
	});

	createListItem = (list) => {
		var resultList = document.getElementById('resultlist');
		$('#resultlist').empty();
		for (var i = 0; i < list.length; i++) {
			var listItem = document.createElement('li');
			var titlePara = document.createElement('h4');
			var thumbnailImg = document.createElement('img');
			var descrPara = document.createElement('p');
			var addrPara = document.createElement('p');
			var zipcodePara = document.createElement('p');
			titlePara.textContent = list[i].title;
			descrPara.textContent = list[i].description;
			addrPara.textContent = list[i].address;
			zipcodePara.textContent = list[i].zipcode;
			thumbnailImg.src = list[i].picture;
			thumbnailImg.width = '80';
			thumbnailImg.height = '80'
			listItem.appendChild(titlePara);
			listItem.appendChild(thumbnailImg);
			listItem.appendChild(descrPara);
			listItem.appendChild(addrPara);
			listItem.appendChild(zipcodePara);
			resultlist.appendChild(listItem);
		}
		var urlStr = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDg-AaiQ6fJN0KvJvmT9lfCwJ7qPBFIUS4&zoom=14";
		var latitude = list[0].latitude;
		var longitude = list[0].longitude;
		document.getElementById('mapiframe').src = urlStr + "&q=" + latitude + "," + longitude;
		$(document).ready(function () {
			$("ul#resultlist li").click(function () {
				var latitude = list[$(this).index()].latitude;
				var longitude = list[$(this).index()].longitude;
				document.getElementById('mapiframe').src = urlStr + "&q=" + latitude + "," + longitude;
			});
		});
	}
});

