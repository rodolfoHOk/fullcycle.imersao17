import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { SelectCategory } from './SelectCategory';
import { CategoryService } from '@/services/category.service';

export async function NavBar() {
  const categories = await new CategoryService().getCategories();

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          alignContent: 'center',
          py: 1.5,
        }}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={147.66}
          height={63.66}
          priority
        />

        <Box
          sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', ml: 1 }}
        >
          <SearchBar />
        </Box>

        <IconButton LinkComponent={Link} size="large" href="/my-cart">
          <ShoppingCartIcon />
        </IconButton>

        <UserMenu user={{ id: 1 }} />
      </Toolbar>

      <Toolbar
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          alignContent: 'center',
          p: 1,
        }}
      >
        <SelectCategory categories={categories} />

        <Box
          component={Link}
          href="/products"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            ml: 3,
          }}
        >
          <HomeIcon sx={{ color: 'text-primary' }} />

          <Typography
            color="text.primary"
            sx={{ fontWeight: 500, display: 'flex', lineHeight: 1.6 }}
          >
            Home
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
