function initializeMap() {
    var map_element = null;
    if(map_element = document.getElementById("map")) {
        var markerPosition = new google.maps.LatLng(47.563,7.57394);

        var styles = [{
            featureType: "all",
            elementType: "all",
            stylers: [{
                saturation:-100
            }]
        }];
        var mapOptions = {
            zoom: 14,
            center: markerPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            disableDefaultUI: true,
            scrollwheel: false
        };
        var map = new google.maps.Map(map_element, mapOptions);
        
        var styledMapOptions = {
            map: map,
            name: "moto"
        };
        var MapType = new google.maps.StyledMapType(styles,styledMapOptions);


        map.mapTypes.set('moto', MapType);
        map.setMapTypeId('moto');

        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map
        });

        var content = document.getElementsByClassName('contact')[0].innerHTML;
        if(typeof content == 'undefined' || content == '') {
            content = "MOTO<br>\
            Kannenfeldstrasse 24<br>CH-4056 Basel<br><br>\
            Telefon +41 (0)61 322 23 30<br>\
            <a href='mailto:hello@studiomoto.ch'>hello@studiomoto.ch</a>\
            <a href='http://www.studiomoto.ch'>http://www.studiomoto.ch</a>";
        }

        var infoWindow = new google.maps.InfoWindow({
            content: content,
        });

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        });
    }
}