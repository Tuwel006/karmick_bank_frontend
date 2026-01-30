'use client';

import { Box, AppBar, Toolbar, Drawer, Typography, Avatar, Menu, MenuItem, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, CssBaseline } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AssignmentTurnedIn as ApprovalIcon,
  BarChart as ReportIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountBalance as BankIcon,
  Gavel as PolicyIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

const sidebarItems = [
  { icon: <DashboardIcon fontSize="small" />, text: 'Dashboard', link: '/admin' },
  { icon: <PeopleIcon fontSize="small" />, text: 'User Management', link: '/admin/users' },
  { icon: <BankIcon fontSize="small" />, text: 'Accounts & Deposits', link: '/admin/accounts' },
  { icon: <ApprovalIcon fontSize="small" />, text: 'Approvals', link: '/admin/approvals' },
  { icon: <ReportIcon fontSize="small" />, text: 'Reports & Analytics', link: '/admin/reports' },
  { icon: <PolicyIcon fontSize="small" />, text: 'Bank Policies', link: '/admin/policies' },
  { icon: <SettingsIcon fontSize="small" />, text: 'Configuration', link: '/admin/config' },
];

const drawerWidth = 240;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid #e0e0e0', minHeight: 64 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          KB
        </Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'primary.main', letterSpacing: 0.5 }}>
          KARMICK BANK
        </Typography>
      </Box>
      <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.link;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={isActive}
                onClick={() => router.push(item.link)}
                sx={{
                  minHeight: 36,
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: isActive ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ p: 1 }}>
        <ListItemButton onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <ProtectedRoute requiredRole="admin">
      <Box sx={{ display: 'flex', bgcolor: '#f4f6f8', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
            bgcolor: 'white',
            color: 'text.primary',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: '1rem', color: 'primary.main' }}>
              Administrator Portal
            </Typography>

            <IconButton size="small" sx={{ mr: 2 }}>
              <NotificationsIcon fontSize="small" />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={handleClick}>
              <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
                Super Admin
              </Typography>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 28, height: 28, fontSize: '0.8rem' }}>SA</Avatar>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 2,
                sx: { width: 150, mt: 1 }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose} dense>Profile</MenuItem>
              <MenuItem onClick={handleClose} dense>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} dense sx={{ color: 'error.main' }}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 2, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar variant="dense" />
          {/* Breadcrumbs or Page Title spacer could go here */}
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
import { Divider } from '@mui/material';