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