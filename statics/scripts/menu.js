const openedMenuButtonImg = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 1439344924">
<path id="Vector 148" d="M21.6836 1L1.00072 21.6829" stroke="white" stroke-width="2"/>
<path id="Vector 149" d="M1 1L21.6829 21.6829" stroke="white" stroke-width="2"/>
</g>
</svg>`;
const closedMenuButtonImg = `<svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 1H29.25" stroke="white" stroke-width="2"/>
  <path d="M0 10H29.25" stroke="white" stroke-width="2"/>
  <path d="M0 19H29.25" stroke="white" stroke-width="2"/>
</svg>`;

const header = document.querySelector('.head');
const menuButton = document.querySelector('.header-menu-button');
const navButtons = document.querySelectorAll('.nav-ul a');
const applyButton = document.querySelector('.right-button-header');
const logoButton = document.querySelector('.div-logo');

const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
let isOpen = false;

const toggleMenu = () => {
  isOpen = !isOpen;
  header.classList.toggle('header-menu-opened');
  menuButton.innerHTML = isOpen ? openedMenuButtonImg : closedMenuButtonImg;
  document.body.classList.toggle('overflow-hidden');
  document.body.style.marginRight = `${isOpen ? scrollbarWidth : 0}px`;
  header.style.paddingRight = `${isOpen ? scrollbarWidth : 0}px`;
};

menuButton.addEventListener('click', toggleMenu);
navButtons.forEach((btn) => btn.addEventListener('click', () => (isOpen ? toggleMenu() : null)));
applyButton.addEventListener('click', () => (isOpen ? toggleMenu() : null));
logoButton.addEventListener('click', () => (isOpen ? toggleMenu() : null));
