import { Locale } from '@/i18n.config';
import './Home.scss';

import Home from '../components/Home/Home';
import HeroSection from '../components/HeroSection/HeroSection';
import LogoSlider from '../components/LogoSlider/LogoSlider';
import ChooseCategory from '../components/ChooseCategory/ChooseCategory';
import HowWeWork from '../components/HowWeWork/HowWeWork';
import PopularCategories from '../components/PopularCategories/PopularCategories';
import PopularProducts from '../components/PopularProducts/PopularProducts';
import AvtoBlog from '../components/AvtoBlog/AvtoBlog';
import PhoneIconModal from '../components/PhoneIconModal/PhoneIconModal';
import { getDictionary } from '../../lib/dictionary';
type Props = {
  params: { lang: Locale };
};
const products=
[
  {
    "id": 1,
    "lotNumber": "123456789",
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, qui.",
    "price": "123 456 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 2,
    "lotNumber": "987654321",
    "description": "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    "price": "89 000 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 3,
    "lotNumber": "456789123",
    "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    "price": "150 000 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 4,
    "lotNumber": "321654987",
    "description": "Duis aute irure dolor in reprehenderit in voluptate velit.",
    "price": "75 300 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 5,
    "lotNumber": "654321789",
    "description": "Excepteur sint occaecat cupidatat non proident.",
    "price": "200 000 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 6,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 7,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 8,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 9,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 10,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 11,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 12,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 13,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 14,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 10,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 11,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 12,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 13,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 14,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 10,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 11,
    "lotNumber": "789123456",

    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 12,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 13,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  },
  {
    "id": 14,
    "lotNumber": "789123456",
    "description": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "price": "45 600 грн",
    "image": "/images/Picture.png"
  }
]

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { categories } = await getDictionary(params.lang);
  const { news } = await getDictionary(params.lang);
  const { howWeWork } = await getDictionary(params.lang);
  const { heroSection } = await getDictionary(params.lang);
  const { chooseCategory } = await getDictionary(params.lang);
  const { popularProducts } = await getDictionary(params.lang);
  return <main>
    {/* <PhoneIconModal /> */}
    <HeroSection dictionary={heroSection}/>
    <LogoSlider />
    <ChooseCategory dictionary={chooseCategory}/>
    <HowWeWork dictionary={howWeWork}/>
    {/* <PopularCategories dictionary={categories} /> */}
    <PopularProducts products={products} dictionary={popularProducts}/>
    <AvtoBlog dictionary={news} />
  </main>;
}
