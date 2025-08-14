import transporter from "@/lib/email";

interface SendEmailParams {
  email: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (params: SendEmailParams) => {
  const { email, ...data } = params;

  return await transporter.sendMail({
    from: `"Kindred" <contact@kindred.com>`,
    to: email,
    ...data,
  });
};
