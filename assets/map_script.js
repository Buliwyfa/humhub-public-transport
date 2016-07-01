        /**
         * Map initialization.
         * 
         * Initializes map using MapBox API.
         */    
        var map = L.map('map');
        
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXNhbmgiLCJhIjoiY2lweHZzN2E1MDA3cmh4bm83a3BqeTFhYSJ9._Nf0tZAU-7JSwX8zcUnELA', {
            maxZoom: 18,
            minZoom: 9,
            id: 'asanh.0god5b4e',
            accessToken: 'pk.eyJ1IjoiYXNhbmgiLCJhIjoiY2lweHZzN2E1MDA3cmh4bm83a3BqeTFhYSJ9._Nf0tZAU-7JSwX8zcUnELA'
        }).addTo(map);
        
        /**
         * Variables initialization.
         */
        
        var control;
        var trigger = 0;
        var loc = [];
        var lat = [];
        var lng = [];
        var title = [];
        var marker = [];        
        var location_old = [];
        var marker_old = [];
        
        /**
         * Functions of drawing routes and collecting data.
         *
         * The first one draws routes, the second one clears the map, then collects coordinates and passes it to the first one.
         * WARNING! Changing variable name 'loc' breaks everything (page refreshing constantly).
         */
        
        var draw = function () {            
            trigger = 1;
            
            control = L.Routing.control({
                waypoints: [
                    loc[0],
                    loc[1]
                ],
                routeWhileDragging: false,
                lineOptions : {
                    addWaypoints: false
                }
            }).addTo(map);
            
            for (var q = 2; q < loc.length; q++) {
                control.spliceWaypoints(control.getWaypoints().length, 0, loc[q]);
            }
            
            title.forEach(function(item, i, title) {
                marker[i] = new L.marker([lat[i],lng[i]]).bindPopup(title[i]).addTo(map);
            });
        }
        
        var start = function(id) {
            if (trigger == 1) {
                location_old = loc;
                marker_old = marker;
                
                lat = [];
                lng = [];
                title = [];
                marker = [];
                loc = [];
                
                control.spliceWaypoints(0, location_old.length);
                marker_old.forEach(function(item, i, marker_old) {
                    map.removeLayer(item);
                });
                trigger = 0;
            }
            
            title.forEach(function(item, i, title) {
                loc[i] = L.latLng(lat[i], lng[i]);
            });
            if (loc[0] != 0 && loc[1] != 0) {
                draw();
            }
        }
