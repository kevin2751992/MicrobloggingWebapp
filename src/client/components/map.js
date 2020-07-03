
export class Map {
  constructor (longitude, latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.zoom = 15;
  }

  createMap () {
    const mapContainer = document.createElement('div');
    mapContainer.className = 'blogPostmedia';
    const mapouter = document.createElement('div');
    mapouter.className = 'mapouter';

    const mapCanvas = document.createElement('div');
    mapContainer.className = 'gmap_canvas';

    const iframe = document.createElement('iframe');
    iframe.height = '500';

    iframe.id = 'gmap_canvas';

    iframe.src = 'https://maps.google.com/maps?q=' + this.latitude + '%2C%20' + this.longitude + '&t=&z=' + this.zoom + '&ie=UTF8&iwloc=&output=embed';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.marginHeight = '0';
    iframe.marginWidth = '0';
    iframe.className = 'mapFrame';

    mapCanvas.appendChild(iframe);
    mapouter.appendChild(mapCanvas);
    mapContainer.appendChild(mapouter);
    return mapContainer;
  }
}
