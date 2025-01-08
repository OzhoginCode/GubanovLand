import ru from 'intl-tel-input/i18n/ru';

export default {
  loadUtils: () => import('intl-tel-input/utils'),
  nationalMode: false,
  containerClass: 'phonenumber-input-container',
  countryOrder: ['ru', 'am', 'by', 'kz', 'kg'],
  customPlaceholder: (countryPlaceholder) => countryPlaceholder.replace(/(?<!\+\d*)\d/g, '0'),
  initialCountry: 'ru',
  i18n: ru,
};
