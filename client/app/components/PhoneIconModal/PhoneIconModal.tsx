'use client';

import { useState } from 'react';
import { Locale } from '@/i18n.config';
import styles from './PhoneIconModal.module.css';
import PhoneIconButton from './PhoneIconButton';
import ModalForm from './ModalForm';
type Props = {
  dictionary: any;
};
const PhoneIconModal = ( dictionary : Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PhoneIconButton onOpen={() => setIsModalOpen(true)} />
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dictionary={dictionary} />
    </>
  );
};

export default PhoneIconModal;