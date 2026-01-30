'use client';

import { Box, Card, Typography, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar } from '@mui/material';
import { Check, Close, Visibility } from '@mui/icons-material';

const pendingApprovals = [
    { id: 1, type: 'KYC Verification', user: 'Amit Sharma', date: '30-Jan-2026', priority: 'High', details: 'Aadhar & PAN uploaded' },
    { id: 2, type: 'Loan Approval', user: 'Priya Verma', date: '29-Jan-2026', priority: 'Medium', details: 'Home Loan - ₹ 25,00,000' },
    { id: 3, type: 'Account Opening', user: 'Rahul Gupta', date: '30-Jan-2026', priority: 'Low', details: 'Corporate Current Account' },
    { id: 4, type: 'Address Change', user: 'Sonal Singh', date: '28-Jan-2026', priority: 'Low', details: 'Updated Electricity Bill' },
    { id: 5, type: 'Credit Card Limit', user: 'Vijay Kumar', date: '30-Jan-2026', priority: 'Medium', details: 'Increase from 1L to 3L' },
];

export default function ApprovalsPage() {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">Pending Approvals</Typography>
                <Typography variant="body2" color="text.secondary">Review and authorize pending requests</Typography>
            </Box>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Request Type</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell align="center">Priority</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingApprovals.map((req) => (
                            <TableRow key={req.id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{req.type}</TableCell>
                                <TableCell>{req.user}</TableCell>
                                <TableCell>{req.date}</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary', maxWidth: 200 }}>{req.details}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={req.priority}
                                        size="small"
                                        color={req.priority === 'High' ? 'error' : req.priority === 'Medium' ? 'warning' : 'default'}
                                        sx={{ height: 20, fontSize: '0.7rem' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button size="small" variant="text" startIcon={<Visibility />}>View</Button>
                                        <Button size="small" variant="text" color="success" startIcon={<Check />}>Approve</Button>
                                        <Button size="small" variant="text" color="error" startIcon={<Close />}>Reject</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}
