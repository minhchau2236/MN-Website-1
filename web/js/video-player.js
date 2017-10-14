
(function(window) {
    window.mlVideoPlayer = function(video, videoWrapper) {
        var videoPlayButton;
        var videoMethods = {
            renderVideoPlayButton: function () {
                if (videoWrapper.contains(video)) {
                    this.formatVideoPlayButton()
                    video.classList.add('has-media-controls-hidden')
                    videoPlayButton = videoWrapper.getElementsByClassName('icon-play')[0]
                    videoPlayButton.addEventListener('click', this.hideVideoPlayButton)
                }
            },
    
            formatVideoPlayButton: function () {
                // videoWrapper.insertAdjacentHTML('beforeend', '\
                //     <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
                //         <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                //         <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                //     </svg>\
                // ')

                videoWrapper.insertAdjacentHTML('beforeend', '\
                <div class="icon-play">\
                    <a href="javascript:void()"><i class="mdi mdi-triangle-outline"></i></a>\
                </div>\
            ')

                
            },
    
            hideVideoPlayButton: function () {
                video.play()
                videoPlayButton.classList.add('hidden')
                video.classList.remove('has-media-controls-hidden')
                video.setAttribute('controls', 'controls')
            }
        }
        videoMethods.renderVideoPlayButton()
    }    
})(window)

