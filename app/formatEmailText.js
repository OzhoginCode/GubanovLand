const formatApplicationType = (type) => {
  switch (type) {
    case 'try-for-free':
      return 'Попробовать бесплатно';
    case 'order-song':
      return 'Заказать песню';
    case 'submit-application':
      return 'Оставить заявку';
    case 'by-reference':
      return 'По референсу';
    case 'producing':
      return 'Продюсирование';
    case 'turnkey':
      return 'Под ключ';
    default:
      console.error(`Unknown application type for formatting: `); // eslint-disable-line
      return `НЕИЗВЕСТНЫЙ ТИП ЗАЯВКИ (${type}), обратитесь к администратору`;
  }
};

export default (data) => {
  const {
    name, phone, message, formType, applicationType,
  } = data;

  const formattedMessage = message || 'не заполнено';
  const formattedType = formType === 'mainForm' ? 'основная' : 'модальное окно';
  const formattedApplicationType = formatApplicationType(applicationType);

  return `Имя: ${name}\nТелефон: ${phone}\n\nСообщение: ${formattedMessage}\n\nФорма: ${formattedType}\nТип заявки: ${formattedApplicationType}`;
};
