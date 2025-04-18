import { ProductResponse } from '@/types/product';

export async function fetchProduct(id: number): Promise<ProductResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}product/getFull/${id}`, {
    next: { revalidate: 3600 }, // Кешування на 1 годину
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }

  return response.json();
}