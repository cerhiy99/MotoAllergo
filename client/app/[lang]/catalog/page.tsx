import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import CatalogContent from "@/app/components/CatalogContent/CatalogContent"

type Props = {
    params: { lang: Locale };
  };
  
  export default async function Page({ params }: { params: { lang: string } }) {
    // const dictionary = await getDictionary(params.lang);
  
    return (
      <main>
        
        <CatalogContent/>
      </main>
    );
  };