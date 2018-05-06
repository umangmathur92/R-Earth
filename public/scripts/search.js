/**
* @file Search.js
* API Calls: 
* GET '/Listings' - Get's all the Enviormental Listings
* POST 'Listings/search' - Post's a search with either an address or Zip Code 
* 
* Functionality: 
* Handles DOM creation of Listings, and handles UI events. @file 
*/

var currentFocus;
var pageNumber = 1;
var listings;

$(document).ready(function () {
	setNavbarScrollAnimation();
	initMap();
	fetchListings()
	resizeElements();// Search Bar UI Functions 
	$("form").submit(function () {
		pageNumber = 1;//Reset page number each time a new search is performedxss
		searchListings();
		return false;
	});
});

fetchListings = () => {
	$.get("/listings", function (response) {
		listings = response;
		generateListings(response);
		createListingMapMarker(response);
		setUpListingListeners();
	});
}

/**Searches the listings table and returns paginated data for the text in the search input field*/
function searchListings() {
	const key = $("#search-input").val().trim();
	$('.listings').empty();
	$.post("/listings/search/", { key: key, pageNum: pageNumber }, function (response) {
		console.log(response)
		dataList = response.dataList;
		totalPages = response.totalNumOfPages;
		var totalNumOfResults = response.totalNumOfResults;
		var numResultsOnThisPage = dataList.length;
		removeMarkers();
		setPaginationButtons(pageNumber, totalPages, totalNumOfResults, numResultsOnThisPage);
		if (dataList && dataList.length > 0) {
			createListingMapMarker(dataList);
			generateListings(dataList);
		}
	});
}

/**Creates buttons for page numbers, highlights the current page number and displays number of results*/
function setPaginationButtons(currentPageNum, totalPages, totalNumOfResults, numResultsOnThisPage) {
	var paginationDiv = document.getElementById('pageLinkContainer');
	$('#pageLinkContainer').empty();
	var numResultsSpan = document.createElement('span');
	numResultsSpan.setAttribute('id', 'numResultsSpan');
	const firstResultNum = (((currentPageNum - 1) * 10) + 1);
	const lastResultNum = firstResultNum + numResultsOnThisPage - 1;
	var successMessage = 'Displaying ' + firstResultNum + ' to ' + lastResultNum + ' of ' + totalNumOfResults + ' Results';
	var failureMessage = 'No Results Found !';
	numResultsSpan.innerHTML = (totalNumOfResults > 0) ? successMessage : failureMessage;
	paginationDiv.appendChild(numResultsSpan);
	for (var i = 1; i <= totalPages; i++) {
		var pageLink = document.createElement('button');
		pageLink.innerHTML = i;
		const pageNum = i;
		pageLink.setAttribute('class', (pageNum == currentPageNum) ? 'active' : 'inactive');
		pageLink.addEventListener("click", getPageNumberClickListener(pageNum));
		paginationDiv.appendChild(pageLink);
	}
}

/**Action to be preformed on clicking a page number */
function getPageNumberClickListener(pageNum) {
	return function () {
		pageNumber = pageNum;
		searchListings();
	};
}

setUpListingListeners = () => {
	$('.listing').click(function () {
		console.log(listings[$(this).index()]);
		window.open('/displaylisting' + '/' + listings[$(this).index()].listing_id);
	});
	
	$('.listing').hover(function () {
		var latlng = new google.maps.LatLng(listings[$(this).index()].latitude, listings[$(this).index()].longitude);
		if (!latlng.equals(currentFocus)) {
			setInfoWindow(latlng, listings[$(this).index()].address.split(",")[0], listings[$(this).index()].title);
			setAnimations(latlng);
			map.panTo(latlng);
			currentFocus = latlng;
		}
	});
	
}

function createListingMapMarker(list) {
	for (var i = 0; i < list.length; i++) {
		addMarker(new google.maps.LatLng(list[i].latitude, list[i].longitude), list[i].picture, list[i].address.split(",")[0], list[i].title);
	}
	//Pan map to first list item's geographic coordinates
	var latlng = new google.maps.LatLng(list[0].latitude, list[0].longitude);
	map.panTo(latlng);
	
}

/**Generates HTML for each individual list item*/
function generateIndividualListItemHtml(list, i) {
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
	thumbnailImg.src = list[i].thumbnail;
	listItem.appendChild(titlePara);
	listItem.appendChild(thumbnailImg);
	listItem.appendChild(descrPara);
	listItem.appendChild(addrPara);
	listItem.appendChild(zipcodePara);
	listItem.addEventListener("click", function () {
		window.open('/displaylisting' + '/' + list[i].listing_id);
	});
	resultlist.appendChild(listItem);
}


function setNavbarScrollAnimation() {
	var scroll_start = 0;
	
	$(document).scroll(function () {
		scroll_start = $(this).scrollTop();
		$(".navbar").css('background-color', (scroll_start > 20) ? '#FFA06F' : 'transparent');
	});
}

//Drop Down for search bar
function dropdownOn(dropdownList, dropdown) {
	$(dropdownList).fadeIn(25);
	$(dropdown).addClass("active");
}

function dropdownOff(dropdownList, dropdown) {
	$(dropdownList).fadeOut(25);
	$(dropdown).removeClass("active");
}

function resizeElements() {
	var bar = ".search-bar";
	var input = bar + " input[type='text']";
	var button = bar + " button[type='submit']";
	var dropdown = bar + " .search-dropdown";
	var dropdownLabel = dropdown + " > span";
	var dropdownList = dropdown + " ul";
	var dropdownListItems = dropdownList + " li";
	var barWidth = $(bar).outerWidth();
	var labelWidth = $(dropdownLabel).outerWidth();
	$(dropdown).width(labelWidth);
	var dropdownWidth = $(dropdown).outerWidth();
	var buttonWidth = $(button).outerWidth();
	var inputWidth = barWidth - dropdownWidth - buttonWidth;
	var inputWidthPercent = inputWidth / barWidth * 100 + "%";
	$(input).css({ 'margin-left': dropdownWidth, 'width': inputWidthPercent });
}

generateListings = (list) => {
	list.forEach(listing => {
		$('.listings').append(
			'<li class="listing">' +       
			'<div class="listing-container">' +     
			'<div class="thumbnail-container">' +      
			'<img class="thumbnail" src="' + listing.thumbnail + '">' + '</img>' +
			'</div>' +  
			'<div class="info_container">' +  
			'<div class="info-container-1">' +         
			'<h3 class="li_title">' + listing.title + '</h3>' +
			'<p class="li_description">' + listing.description + '</p>' +     
			'<p class="li_address">' + listing.address + '</p>' +
			'</div>' +  
			'<div class="info-container-2">' +           
			'<p class="li_status"><b>Status: </b>' + getStatusFromId(listing.status) + '</p>' +  
			'<p class="li_category"><b>Category: </b>' + getCategoryFromId(listing.category) + '</p>' +  
			'<p class="li_date"><b>Report Date: </b>' + getFormattedDateString(listing.post_date) + '</p>' +  
			'</div>' +  
			'</div>' +  
			'</div>' +  
			'</li>'
		);
	})
}