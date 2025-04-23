'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ContactForm.scss';
import axios from 'axios';

interface IFormInputs {
  name: string;
  phone: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required("Будь ласка, введіть ім'я."),
    phone: yup
      .string()
      .required('Будь ласка, введіть номер телефону.')
      .matches(
        /^(?:(?:\+?380)\d{9}|0\d{9})$/,
        'Невірний формат телефону. Введіть номер у форматі +380 або 380 і 9 цифр, або 0 і 9 цифр.'
      ),
    message: yup.string().required('Повідомлення обов’язкове'),
  })
  .required();

type Props = {
  dictionary: any;
};

const ContactForm = ({ dictionary }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [messageSent, setMessageSent] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { name, phone, message } = data;

    const tgToken = process.env.NEXT_PUBLIC_TG_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    const text = `Привіт!🙌
Хтось залишив Вам одне нове повідомлення🤑

💆‍♂️Ім'я: ${name}
📲Телефон: ${phone}
✍️Повідомлення: ${message || 'немає повідомлення'}
  `;

    try {
      await axios.post(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        chat_id: chatId,
        text: text,
      });

      setMessageSent(true);
      reset();
    } catch (error) {
      console.error('Помилка надсилання в Telegram:', error);
    }
  };

  useEffect(() => {
    if (messageSent) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messageSent]);

  return (
    <div className="contact-form">
      <div className="title-container">
        <h1>{dictionary.title}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <div className="input-field">
            <label>{dictionary.name}</label>
            <input type="text" {...register('name')} />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="input-field">
            <label>{dictionary.phone}</label>
            <input type="tel" {...register('phone')} />
            {errors.phone && (
              <span className="error-message">{errors.phone.message}</span>
            )}
          </div>
        </div>

        <div className="message-field">
          <label>{dictionary.message}</label>
          <textarea {...register('message')} />
          {errors.message && (
            <span className="error-message">{errors.message.message}</span>
          )}
        </div>

        <button type="submit" disabled={!isValid}>
          {dictionary.send}
        </button>
      </form>

      {messageSent && <p className="success-message">{dictionary.sendTrue}</p>}
    </div>
  );
};

export default ContactForm;
