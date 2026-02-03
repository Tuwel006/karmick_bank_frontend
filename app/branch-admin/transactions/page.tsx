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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import { Add, TrendingDown, TrendingUp, SwapHoriz } from '@mui/icons-material';

interface Transaction {
  id: string;
  txnRef: string;
  type: string;
  amount: string;
  status: string;
  narration: string;
  createdAt: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  const [depositData, setDepositData] = useState({ accountId: '', amount: '', narration: '' });
  const [withdrawData, setWithdrawData] = useState({ accountId: '', amount: '', narration: '' });
  const [transferData, setTransferData] = useState({ fromAccountId: '', toAccountId: '', amount: '', narration: '' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const branchId = localStorage.getItem('branchId');
      const response = await fetch(`/api/transactions?branchId=${branchId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const processTransaction = async (type: string, formData: any) => {
    try {
      const response = await fetch(`/api/transactions/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        fetchTransactions();
        setOpenDialog(false);
        // Reset forms
        setDepositData({ accountId: '', amount: '', narration: '' });
        setWithdrawData({ accountId: '', amount: '', narration: '' });
        setTransferData({ fromAccountId: '', toAccountId: '', amount: '', narration: '' });
      }
    } catch (error) {
      console.error(`Failed to process ${type}:`, error);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'DEPOSIT': return <TrendingDown color="success" />;
      case 'WITHDRAW': return <TrendingUp color="error" />;
      case 'TRANSFER': return <SwapHoriz color="primary" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Transactions Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          New Transaction
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Narration</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell sx={{ fontFamily: 'monospace' }}>
                  {transaction.txnRef}
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getTransactionIcon(transaction.type)}
                    {transaction.type}
                  </Box>
                </TableCell>
                <TableCell>₹{transaction.amount}</TableCell>
                <TableCell>
                  <Chip 
                    label={transaction.status} 
                    color={getStatusColor(transaction.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{transaction.narration}</TableCell>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transaction Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Process Transaction</DialogTitle>
        <DialogContent>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Deposit" />
            <Tab label="Withdraw" />
            <Tab label="Transfer" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Account ID"
                value={depositData.accountId}
                onChange={(e) => setDepositData({ ...depositData, accountId: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Amount"
                type="number"
                value={depositData.amount}
                onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Narration"
                value={depositData.narration}
                onChange={(e) => setDepositData({ ...depositData, narration: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Account ID"
                value={withdrawData.accountId}
                onChange={(e) => setWithdrawData({ ...withdrawData, accountId: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Amount"
                type="number"
                value={withdrawData.amount}
                onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Narration"
                value={withdrawData.narration}
                onChange={(e) => setWithdrawData({ ...withdrawData, narration: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="From Account ID"
                value={transferData.fromAccountId}
                onChange={(e) => setTransferData({ ...transferData, fromAccountId: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="To Account ID"
                value={transferData.toAccountId}
                onChange={(e) => setTransferData({ ...transferData, toAccountId: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Amount"
                type="number"
                value={transferData.amount}
                onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Narration"
                value={transferData.narration}
                onChange={(e) => setTransferData({ ...transferData, narration: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
            </Box>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              const types = ['deposit', 'withdraw', 'transfer'];
              const data = [depositData, withdrawData, transferData];
              processTransaction(types[tabValue], data[tabValue]);
            }}
            variant="contained"
          >
            Process Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}