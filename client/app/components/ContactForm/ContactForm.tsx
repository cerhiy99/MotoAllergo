'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ContactForm.scss';
import { Locale } from '@/i18n.config';

interface IFormInputs {
  name: string;
  phone: string;
  message: string;
}

type Props = {
  lang: Locale;
  dictionary: any;
};

const schema = yup
  .object({
    name: yup.string().required('Ім’я обов’язкове'),
    phone: yup
      .string()
      .matches(/^\+380\d{9}$/, 'Телефон повинен бути у форматі +380XXXXXXXXX')
      .required('Телефон обов’язковий'),
    message: yup.string().required('Повідомлення обов’язкове'),
  })
  .required();

const ContactForm = ({ dictionary }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const [messageSent, setMessageSent] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    setMessageSent(true);
  };

  return (
    <div className="contact-form">
      <div className="title-container">
        <h1>{dictionary.title}</h1>
        <div className="divider"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <div className="inputs-container">
            <label>{dictionary.namePlaceholder}</label>
            <input type="text" {...register('name')} />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="inputs-container">
            <label>{dictionary.phonePlaceholder}</label>
            <input type="tel" {...register('phone')} />
            {errors.phone && (
              <span className="error-message">{errors.phone.message}</span>
            )}
          </div>
        </div>

        <div className="message-field">
          <label>{dictionary.messagePlaceholder}</label>
          <textarea {...register('message')} />
          {errors.message && (
            <span className="error-message">{errors.message.message}</span>
          )}
        </div>

        <button type="submit">{dictionary.sendBtn}</button>
      </form>

      {messageSent && (
        <p className="success-message">{dictionary.successMessage}</p>
      )}
    </div>
  );
};

export default ContactForm;
