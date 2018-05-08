var geocoder;
var latitude, longitude, address, zipcode, picture;
var locationSpinner = document.getElementById('locationSpinner');
var geocoder, autocomplete;
var latitude, longitude, address, zipcode;
var locationSpinner;
var sendImage;


$(document).ready(function () {
    //Initialize the geocoding google library
    geocoder = new google.maps.Geocoder(); 
    //Initialize the autocomplete & reverse-geocoding google library
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {types: ['geocode']});
    //Listen to the 'place changed' event in the address input field
    autocomplete.addListener('place_changed', function() {
        onAddressSelectedFromDropdown();
    });
    //Set a click listener on the 'auto-detect address from current location' button
    document.getElementById('btnDetect').addEventListener("click", function() {
        getLocation();
    });
    document.getElementById('imageUpload').addEventListener("change", function() {
        readURL(document.getElementById('imageUpload'));
    });
    document.getElementById('button-blue').addEventListener("click", function() {
        console.log("es");
        submitData();
    });
    //TODO: Add the click listener for the image upload here. Remove the javascript call to readURL from the HTML code.
    //TODO: Add the click listener for the send button here. Remove the javascript call to submitData from the HTML code.
    locationSpinner = document.getElementById('locationSpinner');
});

function onAddressSelectedFromDropdown() {
    var place = autocomplete.getPlace();
    var addrComponents = parseAddressComponents(place);
    updateAddressComponentGlobalVariables(addrComponents);
}

/**Asynchronously fetches current location using HTML5's Geolocation API. If successful, calls the 'reverseGeocodeLatLng' method.*/
function getLocation() {
    if (navigator.geolocation) {
        setVisibility(locationSpinner, true);
        navigator.geolocation.getCurrentPosition(function onLocationFetchSuccess(position) {
            var currentLatitude = position.coords.latitude;
            var currentLongitude = position.coords.longitude;
            reverseGeocodeLatLng(currentLatitude, currentLongitude);
        }, function onLocationFetchFailure(error) {
            setVisibility(locationSpinner, false);
            console.log(`Location Fetch Error. Code ${error.code}: ${error.message}`);
            var errorMsgDenied = 'Failed to fetch location.\nPlease manually enable geolocation for this website to autofill your address';
            var genericErrorMsg = 'Unable to fetch your current location !!';
            window.alert((error.code==1) ? errorMsgDenied : genericErrorMsg);
        });
    } else { 
        window.alert('Geolocation is not supported by this browser.');
    }
}

/**Asynchronously fetches the complete address and location of the input coordinates using Google Maps' Geocoder API*/
function reverseGeocodeLatLng(currentLatitude, currentLongitude) {
    var latlng = {lat: parseFloat(currentLatitude), lng: parseFloat(currentLongitude)};
    geocoder.geocode({'location': latlng}, function(results, status) {
        setVisibility(locationSpinner, false);
        if (status === 'OK') {
            if (results[0]) {
                var addrComponents = parseAddressComponents(results[0]);
                updateAddressComponentGlobalVariables(addrComponents);
            } else {
                window.alert('No address results found for your location');
            }
        } else {
            window.alert('Address Geocoder failed due to: ' + status);
        }
    });
}

/**Parses input JSON array to return a tuple containing address components*/
function parseAddressComponents(locationJsonData) {
    var outputAddress, zip, resultLat, resultLong;
    var addressComponentsArr = locationJsonData.address_components;
    outputAddress = locationJsonData.formatted_address;
    resultLat = locationJsonData.geometry.location.lat();
    resultLong = locationJsonData.geometry.location.lng();
    for(var i in addressComponentsArr) {
        var addressComponent = addressComponentsArr[i];
        var addressComponentType = addressComponent.types[0];
        if (addressComponentType === 'postal_code') {
            zip = addressComponent.short_name;
            break;
        }
    }
    return [outputAddress, zip, resultLat, resultLong];
}

function updateAddressComponentGlobalVariables(addrComponents) {
    address = addrComponents[0];
    zipcode = addrComponents[1];
    latitude = addrComponents[2];
    longitude = addrComponents[3];
    updateAddressComponentUIElements(address, zipcode);
}

function updateAddressComponentUIElements(address, zipcode) {
    document.getElementById('address').value = address;
    document.getElementById('zip').value = zipcode;
}

function submitData() {
    var title = $('#title').val();
    var category = $('.dropdown-select').val();
    var address = $('#address').val();
    var zipcode = $('#zip').val();
    var description = $('#description').val();
    var picture = sendImage;
    $.post('/submit', {
            title: title,
            category: category,
            address: address,
            zipcode: zipcode,
            description: description,
            longitude: longitude,
            latitude: latitude,
            picture:picture
    },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
            window.location.replace("/");
    });

}

function setVisibility(htmlElement, setVisible) {
    htmlElement.style.display = (setVisible) ? "block" : "none";
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var image = document.createElement("IMG");
        image.setAttribute("height", "300px");
        image.setAttribute("width", "300px");
        image.setAttribute("id", "image");
        document.getElementById('dropzone').innerHTML = "";
        reader.onload = function (e) {
            image.setAttribute('src', e.target.result);
            $('#dropzone').append(image);
            sendImage = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}