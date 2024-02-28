const routes = {
  mainPagePath: (hash = '') => `./index.html${hash}`,
};

const buttons = document.querySelectorAll('a');

buttons.forEach((btn) => {
  const { href } = btn;
  if (!href.includes('#')) return;

  const hash = href.slice(href.indexOf('#'));

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.mainPagePath(hash);
  });
});
