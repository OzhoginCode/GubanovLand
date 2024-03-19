/* eslint-disable no-console */
import Express from 'express';
import sendEmail from './sendEmail.js';

export default () => {
  const app = new Express();

  app.use(Express.json());

  app.post('/applications', (req, res) => {
    const formdata = req.body;
    console.log(req.body);

    try {
      const info = sendEmail(formdata);
      console.log(info);
      res.status(200).end('Письмо отправлено успешно');
    } catch {
      res.status(500).end('Что-то пошло не так!');
    }
  });

  app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Что-то пошло не так!');
  });

  return app;
};
