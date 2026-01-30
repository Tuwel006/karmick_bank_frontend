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
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

const userProfile = {
  name: 'John Doe',
  customerID: 'CU-88901234',
  email: 'john.doe@email.com',
  phone: '+91 98765 43210',
  lastLogin: '30 Jan 2026, 14:10 IST',
  kycStatus: 'Verified'
};

const accounts = [
  {
    id: 1,
    type: 'Savings Account',
    number: '309871234567',
    branch: 'Kolkata Main',
    balance: '1,25,000.00',
    currency: '₹',
    status: 'Active',
    income: '24,000',
    expense: '12,500'
  }
];

const transactions = [
  { id: 1, date: '30-Jan-2026', desc: 'UPI/P2P/9876543210/Dinner', ref: 'Ref123456', debit: '1,200.00', credit: '', balance: '1,23,800.00', status: 'Success' },
  { id: 2, date: '29-Jan-2026', desc: 'NEFT Credit/Salary/Jan 2026', ref: 'Ref987654', debit: '', credit: '85,000.00', balance: '1,25,000.00', status: 'Success' },
  { id: 3, date: '28-Jan-2026', desc: 'ATM Wdl/Kolkata/ATM01', ref: 'Ref456789', debit: '2,000.00', credit: '', balance: '40,000.00', status: 'Success' },
  { id: 4, date: '25-Jan-2026', desc: 'POS/Amazon Retail/Mumbai', ref: 'Ref112233', debit: '1,500.00', credit: '', balance: '42,000.00', status: 'Success' },
  { id: 5, date: '20-Jan-2026', desc: 'Interest Credit', ref: 'KB-INT-99', debit: '', credit: '1,200.00', balance: '43,500.00', status: 'Success' },
];

export default function UserDashboard() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

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
              <Typography variant="h4" fontWeight="800">Welcome, {userProfile.name}</Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1, opacity: 0.9 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VerifiedUser fontSize="small" sx={{ color: '#4caf50' }} /> Customer ID: {userProfile.customerID}
                </Typography>
                <Typography variant="body2">Last Login: {userProfile.lastLogin}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 'auto' }}>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="secondary" startIcon={<Add />} onClick={() => router.push('/user/transfer')} sx={{ borderRadius: 2, fontWeight: 700 }}>
                  Quick Transfer
                </Button>
                <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 2 }}>
                  Edit Profile
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
                      <Typography variant="h3" fontWeight="900" color="primary">{accounts[0].currency} {accounts[0].balance}</Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1, p: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                      <Typography variant="caption" color="success.main" fontWeight="bold">Income (Jan)</Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.dark">+{accounts[0].currency}{accounts[0].income}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, p: 2, bgcolor: '#ffebee', borderRadius: 2 }}>
                      <Typography variant="caption" color="error.main" fontWeight="bold">Spent (Jan)</Typography>
                      <Typography variant="h6" fontWeight="bold" color="error.dark">-{accounts[0].currency}{accounts[0].expense}</Typography>
                    </Box>
                  </Stack>

                  <Divider />

                  <List dense sx={{ p: 0 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><Home fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary="Branch" secondary={accounts[0].branch} />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><CreditCard fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary="Account Number" secondary={accounts[0].number} />
                    </ListItem>
                  </List>
                </Stack>
              </CardContent>
            </Card>

            {/* Loyalty/Services Card */}
            <Card sx={{ borderRadius: 4, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="800" gutterBottom>Privilege Member</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>You are eligible for pre-approved Home Loans up to ₹ 45 Lakhs!</Typography>
                <Button variant="contained" color="secondary" fullWidth sx={{ borderRadius: 2, fontWeight: 700 }}>Claim Offer</Button>
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
                <Tooltip title="Download CSV">
                  <IconButton size="small" sx={{ border: '1px solid #eee' }}>
                    <FileDownload fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Button size="small" variant="text" color="primary" endIcon={<ArrowForward fontSize="small" />}>View All</Button>
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
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((txn) => (
                      <TableRow key={txn.id} hover>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{txn.date}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 250, fontSize: '0.85rem' }} noWrap>
                            {txn.desc}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            Ref: {txn.ref}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {txn.debit && (
                            <Typography variant="body2" fontWeight="700" color="error.main">
                              -{accounts[0].currency}{txn.debit}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {txn.credit && (
                            <Typography variant="body2" fontWeight="700" color="success.main">
                              +{accounts[0].currency}{txn.credit}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="600">
                            {accounts[0].currency}{txn.balance}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Currently showing most recent 5 transactions. <br />
                Total <strong>{transactions.length}</strong> records found in this cycle.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}