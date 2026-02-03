'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
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
  Chip
} from '@mui/material';
import {
  AccountBalance,
  People,
  TrendingUp,
  AttachMoney,
  Add
} from '@mui/icons-material';

interface DashboardStats {
  totalAccounts: number;
  totalCustomers: number;
  totalBalance: string;
  totalStaff: number;
  todayTransactions: number;
}

interface BranchInfo {
  id: string;
  name: string;
  ifsc: string;
  city: string;
  state: string;
  address: string;
}

interface RecentTransaction {
  id: string;
  txnRef: string;
  type: string;
  amount: string;
  status: string;
  createdAt: string;
}

import { accountService } from '@/services/account.service';
import { customerService } from '@/services/customer.service';
import { branchService } from '@/services/branch.service';
import { transactionService } from '@/services/transaction.service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function BranchAdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalAccounts: 0,
    totalCustomers: 0,
    totalBalance: '0.00',
    totalStaff: 0,
    todayTransactions: 0
  });
  const [branchInfo, setBranchInfo] = useState<BranchInfo | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const branchId = payload.branchId;

      if (!branchId) {
        toast.error('Branch associated with this admin not found');
        setLoading(false);
        return;
      }

      const [branchRes, accountsRes, customersRes, transactionsRes] = await Promise.all([
        branchService.getBranchById(branchId),
        accountService.getAccounts({ branchId, limit: 1 }),
        customerService.getCustomers({ branchId, limit: 1 }),
        transactionService.getTransactions({ branchId, limit: 5 })
      ]);

      setBranchInfo(branchRes.data);
      setStats({
        totalAccounts: accountsRes.data.total || 0,
        totalCustomers: customersRes.data.total || 0,
        totalBalance: '0.00', // Need dynamic balance aggregation if backend supports it
        totalStaff: 0, // Need staff service
        todayTransactions: transactionsRes.data.total || 0
      });
      setRecentTransactions(transactionsRes.data.data.map((txn: any) => ({
        id: txn.id,
        txnRef: txn.reference || txn.id.slice(0, 8),
        type: txn.type,
        amount: txn.amount,
        status: txn.status,
        createdAt: txn.createdAt
      })));

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load branch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Typography sx={{ m: 4 }}>Loading branch analytics...</Typography>;
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          Branch Control Center
        </Typography>
        {branchInfo && (
          <Typography variant="body1" color="textSecondary" sx={{ bgcolor: 'white', p: 1, borderRadius: 1, display: 'inline-block', border: '1px solid #eee' }}>
            <AccountBalance sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            {branchInfo.name} | IFSC: {branchInfo.ifsc} | {branchInfo.city}, {branchInfo.state}
          </Typography>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Accounts"
            value={stats.totalAccounts}
            icon={<AccountBalance fontSize="large" />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<People fontSize="large" />}
            color="secondary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Branch Deposits"
            value={`₹${stats.totalBalance}`}
            icon={<AttachMoney fontSize="large" />}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Today's Activity"
            value={stats.todayTransactions}
            icon={<TrendingUp fontSize="large" />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Operations Registry
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  fullWidth
                  onClick={() => router.push('/branch-admin/accounts/create')}
                  sx={{ borderRadius: 2, py: 1.5, bgcolor: 'primary.main' }}
                >
                  Create New Bank Account
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<People />}
                  fullWidth
                  sx={{ borderRadius: 2, py: 1.5 }}
                >
                  Onboard New Customer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Live Transaction Feed
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Reference</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactions.length > 0 ? recentTransactions.map((txn) => (
                      <TableRow key={txn.id} hover>
                        <TableCell sx={{ fontSize: '0.85rem' }}>{txn.txnRef}</TableCell>
                        <TableCell>
                          <Chip label={txn.type} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>₹{txn.amount}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={txn.status}
                            size="small"
                            color={txn.status === 'COMPLETED' ? 'success' : txn.status === 'PENDING' ? 'warning' : 'error'}
                            sx={{ minWidth: 80, fontSize: '0.7rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                          No transaction records found for this branch.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}