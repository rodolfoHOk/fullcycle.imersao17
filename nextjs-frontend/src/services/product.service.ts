import { Product } from '@/models/models';

export class ProductService {
  async getProducts({
    search,
    category_id,
  }: {
    search: string | undefined;
    category_id: string | undefined;
  }): Promise<Product[]> {
    let url = `${process.env.CATALOG_API_URL}/products`;
    if (category_id) {
      url = url + `/category/${category_id}`;
    }
    const response = await fetch(url, {
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

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    const responses = await Promise.all(
      productIds.map((productId) =>
        fetch(`${process.env.CATALOG_API_URL}/products/${productId}`, {
          next: {
            revalidate: 10,
          },
        })
      )
    );
    return Promise.all(responses.map((response) => response.json()));
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
