'use client';

import { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BOT_TOKEN = '';
  const CHAT_ID = '';
  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isChecked) {
      setError('You must accept the terms to subscribe.');
      return;
    }

    setError(null);

    const message = `🎉 *Congratulations!* 🙌\n\nThe following email was subscribed to your newsletter:\n📧 *E-mail:* ${email}`;
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
        alert('Subscription successful!');
        setEmail('');
        setIsChecked(false);
      } else {
        setError('Failed to subscribe. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    }
  };

  return (
    <div>
      <h2 className={styles.footerElHeader}>Інформаційний бюлетнь</h2>
      <ul className={styles.footerElList}>
        <li>
          <p>
            Підпишіться на нашу розсилку, щоб Ви могли першими дізнаватися про новинки та акції на автозапчастини, а також отримувати корисні поради щодо їх вибору та експлуатації!
          </p>
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
              Прийняти умови
            </label>
          </div>
        </li>
        <li>
          <Link href="/privacy_policy/" target="_blank" className={styles.footerLink}>
          Прочитайте умови та положення
          </Link>
          <button className={styles.subscribeButton} onClick={handleSubscribe} disabled={!isChecked}>
            Підписатися
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </li>
      </ul>
    </div>
  );
};

export default SubscribeForm;