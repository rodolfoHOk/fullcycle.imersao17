import { Product } from '@/models/models';

export class ProductService {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/products`, {
      next: {
        revalidate: 10,
      },
    });
    return response.json();
  }

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/products/${id}`,
      {
        next: {
          revalidate: 10,
        },
      }
    );
    return response.json();
  }
}
