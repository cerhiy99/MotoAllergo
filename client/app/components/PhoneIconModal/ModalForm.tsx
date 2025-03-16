'use client';

import { useState } from 'react';
import styles from './PhoneIconModal.module.css';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  dictionary?:any;
}

const ModalForm = ({ isOpen, onClose, dictionary }: ModalFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const phoneRegex = /^(?:\+?380|0)\d{9}$/;

  const isSubmitButtonActive = name.trim() !== '' && phone.trim() !== '' && !nameError && !phoneError;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
    if (nameValue.trim() === '') {
      setNameError(dictionary?.nameError || 'Будь ласка, введіть ваше ім’я.');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    if (!phoneRegex.test(phoneValue)) {
      setPhoneError(
        dictionary?.phoneError ||
          'Невірний формат телефону. Введіть номер у форматі +380 або 0 і 9 цифр.'
      );
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitButtonActive) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const nameValue = formData.get('name');
    const phoneValue = formData.get('phone');
    console.log('Заявка:', { name: nameValue, phone: phoneValue });
    alert(dictionary?.submitSuccess || 'Заявка надіслана! Перевірте консоль для деталей.');
    onClose();
    setName('');
    setPhone('');
    setNameError('');
    setPhoneError('');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeIcon} onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </span>
        <h2>{dictionary?.title || 'Замовити дзвінок'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <i className="fa-regular fa-user"></i>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={dictionary?.namePlaceholder || "Введіть ваше ім'я"}
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <span className={styles.errorMessage}>{nameError}</span>}
          </div>
          <div className={styles.formGroup}>
            <i className="fa-solid fa-phone"></i>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder={dictionary?.phonePlaceholder || '+380XXXXXXXXX'}
              value={phone}
              onChange={handlePhoneChange}
            />
            {phoneError && <span className={styles.errorMessage}>{phoneError}</span>}
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isSubmitButtonActive}
          >
            {dictionary?.submitButton || 'Надіслати заявку'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;