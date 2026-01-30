'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto, Open_Sans } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const openSans = Open_Sans({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Classic Banking Theme
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#280071', // Deep Purple/Blue similar to classic banks
            light: '#5c33a2',
            dark: '#000043',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#00b5ef', // Cyan accent
            light: '#66e7ff',
            dark: '#0085bc',
            contrastText: '#000000',
        },
        background: {
            default: '#f4f6f8', // Light Grey background
            paper: '#ffffff',
        },
        text: {
            primary: '#1c1e21',
            secondary: '#5a6270',
        },
        success: {
            main: '#2e7d32',
        },
        warning: {
            main: '#ed6c02',
        },
        error: {
            main: '#d32f2f',
        },
        info: {
            main: '#0288d1',
        },
        divider: '#e0e0e0',
    },
    typography: {
        fontFamily: openSans.style.fontFamily,
        fontSize: 13, // Smaller base font size
        h1: {
            fontFamily: roboto.style.fontFamily,
            fontWeight: 700,
            fontSize: '2rem',
        },
        h2: {
            fontFamily: roboto.style.fontFamily,
            fontWeight: 700,
            fontSize: '1.75rem',
        },
        h3: {
            fontFamily: roboto.style.fontFamily,
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h4: {
            fontFamily: roboto.style.fontFamily,
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h5: {
            fontFamily: roboto.style.fontFamily,
            fontWeight: 600,
            fontSize: '1.1rem',
        },
        h6: {
            fontFamily: roboto.style.fontFamily,
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
        body1: {
            fontSize: '0.9rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.8rem', // Small body text
            lineHeight: 1.45,
        },
        subtitle1: {
            fontSize: '0.9rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.8rem',
            fontWeight: 500,
        },
        caption: {
            fontSize: '0.7rem',
        },
    },
    shape: {
        borderRadius: 4, // Small border radius for classic look
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: '6px 16px', // Compact padding
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#1a004b',
                    },
                },
            },
            defaultProps: {
                size: 'small', // Default to small buttons
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    boxShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
                    border: '1px solid #e0e0e0',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    '&.glass': {
                        // Reset glass effect for classic theme if preferred, or keep subtle
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'none',
                        border: 'none',
                    },
                },
                elevation1: {
                    boxShadow: '0px 1px 3px rgba(0,0,0,0.12)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        backgroundColor: '#ffffff',
                        '& fieldset': {
                            borderColor: '#c4c4c4',
                            borderWidth: 1,
                        },
                        '&:hover fieldset': {
                            borderColor: '#280071',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#280071',
                            borderWidth: 1, // Keep thin borders
                        },
                        '& input': {
                            padding: '8.5px 14px', // Standard/Compact input padding
                        },
                    },
                },
            },
            defaultProps: {
                size: 'small', // Default to small inputs
                variant: 'outlined',
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.85rem',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 16px', // Dense tables
                    fontSize: '0.85rem',
                    borderBottom: '1px solid #f0f0f0',
                },
                head: {
                    fontWeight: 600,
                    backgroundColor: '#f5f7fa',
                    color: '#280071',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    height: 24,
                    fontSize: '0.75rem',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#280071',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #e0e0e0',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    paddingTop: 4,
                    paddingBottom: 4,
                    marginBottom: 2,
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(40, 0, 113, 0.08)',
                        borderLeft: '4px solid #280071',
                        '&:hover': {
                            backgroundColor: 'rgba(40, 0, 113, 0.12)',
                        }
                    },
                },
            },
        },
    },
});
