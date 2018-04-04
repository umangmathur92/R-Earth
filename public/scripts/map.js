var map;
var options;
var markers = [];

function initMap() {

    options = {
        zoom: 13,
        mapTypeId: 'terrain'

    }

    map = new google.maps.Map(document.getElementById('map'), options);
}

function addMarker(coords, label) {
    var marker = new google.maps.Marker({
        position: coords,
        map:map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });
    markers.push(marker);
}

function removeMarkers(){
    for(var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
}

function setAnimations(coords){
    for(var i = 0; i < marker.length; i++){
        if(coords == markers[i].getPosition()){
            markers[i].setAnimation(google.maps.Animation.BOUNCE);
        }else{
            markers[i].setAnimation(null);
        }
    }
}