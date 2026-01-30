'use client';

import { Box, Card, Typography, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Switch, FormControlLabel } from '@mui/material';
import { Add } from '@mui/icons-material';

const policies = [
    { id: 1, name: 'Minimum Balance - Savings', value: '₹ 1,000', status: 'Active' },
    { id: 2, name: 'Daily Withdrawal Limit', value: '₹ 20,000', status: 'Active' },
    { id: 3, name: 'IMPS Transaction Limit', value: '₹ 2,00,000', status: 'Active' },
    { id: 4, name: 'International Usage', value: 'Disabled', status: 'Inactive' },
];

const rates = [
    { id: 1, type: 'Home Loan', rate: '8.50%', duration: 'Floating' },
    { id: 2, type: 'Personal Loan', rate: '11.25%', duration: 'Fixed' },
    { id: 3, type: 'Fixed Deposit (1Y)', rate: '6.75%', duration: 'Fixed' },
    { id: 4, type: 'Savings Interest', rate: '3.00%', duration: 'Quarterly' },
];

export default function PoliciesPage() {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">Bank Policies & Rates</Typography>
                <Typography variant="body2" color="text.secondary">Configure operational limits and interest rates</Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 3 }}>
                <Card>
                    <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Operational Limits</Typography>
                        <Button startIcon={<Add />}>Add Policy</Button>
                    </Box>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Policy Name</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {policies.map((policy) => (
                                    <TableRow key={policy.id}>
                                        <TableCell>{policy.name}</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>{policy.value}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={policy.status}
                                                size="small"
                                                color={policy.status === 'Active' ? 'success' : 'default'}
                                                variant="outlined"
                                                sx={{ height: 20, fontSize: '0.7rem' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button size="small">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>

                <Card>
                    <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Interest Rates</Typography>
                        <Button startIcon={<Add />}>Update Rates</Button>
                    </Box>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Type</TableCell>
                                    <TableCell>Interest Rate</TableCell>
                                    <TableCell>Terms</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rates.map((rate) => (
                                    <TableRow key={rate.id}>
                                        <TableCell>{rate.type}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{rate.rate}</TableCell>
                                        <TableCell>{rate.duration}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>

            <Card>
                <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                    <Typography variant="h6">Global Configurations</Typography>
                </Box>
                <Box sx={{ p: 3, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Box>
                            <Typography variant="subtitle2">Maintenance Mode</Typography>
                            <Typography variant="caption" color="text.secondary">Suspend customer logins</Typography>
                        </Box>
                        <Switch color="error" />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Box>
                            <Typography variant="subtitle2">2FA Requirement</Typography>
                            <Typography variant="caption" color="text.secondary">Mandatory OTP for all txns</Typography>
                        </Box>
                        <Switch defaultChecked color="success" />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Box>
                            <Typography variant="subtitle2">New User Registration</Typography>
                            <Typography variant="caption" color="text.secondary">Allow public sign-ups</Typography>
                        </Box>
                        <Switch defaultChecked color="primary" />
                    </Box>
                </Box>
            </Card>
        </Stack>
    );
}
