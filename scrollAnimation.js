window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const offset = scrollPosition / 6;

  const scrollingUpperTextSectionAbout = document.querySelector('.section-about-scrolling-text-upper');
  const scrollingLowerTextSectionAbout = document.querySelector('.section-about-scrolling-text-lower');

  scrollingUpperTextSectionAbout.style.transform = 'translateX(' + (+offset) + 'px)';
  scrollingLowerTextSectionAbout.style.transform = 'translateX(' + (-offset) + 'px)';

  const scrollingUpperTextSectionPrices = document.querySelector('.section-prices-header-scrolling-text-upper');
  const scrollingLowerTextSectionPrices = document.querySelector('.section-prices-header-scrolling-text-lower');

  if (scrollPosition < 3600) return;
  else {
    scrollingUpperTextSectionPrices.style.transform = 'translateX(' + (+offset - 600) + 'px)';
    scrollingLowerTextSectionPrices.style.transform = 'translateX(' + (-offset - 600) + 'px)';
  }
});

const sectionWorksContainer = document.getElementById('section-works-audio-cards-container');

document.getElementById('sectionWorksScrollButtonLeft').addEventListener('click', () => {
  const audioCard = document.querySelector('.section-works-audio-card');
  const cardWidth = audioCard.offsetWidth + 20;
  sectionWorksContainer.scrollLeft -= cardWidth;
});

document.getElementById('sectionWorksScrollButtonRight').addEventListener('click', () => {
  const audioCard = document.querySelector('.section-works-audio-card');
  const cardWidth = audioCard.offsetWidth + 20;
  sectionWorksContainer.scrollLeft += cardWidth;
});

const sectionReviewsContainer = document.getElementById('section-reviews-reviews-container');

document.getElementById('sectionReviewsScrollButtonLeft').addEventListener('click', () => {
  sectionReviewsContainer.scrollLeft -= sectionReviewsContainer.offsetWidth;
});

document.getElementById('sectionReviewsScrollButtonRight').addEventListener('click', () => {
  sectionReviewsContainer.scrollLeft += sectionReviewsContainer.offsetWidth;
});

sectionReviewsContainer.addEventListener('scroll', () => {
  const scrollButtonRight = document.getElementById('sectionReviewsScrollButtonRight');
  const scrollButtonLeft = document.getElementById('sectionReviewsScrollButtonLeft');
  const classEnabledName = 'scroll-button-enabled';
  const classDisabledName = 'scroll-button-disabled';

    if (sectionReviewsContainer.scrollLeft >= sectionReviewsContainer.scrollWidth - sectionReviewsContainer.clientWidth - 5) {
      scrollButtonRight.classList.add(classDisabledName);
      scrollButtonRight.classList.remove(classEnabledName);
    } else {
      scrollButtonRight.classList.add(classEnabledName);
      scrollButtonRight.classList.remove(classDisabledName);
    }

    if (sectionReviewsContainer.scrollLeft === 0) {
      scrollButtonLeft.classList.add(classDisabledName);
      scrollButtonLeft.classList.remove(classEnabledName);
    } else {
      scrollButtonLeft.classList.remove(classDisabledName);
      scrollButtonLeft.classList.add(classEnabledName);
    }
});

sectionWorksContainer.addEventListener('scroll', () => {
  const scrollButtonRight = document.getElementById('sectionWorksScrollButtonRight');
  const scrollButtonLeft = document.getElementById('sectionWorksScrollButtonLeft');
  const classEnabledName = 'scroll-button-enabled';
  const classDisabledName = 'scroll-button-disabled';

    if (sectionWorksContainer.scrollLeft >= sectionWorksContainer.scrollWidth - sectionWorksContainer.clientWidth - 5) {
      scrollButtonRight.classList.add(classDisabledName);
      scrollButtonRight.classList.remove(classEnabledName);
    } else {
      scrollButtonRight.classList.add(classEnabledName);
      scrollButtonRight.classList.remove(classDisabledName);
    }

    if (sectionWorksContainer.scrollLeft === 0) {
      scrollButtonLeft.classList.add(classDisabledName);
      scrollButtonLeft.classList.remove(classEnabledName);
    } else {
      scrollButtonLeft.classList.remove(classDisabledName);
      scrollButtonLeft.classList.add(classEnabledName);
    }
});

// БЕСКОНЕЧНЫЙ СКРОЛЛ
const carouselContainer = document.querySelector('.section-works-audio-cards-container');
const carouselCards = Array.from(document.querySelectorAll('.section-works-audio-card'));
const carouselCount = carouselCards.length;
const cardWidth = carouselCards[0].offsetWidth + 20;
let currentPosition = 0;
let previousPosition = 0;
let positionSet = 0;

carouselContainer.addEventListener('scroll', () => {
  const scrollLeft = carouselContainer.scrollLeft;
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
