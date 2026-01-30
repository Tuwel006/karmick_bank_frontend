'use client';

import { Box, Card, Typography, Button, Stack, Tabs, Tab, TextField, MenuItem, Paper, Grid, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PhoneAndroid, ElectricBolt, WaterDrop, Tv, Router, Payment } from '@mui/icons-material';
import { useState } from 'react';

const billers = [
    { name: 'Mobile Recharge', icon: <PhoneAndroid />, color: '#e3f2fd' },
    { name: 'Electricity', icon: <ElectricBolt />, color: '#fff3e0' },
    { name: 'Water', icon: <WaterDrop />, color: '#e1f5fe' },
    { name: 'DTH', icon: <Tv />, color: '#fce4ec' },
    { name: 'Broadband', icon: <Router />, color: '#f3e5f5' },
    { name: 'Credit Card', icon: <Payment />, color: '#e8f5e9' },
];

export default function PaymentsPage() {
    const [tab, setTab] = useState(0);

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">Bill Payments & Recharges</Typography>
                <Typography variant="body2" color="text.secondary">Pay your utilities and recharge mobile instantly</Typography>
            </Box>

            <Paper sx={{ p: 1 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                    <Tab label="Quick Pay" />
                    <Tab label="My Billers" />
                    <Tab label="Payment History" />
                </Tabs>
            </Paper>

            {tab === 0 && (
                <Stack spacing={3}>
                    <Grid container spacing={2}>
                        {billers.map((b, i) => (
                            <Grid size={{ xs: 6, md: 2 }} key={i}>
                                <Card sx={{ textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f5f7fa' } }}>
                                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: b.color, color: 'text.primary', mb: 1 }}>{b.icon}</Avatar>
                                        <Typography variant="caption" fontWeight="bold">{b.name}</Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Payment Details</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Select Biller" select size="small">
                                    <MenuItem value="1">Airtel Postpaid</MenuItem>
                                    <MenuItem value="2">WBSEDCL Electricity</MenuItem>
                                    <MenuItem value="3">Tata Play DTH</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Consumer Number / Mobile" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Amount" type="number" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Pay From" select size="small" defaultValue="1">
                                    <MenuItem value="1">Savings Account - ****4567</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{ mt: 3, px: 4 }}>Proceed to Pay</Button>
                    </Card>
                </Stack>
            )}

            {tab === 2 && (
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Biller</TableCell>
                                <TableCell>Ref No</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>28-Jan-2026</TableCell>
                                <TableCell>Airtel Mobile</TableCell>
                                <TableCell>TXN998877</TableCell>
                                <TableCell align="right">₹ 499.00</TableCell>
                                <TableCell><Typography variant="caption" color="success.main">Success</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Stack>
    );
}
