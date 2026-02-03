'use client';

import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, CssBaseline } from '@mui/material';
import { Dashboard, AccountBalance, SwapHoriz, People, Group } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/branch-admin' },
  { text: 'Accounts', icon: <AccountBalance />, path: '/branch-admin/accounts' },
  { text: 'Transactions', icon: <SwapHoriz />, path: '/branch-admin/transactions' },
  { text: 'Customers', icon: <People />, path: '/branch-admin/customers' },
  { text: 'Staff', icon: <Group />, path: '/branch-admin/staff' },
];

export default function BranchAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Branch Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={() => router.push(item.path)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: pathname === item.path ? 'action.selected' : 'transparent',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}