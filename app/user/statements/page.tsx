'use client';

import { Box, Card, Typography, Button, Stack, TextField, MenuItem, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Download, Print, FilterList } from '@mui/icons-material';

export default function StatementsPage() {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">e-Statements</Typography>
                <Typography variant="body2" color="text.secondary">View and download your account statements</Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="Select Account" size="small" defaultValue="1">
                            <MenuItem value="1">Savings Account - ****4567</MenuItem>
                            <MenuItem value="2">Current Account - ****8899</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <TextField type="date" fullWidth label="From Date" size="small" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <TextField type="date" fullWidth label="To Date" size="small" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Button variant="contained" fullWidth startIcon={<FilterList />}>View</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Card>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Account Statement (Last 1 Month)</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" startIcon={<Download />}>PDF</Button>
                        <Button size="small" variant="outlined" startIcon={<Download />}>Excel</Button>
                    </Stack>
                </Box>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Narration</TableCell>
                                <TableCell>Ref No.</TableCell>
                                <TableCell align="right">Debit</TableCell>
                                <TableCell align="right">Credit</TableCell>
                                <TableCell align="right">Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                <TableCell>30-Jan-2026</TableCell>
                                <TableCell>UPI/Payment to Swiggy</TableCell>
                                <TableCell>UPI123456</TableCell>
                                <TableCell align="right">540.00</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">1,24,460.00</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell>25-Jan-2026</TableCell>
                                <TableCell>Interest Credit</TableCell>
                                <TableCell>INT001</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">1,200.00</TableCell>
                                <TableCell align="right">1,25,000.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Stack>
    );
}
