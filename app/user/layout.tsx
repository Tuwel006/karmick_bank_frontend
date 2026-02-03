'use client';

import { Box, AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton, Container, Tab, Tabs, Button, Paper, Stack } from '@mui/material';
import {
    Menu as MenuIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    SupportAgent as SupportIcon,
    AccountBalance as BankIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authService } from '@/services/auth.service';

const navigationItems = [
    { text: 'My Accounts', link: '/user' },
    { text: 'Fund Transfer', link: '/user/transfer' },
    { text: 'Bill Payments', link: '/user/payments' },
    { text: 'e-Statements', link: '/user/statements' },
    { text: 'Service Request', link: '/user/services' },
];

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        authService.logout();
    };

    const currentTab = navigationItems.findIndex(item => item.link === pathname) !== -1
        ? navigationItems.findIndex(item => item.link === pathname)
        : 0;

    return (
        <ProtectedRoute requiredRole="customer">
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>

                {/* Top Header - Classic Banking Style */}
                <AppBar position="static" color="default" sx={{ bgcolor: 'white', color: 'text.primary' }} elevation={1}>
                    <Container maxWidth="lg">
                        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <BankIcon color="primary" fontSize="large" />
                                <Box>
                                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ lineHeight: 1 }}>KARMICK BANK</Typography>
                                    <Typography variant="caption" sx={{ letterSpacing: 1 }}>INTERNET BANKING</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Welcome, John</Typography>
                                    <Typography variant="caption" color="text.secondary">Last Login: 30-Jan-2026</Typography>
                                </Box>
                                <IconButton>
                                    <NotificationsIcon color="action" />
                                </IconButton>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                    sx={{ borderRadius: 20 }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Navigation Bar */}
                <Paper square elevation={0} sx={{ bgcolor: '#280071', color: 'white' }}>
                    <Container maxWidth="lg">
                        <Tabs
                            value={currentTab}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                minHeight: 48,
                                '& .MuiTab-root': {
                                    color: 'rgba(255,255,255,0.7)',
                                    minHeight: 48,
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    '&.Mui-selected': { color: 'white', fontWeight: 600 }
                                },
                                '& .MuiTabs-indicator': { bgcolor: '#00b5ef', height: 4 }
                            }}
                        >
                            {navigationItems.map((item) => (
                                <Tab
                                    key={item.text}
                                    label={item.text}
                                    onClick={() => router.push(item.link)}
                                />
                            ))}
                        </Tabs>
                    </Container>
                </Paper>

                {/* Main Content */}
                <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
                    {children}
                </Container>

                {/* Footer */}
                <Box sx={{ bgcolor: '#1c1e21', color: 'rgba(255,255,255,0.6)', py: 3, mt: 'auto' }}>
                    <Container maxWidth="lg">
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                            <Typography variant="caption">© 2026 Karmick Bank. All rights reserved.</Typography>
                            <Stack direction="row" spacing={3}>
                                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Privacy Policy</Typography>
                                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Terms of Service</Typography>
                                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Security Tips</Typography>
                            </Stack>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SupportIcon fontSize="small" />
                                <Typography variant="caption">24x7 Helpdesk: 1800-123-4567</Typography>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </ProtectedRoute>
    );
}
