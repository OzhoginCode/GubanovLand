/* eslint-disable no-console */
import Express from 'express';
import sendEmail from './sendEmail.js';
import formatEmailText from './formatEmailText.js';

export default () => {
  const app = new Express();

  app.use(Express.json());

  app.post('/api/applications', async (req, res) => {
    const formdata = req.body;
    console.log({ formdata });

    try {
      const mailText = formatEmailText(formdata);
      const info = await sendEmail(mailText);
      console.log({ info });
      res.status(200).end();
    } catch (error) {
      console.error({ error });
      res.status(500).end();
    }
  });

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(500).end();
  });

  return app;
};
