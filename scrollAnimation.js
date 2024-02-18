const scrollingUpperTextSectionAbout = document.querySelector('.section-about-scrolling-text-upper');
const scrollingLowerTextSectionAbout = document.querySelector('.section-about-scrolling-text-lower');

const scrollingUpperTextSectionPrices = document.querySelector('.section-prices-header-scrolling-text-upper');
const scrollingLowerTextSectionPrices = document.querySelector('.section-prices-header-scrolling-text-lower');

let scrollPosition = 0;

const scrollElements = () => {
  scrollPosition = window.scrollY;
  const offset = scrollPosition / 6;

  scrollingUpperTextSectionAbout.style.transform = `translateX(${offset}px)`;
  scrollingLowerTextSectionAbout.style.transform = `translateX(${-offset}px)`;

  scrollingUpperTextSectionPrices.style.transform = `translateX(${offset}px)`;
  scrollingLowerTextSectionPrices.style.transform = `translateX(${-offset}px)`;
};

window.addEventListener('scroll', scrollElements);

window.addEventListener('touchmove', scrollElements);

const sectionReviewsContainer = document.getElementById('section-reviews-reviews-container');
const sectionReviewsScrollButtonLeft = document.getElementById('sectionReviewsScrollButtonLeft');
const sectionReviewsScrollButtonRight = document.getElementById('sectionReviewsScrollButtonRight');
let offsetWidth;

sectionReviewsScrollButtonLeft.addEventListener('click', () => {
  sectionReviewsContainer.scrollLeft -= offsetWidth;
});

sectionReviewsScrollButtonRight.addEventListener('click', () => {
  sectionReviewsContainer.scrollLeft += offsetWidth;
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

const reviewCard = document.querySelector('.section-reviews-review');

const updateOffsetWidth = () => {
  offsetWidth = reviewCard.offsetWidth + 20;
};

window.addEventListener('load', updateOffsetWidth);
window.addEventListener('resize', updateOffsetWidth);

const sectionWorksContainer = document.getElementById('section-works-audio-cards-container');
const sectionWorksScrollButtonLeft = document.getElementById('sectionWorksScrollButtonLeft');
const sectionWorksScrollButtonRight = document.getElementById('sectionWorksScrollButtonRight');

const audioCard = document.querySelector('.section-works-audio-card');
const audioCardWidth = audioCard.offsetWidth + 20;

sectionWorksScrollButtonLeft.addEventListener('click', () => {
  sectionWorksContainer.scrollLeft -= audioCardWidth;
});

sectionWorksScrollButtonRight.addEventListener('click', () => {
  sectionWorksContainer.scrollLeft += audioCardWidth;
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
const audioCardsContainer = document.querySelector('.section-works-audio-cards-container');
const reviewsContainer = document.querySelector('.section-reviews-reviews-container');
const carouselAudioCards = Array.from(document.querySelectorAll('.section-works-audio-card'));
const carouselReviewsCards = Array.from(document.querySelectorAll('.section-reviews-review'));

const applyInfiniteScroll = (carouselContainer, carouselCards) => {
  const carouselCount = carouselCards.length;
  let cardWidth = carouselCards[0].offsetWidth + 20;

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
  const updateCardWidth = () => {
    cardWidth = carouselCards[0].offsetWidth + 20;
  };

  window.addEventListener('load', updateCardWidth);
  window.addEventListener('resize', updateCardWidth);
};

applyInfiniteScroll(audioCardsContainer, carouselAudioCards);
applyInfiniteScroll(reviewsContainer, carouselReviewsCards);

const warningElements = document.querySelectorAll('.section-prices-warning-hover-text');

warningElements.forEach((element) => {
  const rect = element.getBoundingClientRect();
  if (rect.right > window.innerWidth - 25) {
    // eslint-disable-next-line no-param-reassign
    element.style.left = `${rect.right - window.innerWidth - 300}px`;
  }
});
