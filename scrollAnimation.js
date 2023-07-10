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

const container = document.getElementById('section-reviews-reviews-container');

document.getElementById('scrollButtonLeft').addEventListener('click', () => {
  container.scrollLeft -= container.offsetWidth;
});

document.getElementById('scrollButtonRight').addEventListener('click', () => {
  container.scrollLeft += container.offsetWidth;
  }
);

container.addEventListener('scroll', () => {
  const scrollButtonRight = document.getElementById('scrollButtonRight');
  const scrollButtonLeft = document.getElementById('scrollButtonLeft');
  const classEnabledName = 'scroll-button-enabled';
  const classDisabledName = 'scroll-button-disabled';

    if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 5) {
      scrollButtonRight.classList.add(classDisabledName);
      scrollButtonRight.classList.remove(classEnabledName);
    } else {
      scrollButtonRight.classList.add(classEnabledName);
      scrollButtonRight.classList.remove(classDisabledName);
    }

    if (container.scrollLeft === 0) {
      scrollButtonLeft.classList.add(classDisabledName);
      scrollButtonLeft.classList.remove(classEnabledName);
    } else {
      scrollButtonLeft.classList.remove(classDisabledName);
      scrollButtonLeft.classList.add(classEnabledName);
    }
});

