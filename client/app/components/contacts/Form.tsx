'use client';
import { getDictionary } from '@/lib/dictionary';
import React, { useState } from 'react';

type Props = {};

const Form = ({}: Props) => {
  const [text, setText] = useState('fdf');
  return <div>{text}</div>;
};

export default Form;