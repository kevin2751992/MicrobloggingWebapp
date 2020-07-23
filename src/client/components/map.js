var L = require('leaflet');
export class Map {
  constructor (id, blogservice) {
    console.log('test', blogservice);
    this.id = id;
    this.blogservice = blogservice;
  }

  createMap (geoJSon) {
    // Wait for GeoJson Promise and then start init map
    console.log(this.blogservice);
    const mapContainer = document.createElement('div');
    this.blogservice.getGeoJson(this.id).then(geoJSon => {
      this.geoJson = geoJSon;
      console.log('geos', this.geoJson);

      mapContainer.className = 'blogPostmedia';
      const mapouter = document.createElement('div');
      mapouter.className = 'mapouter';

      const mapCanvas = document.createElement('div');
      mapCanvas.id = 'map' + Math.random();
      mapContainer.className = 'gmap_canvas';
      this.map = L.map(mapCanvas).setView([51.505, -0.09], 13);
      L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(this.map);
      // This is a known and well-documented issue with Leaflet. If the map container div doesn't have a defined size at the point that the map initialises, the tiles don't load.
      // after the map is initilized we have to inform it that we changed the size of the container.
      this.map.whenReady(() => {
        console.log('ready');
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
      });

      mapouter.appendChild(mapCanvas);
      mapContainer.appendChild(mapouter);
    });
    return mapContainer;
  }
}
