import { Product } from '@/models/models';

export class ProductService {
  async getProducts({
    search,
  }: {
    search: string | undefined;
  }): Promise<Product[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/products`, {
      next: {
        revalidate: 10,
      },
    });
    let data = await response.json();
    data = data ? data : [];
    if (search) {
      return data.filter((product: Product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return data;
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
