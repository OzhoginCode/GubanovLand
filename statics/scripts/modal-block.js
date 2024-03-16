const modal = document.querySelector('.modal');
const openFormButtons = document.querySelectorAll('[data-modal-type]');
const form = modal.querySelector('form');
const closeButton = modal.querySelector('.modal-close-button');
const okButton = modal.querySelector('.modal-sent-button');

const modalOpening = () => {
  let isOpen = false;

  const toggleModal = () => {
    isOpen = !isOpen;
    modal.classList.toggle('modal-open');
    document.body.classList.toggle('modal-open');
    document.body.classList.toggle('overflow-hidden');
  };

  openFormButtons.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal();
  }));
  closeButton.addEventListener('click', toggleModal);
  okButton.addEventListener('click', toggleModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleModal();
    }
  });

  document.addEventListener('form-sent', () => {
    if (isOpen) return;
    toggleModal();
  });
};

modalOpening();

// MODAL SWITCHING

const modalSwiching = () => {
  const header = modal.querySelector('.modal-header');
  const hashtag = modal.querySelector('.modal-hashtag');
  const demoP = modal.querySelector('.modal-demo-p');
  const upperContainer = modal.querySelector('.modal-upper');
  const lowerContainer = modal.querySelector('.modal-lower');
  const sentContainer = modal.querySelector('.modal-sent');

  const modalState = {
    type: 'default',
    state: 'filling',
  };

  const switchToFilling = () => {
    modalState.state = 'filling';
    closeButton.removeEventListener('click', switchToFilling);
    okButton.removeEventListener('click', switchToFilling);
  };

  const switchToFillingOnEsc = (e) => {
    if (e.key === 'Escape') {
      switchToFilling();
      document.removeEventListener('keydown', switchToFillingOnEsc);
    }
  };

  const render = ({ type, state }) => {
    if (state === 'sent') {
      upperContainer.classList.add('display-none');
      lowerContainer.classList.add('display-none');
      sentContainer.classList.remove('display-none');

      closeButton.addEventListener('click', switchToFilling);
      okButton.addEventListener('click', switchToFilling);
      document.addEventListener('keydown', switchToFillingOnEsc);
      return;
    }

    upperContainer.classList.remove('display-none');
    lowerContainer.classList.remove('display-none');
    sentContainer.classList.add('display-none');
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

  openFormButtons.forEach((btn) => btn.addEventListener('click', () => {
    modalState.type = btn.dataset.modalType;
    form.dataset.applicationType = btn.dataset.modalType;
    render(modalState);
  }));

  document.addEventListener('form-sent', () => {
    modalState.state = 'sent';
    render(modalState);
  });
};

modalSwiching();
