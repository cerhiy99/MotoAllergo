import { Locale } from '@/i18n.config';
import React from 'react';

type Props = {
  params: { lang: Locale; id: number };
};

const generateStaticParams = () => {
  return [{ id: '1' }, { id: '2' }];
};

const getData=async(id:number)=>{
    const response=await fetch('',{next:{revalidate:360}})
}

const page = async({ params: { lang, id } }: Props) => {
    const blog=await getData(id);
  return <div>page</div>;
};

export default page;