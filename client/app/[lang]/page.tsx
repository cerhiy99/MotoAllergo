import { Locale } from '@/i18n.config';
import './Home.scss';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <div className="home"></div>;
}
