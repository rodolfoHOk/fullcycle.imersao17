'use client';

import { MouseEvent, useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type UserMenuProps = {
  user: any | null;
};

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToCart = () => {
    handleClose();
    router.push('/my-cart');
  };

  const redirectToMyOrders = () => {
    handleClose();
    router.push('/my-orders');
  };

  const handleLogout = () => {
    handleClose();
    // to do
  };

  return user ? (
    <div>
      <IconButton size="large" onClick={handleMenu}>
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={redirectToCart}>
          <ShoppingCartIcon />
          <Typography>Meu carrinho</Typography>
        </MenuItem>

        <MenuItem onClick={redirectToMyOrders}>
          <ListAltIcon />
          <Typography>Meus pedidos</Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          <Typography>Sair</Typography>
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <Link href="/login" style={{ textDecoration: 'none' }}>
      <Typography color="text.primary" sx={{ ml: 3, fontWeight: 500 }}>
        Entrar
      </Typography>
    </Link>
  );
}
