var longitude, latitude;

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var image = document.createElement("IMG");
        image.setAttribute("height", "300px");
        image.setAttribute("width", "300px");
        image.setAttribute("id", "image");
        document.getElementById('dropzone').innerHTML = "";
        reader.onload = function(e) {
            image.setAttribute('src', e.target.result);
            $('#dropzone').append(image);
        }
        reader.readAsDataURL(input.files[0]);

    }
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
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('address')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
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
