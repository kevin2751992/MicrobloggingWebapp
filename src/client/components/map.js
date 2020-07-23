var L = require('leaflet');
export class Map {
  constructor (id, blogservice, container) {
    console.log('test', blogservice);
    this.id = id;
    this.blogservice = blogservice;
    this.container = container;
  }

  createMap (geoJSon) {
    // Wait for GeoJson Promise and then start init map
    console.log(this.blogservice);
    const mapContainer = document.createElement('div');
    console.log('id', this.id);
    this.blogservice.getGeoJson(this.id).then(geoJSon => {
      this.geoJson = geoJSon;
      console.log('geos', this.geoJson);

      mapContainer.className = 'blogPostmedia';
      const mapouter = document.createElement('div');
      mapouter.className = 'mapouter';

      const mapCanvas = document.createElement('div');
      mapCanvas.id = 'map' + Math.random();
      mapContainer.className = 'gmap_canvas';
      console.log('cords', this.geoJson.features[0].geometry.coordinates);
      this.map = L.map(mapCanvas).setView([49.85881, 6.54471], 36);
      L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

      /* L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia2V2aW4yNzUxOTkyIiwiYSI6ImNrY3lwcjhmcDBjOGwzM2xhbDNheGN1cGYifQ.t3FCFqUzVh-pq3eMapN2Bw'
      }).addTo(this.map); */
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia2V2aW4yNzUxOTkyIiwiYSI6ImNrY3lwcjhmcDBjOGwzM2xhbDNheGN1cGYifQ.t3FCFqUzVh-pq3eMapN2Bw'
      }).addTo(this.map);

      const geoJson = L.geoJSON(this.geoJson).addTo(this.map);
      console.log('geojsonLaywe', geoJson);
      this.map.fitBounds(geoJson.getBounds());
      this.map.flyTo(geoJson.getBounds().getCenter(), 12);

      // This is a known and well-documented issue with Leaflet. If the map container div doesn't have a defined size at the point that the map initialises, the tiles don't load.
      // after the map is initilized we have to inform it that we changed the size of the container.
      this.map.whenReady(() => {
        console.log('ready');
        setTimeout(() => {
          this.map.invalidateSize();
        }, 100);
      });

      mapouter.appendChild(mapCanvas);
      mapContainer.appendChild(mapouter);
      this.container.appendChild(mapContainer);
    });
  }

  addGeoJsonLayer () {

  }
}
