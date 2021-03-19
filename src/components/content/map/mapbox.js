const addMarker = (vm, coords) => {
    // coords: [12.550343, 55.665957] for exp
    const mapboxgl = vm.$mapbox.mapboxgl
    let map = vm.$mapbox.map
    let marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .addTo(map);
}

