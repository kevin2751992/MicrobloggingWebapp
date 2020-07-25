var L = require('leaflet');
export class Map {
  constructor (id, blogservice, container) {
    this.id = id;
    this.blogservice = blogservice;
    this.container = container;
  }

  createMap (geoJSon) {
    // Wait for GeoJson Promise and then start init map

    const mapContainer = document.createElement('div');

    this.blogservice.getGeoJson(this.id).then(geoJSon => {
      this.geoJson = geoJSon;
      mapContainer.className = 'blogPostmedia';
      const mapouter = document.createElement('div');
      mapouter.className = 'mapouter';
      const mapCanvas = document.createElement('div');
      mapCanvas.id = 'map' + Math.random();
      mapContainer.className = 'gmap_canvas';
      this.map = L.map(mapCanvas).setView([49.7887, 6.4469], 12);
      // L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

      /* L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia2V2aW4yNzUxOTkyIiwiYSI6ImNrY3lwcjhmcDBjOGwzM2xhbDNheGN1cGYifQ.t3FCFqUzVh-pq3eMapN2Bw'
      }).addTo(this.map); */
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia2V2aW4yNzUxOTkyIiwiYSI6ImNrY3lwcjhmcDBjOGwzM2xhbDNheGN1cGYifQ.t3FCFqUzVh-pq3eMapN2Bw'
      }).addTo(this.map);
      console.log('geos', this.geoJson);
      const geoJson = L.geoJSON(this.geoJson).addTo(this.map);
      console.log('bounds', geoJson.getBounds());
      // const test = [[49.84006, 7.17886], [50.34799, 7.65017]];

      this.map.flyTo(geoJson.getBounds().getCenter(), 11);

      // this.map.fitBounds(geoJson.getBounds());

      // This is a known and well-documented issue with Leaflet. If the map container div doesn't have a defined size at the point that the map initialises, the tiles don't load.
      // after the map is initilized we have to inform it that we changed the size of the container.
      this.map.whenReady(() => {
        setTimeout(() => {
          this.map.invalidateSize();
        }, 100);
      });

      mapouter.appendChild(mapCanvas);
      mapContainer.appendChild(mapouter);
      // insert map befor the PostContent ( Title, Text)
      // Position 0 = MetaContainer
      // Position 1 = MediaContainer
      // Position 2= Content
      this.container.insertBefore(mapContainer, this.container.children[1]);
    });
  }

  addGeoJsonLayer () {

  }
}
