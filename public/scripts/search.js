var currentFocus;
var pageNum = 1;
var totalPages = 1;

$(document).ready(function () {
	//Navbar scrool animation
	var scroll_start = 0;
	var startchange = $('.search-container');
	var offset = startchange.offset();
	 if (startchange.length){
	$(document).scroll(function() { 
		 scroll_start = $(this).scrollTop();
		 if(scroll_start > offset.top) {
				 $(".navbar").css('background-color', '#FFA06F');
			} else {
				 $('.navbar').css('background-color', 'transparent');
			}
		});
	 }
	
	 //GET HTTP request for listings 
	 $.post("/listings/search/", { key: '', pageNum: pageNum }, function (response) {	
		dataList = response.dataList;
		totalPages = response.totalNumOfPages;
		console.log("testzz " + totalPages);
		if(dataList && dataList.length > 0){	
			createListItem(dataList);
		}
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
	
	//Drop Down for search bar
  function dropdownOn() {
    $(dropdownList).fadeIn(25);
    $(dropdown).addClass("active");
  }

  function dropdownOff() {
    $(dropdownList).fadeOut(25);
    $(dropdown).removeClass("active");
	}
	
	resizeElements();

	//POST HTTP search 
	$("form").submit(function () {
		const key = $("#search-input").val();
		console.log(key);
		pageNum = 1;
		$('#resultlist').empty();

		$.post("/listings/search/", { key: key, pageNum: pageNum }, function (response) {	
			dataList = response.dataList;
			totalPages = response.totalNumOfPages;
			console.log("testzz " + totalPages);
			if(dataList && dataList.length > 0){	
				createListItem(dataList);
			}
		});
		return false;
	});

	createListItem = (list) => {

		var resultList = document.getElementById('resultlist');
		removeMarkers();
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
      		addMarker(new google.maps.LatLng(list[i].latitude, list[i].longitude), list[i].picture, list[i].category);
		}
		
			var latlng = new google.maps.LatLng(list[0].latitude, list[0].longitude);
			map.panTo(latlng);
			$("ul#resultlist li").click(function () {
				//OPEN UP LISTING PAGE
			});
			$("ul#resultlist li").hover(function () {
				var latlng = new google.maps.LatLng(list[$(this).index()].latitude, list[$(this).index()].longitude);
				if(!latlng.equals(currentFocus)) {
                    setInfoWindow(latlng);
                    setAnimations(latlng);
                    map.panTo(latlng);
                    currentFocus = latlng;
                }
			});
	
	}
});

