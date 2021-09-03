mapboxgl.accessToken =
  'pk.eyJ1IjoiYXltZW5ieiIsImEiOiJja245aHk5ZGgwczJpMndxbnltZmkxaW1rIn0.MRywY8Eelk2NUJ2yQ70eqA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 6,
  center: [10.322707843750004,34.21465259411937]
});
var marker = new mapboxgl.Marker()
marker.setLngLat([10.322707843750004,34.21465259411937]).addTo(map);
// Fetch stores from API
async function getPartenaires() {
  const res = await fetch('http://192.168.43.47:3000/partenaires');
  const data = await res.json();

  const partenaires = data.map(partenaire => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
            partenaire.location.coordinates[0],
            partenaire.location.coordinates[1]
        ]
      },
      properties: {
        storeId: partenaire.nom,
        icon: 'shop'
      }
      
    };
  });

  loadMap(partenaires);
}

// Load map with stores
function loadMap(partenaires) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: partenaires
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getPartenaires();