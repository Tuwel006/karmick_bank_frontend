'use client';

import { Box, Container, Typography, Stack, Paper, Divider, Breadcrumbs, Link } from '@mui/material';
import { GppGood, Security, Info, HelpOutline } from '@mui/icons-material';

export default function PublicPoliciesPage() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', py: 4 }}>
            <Container maxWidth="md">
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link underline="hover" color="inherit" href="/">Home</Link>
                    <Typography color="text.primary">Policies</Typography>
                </Breadcrumbs>

                <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>Bank Policies & Guidelines</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Karmick Bank is committed to maintaining the highest standards of transparency and security.
                    Below are the official policies governing our operations.
                </Typography>

                <Stack spacing={4} sx={{ mt: 4 }}>
                    <Paper sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Security color="primary" />
                            <Typography variant="h6">Privacy Policy</Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            We value your privacy. Your personal and financial data is protected using military-grade encryption.
                            We do not share your information with third parties without your explicit consent.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" fontWeight="bold">Key Highlights:</Typography>
                        <ul>
                            <li><Typography variant="body2">Data is stored locally in secure centers.</Typography></li>
                            <li><Typography variant="body2">Automatic session timeouts after 15 minutes of inactivity.</Typography></li>
                            <li><Typography variant="body2">Compliance with RBI's data protection mandates.</Typography></li>
                        </ul>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <GppGood color="primary" />
                            <Typography variant="h6">Safe Banking Practices</Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Stay safe while banking online. Karmick Bank will never ask for your Password, OTP, or PIN over phone/email.
                        </Typography>
                        <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                            <Typography variant="body2" fontWeight="bold" color="primary">Remember:</Typography>
                            <Typography variant="body2">Always check for 'https://' in the URL before logging in.</Typography>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Info color="primary" />
                            <Typography variant="h6">Account Limitations</Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Different account types have varying transaction and balance requirements.
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="subtitle2">Savings Basic</Typography>
                                <Typography variant="caption" display="block">Min Balance: ₹ 500</Typography>
                                <Typography variant="caption" display="block">Daily Limit: ₹ 40,000</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">Savings Premium</Typography>
                                <Typography variant="caption" display="block">Min Balance: ₹ 10,000</Typography>
                                <Typography variant="caption" display="block">Daily Limit: ₹ 2,00,000</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <HelpOutline color="primary" />
                            <Typography variant="h6">Grievance Redressal</Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            If you have any complaints, please reach out to our helpdesk at 1800-123-4567 or email
                            grievance@karmickbank.com. We aim to resolve all issues within 3 working days.
                        </Typography>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}
