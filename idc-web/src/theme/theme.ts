// src/theme/theme.ts
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
 * Inspired by Nike.com's design aesthetic
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
				// Nike black
				main: '#111',
				light: '#333',
				dark: '#000',
				contrastText: '#fff',
			},
			secondary: {
				// Nike red/orange
				main: '#fa5400',
				light: '#ff7a33',
				dark: '#c43e00',
				contrastText: '#fff',
			},
			accent: {
				// Nike accent color (sometimes used for CTAs)
				main: '#fa5400',
				light: '#ff7a33',
				dark: '#c43e00',
				contrastText: '#fff',
			},
			background: {
				default: mode === 'light' ? '#f5f5f5' : '#121212',
				paper: mode === 'light' ? '#fff' : '#1e1e1e',
			},
			text: {
				primary: mode === 'light' ? '#111' : '#fff',
				secondary: mode === 'light' ? '#757575' : '#b0b0b0',
			},
			error: {
				main: '#d32f2f',
			},
			warning: {
				main: '#ed6c02',
			},
			info: {
				main: '#0288d1',
			},
			success: {
				main: '#2e7d32',
			},
		},
		typography: {
			fontFamily: [
				'Helvetica Neue',
				'Arial',
				'sans-serif',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
			].join(','),
			h1: {
				fontWeight: 700,
				fontSize: '3.5rem',
				letterSpacing: '-0.01562em',
			},
			h2: {
				fontWeight: 700,
				fontSize: '2.75rem',
				letterSpacing: '-0.00833em',
			},
			h3: {
				fontWeight: 600,
				fontSize: '2.25rem',
				letterSpacing: '0em',
			},
			h4: {
				fontWeight: 600,
				fontSize: '1.75rem',
				letterSpacing: '0.00735em',
			},
			h5: {
				fontWeight: 600,
				fontSize: '1.5rem',
				letterSpacing: '0em',
			},
			h6: {
				fontWeight: 600,
				fontSize: '1.25rem',
				letterSpacing: '0.0075em',
			},
			subtitle1: {
				fontWeight: 500,
				fontSize: '1rem',
				letterSpacing: '0.00938em',
			},
			subtitle2: {
				fontWeight: 500,
				fontSize: '0.875rem',
				letterSpacing: '0.00714em',
			},
			body1: {
				fontWeight: 400,
				fontSize: '1rem',
				letterSpacing: '0.00938em',
			},
			body2: {
				fontWeight: 400,
				fontSize: '0.875rem',
				letterSpacing: '0.01071em',
			},
			button: {
				fontWeight: 600,
				fontSize: '0.875rem',
				letterSpacing: '0.02857em',
				textTransform: 'none',
			},
		},
		shape: {
			borderRadius: 4,
		},
		components: {
			MuiButton: {
				variants: [
					{
						props: { variant: 'accent' },
						style: {
							color: '#fff',
							backgroundColor: '#fa5400',
							'&:hover': {
								backgroundColor: '#ff7a33',
							},
						},
					},
				],
				styleOverrides: {
					root: {
						borderRadius: 30,
						padding: '8px 24px',
						transition: 'all 0.2s ease-in-out',
						textTransform: 'none',
						fontWeight: 600,
					},
					contained: {
						boxShadow: 'none',
						'&:hover': {
							boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
						},
					},
					outlined: {
						borderWidth: 2,
						'&:hover': {
							borderWidth: 2,
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
						borderRadius: 8,
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
						borderBottom: mode === 'light'
							? '1px solid #e0e0e0'
							: '1px solid #333',
					},
				},
			},
			MuiDrawer: {
				styleOverrides: {
					paper: {
						borderRight: 'none',
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
								borderColor: mode === 'light' ? '#e0e0e0' : '#444',
							},
							'&:hover fieldset': {
								borderColor: mode === 'light' ? '#bdbdbd' : '#666',
							},
							'&.Mui-focused fieldset': {
								borderWidth: 2,
							},
						},
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					root: {
						borderRadius: 16,
						fontWeight: 500,
					},
				},
			},
			MuiTab: {
				styleOverrides: {
					root: {
						textTransform: 'none',
						fontWeight: 600,
						minWidth: 100,
					},
				},
			},
			MuiTableCell: {
				styleOverrides: {
					head: {
						fontWeight: 600,
						backgroundColor: mode === 'light' ? '#f5f5f5' : '#333',
					},
				},
			},
		},
	});

	// Make typography responsive
	theme = responsiveFontSizes(theme);

	return theme;
};
