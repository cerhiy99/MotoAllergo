import { ProductResponse } from '@/types/product';

export async function fetchProduct(id: number): Promise<ProductResponse> {
  const response = await fetch(`http://45.94.156.193:9085/api/product/getFull/${id}`, {
    next: { revalidate: 3600 }, // Кешування на 1 годину
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }

  return response.json();
}