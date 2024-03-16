Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get() {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  },
});

const videos = document.querySelectorAll('video');

const playAllVideos = () => {
  videos.forEach((video) => {
    if (!video.playing) video.play();
  });

  document.body.removeEventListener('click', playAllVideos);
  document.body.removeEventListener('touchstart', playAllVideos);
};

document.body.addEventListener('click', playAllVideos);
document.body.addEventListener('touchstart', playAllVideos);
