'use client';

import { Box, AppBar, Toolbar, Drawer, Typography, Avatar, Menu, MenuItem, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { People } from '@mui/icons-material';
import { colors } from './colors';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  { icon: <People />, text: 'Users', link: '/admin/users' },
];

const drawerWidth = 80;

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontSize: 12,
    h4: { fontSize: '1.5rem' },
    h6: { fontSize: '1rem' },
    caption: { fontSize: '0.7rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          padding: '4px 8px',
          minHeight: '28px',
          textTransform: 'none',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          minHeight: '32px',
        },
      },
    },
   
  },
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Avatar 
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
            onClick={handleClick}
          >
            A
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
            <MenuItem onClick={handleClose}>Change Password</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: colors.Secondary,
            marginTop: '64px',
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          {sidebarItems.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center', mb: 2, cursor: 'pointer' }} onClick={() => router.push(item.link)}>
              <IconButton sx={{ color: 'white', p: 0.5 }}>
                {item.icon}
              </IconButton>
              <Typography variant="caption" sx={{ color: 'white', display: 'block', fontSize: '10px' }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
    </ThemeProvider>
  );
}