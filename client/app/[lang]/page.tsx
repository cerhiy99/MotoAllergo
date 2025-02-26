import { Locale } from '@/i18n.config';
import './Home.scss';

// export default async function Home({
//   params: { lang },
// }: {
//   params: { lang: Locale };
// }) {
//   return <div className="home"></div>;
// }
import Home from '../components/Home/Home';
import { getDictionary } from '../../lib/dictionary';

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);

  return <Home lang={params.lang} dictionary={dictionary} />;
}