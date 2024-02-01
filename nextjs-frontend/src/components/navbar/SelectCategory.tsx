'use client';

import { Category } from '@/models/models';
import { searchProducts } from '@/utils/utils';
import { FormControl, MenuItem, Select, useScrollTrigger } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter, useSearchParams } from 'next/navigation';

export type SelectCategoryProps = {
  categories: Category[];
};

export function SelectCategory({ categories }: SelectCategoryProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <FormControl size="small" sx={{ width: 200 }}>
      <Select
        name="select-category"
        defaultValue={'0'}
        value={searchParams.get('category_id') || '0'}
        sx={{ backgroundColor: grey[400] }}
        onChange={(event) => {
          const search = searchParams.get('search');
          const category_id = event.target.value;
          searchProducts(router, search, category_id);
        }}
      >
        <MenuItem value="0">Todas as categorias</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
