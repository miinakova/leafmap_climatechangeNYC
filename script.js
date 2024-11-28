// Initialize the map
const map = L.map('map').setView([40.7128, -74.0060], 12); // NYC coordinates

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to style each feature based on 'Score_out'
function styleFeature(feature) {
    const score = feature.properties.Score_out; // Access 'Score_out' field
    let color = '#FFFFFF'; // Default color

    // Define colors based on the score
    if (score === 1) color = '#FFF7E0'; // Light beige
    else if (score === 2) color = '#FDE5B2'; // Light orange
    else if (score === 3) color = '#FDB46B'; // Orange
    else if (score === 4) color = '#E8603C'; // Dark orange
    else if (score === 5) color = '#8C2D04'; // Dark brown

    return {
        color: '#000',        // Black border
        weight: 1,            // Thin border
        fillColor: color,     // Fill color based on score
        fillOpacity: 0.7      // Slight transparency
    };
}

// Function to bind popups to each feature
function onEachFeature(feature, layer) {
    const ntaName = feature.properties.NTA; // Adjust to your attribute naming
    const score = feature.properties.Score_out;

    layer.bindPopup(
        `<strong>Neighborhood:</strong> ${ntaName}<br>
         <strong>Score:</strong> ${score}`
    );
}

// Load GeoJSON data
fetch('data/climate_effects.geojson') // Ensure your GeoJSON file is named correctly
    .then(response => response.json())
    .then(data => {
        // Add GeoJSON layer with styling and popups
        L.geoJSON(data, {
            style: styleFeature,
            onEachFeature: onEachFeature
        }).addTo(map);
    });

