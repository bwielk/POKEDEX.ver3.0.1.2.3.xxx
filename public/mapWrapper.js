var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    centre: coords,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker ({
    position: coords,
    map: this.googleMap
    });
  },

  newPosition: function(coords){
    this.googleMap.panTo(coords);
    this.googleMap.setCenter(coords);
    this.addMarker(coords);
    this.googleMap.setZoom(20);
  }
}