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
        }
        reader.readAsDataURL(input.files[0]);
    }
}

var geocoder;
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




function goBack() {
    window.history.back();
}

function submit() {

    var title = $('#title').val();
    var category = $('.dropdown-select').val();
    var address = $('#address').val();
    var zipcode = $('#zip').val();
    var description = $('#description').val();

    $.post('/submit', {
        //body
        user_id: 0,
        title: title,
        category: category,
        address: address,
        zipcode: zipcode,
        description: description,
        longitude: longitude,
        latitude: latitude,
        picture: "/images/dolores_trash.jpg"
    },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
    });
}


function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
    geocoder = new google.maps.Geocoder();
}



function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
    if(isNumeric(place.address_components[6].long_name)){
        document.getElementById("zip").value = place.address_components[6].long_name;
    }else{
        document.getElementById("zip").value = place.address_components[7].long_name;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function setVisibility(element, isVisible) {
    element.style.display = (isVisible) ? "block" : "none";
}