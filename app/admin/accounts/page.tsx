'use client';

import { Box, Card, Typography, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar, Grid, InputAdornment, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';

const accounts = [
    { id: 101, holder: 'John Doe', type: 'Savings', number: '309871234567', balance: '₹ 1,25,000', status: 'Active', branch: 'Main Branch' },
    { id: 102, holder: 'Jane Smith', type: 'Current', number: '309871234588', balance: '₹ 45,000', status: 'Active', branch: 'Main Branch' },
    { id: 103, holder: 'Robert Brown', type: 'Loan', number: 'LN-987654', balance: '-₹ 5,00,000', status: 'Active', branch: 'City Branch' },
    { id: 104, holder: 'Emily Davis', type: 'Savings', number: '309871239999', balance: '₹ 2,000', status: 'Frozen', branch: 'Main Branch' },
    { id: 105, holder: 'Michael Wilson', type: 'FD', number: 'FD-123456', balance: '₹ 1,00,000', status: 'Active', branch: 'City Branch' },
];

export default function AccountsPage() {
    return (
        <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" color="primary" fontWeight="bold">Accounts & Deposits</Typography>
                    <Typography variant="body2" color="text.secondary">Detailed view of all bank accounts</Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />}>Create Account</Button>
            </Box>

            {/* Filter Section */}
            <Paper sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField fullWidth label="Search by Name / A/C Number" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <TextField select fullWidth label="Account Type" size="small" defaultValue="All">
                            <MenuItem value="All">All Types</MenuItem>
                            <MenuItem value="Savings">Savings</MenuItem>
                            <MenuItem value="Current">Current</MenuItem>
                            <MenuItem value="Loan">Loan</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <TextField select fullWidth label="Status" size="small" defaultValue="All">
                            <MenuItem value="All">All Status</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Frozen">Frozen</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Button variant="outlined" fullWidth>Filter</Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Accounts Table */}
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account No</TableCell>
                            <TableCell>Account Holder</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Branch</TableCell>
                            <TableCell align="right">Balance</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{row.number}</TableCell>
                                <TableCell>{row.holder}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.branch}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }}>{row.balance}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        color={row.status === 'Active' ? 'success' : row.status === 'Frozen' ? 'error' : 'default'}
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.7em' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button size="small" variant="text">View</Button>
                                        <Button size="small" variant="text" color="error">Freeze</Button>
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
