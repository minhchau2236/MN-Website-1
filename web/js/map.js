function InfoBox(opts) {
    google.maps.OverlayView.call(this);
    this.latlng_ = opts.latlng;
    this.map_ = opts.map;
    this.content = opts.content;
    this.offsetVertical_ = -195;
    this.offsetHorizontal_ = 5;
    this.height_ = 165; //Chỉnh chiều cao của infobox
    this.width_ = 590; //Chỉnh chiều rộng của infobox
    var me = this;
    this.boundsChangedListener_ =
        google.maps.event.addListener(this.map_, "bounds_changed", function() {
            return me.panMap.apply(me);
        });
    // Once the properties of this OverlayView are initialized, set its map so
    // that we can display it. This will trigger calls to panes_changed and
    // draw.
    this.setMap(this.map_);
}
/* InfoBox extends GOverlay class from the Google Maps API
 */
InfoBox.prototype = new google.maps.OverlayView();
/* Creates the DIV representing this InfoBox
 */
InfoBox.prototype.remove = function() {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};
/* Redraw the Bar based on the current projection and zoom level
 */
InfoBox.prototype.draw = function() {
    // Creates the element if it doesn't exist already.
    this.createElement();
    if (!this.div_) return;
    // Calculate the DIV coordinates of two opposite corners of our bounds to
    // get the size and position of our Bar
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (!pixPosition) return;
    // Now position our DIV based on the DIV coordinates of our bounds
    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
    this.div_.style.height = this.height_ + "px";
    this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
    this.div_.style.display = 'block';
    this.div_.style.position = 'absolute';
};
/* Creates the DIV representing this InfoBox in the floatPane. If the panes
 * object, retrieved by calling getPanes, is null, remove the element from the
 * DOM. If the div exists, but its parent is not the floatPane, move the div
 * to the new pane.
 * Called from within draw. Alternatively, this can be called specifically on
 * a panes_changed event.
 */
InfoBox.prototype.createElement = function() {
        var panes = this.getPanes();
        var div = this.div_;
        if (!div) {
            // This does not handle changing panes. You can set the map to be null and
            // then reset the map to move the div.
            div = this.div_ = document.createElement("div");
            div.className = "infobox"
            var contentDiv = document.createElement("div");
            contentDiv.className = "content"
            contentDiv.innerHTML = this.content;
            var closeBox = document.createElement("div");
            closeBox.className = "close";
            closeBox.innerHTML = "x";
            div.appendChild(closeBox);

            function removeInfoBox(ib) {
                return function() {
                    ib.setMap(null);
                };
            }
            google.maps.event.addDomListener(closeBox, 'click', removeInfoBox(this));
            div.appendChild(contentDiv);
            div.style.display = 'none';
            panes.floatPane.appendChild(div);
            this.panMap();
        } else if (div.parentNode != panes.floatPane) {
            // The panes have changed. Move the div.
            div.parentNode.removeChild(div);
            panes.floatPane.appendChild(div);
        } else {
            // The panes have not changed, so no need to create or move the div.
        }
    }
    /* Pan the map to fit the InfoBox.
     */
InfoBox.prototype.panMap = function() {
    // if we go beyond map, pan map
    var map = this.map_;
    var bounds = map.getBounds();
    if (!bounds) return;
    // The position of the infowindow
    var position = this.latlng_;
    // The dimension of the infowindow
    var iwWidth = this.width_;
    var iwHeight = this.height_;
    // The offset position of the infowindow
    var iwOffsetX = this.offsetHorizontal_;
    var iwOffsetY = this.offsetVertical_;
    // Padding on the infowindow
    var padX = 40;
    var padY = 40;
    // The degrees per pixel
    var mapDiv = map.getDiv();
    var mapWidth = mapDiv.offsetWidth;
    var mapHeight = mapDiv.offsetHeight;
    var boundsSpan = bounds.toSpan();
    var longSpan = boundsSpan.lng();
    var latSpan = boundsSpan.lat();
    var degPixelX = longSpan / mapWidth;
    var degPixelY = latSpan / mapHeight;
    // The bounds of the map
    var mapWestLng = bounds.getSouthWest().lng();
    var mapEastLng = bounds.getNorthEast().lng();
    var mapNorthLat = bounds.getNorthEast().lat();
    var mapSouthLat = bounds.getSouthWest().lat();
    // The bounds of the infowindow
    var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
    var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
    var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
    var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;
    // calculate center shift
    var shiftLng =
        (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
        (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
    var shiftLat =
        (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
        (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);
    // The center of the map
    var center = map.getCenter();
    // The new map center
    var centerX = center.lng() - shiftLng;
    var centerY = center.lat() - shiftLat;
    // center the map to the new shifted center
    map.setCenter(new google.maps.LatLng(centerY, centerX));
    // Remove the listener after panning is complete.
    google.maps.event.removeListener(this.boundsChangedListener_);
    this.boundsChangedListener_ = null;
};

// map center
//var center = new google.maps.LatLng(40.589500, -8.683542);
var center = new google.maps.LatLng(10.773024, 106.666043);

// marker position
//var factory = new google.maps.LatLng(40.589500, -8.683542);
var factory = new google.maps.LatLng(10.773024, 106.666043); //Trường ĐH Y Khoa Phạm Ngọc Thạch


var iconBase = "web/imgs/marker.png";

var styledMapType = new google.maps.StyledMapType(
    [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#e7f8f0"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dadada"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c9c9c9"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }
    ], { name: 'Styled Map' });
var infoBoxInstance;

function initialize() {
    var mapOptions = {
        center: center,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var contentString = `<div class="shop-store-item">															
			<h4>Minh Long I Co., Ltd - Head Office</h4>	
			
			<div class="shop-store-contact">
				<p class="shop-address">Số 333, Đại lộ Bình Dương, Hưng Lộc, Hưng Định, Tx.Thuận An, Bình Dương.</p>
				<p class="shop-phone"><span>Điện thoại:</span>	  +84 650 3668899</p>
				<p class="shop-fax"><span>Fax:</span>	  	          +84 650 3724173</p>
				<p class="shop-email"><span>Email:</span>			 info@minhlong.com</p>
				<p class="shop-website"><span>Website:</span>		  www.minhlong.com</p>
			</div>
			
			<div class="mb-25">							
				<a class="btn style-2" href="#" title="Xem bản đồ"><i class="mdi mdi-camera"></i>Xem hình ảnh</a>
			</div>
			
			<div class="block-share">
				<span>Chia sẻ:</span>
				<ul class="share-social-icons horizontal">
					<li class="social-icons-facebook">
						<a href="http://www.facebook.com/" target="_blank" title="Facebook">
							<i class="fa fa-facebook"></i>
						</a>
					</li>
					<li class="social-icons-google-plus">
						<a href="#" target="_blank" title="Google +">
							<i class="fa fa-google-plus"></i>
						</a>
					</li>
					<li class="social-icons-facebook">
						<a href="#" target="_blank" title="Mail">
							<i class="fa fa-envelope-o"></i>
						</a>													
					</li>
				</ul>
			</div>
		</div>
		<!-- /.shop-store-item -->`;

    var marker = new google.maps.Marker({
        position: factory,
        map: map,
        icon: iconBase,
        content: contentString
    });

    google.maps.event.addListener(marker, "click", function(e) {
        if (infoBoxInstance) {
            infoBoxInstance.remove();
        }
        infoBoxInstance = new InfoBox({
            latlng: this.getPosition(),
            map: map,
            content: this.content
        });
    });

    infowindow.open(map, marker); // tắt/mở info window

    marker.addListener('mouseover', function() {
        //infowindow.open(map, marker);
    });


    //Resize Function
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

}
google.maps.event.addDomListener(window, 'load', initialize);