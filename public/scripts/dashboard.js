/**
* @file Dashboard.js
* API Calls: 
* GET '/Listings' - Get's all the Enviormental Listings for the dashboard
* POST 'dashboard/update' - updates a single listing. 
* Functionality: 
* Handles DOM creation of Listings, and handles UI events. @file 
*/


var listings = [];
var index = 0;
var cards = [];

$(document).ready(function () {
    setNavbarScrollAnimation();
    
    $.post('/dashboard',
    function(response){
        listings = response.date;
        console.log(listings)
        update();
        setClickEventListener();
    });
    //date-sort button
    // document.getElementById('date-sort').addEventListener("click", function() {
    //     clearListings();
    //      $.post('/dashboard',
    //          function(response){
    //              listings = response.date;
    //              update();
    //          });
    //  });
});

function clearListings() {
    var listings = document.getElementById('listings');
    while(listings.childNodes.length > 3) {
        listings.removeChild(listings.lastChild);
    }
}

function update() {
    cards = [];
    var info;
    for(var i=0; i<listings.length; i++) {
        let listing = listings[i];
        $('.dashboard_ul').append(
            '<li class="search_li">' + 
            '<div class="container row">' +
            '<div class="col-md-5">' +    
            '<img src="' + listing.thumbnail + '">' + '</img>' +
            '<h3 class="li_title">' + 'Title: ' + listing.title + '</h3>' +
            '<h6 class="li_title">' + 'Category: ' + getCategoryFromId(listing.category) + '</h6>' +
            '<h6 class="li_title">' + 'Status: '  + getStatusFromId(listing.status) + '</h6>' +
            '<h6 class="li_title">' + 'Report Date: '  + getFormattedDateString(listing.post_date) + '</h6>' +
            '<h6 class="li_title">' + 'Address: '  + listing.address + '</h6>' +
            '</div>' +
            '<div class="col-md-3" style="padding: 3px;">' + 
            '<div>' + '<b>Agency Response</b>' + '</div>' +
            '<div style="height: 3px;"></div>'+
            '<textarea rows="3" id="txtResponse'+ i +'">' + ((listing.response === null) ? '': listing.response) + '</textarea>'+
            '</div>' +
            '<div class="col-md-2" style="padding: 3px;">' + 
            '<div>' + '<b>Status</b>' + '</div>' +
            '<div style="height: 3px;"></div>'+
            '<div class="dropdown">'+
            '<select class="dropdown-select" name="one" id="dropdownSelect' + i+ '">'+
            '<option value="0" id="option" ' + ((listing.status === 0) ? 'selected="selected"': '') + '">Unverified</option>'+
            '<option value="1" id="option" ' + ((listing.status === 1) ? 'selected="selected"': '') + '">Acknowledged</option>'+
            '<option value="2" id="option" ' + ((listing.status === 2) ? 'selected="selected"': '') + '">In Progress</option>'+
            '<option value="3" id="option" ' + ((listing.status === 3) ? 'selected="selected"': '') + '">Resolved</option>'+
            '</select>'+
            '</div>'+
            '</div>' +
            '<div class="col-md-2" style="padding: 3px;">' +
            '<button class="updateButton btn btn-success btn-lg">Update</button>' +
            '</div>' +
            '</div>' +
            '</li>'
        );
    }
}

function setClickEventListener() {
    $('.updateButton').click(function () {
        let index = $('.updateButton').index(this);
        let txtResponseId = '#txtResponse' + index ;
        let dropdownSelectId = '#dropdownSelect' + index;
        let strResponse = $(txtResponseId).val();
        let dropDownSelectedOptionVal = $(dropdownSelectId).val();
        let listingId = listings[index].listing_id;
        let postBody = {listingId: listingId, status: dropDownSelectedOptionVal, description: strResponse};
        $.post('/dashboard/respond', postBody, function(response) {
            window.alert(response);
        });
	});
}

function setNavbarScrollAnimation() {
	var scroll_start = 0;
	$(document).scroll(function () {
		scroll_start = $(this).scrollTop();
		$(".navbar").css('background-color', (scroll_start > 20) ? '#000000e0' : 'transparent');
	});
}