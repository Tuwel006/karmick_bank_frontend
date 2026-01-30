'use client';

import { Box, AppBar, Toolbar, Container, Typography, Button, Paper, Grid, Stack, Card, CardContent, IconButton, useTheme, Chip, Divider } from '@mui/material';
import { Login, AccountBalance, Security, SupportAgent, PhoneAndroid, ArrowForward, VerifiedUser, Savings, Payments, TrendingUp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fbfcfe' }}>
      {/* Top Utility Bar */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 0.8, fontSize: '0.75rem' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>Personal</Typography>
            <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>Corporate</Typography>
            <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>NRI</Typography>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="caption">Toll Free: 1800-123-4567</Typography>
            <Typography variant="caption" sx={{ cursor: 'pointer' }}>Careers</Typography>
            <Typography variant="caption" sx={{ cursor: 'pointer' }}>Locate Branch</Typography>
          </Stack>
        </Container>
      </Box>

      {/* Header */}
      <AppBar position="sticky" color="default" sx={{ bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #eee' }} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.2, bgcolor: 'primary.main', borderRadius: 2, boxShadow: '0 4px 12px rgba(40, 0, 113, 0.2)' }}>
                <AccountBalance sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" color="primary" fontWeight="800" sx={{ lineHeight: 1, letterSpacing: -0.5 }}>KARMICK BANK</Typography>
                <Typography variant="caption" sx={{ letterSpacing: 3, color: 'text.secondary', fontWeight: 600, fontSize: '0.65rem' }}>TRUST • TRADITION • TECHNOLOGY</Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button sx={{ display: { xs: 'none', md: 'flex' } }}>Investment</Button>
              <Button sx={{ display: { xs: 'none', md: 'flex' } }}>Loans</Button>
              <Button sx={{ display: { xs: 'none', md: 'flex' } }}>Cards</Button>
              <Box sx={{ width: 1, height: 24, bgcolor: '#eee', mx: 1, display: { xs: 'none', md: 'block' } }} />
              <Button
                variant="contained"
                startIcon={<Login />}
                onClick={() => router.push('/auth/login')}
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(40, 0, 113, 0.25)',
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Internet Banking
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        bgcolor: '#001e3c',
        backgroundImage: 'linear-gradient(135deg, #001e3c 0%, #280071 100%)',
        py: { xs: 8, md: 12 },
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Box>
                  <Chip label="NIDHI-Powered Security" color="secondary" size="small" sx={{ mb: 2, fontWeight: 700, borderRadius: 1 }} />
                  <Typography variant="h2" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.75rem' }, lineHeight: 1.1, mb: 2 }}>
                    Safe. Swift.<br />Superior Banking.
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, mb: 4, maxWidth: 500 }}>
                    Experience the future of personal and business finance with India's most trusted digital banking partner.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2.5}>
                  <Button variant="contained" color="secondary" size="large" sx={{ py: 2, px: 5, borderRadius: 2, fontWeight: 700 }}>
                    Apply Now
                  </Button>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', py: 2, px: 5, borderRadius: 2 }}>
                    View Rates
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ position: 'relative' }}>
              <Paper elevation={0} sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                border: '8px solid rgba(255,255,255,0.1)',
                aspectRatio: '1/1'
              }}>
                <Image
                  src="/hero_banking.png"
                  alt="Premium Banking"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Paper>
              {/* Floating Stat Card */}
              <Card sx={{
                position: 'absolute',
                bottom: -20,
                left: -20,
                p: 2,
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                display: { xs: 'none', md: 'block' }
              }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, bgcolor: '#e8f5e9', color: 'success.main', borderRadius: 1 }}>
                    <TrendingUp />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="800">7.25%</Typography>
                    <Typography variant="caption" color="text.secondary">ROI on Fixed Deposits</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Services Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="800" color="primary" gutterBottom>Comprehensive Digital Services</Typography>
          <Typography variant="body1" color="text.secondary">Modern banking solutions tailored for your lifestyle</Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            { title: 'Home Loans', icon: <Savings sx={{ fontSize: 40 }} />, desc: 'Realize your dream home with attractive interest rates starting 8.40%.' },
            { title: 'Personal Banking', icon: <VerifiedUser sx={{ fontSize: 40 }} />, desc: 'Manage your savings and expenses with zero-balance account options.' },
            { title: 'Digital Payments', icon: <Payments sx={{ fontSize: 40 }} />, desc: 'Instant transfers and bill payments with UPI 2.0 and Bharat BillPay.' },
            { title: 'Investment', icon: <TrendingUp sx={{ fontSize: 40 }} />, desc: 'Grow your wealth with Mutual Funds, Gold Bonds, and regular FDs.' }
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper variant="outlined" sx={{
                p: 4,
                height: '100%',
                textAlign: 'center',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(40,0,113,0.08)'
                }
              }}>
                <Box sx={{ color: 'primary.main', mb: 3 }}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="700" gutterBottom>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trust Banner */}
      <Box sx={{ bgcolor: 'primary.main', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { label: 'Customers Trust Us', val: '2.5Cr+', desc: 'Active accounts across India' },
              { label: 'Branch Network', val: '12,000+', desc: 'Across towns and villages' },
              { label: 'Security Standard', val: 'AES-256', desc: 'Military grade data encryption' },
              { label: 'Mobile App Rating', val: '4.8/5', desc: 'On Play Store & App Store' }
            ].map((stat, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={i}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  <Typography variant="h3" fontWeight="900" sx={{ mb: 1 }}>{stat.val}</Typography>
                  <Typography variant="subtitle2" fontWeight="700">{stat.label}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>{stat.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#020b17', color: 'rgba(255,255,255,0.7)', pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccountBalance sx={{ color: 'white', fontSize: 28 }} />
                  <Typography variant="h6" color="white" fontWeight="900">KARMICK BANK</Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  Karmick Bank is India's leading digital-first financial institution, committed to bringing safe, accessible, and high-quality banking to every corner of the nation.
                </Typography>
                <Stack direction="row" spacing={2}>
                  {/* Social icons */}
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="subtitle1" color="white" fontWeight="800" sx={{ mb: 3 }}>Our Products</Typography>
              <Stack spacing={2}>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Savings Account</Typography>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Home Loan</Typography>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Fixed Deposit</Typography>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Credit Cards</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="subtitle1" color="white" fontWeight="800" sx={{ mb: 3 }}>About Us</Typography>
              <Stack spacing={2}>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Company History</Typography>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Governance</Typography>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>Investor Relations</Typography>
                <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>CSR Initiatives</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle1" color="white" fontWeight="800" sx={{ mb: 3 }}>Download App</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>Scan QR to download the Mobile Banking app locally on your device.</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: 100, height: 40, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }} />
                <Box sx={{ width: 100, height: 40, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }} />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="caption">© 2026 Karmick Bank Ltd. All rights reserved. Licensed by RBI.</Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="caption" sx={{ cursor: 'pointer' }}>Privacy Policy</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer' }}>Terms of Service</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer' }}>Regulatory Disclosure</Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
