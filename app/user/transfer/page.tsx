'use client';

import { Box, Card, Typography, TextField, Button, Stack, Tabs, Tab, MenuItem, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Paper, Divider, Alert, InputAdornment, Grid } from '@mui/material';
import {
    Send,
    Person,
    AccountBalance,
    Info
} from '@mui/icons-material';
import { useState } from 'react';

export default function TransferPage() {
    const [tabDetails, setTabDetails] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabDetails(newValue);
    };

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
                                    Daily Transaction Limit: ₹ 5,00,000.00 | Available Limit: ₹ 4,80,000.00
                                </Alert>

                                <TextField
                                    select
                                    label="Debit Account"
                                    defaultValue="309871234567"
                                    fullWidth
                                    helperText="Savings Account - Bal: ₹ 1,25,000.00"
                                >
                                    <MenuItem value="309871234567">xxxx1234567 - Savings Account</MenuItem>
                                    <MenuItem value="789012345678">xxxx12345678 - Current Account</MenuItem>
                                </TextField>

                                <Divider />

                                <Typography variant="subtitle2" fontWeight="bold">Beneficiary Details</Typography>

                                <TextField
                                    select
                                    label="Select Beneficiary"
                                    defaultValue=""
                                    fullWidth
                                >
                                    <MenuItem value="">-- Select --</MenuItem>
                                    <MenuItem value="ben1">Alice Smith (xxxx8901)</MenuItem>
                                    <MenuItem value="ben2">Bob Jones (xxxx2345)</MenuItem>
                                </TextField>

                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Divider sx={{ flex: 1 }}>OR</Divider>
                                    <Typography variant="caption">Quick Pay (Without Adding Beneficiary)</Typography>
                                    <Divider sx={{ flex: 1 }} />
                                </Box>

                                <TextField
                                    label="Beneficiary Account Number"
                                    fullWidth
                                    required
                                />
                                {tabDetails === 1 && (
                                    <TextField
                                        label="IFSC Code"
                                        fullWidth
                                        required
                                        placeholder="e.g., SBIN0001234"
                                    />
                                )}

                                <Divider />

                                <Typography variant="subtitle2" fontWeight="bold">Transaction Details</Typography>

                                <TextField
                                    label="Amount"
                                    fullWidth
                                    required
                                    type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                />

                                <TextField
                                    label="Remarks"
                                    fullWidth
                                    size="small"
                                />

                                {tabDetails === 1 && (
                                    <FormControl>
                                        <FormLabel id="transfer-type-group">Transfer Type</FormLabel>
                                        <RadioGroup row aria-labelledby="transfer-type-group" defaultValue="IMPS">
                                            <FormControlLabel value="IMPS" control={<Radio size="small" />} label="IMPS (Instant)" />
                                            <FormControlLabel value="NEFT" control={<Radio size="small" />} label="NEFT" />
                                            <FormControlLabel value="RTGS" control={<Radio size="small" />} label="RTGS (> 2 Lakhs)" />
                                        </RadioGroup>
                                    </FormControl>
                                )}

                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                    <Button variant="contained" size="medium" sx={{ minWidth: 120 }}>Proceed</Button>
                                    <Button variant="outlined" size="medium">Reset</Button>
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
