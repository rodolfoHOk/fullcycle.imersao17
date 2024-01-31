import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Box, ThemeProvider } from '@mui/material';
import { roboto } from '@/roboto';
import { theme } from '@/theme';
import { NavBar } from '@/components/navbar/NavBar';

export const metadata: Metadata = {
  title: 'Code Commerce',
  description: 'Um Shop FullCycle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <>
              <NavBar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.default',
                  mt: ['140px', '154px', '162px'],
                  p: 3,
                }}
              >
                {children}
              </Box>
            </>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
