const audioCards = document.querySelectorAll('.section-works-audio-card');

const audioCardObjects = Array.from(audioCards).map((audioCard, index) => {
  const audio = audioCard.querySelector('.section-works-audio-card-player');
  const playBtn = audioCard.querySelector('.section-works-audio-card-controls-play');
  const backwardBtn = audioCard.querySelector('.section-works-audio-card-controls-backward');
  const forwardBtn = audioCard.querySelector('.section-works-audio-card-controls-forward');
  const progressBarContainer = audioCard.querySelector('.section-works-audio-card-progress-bar-container');
  const progressBar = audioCard.querySelector('.section-works-audio-card-progress-bar');
  const progressBarCircle = audioCard.querySelector('.section-works-audio-card-progress-bar-circle-inner');
  const currentTimeElem = audioCard.querySelector('.section-works-audio-card-current-time');
  const isDragging = false;
  const songIndex = index;

  return {
    audio,
    audioCard,
    playBtn,
    backwardBtn,
    forwardBtn,
    progressBarContainer,
    progressBar,
    progressBarCircle,
    currentTimeElem,
    isDragging,
    songIndex,
  };
});

let playingSong = null;
const pauseImg = `<svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="14" width="8" height="32" rx="2.22272" fill="white"/>
<rect width="8" height="32" rx="2.22272" fill="white"/>
</svg>`;
const playImg = `<svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.3183 13.2437C23.2272 13.8344 23.2272 15.1656 22.3183 15.7563L2.31295 28.7558C1.31681 29.4031 -5.09473e-08 28.6879 9.96796e-10 27.4995L1.13745e-06 1.50047C1.1894e-06 0.312126 1.31682 -0.403091 2.31296 0.244205L22.3183 13.2437Z" fill="white"/>
</svg>`;

const formatTime = (time) => {
  const seconds = Math.floor(time);
  const formattedSeconds = String(seconds).padStart(2, '0');
  const result = `00:${formattedSeconds}`;
  return result;
};

const updateProgress = (audioCard) => {
  const { audio, currentTimeElem, progressBar } = audioCard;
  const { duration, currentTime } = audio;

  const progressPercent = (currentTime / duration) * 100;

  const formattedCurrentTime = formatTime(currentTime);
  currentTimeElem.innerHTML = formattedCurrentTime;
  progressBar.style.width = `${progressPercent}%`;

  if (playingSong === null) return;
  requestAnimationFrame(() => updateProgress(audioCard));
};

const pauseSong = (audioCard) => {
  const {
    audio, playBtn, progressBar, progressBarCircle,
  } = audioCard;

  audio.pause();
  playBtn.innerHTML = playImg;
  audio.classList.remove('playing');
  playingSong = null;
  progressBar.style.background = 'var(--white-1)';
  progressBarCircle.setAttribute('fill', 'var(--white-1)');
};

const pauseAllSongs = () => audioCardObjects.forEach((audioCard) => pauseSong(audioCard));

const playSong = (audioCard) => {
  const {
    audio, playBtn, progressBar, progressBarCircle,
  } = audioCard;

  pauseAllSongs();
  audio.play();
  playBtn.innerHTML = pauseImg;
  audio.classList.add('playing');
  playingSong = audioCard.songIndex;
  progressBar.style.background = 'var(--yellow)';
  progressBarCircle.setAttribute('fill', 'var(--yellow)');

  updateProgress(audioCard);
};

const setProgress = (e, audioCard) => {
  const { audio, progressBarContainer } = audioCard;
  const { duration } = audio;

  const width = progressBarContainer.clientWidth;
  const clickX = e.clientX - progressBarContainer.getBoundingClientRect().left;

  audio.currentTime = (clickX / width) * duration;
  updateProgress(audioCard);
};

const playSongFromStart = (audioCard) => {
  const { audio } = audioCard;
  audio.currentTime = 0;
  playSong(audioCard);
};

const playNextSong = (audioCard) => {
  if (audioCard.songIndex !== playingSong) return;
  if (playingSong + 1 === audioCardObjects.length) {
    playSong(audioCardObjects[0]);
    return;
  }
  playSong(audioCardObjects[playingSong + 1]);
};

const dragStart = (audioCard) => {
  // eslint-disable-next-line no-param-reassign
  audioCard.isDragging = true;
  pauseAllSongs();
};

const drag = (e, audioCard) => {
  if (audioCard.isDragging) setProgress(e, audioCard);
};

const dragEnd = (audioCard) => {
  if (!audioCard.isDragging) return;
  // eslint-disable-next-line no-param-reassign
  audioCard.isDragging = false;
  pauseAllSongs();
  playSong(audioCard);
};

audioCardObjects.forEach((audioCard) => {
  const {
    audio, playBtn, backwardBtn, forwardBtn, progressBarContainer, progressBarCircle,
  } = audioCard;
  playBtn.addEventListener('click', () => {
    const isPlaying = audio.classList.contains('playing');
    // eslint-disable-next-line no-unused-expressions
    isPlaying ? (pauseSong(audioCard)) : (playSong(audioCard));
  });
  audio.addEventListener('ended', () => pauseSong(audioCard));
  backwardBtn.addEventListener('click', () => playSongFromStart(audioCard));
  forwardBtn.addEventListener('click', () => playNextSong(audioCard));
  progressBarContainer.addEventListener('click', (e) => setProgress(e, audioCard));
  progressBarCircle.addEventListener('mousedown', () => dragStart(audioCard));
  document.addEventListener('mouseup', () => dragEnd(audioCard));
  window.addEventListener('mousemove', (e) => drag(e, audioCard));
});
