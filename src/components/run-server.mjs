import express, { Request, Response } from 'express';
import { Resend } from 'resend';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
const resend = new Resend('re_MU4eTmjc_58B498z8sFEasvwTZJa1RQRY');
const base = '/';

app.post('/sendMail', async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['jpaulneo2k@gmail.com'],
    subject: 'hello world',
    html: '<strong>it works!</strong>',
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(4321, () => {
  console.log('Listening on http://localhost:3000');
});
