import { Resend } from 'resend';

const resend = new Resend('re_MU4eTmjc_58B498z8sFEasvwTZJa1RQRY');

export async function SendMail(name, email, message) {
  const { data, error } = await resend.emails.send({
    from: `${name} <onboarding@resend.dev>`,
    to: ['jpaulneo2k@gmail.com'],
    subject: `Contacto digitalcerti - ${email} `,
    html: message,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
