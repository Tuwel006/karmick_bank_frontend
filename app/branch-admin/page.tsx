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
  address: {
    addressLine1: string;
    city: string;
    state: string;
  };
}

interface RecentTransaction {
  id: string;
  txnRef: string;
  type: string;
  amount: string;
  status: string;
  createdAt: string;
}

export default function BranchAdminDashboard() {
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
      const branchId = localStorage.getItem('branchId') || '';
      
      const response = await fetch(`/api/dashboard/branch?branchId=${branchId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setBranchInfo(data.data.branch);
        setStats(data.data.stats);
        setRecentTransactions(data.data.recentActivity || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
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
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Branch Dashboard
        </Typography>
        {branchInfo && (
          <Typography variant="body1" color="textSecondary">
            {branchInfo.name} - {branchInfo.ifsc} | {branchInfo.address.city}, {branchInfo.address.state}
          </Typography>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Accounts"
            value={stats.totalAccounts}
            icon={<AccountBalance fontSize="large" />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<People fontSize="large" />}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Balance"
            value={`₹${stats.totalBalance}`}
            icon={<AttachMoney fontSize="large" />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Staff Members"
            value={stats.totalStaff}
            icon={<People fontSize="large" />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Today's Transactions"
            value={stats.todayTransactions}
            icon={<TrendingUp fontSize="large" />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="contained" startIcon={<Add />}>
                  New Account
                </Button>
                <Button variant="outlined" startIcon={<Add />}>
                  New Customer
                </Button>
                <Button variant="outlined" startIcon={<Add />}>
                  Add Staff
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ref</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactions.slice(0, 5).map((txn) => (
                      <TableRow key={txn.id}>
                        <TableCell>{txn.txnRef}</TableCell>
                        <TableCell>{txn.type}</TableCell>
                        <TableCell>₹{txn.amount}</TableCell>
                        <TableCell>
                          <Chip 
                            label={txn.status} 
                            size="small"
                            color={txn.status === 'SUCCESS' ? 'success' : 'default'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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