const header = document.querySelector('.head');
const menuButtonImg = document.querySelector('.header-menu-button-img');
const button = document.querySelector('.header-menu-button');

const openedMenuButtonImgSrc = './media/header-menu-button-opened.svg';
const closedMenuButtonImgSrc = './media/header-menu-button.svg';
let isOpen = false;

button.addEventListener('click', () => {
  isOpen = !isOpen;
  header.classList.toggle('header-menu-opened');
  menuButtonImg.src = isOpen ? openedMenuButtonImgSrc : closedMenuButtonImgSrc;
});
