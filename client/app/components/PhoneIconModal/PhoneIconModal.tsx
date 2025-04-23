'use client';

import { useState } from 'react';
import PhoneIconButton from './PhoneIconButton';
import ModalForm from './ModalForm';
type Props = {
  dictionary: any;
};
const PhoneIconModal = (dictionary: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PhoneIconButton onOpen={() => setIsModalOpen(true)} />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dictionary={dictionary}
      />
    </>
  );
};

export default PhoneIconModal;
