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
    infoWindow = new google.maps.InfoWindow({disableAutoPan:false});
}

function addMarker(coords, image, category) {
    var iconString = '/images/pins/';
    switch(category){
        case 0:
            iconString += 'red';
            break;
        case 1:
            iconString += 'orange';
            break;
        case 2:
            iconString += 'yellow';
            break;
        case 3:
            iconString += 'green';
            break;
    }
    iconString += '.png'
    var marker = new google.maps.Marker({
        position: coords,
        map:map,
        icon: iconString,
        animation: google.maps.Animation.DROP
    });
    markers.push(marker);
    images.push(image)
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

function setInfoWindow(coords){

    var i = 0;
    while(!coords.equals(markers[i].getPosition())){
        i++;
    }
    var contentString = "<img src='" + images[i] + "' style = 'width: 160px; height: 160px;'>";
    infoWindow.setContent(contentString);
    infoWindow.open(map, markers[i]);


}