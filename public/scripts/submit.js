var geocoder = new google.maps.Geocoder();
var latitude, longitude, address, zipcode;
var locationSpinner = document.getElementById('locationSpinner');

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
                var addrComponents = getAddressComponents(results);
                address = addrComponents[0];
                zipcode = addrComponents[1];
                latitude = addrComponents[2];
                longitude = addrComponents[3];
                var addressInputField = document.getElementById('address');
                var zipCodeInputField = document.getElementById('zip');
                addressInputField.value = address;
                zipCodeInputField.value = zipcode;
            } else {
                window.alert('No address results found for your location');
            }
        } else {
            window.alert('Address Geocoder failed due to: ' + status);
        }
    });
}

/**Asynchronously fetches complete address and location of the input Zip code using Google Maps' Geocoder API*/
function geocodeZip(inputZip) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var addrComponents = getAddressComponents(results);
                latitude = addrComponents[2];
                longitude = addrComponents[3];
                //Use the latitude and longitude values from here if user enters address, zip manually !!
            } else {
                console.log('No address results found for the input Zip code');
            }
        } else {
            window.alert('Location Geocoder failed due to: ' + status);
        }
    });
  }

/**Parses input JSON array to return a tuple containing address components*/
function getAddressComponents(locationResultsArr) {
    var outputAddress, zip, resultLat, resultLong;
    var firsLocationResult = locationResultsArr[0];
    var addressComponentsArr = firsLocationResult.address_components;
    outputAddress = firsLocationResult.formatted_address;
    resultLat = firsLocationResult.geometry.location.lat();
    resultLong = firsLocationResult.geometry.location.lng();
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

function dragover(event){
    event.preventDefault();
    event.target.style.border = "4px dashed black";
}

function dragexit(event){
    event.preventDefault();
    event.target.style.border = "4px dashed white";
}

function drop(event){
    event.preventDefault();
    event.target.style.border = "4px dashed white";
    var image = document.createElement("IMG");
    image.setAttribute("src", "/images/dolores_trash.jpg");
    image.setAttribute("id", "image");
    image.setAttribute("height", "300px");
    image.setAttribute("width", "300px");
    event.target.innerText = "";
    event.target.append(image);
}

function setVisibility(element, isVisible) {
    element.style.display = (isVisible) ? "block" : "none";
}