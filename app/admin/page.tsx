'use client';

import { Box, Card, CardContent, Typography, Button, Stack, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    GroupAdd,
    WarningAmber,
    ArrowForward,
    AccountBalanceWallet,
    AttachMoney
} from '@mui/icons-material';

// Classic Stats Data
const stats = [
    { title: 'Total Customers', value: '14,230', change: '+124 this week', icon: <GroupAdd fontSize="medium" color="primary" />, color: '#e3f2fd' },
    { title: 'Total Deposits', value: '₹ 45.2 Cr', change: '+4.5% vs last month', icon: <AccountBalanceWallet fontSize="medium" color="success" />, color: '#e8f5e9' },
    { title: 'Pending KYC', value: '24', change: 'Action Required', icon: <WarningAmber fontSize="medium" color="warning" />, color: '#fff3e0' },
    { title: 'Loan Disbursed', value: '₹ 12.5 Cr', change: 'Target: ₹ 15 Cr', icon: <AttachMoney fontSize="medium" color="info" />, color: '#e1f5fe' },
];

const transactions = [
    { id: 1, type: 'Deposit', user: 'Rakesh Gupta', amount: '₹ 25,000', status: 'Success', date: '30-Jan-2026' },
    { id: 2, type: 'Withdrawal', user: 'Anita Roy', amount: '₹ 10,000', status: 'Pending', date: '30-Jan-2026' },
    { id: 3, type: 'Transfer', user: 'Tech Solutions Ltd', amount: '₹ 1,50,000', status: 'Success', date: '29-Jan-2026' },
    { id: 4, type: 'Loan EMI', user: 'Vikram Singh', amount: '₹ 15,400', status: 'Failed', date: '29-Jan-2026' },
    { id: 5, type: 'Deposit', user: 'Suresh Kumar', amount: '₹ 5,000', status: 'Success', date: '29-Jan-2026' },
];

export default function AdminDashboard() {
    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" color="primary" fontWeight="bold">Dashboard Overview</Typography>
                <Typography variant="body2" color="text.secondary">System Status & Key Metrics</Typography>
            </Box>

            {/* KPI Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, mb: 3 }}>
                {stats.map((stat, index) => (
                    <Card key={index} sx={{ borderLeft: `4px solid ${stat.icon.props.color === 'primary' ? '#280071' : stat.icon.props.color === 'success' ? '#2e7d32' : stat.icon.props.color === 'warning' ? '#ed6c02' : '#0288d1'}` }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="start">
                                <Box>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>{stat.title}</Typography>
                                    <Typography variant="h5" fontWeight="bold" sx={{ my: 0.5 }}>{stat.value}</Typography>
                                    <Typography variant="caption" sx={{ color: stat.change.includes('Action') ? 'error.main' : 'success.main', fontWeight: 600 }}>
                                        {stat.change}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 1, borderRadius: 1, userSelect: "none", bgcolor: stat.color }}>
                                    {stat.icon}
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Main Content Area (Commented out as requested)
            <Box sx={{ display: 'grid', gridTemplateColumns: { md: '2fr 1fr' }, gap: 2 }}>

                <Card>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Recent Ledger Entries</Typography>
                            <Button size="small" variant="text" endIcon={<ArrowForward />}>View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Txn Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.user}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 600, color: row.type === 'Withdrawal' ? 'error.main' : 'success.main' }}>
                                                {row.type === 'Withdrawal' || row.type === 'Loan EMI' ? '-' : '+'} {row.amount}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={row.status}
                                                    size="small"
                                                    color={row.status === 'Success' ? 'success' : row.status === 'Pending' ? 'warning' : 'error'}
                                                    variant="outlined"
                                                    sx={{ height: 20, fontSize: '0.7rem' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>

                <Stack spacing={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>System Health</Typography>
                            <Stack spacing={1.5}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Server Status</Typography>
                                    <Chip label="Online" color="success" size="small" sx={{ height: 20 }} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">DB Latency</Typography>
                                    <Typography variant="caption" fontWeight="bold">24ms</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Failed Txns (24h)</Typography>
                                    <Typography variant="caption" color="error" fontWeight="bold">12</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Exchange Rates (INR)</Typography>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ color: 'text.secondary' }}>USD</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>₹ 83.12</TableCell>
                                        <TableCell align="right" sx={{ color: 'success.main' }}>+0.05%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: 'text.secondary' }}>EUR</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>₹ 90.45</TableCell>
                                        <TableCell align="right" sx={{ color: 'error.main' }}>-0.12%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: 'text.secondary' }}>GBP</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>₹ 105.30</TableCell>
                                        <TableCell align="right" sx={{ color: 'success.main' }}>+0.02%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
            */}
        </Box>
    );
}