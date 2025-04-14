import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import { fetchProduct } from '@/lib/api';
import ProductContent from '@/app/components/ProductContent/ProductContent';

type Props = {
    params: { lang: Locale; id: string };
};

const Page = async ({ params }: Props) => {
    const { lang, id } = params;
    const { product } = await fetchProduct(Number(id));
    const dictionary: any = await getDictionary(lang);
    const productContent = dictionary.productContent;

    const Id = product.id;
    const name = lang === 'uk' ? product.nameuk : product.nameru;
    const features = lang === 'uk' ? product.featuresuk : product.featuresru;
    const description = lang === 'uk' ? product.descriptionuk : product.descriptionru;
    const price = product.price;
    const priceUsd = product.priceUsd;
    const images = product.imgs;
    const getCondition = (featuresHtml: string): string => {
        const conditionRegexUk = /<td class="feature__name">Стан:<\/td>\s*<td class="feature__specification">([^<]+)</;
        const conditionRegexRu = /<td class="feature__name">Состояние:<\/td>\s*<td class="feature__specification">([^<]+)</;

        const matchUk = featuresHtml.match(conditionRegexUk);
        const matchRu = featuresHtml.match(conditionRegexRu);

        if (matchUk) {
            return matchUk[1].trim() || 'Невідомо';
        } else if (matchRu) {
            return matchRu[1].trim() || 'Невідомо';
        }
        return 'Невідомо';
    };
    const removeFeaturesRows = (featuresHtml: string, keywords: string[]): string => {
        let cleanedHtml = featuresHtml;
        keywords.forEach(keyword => {
            const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(
                `<tr[^>]*>\\s*<td class="feature__name"[^>]*>${escapedKeyword}<\/td>.*?<\/tr>`,
                'gis'
            );
            cleanedHtml = cleanedHtml.replace(regex, '');
        });
        cleanedHtml = cleanedHtml.replace(/<table[^>]*>\s*<tbody>\s*<\/tbody>\s*<\/table>/gis, '');
        cleanedHtml = cleanedHtml.replace(/<tbody>\s*<\/tbody>/gis, '');

        return cleanedHtml;
    };
    const removeLinks = (htmlString: string): string => {
        const linkRegex = /<a[^>]*>(.*?)<\/a>/gis;
        return htmlString.replace(linkRegex, '$1');
    };
    const keywordsToRemoveUk = ['Доставка:', 'Доставка по Україні:', 'Самовивіз:'];
    const keywordsToRemoveRu = ['Доставка:', 'Доставка по Украине:', 'Самовывоз:'];
    const keywordsToRemove = lang === 'uk' ? keywordsToRemoveUk : keywordsToRemoveRu;
    let processedFeatures = removeFeaturesRows(features, keywordsToRemove);
    processedFeatures = removeLinks(processedFeatures);
    const condition = getCondition(features);

    return (
        <main>
            <ProductContent
                Id={Id}
                name={name}
                features={processedFeatures}
                description={description}
                dictionary={productContent}
                condition={condition}
                price={price}
                priceUsd={priceUsd}
                images={images}
            />
        </main>
    );
};

export default Page;
