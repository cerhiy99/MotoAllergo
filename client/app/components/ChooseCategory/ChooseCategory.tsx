'use client';

import Image from 'next/image';
import styles from './ChooseCategory.module.css';

const ChooseCategory: React.FC = () => {
  const categories: ChooseCategory[] = [
    { id: 1, name: 'Webasto', image: '/images/categories/Webasto.jpg' },
    { id: 2, name: 'Аксесуари для авто', image: '/images/categories/CarAccessories.jpg' },
    { id: 3, name: 'Вентиляційна система', image: '/images/categories/VentilationSystem.jpg' },
    { id: 4, name: 'Вихлопна система', image: '/images/categories/ExhaustSystem.jpg' },
    { id: 5, name: 'Гальмівна система', image: '/images/categories/BrakeSystem.jpg' },
    { id: 6, name: 'Двигун і деталі двигуна', image: '/images/categories/EngineParts.jpg' },
    { id: 7, name: 'Трансмісія', image: '/images/categories/Transmission.jpg' },
    { id: 8, name: 'Диски', image: '/images/categories/CarRims.jpg' },
    { id: 9, name: 'Електрична система', image: '/images/categories/ElectricalSystem.jpg' },
    { id: 10, name: 'Колеса', image: '/images/categories/Wheels.jpg' },
    { id: 11, name: 'Кузовні запчастини', image: '/images/categories/BodyParts.jpg' },
    { id: 12, name: 'Освітлення', image: '/images/categories/Lighting.jpg' },
    { id: 13, name: 'Охолодження двигуна', image: '/images/categories/EngineCooling.jpg' },
    { id: 14, name: 'Паливна система', image: '/images/categories/FuelSystem.jpg' },
    { id: 15, name: 'Підвіска', image: '/images/categories/Suspension.jpg' },
    { id: 16, name: 'Рульове управління', image: '/images/categories/Steering.jpg' },
    { id: 17, name: 'Система кліматизації', image: '/images/categories/ClimateControl.jpg' },
    { id: 18, name: 'Склоочисники та омивачі', image: '/images/categories/WindshieldWiper.jpg' },
    { id: 19, name: 'Тюнінг механіки', image: '/images/categories/TuningMechanics.jpg' },
    { id: 20, name: 'Фільтри', image: '/images/categories/Filters.jpg' },
    { id: 21, name: 'Шини', image: '/images/categories/Tires.jpg' },
  ];
  return (
    <section className={styles.ChooseCategory}>
      <h2 className={styles.title}><span>Вибір</span> товарів за категоріями</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryItem}>
            <a href='#'>
              <div className={styles.imageWrapper}>
                <Image src={category.image} alt={category.name} width={150} height={150} layout="responsive" />
              </div>
              <p className={styles.categoryName}>{category.name}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseCategory;