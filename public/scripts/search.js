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
	fetchListings()
	resizeElements();// Search Bar UI Functions 

	//Initialize materialize select
	$('select').formSelect();

	$("form").submit(function () {
		pageNumber = 1;//Reset page number each time a new search is performedxss
		searchListings();
		return false;
	});

	$("#apply_filter_button").click(function(){
		searchListings();
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
		dataList = response.dataList;
		totalPages = response.totalNumOfPages;
		var totalNumOfResults = response.totalNumOfResults;
		var numResultsOnThisPage = dataList.length;
		removeMarkers();
		setPaginationButtons(pageNumber, totalPages, totalNumOfResults, numResultsOnThisPage);
		if (dataList && dataList.length > 0) {
			generateListings(dataList);
			createListingMapMarker(dataList);
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
	})
}

function createListingMapMarker(list) {
	for (var i = 0; i < list.length; i++) {
		addMarker(new google.maps.LatLng(list[i].latitude, list[i].longitude), list[i].picture, list[i].category);
	}
	
	//Pan map to first list item's geographic coordinates
	var latlng = new google.maps.LatLng(list[0].latitude, list[0].longitude);
	map.panTo(latlng);

	//actions to be performed when mouse hovers over a list item
	$(".listing-container").hover(function () {
		var latlng = new google.maps.LatLng(list[$(this).index()].latitude, list[$(this).index()].longitude);
		if (!latlng.equals(currentFocus)) {
			console.log("Test");
			setInfoWindow(latlng);
			setAnimations(latlng);
			map.panTo(latlng);
			currentFocus = latlng;
		}
	});
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
			'   <li class="listing">  ' +
			'     <div class ="listing-container">  ' +
			'       <div class="thumbnail-container">  ' +
			'         <img class="thumbnail" src=' + listing.thumbnail + '>' + '</img>' +
			'       </div>  ' +
			'       <div class="info-container">  ' +
			'         <div class="title-address-container">  ' +
			'           <div class="title-container">  ' +
			'             <h3 class="title">' + listing.title + '</h3>' +
			'           </div>  ' +
			'           <div class="address-container">  ' +
			'             <p class="address">' + listing.address + '</p>  ' +
			'           </div>  ' +
			'         </div>  ' +
			'         <div class="description-container">  ' +
			'           <h5 class="description">' + listing.description + '</h5>' +
			'         </div>  ' +
			'       </div>  ' +
			'     </div>  ' +
			'  </li>  '
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

	var selectors = {};

	var categorySelector = document.querySelector('.categories');
	var category = M.FormSelect.getInstance(categorySelector);
	var selectedCategory = category.getSelectedValues();
	var statusSelector = document.querySelector('.status');
	var status = M.FormSelect.getInstance(statusSelector);
	var selectedStatus = status.getSelectedValues();

	console.log(selectedCategory);	

	if(selectedCategory[0] === ""){
		selectors.category = null; 
	} else {

		selectors.category = selectedCategory[0];
	} 

	if(selectedStatus[0] === ""){
		selectors.status = null;  
	} else {
		selectors.status = selectedStatus[0];
	}

	console.log(selectors);

	return selectors; 
}


categoryStringToInt = () => {

}