'use client';
import { $authHost } from '@/app/http';
import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './AddBlog.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddBlog() {
  const [nameuk, setNameUk] = useState<string>('');
  const [nameru, setNameRu] = useState<string>('');
  const [descriptionuk, setDescriptionUk] = useState<string>('');
  const [descriptionru, setDescriptionRu] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!images.length) {
      setMessage('Будь ласка, виберіть хоча б одне зображення');
      return;
    }

    const formData = new FormData();
    formData.append('nameuk', nameuk);
    formData.append('nameru', nameru);
    formData.append('descriptionuk', descriptionuk);
    formData.append('descriptionru', descriptionru);

    images.forEach((image, index) => {
      formData.append(`file${index}`, image);
    });

    try {
      const response = await $authHost.post('blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        setMessage('Успішно додано');
        setNameUk('');
        setNameRu('');
        setDescriptionUk('');
        setDescriptionRu('');
        setImages([]);
      } else setMessage('сталася помилка');
    } catch (error: any) {
      setMessage('Сталася помилка при створенні блогу');
    }
  };

  console.log(descriptionuk, descriptionru);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Додати новий блог</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Назва українською"
          value={nameuk}
          onChange={(e) => setNameUk(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Назва російською"
          value={nameru}
          onChange={(e) => setNameRu(e.target.value)}
          className={styles.input}
        />
        <ReactQuill
          value={descriptionuk}
          onChange={setDescriptionUk}
          className={styles['editor-container']}
        />

        <ReactQuill
          value={descriptionru}
          onChange={setDescriptionRu}
          className={styles['editor-container']}
        />
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
          Додати блог
        </button>
      </form>
      {message != '' && <p className={styles.message}>{message}</p>}
    </div>
  );
}
