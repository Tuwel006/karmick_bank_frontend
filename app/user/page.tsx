'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Grid,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Visibility,
  Add,
  ArrowForward,
  AccountBalance,
  CreditCard,
  Print,
  FileDownload,
  Share,
  History,
  TrendingUp,
  TrendingDown,
  Person,
  Home,
  VerifiedUser,
  AccountBalanceWallet
} from '@mui/icons-material';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { customerService } from '@/services/customer.service';
import { accountService } from '@/services/account.service';
import { transactionService } from '@/services/transaction.service';
import { toast } from 'react-toastify';

export default function UserDashboard() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userAccounts, setUserAccounts] = useState<any[]>([]);
  const [userTransactions, setUserTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const customerId = payload.customerId;

        if (!customerId) {
          toast.error('Customer profile not associated with this user');
          setLoading(false);
          return;
        }

        const [profileRes, accountsRes, transactionsRes] = await Promise.all([
          customerService.getCustomerById(customerId),
          accountService.getAccounts({ customerId }),
          transactionService.getTransactions({ customerId, limit: 10 })
        ]);

        setProfile(profileRes.data);
        setUserAccounts(accountsRes.data.data || []);
        setUserTransactions(transactionsRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (printContent) {
      const winConfig = 'height=700,width=900';
      const printWindow = window.open('', '_blank', winConfig);
      if (printWindow) {
        printWindow.document.write('<html><head><title>Account Statement</title>');
        printWindow.document.write('<style>body{font-family:sans-serif;padding:20px} table{width:100%;border-collapse:collapse} th,td{border:1px solid #ddd;padding:8px;text-align:left} th{background-color:#f2f2f2}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Karmick Bank - Account Statement</h1>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const primaryAccount = userAccounts[0] || {
    balance: '0.00',
    currency: '₹',
    accountNumber: 'N/A',
    accountType: 'N/A'
  };

  if (loading) return <LinearProgress />;

  return (
    <Stack spacing={4}>
      {/* Header Profile Section */}
      <Card sx={{
        background: 'linear-gradient(to right, #280071, #5c33a2)',
        color: 'white',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(40,0,113,0.15)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 'auto' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'secondary.main', border: '4px solid rgba(255,255,255,0.2)' }}>
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
            </Grid>
            <Grid size={{ xs: 12, md: 'grow' }}>
              <Typography variant="h4" fontWeight="800">Welcome, {profile?.firstName || 'User'}</Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1, opacity: 0.9 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VerifiedUser fontSize="small" sx={{ color: '#4caf50' }} /> Customer ID: {profile?.customerNumber || 'N/A'}
                </Typography>
                <Typography variant="body2">Status: {profile?.status || 'Active'}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 'auto' }}>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="secondary" startIcon={<Add />} onClick={() => router.push('/user/transfer')} sx={{ borderRadius: 2, fontWeight: 700 }}>
                  Quick Transfer
                </Button>
                <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 2 }} onClick={() => router.push('/user/profile')}>
                  My Profile
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Left Side: Account Info & Quick Actions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Account Balance Card */}
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <Box sx={{ p: 2.5, bgcolor: '#fafbfd', borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2" fontWeight="bold">Account Overview</Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Total Available Balance</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography variant="h3" fontWeight="900" color="primary">₹ {primaryAccount.balance}</Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1, p: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                      <Typography variant="caption" color="success.main" fontWeight="bold">Type</Typography>
                      <Typography variant="subtitle1" fontWeight="bold" color="success.dark">{primaryAccount.accountType}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, p: 2, bgcolor: '#ffebee', borderRadius: 2 }}>
                      <Typography variant="caption" color="error.main" fontWeight="bold">Currency</Typography>
                      <Typography variant="subtitle1" fontWeight="bold" color="error.dark">{primaryAccount.currency}</Typography>
                    </Box>
                  </Stack>

                  <Divider />

                  <List dense sx={{ p: 0 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><AccountBalanceWallet fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary="Account Number" secondary={primaryAccount.accountNumber} />
                    </ListItem>
                  </List>
                </Stack>
              </CardContent>
            </Card>

            {/* Services Card */}
            <Card sx={{ borderRadius: 4, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="800" gutterBottom>Need Assistance?</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>Our experts are available 24/7 to help you with your banking needs.</Typography>
                <Button variant="contained" color="secondary" fullWidth sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => router.push('/user/services')}>Contact Helpdesk</Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Side: Transaction History */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 4, height: '100%' }}>
            <Box sx={{
              p: 2.5,
              bgcolor: '#fafbfd',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <History color="primary" />
                <Typography variant="subtitle1" fontWeight="800">Recent Transactions</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Print Statement">
                  <IconButton size="small" onClick={handlePrint} sx={{ border: '1px solid #eee' }}>
                    <Print fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Button size="small" variant="text" color="primary" endIcon={<ArrowForward fontSize="small" />} onClick={() => router.push('/user/history')}>View All</Button>
              </Stack>
            </Box>

            <Box ref={printRef}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f9fafc' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Narration</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Debit</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Credit</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Balance After</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userTransactions.length > 0 ? userTransactions.map((txn) => (
                      <TableRow key={txn.id} hover>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 250, fontSize: '0.85rem' }} noWrap>
                            {txn.description || txn.type}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            Ref: {txn.reference || txn.id.slice(0, 8)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {txn.type === 'DEBIT' && (
                            <Typography variant="body2" fontWeight="700" color="error.main">
                              -₹{txn.amount}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {txn.type === 'CREDIT' && (
                            <Typography variant="body2" fontWeight="700" color="success.main">
                              +₹{txn.amount}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="600">
                            ₹{txn.balanceAfter}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                          No recent transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Currently showing most recent transactions. <br />
                Total <strong>{userTransactions.length}</strong> records found in this cycle.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}