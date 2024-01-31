'use client';

import { Category } from '@/models/models';
import { FormControl, MenuItem, Select } from '@mui/material';
import { grey } from '@mui/material/colors';

export type SelectCategoryProps = {
  categories: Category[];
};

export function SelectCategory({ categories }: SelectCategoryProps) {
  return (
    <FormControl size="small" sx={{ width: 200 }}>
      <Select
        name="select-category"
        defaultValue={'0'}
        sx={{ backgroundColor: grey[400] }}
        onChange={(event) => {}}
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
