'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard,
    People,
    AccountBalance,
    ReceiptLong,
    Settings,
    Logout,
    ChevronLeft,
    AddCard,
    History,
    Person
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';

const drawerWidth = 260;

interface NavItem {
    title: string;
    path: string;
    icon: React.ReactNode;
    roles: string[];
}

const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/admin', icon: <Dashboard />, roles: ['admin'] },
    { title: 'Dashboard', path: '/branch-admin', icon: <Dashboard />, roles: ['branch_admin'] },
    { title: 'Dashboard', path: '/user', icon: <Dashboard />, roles: ['customer'] },
    { title: 'Customers', path: '/admin/customers', icon: <People />, roles: ['admin', 'branch_admin'] },
    { title: 'Branches', path: '/admin/branches', icon: <AccountBalance />, roles: ['admin'] },
    { title: 'Accounts', path: '/admin/accounts', icon: <AddCard />, roles: ['admin', 'branch_admin'] },
    { title: 'My Accounts', path: '/user/accounts', icon: <AddCard />, roles: ['customer'] },
    { title: 'Transactions', path: '/admin/transactions', icon: <ReceiptLong />, roles: ['admin', 'branch_admin'] },
    { title: 'Transfer Funds', path: '/user/transfer', icon: <ReceiptLong />, roles: ['customer'] },
    { title: 'Recent History', path: '/user/history', icon: <History />, roles: ['customer'] },
    { title: 'Profile', path: '/user/profile', icon: <Person />, roles: ['customer', 'admin', 'branch_admin'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (isMobile) setOpen(false);
    }, [isMobile]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload);
        } catch (e) {
            router.push('/auth/login');
        }
    }, [router]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        authService.logout();
    };

    const filteredNavItems = navItems.filter(item =>
        user && item.roles.includes(user.role)
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: 'white',
                    color: 'text.primary',
                    borderBottom: '1px solid #e0e4e8'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 800, color: 'primary.main' }}>
                            KARMICK BANK
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleMenuOpen}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => router.push('/user/profile')}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMobile ? 'temporary' : 'persistent'}
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #e0e4e8',
                        bgcolor: 'white'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', mt: 2 }}>
                    <List>
                        {filteredNavItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    onClick={() => router.push(item.path)}
                                    selected={pathname === item.path}
                                    sx={{
                                        mx: 1,
                                        borderRadius: 1,
                                        mb: 0.5,
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: 'white',
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {/* Logout at bottom */}
                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout} sx={{ mx: 1, borderRadius: 1 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
                {children}
            </Box>
        </Box>
    );
}
