import { Locale } from '@/i18n.config';
import './Home.scss';

import Home from '../components/Home/Home';
import AboutContent from '../components/AboutContent/AboutContent';
import HeroSection from '../components/HeroSection/HeroSection';
import LogoSlider from '../components/LogoSlider/LogoSlider';
import ChooseCategory from '../components/ChooseCategory/ChooseCategory';
import HowWeWork from '../components/HowWeWork/HowWeWork';
import PopularCategories from '../components/PopularCategories/PopularCategories';
import PopularProducts from '../components/PopularProducts/PopularProducts';
import AvtoBlog from '../components/AvtoBlog/AvtoBlog';
import { getDictionary } from '../../lib/dictionary';
type Props = {
  params: { lang: Locale };
};
export default async function Page({ params }: { params: { lang: Locale } }) {
  const { categories } = await getDictionary(params.lang);
  const { avtoblog } = await getDictionary(params.lang);

  return <main>
    <HeroSection/>
    <LogoSlider/>
    <ChooseCategory/>
    <HowWeWork/>
    <PopularCategories dictionary={categories}/>
    <PopularProducts/>
    <AvtoBlog dictionary={avtoblog}/>
  </main>;
}
