$(document).ready(function () {
	$.get("/listings",function (dataList) {
		createListItem(dataList);
	});

	var bar = ".search-bar";
  var input = bar + " input[type='text']";
  var button = bar + " button[type='submit']";
  var dropdown = bar + " .search-dropdown";
  var dropdownLabel = dropdown + " > span";
  var dropdownList = dropdown + " ul";
  var dropdownListItems = dropdownList + " li";

// Search Bar UI Functions 
  resizeElements = function() {
    var barWidth = $(bar).outerWidth();

    var labelWidth = $(dropdownLabel).outerWidth();
    $(dropdown).width(labelWidth);

    var dropdownWidth = $(dropdown).outerWidth();
    var buttonWidth	= $(button).outerWidth();
    var inputWidth = barWidth - dropdownWidth - buttonWidth;
    var inputWidthPercent = inputWidth / barWidth * 100 + "%";

    $(input).css({ 'margin-left': dropdownWidth, 'width': inputWidthPercent });
  }

  function dropdownOn() {
    $(dropdownList).fadeIn(25);
    $(dropdown).addClass("active");
  }

  function dropdownOff() {
    $(dropdownList).fadeOut(25);
    $(dropdown).removeClass("active");
	}
	
	resizeElements();

	$("form").click(function () {
		const key = $("#search-input").val();
		console.log(key);
		$('#resultlist').empty();

		$.post("/listings/search/", { key: key }, function (dataList) {	
			if(dataList && dataList.length > 0){
				createListItem(dataList)
			}
;		});
		return false;
	});

	createListItem = (list) => {

		var resultList = document.getElementById('resultlist');
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

			$("ul#resultlist li").click(function () {
				var latitude = list[$(this).index()].latitude;
				var longitude = list[$(this).index()].longitude;
				document.getElementById('mapiframe').src = urlStr + "&q=" + latitude + "," + longitude;
			});
	}
});

