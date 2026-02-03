'use client';

import { Box, Card, CardContent, Typography, Button, Stack, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    GroupAdd,
    WarningAmber,
    ArrowForward,
    AccountBalanceWallet,
    AttachMoney,
    AccountBalance
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { customerService } from '@/services/customer.service';
import { accountService } from '@/services/account.service';
import { branchService } from '@/services/branch.service';
import { transactionService } from '@/services/transaction.service';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState([
        { title: 'Total Customers', value: '0', change: 'Loading...', icon: <GroupAdd fontSize="medium" color="primary" />, color: '#e3f2fd' },
        { title: 'Total Accounts', value: '0', change: 'Loading...', icon: <AccountBalanceWallet fontSize="medium" color="success" />, color: '#e8f5e9' },
        { title: 'Total Branches', value: '0', change: 'Loading...', icon: <AccountBalance fontSize="medium" color="warning" />, color: '#fff3e0' },
        { title: 'Recent Transactions', value: '0', change: 'Loading...', icon: <AttachMoney fontSize="medium" color="info" />, color: '#e1f5fe' },
    ]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [customersRes, accountsRes, branchesRes, transactionsRes] = await Promise.all([
                    customerService.getCustomers({ limit: 1 }),
                    accountService.getAccounts({ limit: 1 }),
                    branchService.getBranches({ limit: 1 }),
                    transactionService.getTransactions({ limit: 5 })
                ]);

                setStats([
                    { title: 'Total Customers', value: customersRes.data.total?.toString() || '0', change: 'Current active customers', icon: <GroupAdd fontSize="medium" color="primary" />, color: '#e3f2fd' },
                    { title: 'Total Accounts', value: accountsRes.data.total?.toString() || '0', change: 'Across all branches', icon: <AccountBalanceWallet fontSize="medium" color="success" />, color: '#e8f5e9' },
                    { title: 'Total Branches', value: branchesRes.data.total?.toString() || '0', change: 'Active service points', icon: <AccountBalance fontSize="medium" color="warning" />, color: '#fff3e0' },
                    { title: 'Recent Transactions', value: transactionsRes.data.total?.toString() || '0', change: 'Last 24 hours', icon: <AttachMoney fontSize="medium" color="info" />, color: '#e1f5fe' },
                ]);

                setTransactions(transactionsRes.data.data || []);
            } catch (error) {
                console.error('Failed to fetch stats', error);
                toast.error('Failed to load dashboard metrics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

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
                                    <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
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

            {/* Recent Transactions Table */}
            <Card>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Recent Ledger Entries</Typography>
                        <Button size="small" variant="text" endIcon={<ArrowForward />} onClick={() => router.push('/admin/transactions')}>View All</Button>
                    </Box>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Txn Date</TableCell>
                                    <TableCell>Reference</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.length > 0 ? transactions.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{row.reference || row.id.slice(0, 8)}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 600, color: row.type === 'DEBIT' ? 'error.main' : 'success.main' }}>
                                            {row.type === 'DEBIT' ? '-' : '+'} ₹{row.amount}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={row.status}
                                                size="small"
                                                color={row.status === 'COMPLETED' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'}
                                                variant="outlined"
                                                sx={{ height: 20, fontSize: '0.7rem' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                            {loading ? 'Loading transactions...' : 'No recent transactions found'}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}