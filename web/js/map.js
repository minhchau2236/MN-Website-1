// map center
var center = new google.maps.LatLng(10.946443, 106.704496);

// marker position
var factory = new google.maps.LatLng(10.946443, 106.704496); //Số 333, Đại lộ Bình Dương, Hưng Lộc, Hưng Định, Tx.Thuận An, Bình Dương.


var iconBase = "web/imgs/marker.png";

var styledMapType = new google.maps.StyledMapType(
    [], { name: 'Styled Map' });
var infoBoxInstance;

function initialize() {
    var mapOptions = {
        scrollwheel: false,
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
			
			<div class="mb-10">							
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
		</div>`;

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

    infoBoxInstance = new InfoBox({
        latlng: marker.getPosition(),
        map: map,
        content: marker.content
    });

    //infowindow.open(map, marker); // tắt/mở info window

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