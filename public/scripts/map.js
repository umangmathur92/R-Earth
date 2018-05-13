var map;
var options;
var markers = [];
var images = [];
var infoWindow;
var reset;

function initMap() {
    reset = new google.maps.LatLng(0,0);
    options = {
        zoom: 13,
        mapTypeId: 'terrain'
    }
    map = new google.maps.Map(document.getElementById('map'), options);
    infoWindow = new google.maps.InfoWindow({disableAutoPan:false, maxWidth: 200});
}

function addMarker(coords, image, address, title) {
    var iconString = '/images/pins/red.png';
    var marker = new google.maps.Marker({
        position: coords,
        map:map,
        icon: iconString,
        animation: google.maps.Animation.DROP
    });

    markers.push(marker);
    images.push(image);

    marker.addListener('click', function (){
        var contentString = "<div id ='card'>" +
            "<img id='image' src= " + image +   ">" +
            "<div id='card-title'> <strong>" + title  +  "</strong> </div>" +
            "<div id='card-address'>" + address + "</div>" +
            "</div>";
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        map.panTo(coords);
        setAnimations(coords);
    });
}


function removeMarkers(){
    for(var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
    images = [];
}

function setAnimations(coords){

    for(var i = 0; i < markers.length; i++){
        if(coords.equals(markers[i].getPosition())){
            markers[i].setAnimation(google.maps.Animation.BOUNCE);
        }else{
            markers[i].setAnimation(null);
        }
    }
}

function setInfoWindow(coords, address, title){
    var i = 0;
    while(!coords.equals(markers[i].getPosition())){
        i++;
    }

    var contentString = "<div id ='card'>" +
        "<img id='image' src= " + images[i] +   ">" +
        "<div id='card-title' > <strong>" + title  +  "</strong> </div>" +
        "<div id='card-address'>" + address + "</div>" +
        "</div>";

    infoWindow.setContent(contentString);
    infoWindow.open(map, markers[i]);
}

