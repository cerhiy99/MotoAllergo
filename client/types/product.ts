export interface ProductImage {
    id: number;
    src: string;
    createdAt: string;
    updatedAt: string;
    productId: number;
}

export interface Product {
    id: number;
    nameuk: string;
    nameru: string;
    price: string;
    priceUsd: string;
    featuresuk: string;
    featuresru: string;
    descriptionuk: string;
    descriptionru: string;
    createdAt: string;
    updatedAt: string;
    productLinkId: number;
    imgs: ProductImage[];
}

export interface ProductResponse {
    product: Product;
}