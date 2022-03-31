// const campground = require("../../models/campground");

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

 new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .addTo(map);

 new mapboxgl.Popup({ offset:25 ,closeOnClick: false })
    .setLngLat(campground.geometry.coordinates)
    .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
    .addTo(map);