import React, { createContext, useContext } from 'react';
import emailjs from '@emailjs/browser';

interface EmailJSContextType {
  sendEmail: (templateId: string, params: any) => Promise<any>;
}

const EmailJSContext = createContext<EmailJSContextType | undefined>(undefined);

interface EmailJSProviderProps {
  serviceId: string;
  userId: string;
  children: React.ReactNode;
}

export const EmailJSProvider: React.FC<EmailJSProviderProps> = ({
  serviceId,
  userId,
  children
}) => {
  const sendEmailWithConfig = async (templateId: string, params: any) => {
    try {
      const result = await emailjs.send(serviceId, templateId, params, userId);
      console.log('Email sent successfully:', result.text);
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  };

  return (
    <EmailJSContext.Provider value={{ sendEmail: sendEmailWithConfig }}>
      {children}
    </EmailJSContext.Provider>
  );
};

export const useEmailJS = () => {
  const context = useContext(EmailJSContext);
  if (context === undefined) {
    throw new Error('useEmailJS must be used within an EmailJSProvider');
  }
  return context;
};