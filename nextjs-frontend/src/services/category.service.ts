import { Category } from '@/models/models';

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/categories`, {
      next: {
        revalidate: 10,
      },
    });
    return response.json();
  }
}
