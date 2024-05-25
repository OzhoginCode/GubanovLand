import ru from 'intl-tel-input/i18n/ru';

export default {
  utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js',
  nationalMode: false,
  containerClass: 'phonenumber-input-container',
  countryOrder: ['ru', 'am', 'by', 'kz', 'kg'],
  customPlaceholder: (countryPlaceholder) => countryPlaceholder.replace(/(?<!\+\d*)\d/g, '0'),
  initialCountry: 'ru',
  i18n: ru,
};
