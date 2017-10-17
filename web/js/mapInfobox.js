(function(window) {
    window.InfoBox = function(opts) {
            google.maps.OverlayView.call(this);
            this.latlng_ = opts.latlng;
            this.map_ = opts.map;
            this.content = opts.content;
            this.offsetVertical_ = -195;
            this.offsetHorizontal_ = 5;
            this.height_ = 396; //Chỉnh chiều cao của infobox
            this.width_ = 590; //Chỉnh chiều rộng của infobox
            this.arrowHeight_ = 20; //chiều cao mũi tên
            var me = this;
            this.boundsChangedListener_ =
                google.maps.event.addListener(this.map_, "bounds_changed", function() {
                    return me.panMap.apply(me);
                });
            // Once the properties of this OverlayView are initialized, set its map so
            // that we can display it. This will trigger calls to panes_changed and
            // draw.
            this.setMap(this.map_);
            $(window).on('resize', me.draw.bind(me));
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
        //Lấy dom element cha để tính vị trí hiển thị cho infobox,
        //tính hiển thị bên phải marker hay bên dưới marker theo màn hình
        var parentElement = this.div_.parentElement;
        if (!parentElement) return;

        this.div_.style.width = this.width_ + "px";
        this.div_.style.height = this.height_ + "px";

        // Now position our DIV based on the DIV coordinates of our bounds
        if (pixPosition.x + this.width_ - this.offsetHorizontal_ < parentElement.clientWidth) {
            setRightSidePosition.call(this);
        } else {
            setBottomSidePosition.call(this);
        }

        function setRightSidePosition() {
            this.div_.style.left = (pixPosition.x + this.offsetHorizontal_ + 50) + "px"; // dịch sang trái thêm 50px
            this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
            this.div_.classList.remove("bottom");
            this.div_.classList.add("right");
        }

        function setBottomSidePosition() {
            this.div_.style.left = (pixPosition.x - this.width_ / 2) + "px"; // dịch sang trái thêm 50px
            this.div_.style.top = (pixPosition.y + this.offsetHorizontal_ + this.arrowHeight_) + "px";
            this.div_.classList.remove("right");
            this.div_.classList.add("bottom");
        }
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

})(window)