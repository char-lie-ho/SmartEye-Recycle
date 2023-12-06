
// Check if support Geolocation
if ("geolocation" in navigator) {
    // Get current location
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const currentLocation = [longitude, latitude];
            //Call the function to display the map with the user's location and event pins
            showMap(currentLocation);
        },
        function (error) {
            console.error("Current location fail:", error.message);
        }
    );
} else {
    console.error("Does not support Geolocation API");
}

function showMap(currentLocation) {
    //-----------------------------------------
    // Define and initialize basic mapbox data
    //-----------------------------------------
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
    const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
        center: currentLocation, // Starting position
        zoom: 12 // Starting zoom
    });

    // Add user controls to map
    map.addControl(new mapboxgl.NavigationControl());

    //------------------------------------
    // Listen for when map finishes loading
    // then Add map features 
    //------------------------------------
    map.on('load', () => {

        // Defines map pin icon for events
        map.loadImage(
            'https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png',
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage('eventpin', image); // Pin Icon

                db.collection('facility').get().then(allFacilities => {
                    const features = []; // Defines an empty array for information to be added to

                    allFacilities.forEach(doc => {
                        var facility = doc.data();
                        if (facility.coordinates) {
                            // Access the latitude and longitude values
                            var latitude = facility.coordinates.latitude;
                            var longitude = facility.coordinates.longitude;
                        } else {
                            console.log("Coordinates not found for document with ID: " + doc.id);
                        }

                        // Coordinates
                        Coordinates = [doc.data().coordinates['_long'], doc.data().coordinates['_lat']];

                        cover = doc.data().image;
                        event_name = doc.data().name; // Event Name
                        address = doc.data().address; // Text Preview 
                        openHourM = doc.data().hours_of_operation[0];
                        openHourT = doc.data().hours_of_operation[1];
                        openHourW = doc.data().hours_of_operation[2];
                        openHourTh = doc.data().hours_of_operation[3];
                        openHourF = doc.data().hours_of_operation[4];
                        openHourSa = doc.data().hours_of_operation[5];
                        openHourSu= doc.data().hours_of_operation[6];

                        // Pushes information into the features array
                        // in our application, we have a string description of the facilities
                        features.push({
                            'type': 'Feature',
                            'properties': {
                                'description': `
                                <img src="${cover}" class="cover-img" width=220px height=100px>
                                <strong>${event_name}</strong><p>${address}</p>
                                <div class="OH">Open time:<br>
                                  ${openHourM}<br>
                                  ${openHourT}<br>
                                  ${openHourW}<br>
                                  ${openHourTh}<br>
                                  ${openHourF}<br>
                                  ${openHourSa}<br>
                                  ${openHourSu}<br>
                                </div>
                                <a href="facility_info.html?docID=${doc.id}">More Info</a>`
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': Coordinates
                            }
                        });
                    });

                    // Adds features as a source of data for the map
                    map.addSource('places', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': features
                        }
                    });

                    // Creates a layer above the map displaying the pins
                    // by using the sources that was just added
                    map.addLayer({
                        'id': 'places',
                        'type': 'symbol',
                        // source: 'places',
                        'source': 'places',
                        'layout': {
                            'icon-image': 'eventpin', // Pin Icon
                            'icon-size': 0.1, // Pin Size
                            'icon-allow-overlap': true // Allows icons to overlap
                        }
                    });

                    map.on('click', 'places', (e) => {
                        // Extract coordinates array.
                        // Extract description of that place
                        const coordinates = e.features[0].geometry.coordinates.slice();
                        const description = e.features[0].properties.description;

                        // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map);
                    });

                    //-----------------------------------------------------------------------
                    // Add mousenter event listener, and handler function to 
                    // Change the cursor to a pointer when the mouse is over the places layer.
                    //-----------------------------------------------------------------------
                    map.on('mouseenter', 'places', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    // Defaults cursor when not hovering over the places layer
                    map.on('mouseleave', 'places', () => {
                        map.getCanvas().style.cursor = '';
                    });
                });
            }
        );

        // Add the image to the map style.
        map.loadImage(
            'https://cdn-icons-png.flaticon.com/512/61/61168.png',
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style with width and height values
                map.addImage('userpin', image, { width: 10, height: 10 });

                // Adds user's current location as a source to the map
                navigator.geolocation.getCurrentPosition(position => {
                    const userLocation = [position.coords.longitude, position.coords.latitude];
                    if (userLocation) {
                        map.addSource('userLocation', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [{
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': userLocation
                                    },
                                    'properties': {
                                        'description': 'Your location'
                                    }
                                }]
                            }
                        });

                        // Creates a layer above the map displaying the user's location
                        map.addLayer({
                            'id': 'userLocation',
                            'type': 'symbol',
                            'source': 'userLocation',
                            'layout': {
                                'icon-image': 'userpin', // Pin Icon
                                'icon-size': 0.05, // Pin Size
                                'icon-allow-overlap': true // Allows icons to overlap
                            }
                        });

                        // Map On Click function that creates a popup displaying the user's location
                        map.on('click', 'userLocation', (e) => {
                            // Copy coordinates array.
                            const coordinates = e.features[0].geometry.coordinates.slice();
                            const description = e.features[0].properties.description;

                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML(description)
                                .addTo(map);
                        });

                        // Change the cursor to a pointer when the mouse is over the userLocation layer.
                        map.on('mouseenter', 'userLocation', () => {
                            map.getCanvas().style.cursor = 'pointer';
                        });

                        // Defaults cursor when not hovering over the userLocation layer
                        map.on('mouseleave', 'userLocation', () => {
                            map.getCanvas().style.cursor = '';
                        });
                    }
                });
            }
        );
    });
}

// take the user back to the previous page
function goBack() {
    window.history.back();
}
