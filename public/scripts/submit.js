var latitude, longitude, address, zipcode;
var locationSpinner = document.getElementById('locationSpinner');

function getLocation() {
    if (navigator.geolocation) {
        setVisibility(locationSpinner, true);
        navigator.geolocation.getCurrentPosition(function onLocationFetchSuccess(position) {
            //Location(Latitude & Longitude only) Fetched Successfully
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            geocodeLatLng(latitude, longitude);
        }, function onLocationFetchFailure(error) {
            //Failed to fetch Location
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

function geocodeLatLng(latitude, longitude) {
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
    geocoder.geocode({'location': latlng}, function(results, status) {
        setVisibility(locationSpinner, false);
        if (status === 'OK') {
            if (results[0]) {
                var addrComponents = getAddressComponents(results);
                address = addrComponents[0];
                zipcode = addrComponents[1];
                var addressInputField = document.getElementById('address');
                var zipCodeInputField = document.getElementById('zip');
                addressInputField.value = address;
                zipCodeInputField.value = zipcode;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function getAddressComponents(locationResultsArr) {
    var outputAddress, zip;
    var firsLocationResult = locationResultsArr[0];
    var addressComponentsArr = firsLocationResult.address_components;
    outputAddress = firsLocationResult.formatted_address;
    for(var i in addressComponentsArr) {
        var addressComponent = addressComponentsArr[i];
        var addressComponentType = addressComponent.types[0];
        if (addressComponentType === 'postal_code') {
            zip = addressComponent.short_name;
            break;
        }
    }
    return [outputAddress, zip];
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