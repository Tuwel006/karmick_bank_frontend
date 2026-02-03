'use client';

import { Box, Typography, TextField, Button, Stack, Tabs, Tab, MenuItem, Paper, Divider, Alert, InputAdornment, Grid, CircularProgress, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import {
    Person,
    AccountBalance,
    Info
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { accountService } from '@/services/account.service';
import { transactionService } from '@/services/transaction.service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function TransferPage() {
    const router = useRouter();
    const [tabDetails, setTabDetails] = useState(0);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [transferData, setTransferData] = useState({
        fromAccountId: '',
        toAccountId: '',
        amount: '',
        remarks: '',
        transferType: 'IMPS' // For external transfer
    });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const data: any = await accountService.getAccounts(); // Adjust if API is different
            // If the API returns a paginated response or wrapped object, extract the array
            // Based on previous file views, it seems apiHelper returns response.data directly
            // But let's be safe. If it is an array use it, else check for data property
            const accountList = Array.isArray(data) ? data : (data.data || []);
            setAccounts(accountList);
            if (accountList.length > 0) {
                setTransferData(prev => ({ ...prev, fromAccountId: accountList[0].id }));
            }
        } catch (error) {
            console.error('Failed to fetch accounts', error);
            toast.error('Failed to load your accounts');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabDetails(newValue);
    };

    const handleTransfer = async () => {
        if (!transferData.fromAccountId || !transferData.toAccountId || !transferData.amount) {
            toast.error('Please fill in all required fields');
            return;
        }

        const amount = parseFloat(transferData.amount);
        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setSubmitting(true);
        try {
            await transactionService.transfer({
                fromAccountId: transferData.fromAccountId,
                toAccountId: transferData.toAccountId,
                amount: amount,
                narration: transferData.remarks || 'Fund Transfer'
            });
            toast.success('Transfer successful!');
            setTransferData(prev => ({ ...prev, toAccountId: '', amount: '', remarks: '' }));
            router.push('/user'); // Redirect to dashboard to see transaction
        } catch (error: any) {
            console.error('Transfer failed', error);
            const msg = error?.response?.data?.message || 'Transfer failed. Please try again.';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h5" color="primary" fontWeight="bold">Fund Transfer</Typography>

            <Paper sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f5f7fa' }}>
                    <Tabs value={tabDetails} onChange={handleTabChange}>
                        <Tab label="Within Bank Transfer" icon={<Person fontSize="small" />} iconPosition="start" />
                        <Tab label="Other Bank (IMPS/NEFT/RTGS)" icon={<AccountBalance fontSize="small" />} iconPosition="start" />
                    </Tabs>
                </Box>

                <Box sx={{ p: 4, bgcolor: 'white' }}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Stack spacing={3} sx={{ maxWidth: 600 }}>
                                <Alert severity="info" icon={<Info fontSize="small" />} sx={{ py: 0 }}>
                                    Daily Transaction Limit: ₹ 5,00,000.00
                                </Alert>

                                <TextField
                                    select
                                    label="Debit Account"
                                    value={transferData.fromAccountId}
                                    onChange={(e) => setTransferData({ ...transferData, fromAccountId: e.target.value })}
                                    fullWidth
                                    helperText={accounts.find(a => a.id === transferData.fromAccountId)?.accountNumber ? `Balance: ₹ ${accounts.find(a => a.id === transferData.fromAccountId)?.balance}` : ''}
                                >
                                    {accounts.map((account: any) => (
                                        <MenuItem key={account.id} value={account.id}>
                                            {account.accountNumber} - {account.accountType}
                                        </MenuItem>
                                    ))}
                                    {accounts.length === 0 && <MenuItem disabled>No accounts found</MenuItem>}
                                </TextField>

                                <Divider />

                                <Typography variant="subtitle2" fontWeight="bold">Beneficiary Details</Typography>

                                {tabDetails === 0 ? (
                                    <>
                                        <TextField
                                            label="Beneficiary Account ID (Within Bank)"
                                            fullWidth
                                            required
                                            value={transferData.toAccountId}
                                            onChange={(e) => setTransferData({ ...transferData, toAccountId: e.target.value })}
                                            placeholder="Enter destination account ID (UUID)"
                                            helperText="For testing, copy an Account ID from Admin or create another account."
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* External Transfer UI Placeholder - Backend might not support yet */}
                                        <Alert severity="warning">External transfers are currently simulated.</Alert>
                                        <TextField
                                            label="Beneficiary Account Number"
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            label="IFSC Code"
                                            fullWidth
                                            required
                                            placeholder="e.g., SBIN0001234"
                                        />
                                    </>
                                )}

                                <Divider />

                                <Typography variant="subtitle2" fontWeight="bold">Transaction Details</Typography>

                                <TextField
                                    label="Amount"
                                    fullWidth
                                    required
                                    type="number"
                                    value={transferData.amount}
                                    onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                />

                                <TextField
                                    label="Remarks"
                                    fullWidth
                                    size="small"
                                    value={transferData.remarks}
                                    onChange={(e) => setTransferData({ ...transferData, remarks: e.target.value })}
                                />

                                {tabDetails === 1 && (
                                    <FormControl>
                                        <FormLabel id="transfer-type-group">Transfer Type</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="transfer-type-group"
                                            value={transferData.transferType}
                                            onChange={(e) => setTransferData({ ...transferData, transferType: e.target.value })}
                                        >
                                            <FormControlLabel value="IMPS" control={<Radio size="small" />} label="IMPS (Instant)" />
                                            <FormControlLabel value="NEFT" control={<Radio size="small" />} label="NEFT" />
                                            <FormControlLabel value="RTGS" control={<Radio size="small" />} label="RTGS (> 2 Lakhs)" />
                                        </RadioGroup>
                                    </FormControl>
                                )}

                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        sx={{ minWidth: 120 }}
                                        onClick={handleTransfer}
                                        disabled={submitting || accounts.length === 0}
                                    >
                                        {submitting ? 'Processing...' : 'Proceed'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        onClick={() => setTransferData(prev => ({ ...prev, toAccountId: '', amount: '', remarks: '' }))}
                                        disabled={submitting}
                                    >
                                        Reset
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ bgcolor: '#fff8e1', p: 3, borderRadius: 2, border: '1px solid #ffe082' }}>
                                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Important Instructions:</Typography>
                                <Typography variant="caption" display="block" paragraph>
                                    1. Beneficiary Account Number and IFSC are critical. Please verify before proceeding.
                                </Typography>
                                <Typography variant="caption" display="block" paragraph>
                                    2. IMPS transactions are instant and available 24x7.
                                </Typography>
                                <Typography variant="caption" display="block" paragraph>
                                    3. NEFT transactions are settled in batches every half hour.
                                </Typography>
                                <Typography variant="caption" display="block">
                                    4. For issues, contact helpdesk with Reference Number.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Stack>
    );
}
