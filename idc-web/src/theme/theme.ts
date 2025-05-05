import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Declare module augmentation for custom palette colors
declare module '@mui/material/styles' {
    interface Palette {
        accent?: Palette['primary'];
    }
    interface PaletteOptions {
        accent?: PaletteOptions['primary'];
    }
}

// Declare module augmentation for custom button variant
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        accent: true;
    }
}

/**
 * Creates a theme based on the specified mode (light or dark)
 * Inspired by Apple's design aesthetic
 *
 * @param {PaletteMode} mode - The color mode ('light' or 'dark')
 * @returns {Theme} The configured Material-UI theme
 */
export const createAppTheme = (mode: PaletteMode): Theme => {
    // Create the base theme
    let theme = createTheme({
        palette: {
            mode,
            primary: {
                // Apple blue
                main: mode === 'light' ? '#0071e3' : '#2997ff',
                light: mode === 'light' ? '#47a9ff' : '#64d2ff',
                dark: mode === 'light' ? '#0058b0' : '#0077cc',
                contrastText: '#fff',
            },
            secondary: {
                // Apple gray
                main: '#86868b',
                light: '#a1a1a6',
                dark: '#6e6e73',
                contrastText: '#fff',
            },
            accent: {
                // Apple accent color (sometimes used for CTAs)
                main: mode === 'light' ? '#0071e3' : '#2997ff',
                light: mode === 'light' ? '#47a9ff' : '#64d2ff',
                dark: mode === 'light' ? '#0058b0' : '#0077cc',
                contrastText: '#fff',
            },
            background: {
                default: mode === 'light' ? '#f5f5f7' : '#1d1d1f',
                paper: mode === 'light' ? '#ffffff' : '#2c2c2e',
            },
            text: {
                primary: mode === 'light' ? '#1d1d1f' : '#f5f5f7',
                secondary: mode === 'light' ? '#86868b' : '#a1a1a6',
            },
            error: {
                main: '#ff3b30', // Apple red
            },
            warning: {
                main: '#ff9500', // Apple orange
            },
            info: {
                main: '#007aff', // Apple blue
            },
            success: {
                main: '#34c759', // Apple green
            },
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'San Francisco',
                'Helvetica Neue',
                'Helvetica',
                'Arial',
                'sans-serif',
            ].join(','),
            h1: {
                fontWeight: 600,
                fontSize: '3.5rem',
                letterSpacing: '-0.015em',
            },
            h2: {
                fontWeight: 600,
                fontSize: '2.75rem',
                letterSpacing: '-0.01em',
            },
            h3: {
                fontWeight: 600,
                fontSize: '2.25rem',
                letterSpacing: '-0.005em',
            },
            h4: {
                fontWeight: 600,
                fontSize: '1.75rem',
                letterSpacing: '-0.005em',
            },
            h5: {
                fontWeight: 600,
                fontSize: '1.5rem',
                letterSpacing: '0em',
            },
            h6: {
                fontWeight: 600,
                fontSize: '1.25rem',
                letterSpacing: '0em',
            },
            subtitle1: {
                fontWeight: 500,
                fontSize: '1rem',
                letterSpacing: '0em',
            },
            subtitle2: {
                fontWeight: 500,
                fontSize: '0.875rem',
                letterSpacing: '0em',
            },
            body1: {
                fontWeight: 400,
                fontSize: '1rem',
                letterSpacing: '0em',
            },
            body2: {
                fontWeight: 400,
                fontSize: '0.875rem',
                letterSpacing: '0em',
            },
            button: {
                fontWeight: 500,
                fontSize: '0.875rem',
                letterSpacing: '0em',
                textTransform: 'none',
            },
        },
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'accent' },
                        style: {
                            color: '#fff',
                            backgroundColor: mode === 'light' ? '#0071e3' : '#2997ff',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? '#0062c3' : '#1e87e8',
                            },
                        },
                    },
                ],
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '8px 16px',
                        transition: 'all 0.2s ease-in-out',
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                    contained: {
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                            backgroundColor: mode === 'light' ? '#0062c3' : '#1e87e8',
                        },
                    },
                    outlined: {
                        borderWidth: 1,
                        '&:hover': {
                            borderWidth: 1,
                            backgroundColor: mode === 'light' 
                                ? 'rgba(0, 113, 227, 0.05)' 
                                : 'rgba(41, 151, 255, 0.05)',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: mode === 'light'
                            ? '0px 2px 8px rgba(0, 0, 0, 0.05)'
                            : '0px 2px 8px rgba(0, 0, 0, 0.2)',
                        borderRadius: 12,
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: mode === 'light'
                                ? '0px 4px 12px rgba(0, 0, 0, 0.1)'
                                : '0px 4px 12px rgba(0, 0, 0, 0.3)',
                        },
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        backgroundImage: 'none',
                        backgroundColor: mode === 'light' 
                            ? 'rgba(255, 255, 255, 0.8)' 
                            : 'rgba(29, 29, 31, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: mode === 'light'
                            ? '1px solid rgba(0, 0, 0, 0.1)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        color: mode === 'light' ? '#1d1d1f' : '#f5f5f7',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRight: 'none',
                        backgroundImage: 'none',
                        backgroundColor: mode === 'light' 
                            ? 'rgba(255, 255, 255, 0.8)' 
                            : 'rgba(44, 44, 46, 0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: mode === 'light'
                            ? '2px 0px 8px rgba(0, 0, 0, 0.05)'
                            : '2px 0px 8px rgba(0, 0, 0, 0.2)',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 8,
                            '& fieldset': {
                                borderWidth: 1,
                                borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                            },
                            '&:hover fieldset': {
                                borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                            },
                            '&.Mui-focused fieldset': {
                                borderWidth: 2,
                                borderColor: mode === 'light' ? '#0071e3' : '#2997ff',
                            },
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        fontWeight: 500,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 500,
                        minWidth: 100,
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        fontWeight: 600,
                        backgroundColor: mode === 'light' ? '#f5f5f7' : '#2c2c2e',
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        '&.Mui-selected': {
                            backgroundColor: mode === 'light' 
                                ? 'rgba(0, 113, 227, 0.08)'
                                : 'rgba(41, 151, 255, 0.08)',
                            '&:hover': {
                                backgroundColor: mode === 'light' 
                                    ? 'rgba(0, 113, 227, 0.12)'
                                    : 'rgba(41, 151, 255, 0.12)',
                            },
                        },
                        '&:hover': {
                            backgroundColor: mode === 'light' 
                                ? 'rgba(0, 0, 0, 0.04)'
                                : 'rgba(255, 255, 255, 0.04)',
                        },
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 40,
                        color: 'inherit',
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 26,
                        padding: 0,
                        margin: 8,
                    },
                    switchBase: {
                        padding: 1,
                        '&.Mui-checked': {
                            transform: 'translateX(16px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: mode === 'light' ? '#0071e3' : '#2997ff',
                                opacity: 1,
                                border: 'none',
                            },
                        },
                        '&.Mui-focusVisible .MuiSwitch-thumb': {
                            color: '#33cf4d',
                            border: '6px solid #fff',
                        },
                    },
                    thumb: {
                        width: 24,
                        height: 24,
                    },
                    track: {
                        borderRadius: 26 / 2,
                        backgroundColor: mode === 'light' ? '#E9E9EA' : '#39393D',
                        opacity: 1,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: mode === 'light' 
                            ? 'rgba(0, 0, 0, 0.1)' 
                            : 'rgba(255, 255, 255, 0.1)',
                    },
                },
            },
        },
    });

    // Make typography responsive
    theme = responsiveFontSizes(theme);
    return theme;
};
