import intlTelInput from 'intl-tel-input';
import itiConfig from './iti-config.js';

const formsState = {
  state: 'filling',
  forms: {
    mainForm: {
      state: 'invalid',
      triedSend: false,
      data: {
        name: '',
        phone: '',
      },
      isValid: {
        name: false,
        phone: false,
        policy: false,
      },
      touched: {
        name: false,
        phone: false,
        policy: false,
      },
      focused: {
        phone: false,
      },
    },
    modalForm: {
      state: 'invalid',
      triedSend: false,
      data: {
        name: '',
        phone: '',
      },
      isValid: {
        name: false,
        phone: false,
        policy: false,
      },
      touched: {
        name: false,
        phone: false,
        policy: false,
      },
      focused: {
        phone: false,
      },
    },
  },
};

const elements = {
  forms: {
    mainForm: document.querySelector('[data-form="mainForm"]'),
    modalForm: document.querySelector('[data-form="modalForm"]'),
  },
  inputs: {
    name: {
      mainForm: document.querySelector('.section-communication-form .form-name'),
      modalForm: document.querySelector('.modal-form .form-name'),
    },
    phone: {
      mainForm: document.querySelector('.section-communication-form .form-phone'),
      modalForm: document.querySelector('.modal-form .form-phone'),
    },
    policy: {
      mainForm: document.querySelector('.section-communication-form-agreement-input'),
      modalForm: document.querySelector('.modal-form-agreement-input'),
    },
  },
  buttons: {
    mainForm: document.querySelector('.section-communication-form-button'),
    modalForm: document.querySelector('.modal-form-button'),
  },
};

const phoneInputs = Object.values(elements.inputs.phone);
const nameInputs = Object.values(elements.inputs.name);
const policyCheckboxes = Object.values(elements.inputs.policy);
const applyButtons = Object.values(elements.buttons);
const message = elements.forms.mainForm.querySelector('#message');

const disableForms = () => {
  const elems = [...phoneInputs, ...nameInputs, ...applyButtons, message];

  elems.forEach((el) => el.setAttribute('disabled', true));
};

const enableForms = () => {
  const elems = [...phoneInputs, ...nameInputs, ...applyButtons, message];

  elems.forEach((el) => el.removeAttribute('disabled'));
};

const clearForms = () => {
  const form1 = elements.forms.mainForm;
  const form2 = elements.forms.modalForm;
  form1.reset();
  form2.reset();
};

const render = () => {
  switch (formsState.state) {
    case 'filling':
      enableForms();

      Object.entries(formsState.forms).forEach(([form, state]) => {
        Object.entries(state.isValid).forEach(([field, isValid]) => {
          const touched = formsState.forms[form].touched[field];
          const { triedSend } = formsState.forms[form];

          if (!touched && !triedSend) return;

          if (field === 'policy') {
            const input = elements.inputs[field][form];
            const container = input.closest('div');
            const error = container.querySelector('.form-input-error');

            error.classList.remove('display-none');
            input.classList.add('form-agreement-input-invalid');

            if (isValid) {
              error.classList.add('display-none');
              input.classList.remove('form-agreement-input-invalid');
            }
            return;
          }

          const input = elements.inputs[field][form];
          const fieldset = input.closest('fieldset');
          const error = fieldset.querySelector('.form-input-error');

          error.classList.remove('display-none');
          fieldset.classList.add('fieldset-error');

          const isFocused = formsState.forms[form].focused[field];

          if (isValid || isFocused) {
            error.classList.add('display-none');
            fieldset.classList.remove('fieldset-error');
          }
        });
      });
      break;
    case 'sending':
      disableForms();
      break;
    case 'sent':
      clearForms();
      break;
    default:
      throw new Error(`Unexpected formsState: "${formsState.state}"`);
  }
};

const handlePhoneInput = (input) => {
  const iti = intlTelInput(input, itiConfig);

  input.addEventListener('countrychange', () => {
    const selectedCountry = iti.getSelectedCountryData();
    const { dialCode } = selectedCountry;

    iti.setNumber(`+${dialCode}`);
  });

  iti.setNumber('+7');
  const formEl = input.closest('form');
  const { form } = formEl.dataset;
  input.addEventListener('input', () => {
    const isValid = iti.isValidNumber();
    const phone = iti.getNumber();
    formsState.forms[form].isValid.phone = isValid;
    formsState.forms[form].touched.phone = true;
    formsState.forms[form].data.phone = phone;
    const isFormValid = Object.entries(formsState.forms[form].isValid).every(([, value]) => value);
    formsState.forms[form].state = isFormValid ? 'valid' : 'invalid';
    render();
  });

  input.addEventListener('focus', () => {
    formsState.forms[form].focused.phone = true;
    render();
  });

  input.addEventListener('blur', () => {
    formsState.forms[form].focused.phone = false;
    render();
  });
};

const handleNameInput = (input) => {
  const formEl = input.closest('form');
  const { form } = formEl.dataset;
  input.addEventListener('input', () => {
    const name = input.value;
    const isValid = !!name.length;
    formsState.forms[form].isValid.name = isValid;
    formsState.forms[form].touched.name = true;
    formsState.forms[form].data.name = name;
    const isFormValid = Object.entries(formsState.forms[form].isValid).every(([, value]) => value);
    formsState.forms[form].state = isFormValid ? 'valid' : 'invalid';
    render();
  });
};

const handlePolicy = (input) => {
  const formEl = input.closest('form');
  const { form } = formEl.dataset;
  input.addEventListener('change', () => {
    formsState.forms[form].isValid.policy = input.checked;
    formsState.forms[form].touched.policy = true;
    const isFormValid = Object.entries(formsState.forms[form].isValid).every(([, value]) => value);
    formsState.forms[form].state = isFormValid ? 'valid' : 'invalid';
    render();
  });
};

phoneInputs.forEach(handlePhoneInput);
nameInputs.forEach(handleNameInput);
policyCheckboxes.forEach(handlePolicy);

const routes = {
  applicationsPath: () => '/applications',
};

const apply = async (button, e) => {
  e.preventDefault();

  const formEl = button.closest('form');
  const { form } = formEl.dataset;
  const isFormValid = Object.entries(formsState.forms[form].isValid).every(([, value]) => value);
  formsState.forms[form].state = isFormValid ? 'valid' : 'invalid';

  if (!isFormValid) {
    formsState.forms[form].triedSend = 'yes';
    render();
    return;
  }

  const formData = new FormData(formEl);
  const formDataObject = Object.fromEntries(formData.entries());

  formDataObject.message = formDataObject.message || null;
  formDataObject.formType = form;
  formDataObject.applicationType = formEl.dataset.applicationType;

  const body = JSON.stringify(formDataObject);

  formsState.state = 'sending';
  render();

  try {
    const response = await fetch(`https://gubanovmusic.ru/api${routes.applicationsPath()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error();
    }

    window.ym(97109322, 'reachGoal', 'FORM_SENT');
    formsState.state = 'filling';
    render();
    const event = new Event('form-sent');
    document.dispatchEvent(event);
  } catch (err) {
    formsState.state = 'filling';
    render();

    // eslint-disable-next-line no-alert
    alert('Что-то пошло не так, попробуйте перезагрузить страницу. Если перезагрузка не поможет, попробуйте позднее или свяжитесь с нами по контактам, указанным внизу страницы');
  }
};

applyButtons.forEach((btn) => btn.addEventListener('click', (e) => apply(btn, e)));
