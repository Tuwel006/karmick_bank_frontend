'use client';

import { useState, useEffect } from 'react';
import {
  Box,
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
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar
} from '@mui/material';
import { Add, Visibility, Block, CheckCircle, Person } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Account {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: string;
  status: string;
  ifscCode: string;
  customer: {
    id: string;
    customerNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    kycStatus: string;
  };
  branch: {
    name: string;
    ifsc: string;
  };
  createdAt: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAccounts: 0,
    totalBalance: '0.00',
    activeAccounts: 0,
    pendingKyc: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const branchId = localStorage.getItem('branchId');
      const response = await fetch(`/api/accounts/with-customers?branchId=${branchId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setAccounts(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (accountsData: Account[]) => {
    const totalBalance = accountsData.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);
    const activeAccounts = accountsData.filter(acc => acc.status === 'ACTIVE').length;
    const pendingKyc = accountsData.filter(acc => acc.customer.kycStatus === 'PENDING').length;
    
    setStats({
      totalAccounts: accountsData.length,
      totalBalance: totalBalance.toFixed(2),
      activeAccounts,
      pendingKyc
    });
  };

  const updateAccountStatus = async (accountId: string, status: string) => {
    try {
      const response = await fetch(`/api/accounts/${accountId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchAccounts();
      }
    } catch (error) {
      console.error('Failed to update account status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'FROZEN': return 'warning';
      case 'CLOSED': return 'error';
      default: return 'default';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'success';
      case 'PENDING': return 'warning';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4">Accounts Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push('/branch-admin/accounts/create')}
          size="large"
        >
          Create New Account
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Total Accounts
              </Typography>
              <Typography variant="h4">
                {stats.totalAccounts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Total Balance
              </Typography>
              <Typography variant="h4">
                ₹{stats.totalBalance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Active Accounts
              </Typography>
              <Typography variant="h4">
                {stats.activeAccounts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Pending KYC
              </Typography>
              <Typography variant="h4">
                {stats.pendingKyc}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Account Details</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>KYC Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {account.customer.firstName} {account.customer.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {account.customer.customerNumber}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {account.customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontFamily: 'monospace' }}>
                        {account.accountNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {account.accountType} • {account.ifscCode}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      ₹{account.balance}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={account.status} 
                      color={getStatusColor(account.status)}
                      size="small"
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={account.customer.kycStatus} 
                      color={getKycStatusColor(account.customer.kycStatus)}
                      size="small"
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(account.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                      {account.status === 'ACTIVE' ? (
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => updateAccountStatus(account.id, 'FROZEN')}
                        >
                          <Block />
                        </IconButton>
                      ) : (
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => updateAccountStatus(account.id, 'ACTIVE')}
                        >
                          <CheckCircle />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}