const modal = document.querySelector('.modal');
const openFormButtons = document.querySelectorAll('[data-modal-type]');

const modalOpening = () => {
  const closeButton = modal.querySelector('.modal-close-button');

  let isOpen = false;

  const toggleModal = () => {
    isOpen = !isOpen;
    modal.classList.toggle('modal-open');
    document.body.classList.toggle('modal-open');
    document.body.classList.toggle('overflow-hidden');
  };

  openFormButtons.forEach((btn) => btn.addEventListener('click', toggleModal));
  closeButton.addEventListener('click', toggleModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleModal();
    }
  });
};

modalOpening();

// MODAL SWITCHING

const modalSwiching = () => {
  const header = modal.querySelector('.modal-header');
  const hashtag = modal.querySelector('.modal-hashtag');
  const demoP = modal.querySelector('.modal-demo-p');
  // const submit = modal.querySelector('.modal-form-button');

  const render = ({ type }) => {
    hashtag.classList.add('display-none');
    demoP.classList.add('display-none');
    modal.classList.remove('modal-hash-active');
    modal.classList.remove('try-for-free');

    switch (type) {
      case 'try-for-free':
        demoP.classList.remove('display-none');
        hashtag.classList.remove('display-none');
        modal.classList.add('modal-hash-active');
        modal.classList.add('try-for-free');
        header.textContent = 'ПОПРОБОВАТЬ БЕСПЛАТНО';
        hashtag.textContent = '#Демо набросок';
        break;
      case 'order-song':
        header.textContent = 'ЗАКАЗАТЬ ПЕСНЮ';
        break;
      case 'submit-application':
        header.textContent = 'ОСТАВИТЬ ЗАЯВКУ';
        break;
      case 'by-reference':
        hashtag.classList.remove('display-none');
        modal.classList.add('modal-hash-active');
        header.textContent = 'ЗАКАЗАТЬ ПЕСНЮ';
        hashtag.textContent = '#По референсу';
        break;
      case 'producing':
        hashtag.classList.remove('display-none');
        modal.classList.add('modal-hash-active');
        header.textContent = 'ЗАКАЗАТЬ ПЕСНЮ';
        hashtag.textContent = '#Продюсирование';
        break;
      case 'turnkey':
        hashtag.classList.remove('display-none');
        modal.classList.add('modal-hash-active');
        header.textContent = 'ЗАКАЗАТЬ ПЕСНЮ';
        hashtag.textContent = '#Под ключ';
        break;
      default:
        throw new Error(`Unexpected form type: "${type}"`);
    }
  };

  const modalState = {
    type: 'default',
  };

  openFormButtons.forEach((btn) => btn.addEventListener('click', () => {
    modalState.type = btn.dataset.modalType;
    render(modalState);
  }));
};

modalSwiching();
