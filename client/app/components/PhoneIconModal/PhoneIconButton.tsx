'use client';

import { useState } from 'react';
import styles from './PhoneIconModal.module.css';

interface PhoneIconButtonProps {
  onOpen: () => void;
}

const PhoneIconButton = ({ onOpen }: PhoneIconButtonProps) => {
  return (
    <div className={styles.phoneIcon} onClick={onOpen}>
      <i className="fa-solid fa-phone-flip"></i>
    </div>
  );
};

export default PhoneIconButton;