// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [20, 0],
  zoom: 2
})

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // Output the data into browser's console for inspection. 
  console.log("Earthquake data:", data)

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  
  // This function defines the visual style for each earthquake marker. 
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.8,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  // I used a hexadecimal color code for the markers based on the depth of the earthquakes. 
  function getColor(depth) {
    return depth > 90 ? "#ea2c2c" : 
           depth > 70 ? "#ea822c" :
           depth > 50 ? "#ee9c00" :
           depth > 30 ? "#eecc00" :
           depth > 10 ? "#d4ee00" :
                        "#98ee00";

  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: " + feature.properties.mag +
        "<br>Location: " + feature.properties.place +
        "<br>Depth: " + feature.geometry.coordinates[2]
      );
    }
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    
    // Initialize depth intervals and colors for the legend
    let depths = [-10, 10, 30, 50, 70, 90];
    let labels = []; 
    
    // Custom styling for the legend (I used inline CSS for a cleafr design). 
    div.innerHTML += `
      <style>
        .info.legend {
          background: white;
          padding: 8px 10px;
          border-radius: 6px;
          box-shadow: 0 0 6px rgba(0,0,0,0.2);
          font-family: sans-serif;
          font-size: 12px;
          color: #333;
        }
        .info.legend i {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 8px;
          vertical-align: middle;
        }
      </style>
    `; 

    // Title for the legend
    div.innerHTML += "<strong>Depth (km)</strong><br><br>";

    //  Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depths.length; i++) {
      labels.push(
        '<i style="background:' + getColor(depths[i] + 1) + '"></i>' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] : '+')
      );
    }

    div.innerHTML += labels.join('<br>');
    return div;
  };
    
  // Finally, add the legend to the map.
  legend.addTo(map);
});
