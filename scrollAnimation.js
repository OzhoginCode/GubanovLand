const scrollingUpperTextSectionAbout = document.querySelector('.section-about-scrolling-text-upper');
const scrollingLowerTextSectionAbout = document.querySelector('.section-about-scrolling-text-lower');

const scrollingUpperTextSectionPrices = document.querySelector('.section-prices-header-scrolling-text-upper');
const scrollingLowerTextSectionPrices = document.querySelector('.section-prices-header-scrolling-text-lower');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const offset = scrollPosition / 6;

  scrollingUpperTextSectionAbout.style.transform = `translateX(${offset}px)`;
  scrollingLowerTextSectionAbout.style.transform = `translateX(${-offset}px)`;

  scrollingUpperTextSectionPrices.style.transform = `translateX(${offset - 600}px)`;
  scrollingLowerTextSectionPrices.style.transform = `translateX(${-offset - 600}px)`;
});

const sectionReviewsContainer = document.getElementById('section-reviews-reviews-container');
const sectionReviewsScrollButtonLeft = document.getElementById('sectionReviewsScrollButtonLeft');
const sectionReviewsScrollButtonRight = document.getElementById('sectionReviewsScrollButtonRight');

sectionReviewsScrollButtonLeft.addEventListener('click', () => {
  sectionReviewsContainer.scrollLeft -= sectionReviewsContainer.offsetWidth;
});

sectionReviewsScrollButtonRight.addEventListener('click', () => {
  sectionReviewsContainer.scrollLeft += sectionReviewsContainer.offsetWidth;
});

sectionReviewsContainer.addEventListener('scroll', () => {
  const classEnabledName = 'scroll-button-enabled';
  const classDisabledName = 'scroll-button-disabled';

  // eslint-disable-next-line max-len
  if (sectionReviewsContainer.scrollLeft >= sectionReviewsContainer.scrollWidth - sectionReviewsContainer.clientWidth - 5) {
    sectionReviewsScrollButtonRight.classList.add(classDisabledName);
    sectionReviewsScrollButtonRight.classList.remove(classEnabledName);
  } else {
    sectionReviewsScrollButtonRight.classList.add(classEnabledName);
    sectionReviewsScrollButtonRight.classList.remove(classDisabledName);
  }

  if (sectionReviewsContainer.scrollLeft <= 0) {
    sectionReviewsScrollButtonLeft.classList.add(classDisabledName);
    sectionReviewsScrollButtonLeft.classList.remove(classEnabledName);
  } else {
    sectionReviewsScrollButtonLeft.classList.remove(classDisabledName);
    sectionReviewsScrollButtonLeft.classList.add(classEnabledName);
  }
});

const sectionWorksContainer = document.getElementById('section-works-audio-cards-container');
const sectionWorksScrollButtonLeft = document.getElementById('sectionWorksScrollButtonLeft');
const sectionWorksScrollButtonRight = document.getElementById('sectionWorksScrollButtonRight');

const audioCard = document.querySelector('.section-works-audio-card');
const cardWidth = audioCard.offsetWidth + 20;

sectionWorksScrollButtonLeft.addEventListener('click', () => {
  sectionWorksContainer.scrollLeft -= cardWidth;
});

sectionWorksScrollButtonRight.addEventListener('click', () => {
  sectionWorksContainer.scrollLeft += cardWidth;
});

sectionWorksContainer.addEventListener('scroll', () => {
  const classEnabledName = 'scroll-button-enabled';
  const classDisabledName = 'scroll-button-disabled';

  // eslint-disable-next-line max-len
  if (sectionWorksContainer.scrollLeft >= sectionWorksContainer.scrollWidth - sectionWorksContainer.clientWidth - 5) {
    sectionWorksScrollButtonRight.classList.add(classDisabledName);
    sectionWorksScrollButtonRight.classList.remove(classEnabledName);
  } else {
    sectionWorksScrollButtonRight.classList.add(classEnabledName);
    sectionWorksScrollButtonRight.classList.remove(classDisabledName);
  }

  if (sectionWorksContainer.scrollLeft <= 0) {
    sectionWorksScrollButtonLeft.classList.add(classDisabledName);
    sectionWorksScrollButtonLeft.classList.remove(classEnabledName);
  } else {
    sectionWorksScrollButtonLeft.classList.remove(classDisabledName);
    sectionWorksScrollButtonLeft.classList.add(classEnabledName);
  }
});

// БЕСКОНЕЧНЫЙ СКРОЛЛ
const carouselContainer = document.querySelector('.section-works-audio-cards-container');
const carouselCards = Array.from(document.querySelectorAll('.section-works-audio-card'));
const carouselCount = carouselCards.length;
// const cardWidth = carouselCards[0].offsetWidth + 20;
let currentPosition = 0;
let previousPosition = 0;
let positionSet = 0;

carouselContainer.addEventListener('scroll', () => {
  const { scrollLeft } = carouselContainer;
  previousPosition = currentPosition;
  currentPosition = Math.floor(scrollLeft / cardWidth) - (carouselCount * positionSet);

  const delta = currentPosition - previousPosition;

  if (currentPosition > carouselCount) {
    currentPosition -= carouselCount;
    previousPosition -= carouselCount;
    positionSet += 1;
  }

  if (currentPosition < 0) {
    currentPosition += carouselCount;
    previousPosition += carouselCount;
    positionSet -= 1;
  }

  if (delta > 0) {
    if (currentPosition === 1 && positionSet === 0) return;
    if (currentPosition === 1) {
      const leftmostCard = carouselCards[carouselCount - 1];
      leftmostCard.style.transform = `translateX(${cardWidth * carouselCount * (positionSet)}px)`;
      return;
    }
    const leftmostCard = carouselCards[currentPosition - 2];
    leftmostCard.style.transform = `translateX(${cardWidth * carouselCount * (positionSet + 1)}px)`;
  }

  if (delta < 0) {
    if (currentPosition === 0 && positionSet === 0) return;
    if (currentPosition === 0) {
      const rightmostCard = carouselCards[carouselCount - 1];
      rightmostCard.style.transform = `translateX(${(cardWidth * carouselCount * (positionSet)) - cardWidth * carouselCount}px)`;
      return;
    }
    const rightmostCard = carouselCards[currentPosition - 1];
    rightmostCard.style.transform = `translateX(${(cardWidth * carouselCount * (positionSet + 1)) - cardWidth * carouselCount}px)`;
  }
});
