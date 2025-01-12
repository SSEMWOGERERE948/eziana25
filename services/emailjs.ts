import emailjs from '@emailjs/browser';

interface EmailParams {
  [key: string]: string | number | boolean;
}

export const sendEmail = async (
  serviceId: string,
  templateId: string,
  params: EmailParams,
  userId: string
) => {
  try {
    const result = await emailjs.send(serviceId, templateId, params, userId);
    console.log('Email sent successfully:', result.text);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

