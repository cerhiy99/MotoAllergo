'use client';
import { $authHost, $host } from '@/app/http';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import styles from '../../add-blog/AddBlog.module.scss';

type Props = {
  params: { id: string };
};

const Page = ({ params: { id } }: Props) => {
  const [nameuk, setNameuk] = useState('');
  const [nameru, setNameru] = useState('');
  const [descriptionuk, setDescriptionuk] = useState('');
  const [descriptionru, setDescriptionru] = useState('');
  const [message, setMessage] = useState<string>('');

  const getSelectProduct = async () => {
    const res = await $host.get('blog/getSelect?id=' + id);
    const blog = res.data.blog;
    setNameuk(blog.nameuk);
    setNameru(blog.nameru);
    setDescriptionuk(blog.descriptionuk);
    setDescriptionru(blog.descriptionru);
  };

  useEffect(() => {
    getSelectProduct();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('nameuk', nameuk);
    formData.append('nameru', nameru);
    formData.append('descriptionuk', descriptionuk);
    formData.append('descriptionru', descriptionru);

    try {
      const response = await $authHost.put('blog/updateWithoutImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        setMessage('Успішно оновлено');
        setNameuk('');
        setNameru('');
        setDescriptionuk('');
        setDescriptionru('');
      } else setMessage('сталася помилка');
    } catch (error: any) {
      setMessage('Сталася помилка при створенні блогу');
    }
  };

  const handlePhotoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!images.length) {
      setMessage('Будь ласка, виберіть хоча б одне зображення');
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    images.forEach((image, index) => {
      formData.append(`file${index}`, image);
    });

    try {
      const response = await $authHost.put('blog/updateImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        setMessagePhoto('Успішно оновлено');
        setImages([]);
      } else setMessagePhoto('Сталася помилка при оновлені фото');
    } catch (error: any) {
      console.log(error);
      setMessagePhoto('Сталася помилка при оновлені фото');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const [images, setImages] = useState<File[]>([]);
  const [messagePhoto, setMessagePhoto] = useState<string>('');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оновити блог блог</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Назва українською"
          value={nameuk}
          onChange={(e) => setNameuk(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Назва російською"
          value={nameru}
          onChange={(e) => setNameru(e.target.value)}
          className={styles.input}
        />
        <ReactQuill
          value={descriptionuk}
          onChange={setDescriptionuk}
          className={styles['editor-container']}
        />

        <ReactQuill
          value={descriptionru}
          onChange={setDescriptionru}
          className={styles['editor-container']}
        />

        <button type="submit" className={styles.button}>
          Оновити
        </button>
      </form>
      {message != '' && <p className={styles.message}>{message}</p>}
      <br />
      <br />
      <form onSubmit={handlePhotoSubmit} className={styles.form}>
        <h2>Виберіть нові зображення (старі будуть видалені)</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className={styles.file}
        />
        <div className="image-gallery">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={URL.createObjectURL(image)} // Створюємо локальний URL
                alt={`image-${index}`}
                className="image"
                width={200}
              />
            </div>
          ))}
        </div>
        <button type="submit" className={styles.button}>
          Оновити
        </button>
      </form>
      {messagePhoto != '' && <p className={styles.message}>{messagePhoto}</p>}
    </div>
  );
};

export default Page;
