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
	$.get("/listings",function (listings) {
		createListItem(listings);
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
		$('#resultlist').empty();

		$.post("/listings/search/", { key: key }, function (dataList) {	
			console.log("test")
			if(dataList && dataList.length > 0){	
				createListItem(dataList);
			}
		});
		return false;
	});

	createListItem = (listings) => {


		 var listingsList = document.getElementById('listings-list');

		// listings.forEach(listing => {
		// 	var listingItem = document.getElementById('listing');
		// 	var listingImage = document.getElementById('listing-image')
		// 	listingImage.src = listing.picture; 

		// 	listingItem.appendChild(listingImage);
		// 	listingsList.appendChild(listingItem);
		// 	console.log(listing);
		// })
		
		for (var i = 0; i < listings.length; i++) {
			var listItem = document.createElement('li');
			var titlePara = document.createElement('h4');
			var thumbnailImg = document.createElement('img');
			var descrPara = document.createElement('p');
			var addrPara = document.createElement('p');
			var zipcodePara = document.createElement('p');
			titlePara.textContent = listings[i].title;
			descrPara.textContent = listings[i].description;
			addrPara.textContent = listings[i].address;
			zipcodePara.textContent = listings[i].zipcode;
			thumbnailImg.src = listings[i].picture;
			thumbnailImg.width = '80';
			thumbnailImg.height = '80'
			listItem.appendChild(titlePara);
			listItem.appendChild(thumbnailImg);
			listItem.appendChild(descrPara);
			listItem.appendChild(addrPara);
			listItem.appendChild(zipcodePara);
			listingsList.appendChild(listItem);
      addMarker(new google.maps.LatLng(listings[i].latitude, listings[i].longitude));
		}
		
		
			map.panTo(new google.maps.LatLng(listings[0].latitude, list[0].longitude));
			$("ul#listings-list li").click(function () {
				map.panTo(new google.maps.LatLng(list[$(this).index()].latitude, list[$(this).index()].longitude));
			});
			$("ul#listings-list li").hover(function () {
				var latlng = new google.maps.LatLng(list[$(this).index()].latitude, list[$(this).index()].longitude);
				map.panTo(latlng);
				setAnimations(latlng);
			});
	
	}
});

