/**
* @file Search.js
* API Calls: 
* GET '/Listings' - Get's all the Enviormental Listings
* POST 'Listings/search' - Post's a search with either an address or Zip Code 
* Functionality: 
* Handles DOM creation of Listings, and handles UI events. @file 
*/

var currentFocus;
var pageNumber = 1;
var listings;

$(document).ready(function () {
	setNavbarScrollAnimation();
	initMap();
	searchListings();
	resizeElements();// Search Bar UI Functions 
	// //Initialize materialize select
	$('select').formSelect();
	$("form").submit(function () {
		pageNumber = 1;//Reset page number each time a new search is performed
		searchValidation()
		return false;
	});

	$("#apply_filter_button").click(function(){
		searchValidation();
	});
});


function searchValidation(){
	const zip = $(".search-bar").val().trim();
	var isValidZip = /^\d{1,5}$/.test(zip);

	if(isValidZip){
		searchListings();
	} else {
		alert("Please enter a valid Zip Code.");
	}
}

/**Searches the listings table and returns paginated data for the text in the search input field*/
function searchListings() {
	var filters = getFilteredSelectors();
	const key = $(".search-bar").val().trim();
	$('.listings').empty();
	const body = {
		key: key, 
		pageNum: pageNumber,
		category: filters.category,
		status: filters.status
	}

	$.post("/listings/search/", body, function (response) {
		console.log(response)
		listings = response.dataList;
		totalPages = response.totalNumOfPages;
		var totalNumOfResults = response.totalNumOfResults;
		var numResultsOnThisPage = listings.length;
		removeMarkers();
		setPaginationButtons(pageNumber, totalPages, totalNumOfResults, numResultsOnThisPage);
		if (listings && listings.length > 0) {
			generateListings(listings);
			createListingMapMarker(listings);
			setUpListingListeners(listings);
		}
	});
}

/**Creates buttons for page numbers, highlights the current page number and displays number of results*/
function setPaginationButtons(currentPageNum, totalPages, totalNumOfResults, numResultsOnThisPage) {
	var paginationDiv = document.getElementById('pageLinkContainer');
	var numResultsDiv = document.getElementById('numResultsContainerDiv');
	var paginiationcontainerdiv = document.getElementById('paginiationcontainerdiv');
	$('#pageLinkContainer').empty();
	$('#numResultsContainerDiv').empty();
	var numResultsSpan = document.createElement('span');
	numResultsSpan.setAttribute('id', 'numResultsSpan');
	const firstResultNum = (((currentPageNum - 1) * 10) + 1);
	const lastResultNum = firstResultNum + numResultsOnThisPage - 1;
	var successMessage = 'Displaying ' + firstResultNum + ' to ' + lastResultNum + ' of ' + totalNumOfResults + ' Results';
	var failureMessage = 'No Results Found !';
	numResultsSpan.innerHTML = (totalNumOfResults > 0) ? successMessage : failureMessage;
	setVisibility(paginiationcontainerdiv, (totalNumOfResults > 0));
	numResultsDiv.appendChild(numResultsSpan);
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

setUpListingListeners = (response) => {
	$('.search_li').click(function () {
		console.log(response[$(this).index()]);
		window.open('/displaylisting' + '/' + response[$(this).index()].listing_id);
	});
	$('.search_li').hover(function () {
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

function setNavbarScrollAnimation() {
	var scroll_start = 0;
	$(document).scroll(function () {
		scroll_start = $(this).scrollTop();
		$(".navbar").css('background-color', (scroll_start > 20) ? '#000000e0' : 'transparent');
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

function generateListings(list){
	list.forEach(listing => {
		$('.listings').append(
			'<li class="search_li">' +       
			'<img src="' + listing.thumbnail + '">' + '</img>' +
            '<h3 class="li_title">' + listing.title + '</h3>' +
            '<h6 class="li_title">' + 'Category: ' + getCategoryFromId(listing.category) + '</h6>' +
			'<h6 class="li_title">' + 'Status: '  + getStatusFromId(listing.status) + '</h6>' +
			'<h6 class="li_title">' + 'Report Date: '  + getFormattedDateString(listing.post_date) + '</h6>' +
			'<h6 class="li_title">' + 'Address: '  + listing.address + '</h6>' +
			'</li>'
		);
	})
}

/**
* @method getFilteredSelectors()
Get's the chosen selectors of filters(categories, status) from the selectors. 
Categories coresponding values: 
null: all | 0: "Land" | 1: "Water" | 2: "Air" | 3: "Fire"
Status's coresponding values: 
null: all | 0: "Reported" | 1: "Acknowledged | 2: "Work in Progress" | 3: "Resolved"
@method 
*/
getFilteredSelectors = () => {
	$('select').formSelect();
	let category = $('#sel_categories').find('option:selected').val();
	let status = $('#sel_status').find('option:selected').val();
	var selectors = {};
	selectors.category = (category === "") ? null : category;
	selectors.status = (status === "") ? null : status;
	return selectors; 
}

function setVisibility(htmlElement, setVisible) {
    htmlElement.style.display = (setVisible) ? "block" : "none";
}