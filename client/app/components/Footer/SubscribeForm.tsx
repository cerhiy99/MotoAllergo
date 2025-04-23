'use client';

import { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

type SubscribeFormProps = {
  dictionary: {
    title: string;
    description: string;
    termsLink: string;
    subscribeButton: string;
    checkboxLabel: string;
    errors: {
      emptyEmail: string;
      invalidEmail: string;
      termsNotAccepted: string;
      subscribeFailed: string;
      genericError: string;
    };
    successMessage: string;
  };
};

const SubscribeForm: React.FC<SubscribeFormProps> = ({ dictionary }) => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BOT_TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError(dictionary.errors.emptyEmail);
      return;
    }

    if (!isValidEmail(email)) {
      setError(dictionary.errors.invalidEmail);
      return;
    }

    if (!isChecked) {
      setError(dictionary.errors.termsNotAccepted);
      return;
    }

    setError(null);

    const message = `
    Привіт!🙌
Хтось підписався на інформаційний бюлетень📰
Ось його електронна пошта:
📧Email: ${email}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        alert(dictionary.successMessage);
        setEmail('');
        setIsChecked(false);
      } else {
        setError(dictionary.errors.subscribeFailed);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(dictionary.errors.genericError);
    }
  };

  return (
    <div>
      <h2 className={styles.footerElHeader}>{dictionary.title}</h2>
      <ul className={styles.footerElList}>
        <li>
          <p>{dictionary.description}</p>
        </li>
        <li>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.footerTextInput}
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </li>
        <li>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="checkbox"
              className={styles.customCheckbox}
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="checkbox" className={styles.checkboxLabel}>
              {dictionary.checkboxLabel}
            </label>
          </div>
        </li>
        <li>
          <Link
            href="/privacy_policy/"
            target="_blank"
            className={styles.footerLink}
          >
            {dictionary.termsLink}
          </Link>
          <button
            className={styles.subscribeButton}
            onClick={handleSubscribe}
            disabled={!isChecked}
          >
            {dictionary.subscribeButton}
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </li>
      </ul>
    </div>
  );
};

export default SubscribeForm;
