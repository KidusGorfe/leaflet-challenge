var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

fetch('earthquake_data.json')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            var magnitude = feature.properties.mag;
            var depth = feature.geometry.coordinates[2];
            var color = depthToColor(depth);
            var markerSize = magnitudeToSize(magnitude);

            L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                color: color,
                fillColor: color,
                fillOpacity: 0.75,
                radius: markerSize
            }).addTo(map).bindPopup(`Location: ${feature.properties.place}<br>Magnitude: ${magnitude}<br>Depth: ${depth} km`);
        });
    });

function depthToColor(depth) {
    // Darker color for greater depths
    return depth > 300 ? '#800026' :
           depth > 250 ? '#BD0026' :
           depth > 200 ? '#E31A1C' :
           depth > 150 ? '#FC4E2A' :
           depth > 100 ? '#FD8D3C' :
           depth > 50  ? '#FEB24C' :
           '#FFEDA0';
}

function magnitudeToSize(magnitude) {
    // Larger size for higher magnitudes
    return magnitude * 20000; // Adjust multiplier as needed
}

// Add a legend to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
      depths = [0, 50, 100, 150, 200, 250, 300],
      labels = [];

  // Generate a label with a colored square for each depth range
  for (var i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + depthToColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
  }

  return div;
};

legend.addTo(map);
