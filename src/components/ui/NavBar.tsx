"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LinkBtn from '@/components/ui/LinkBtn';


const LINKS = [
  { text: 'Home', href: '/' },
  { text: 'Archive', href: '/archive' },
];

const AUTH_LINKS = [
  { text: 'Account', href: '/account' },
  { text: 'Logout', href: '/logout' },
];

const PRE_AUTH_LINKS = [
  { text: 'Sign In', href: '/signin' },
  { text: 'Sign Up', href: '/signup' },
];

function NavBar() {
  const { data: session, status } = useSession();


  
  const RIGHT_MENU = status==="authenticated"? AUTH_LINKS : PRE_AUTH_LINKS;


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={0}
            >
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <AdbIcon sx={{ color: 'yellow', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'yellow',
                    textDecoration: 'none',
                  }}
                >
                  BLOG
                </Typography>

                {LINKS.map(({href, text}, i) => (
                    <LinkBtn key={i} href={href} title={text}></LinkBtn>
                ))}
            </Box>
          </Toolbar>

          <Toolbar >
            <Box sx={{ flexGrow: 1, display: 'flex', }}>
                {status==="authenticated"? <Button sx={{ my: 2, color: 'white', display: 'block' }}>{`Welcome ${session.user?.name}!`}</Button>:null}
                {RIGHT_MENU.map(({href, text},i) => (
                     <LinkBtn  key={i} href={href} title={text}></LinkBtn>
                ))}
            </Box>
           </Toolbar>
          </Stack>
      </Container>
    </AppBar>
  );
}
export default NavBar;
