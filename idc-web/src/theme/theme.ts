// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

/**
 * Color palette inspired by Nike.com
 * These colors will be used throughout the application
 */
const colors = {
	primary: {
		main: '#111111', // Nike's primary black
		light: '#333333',
		dark: '#000000',
		contrastText: '#ffffff',
	},
	secondary: {
		main: '#f5f5f5', // Light gray
		light: '#ffffff',
		dark: '#e0e0e0',
		contrastText: '#111111',
	},
	accent: {
		main: '#fa5400', // Nike's orange accent
		light: '#ff7d33',
		dark: '#c43c00',
		contrastText: '#ffffff',
	},
	success: {
		main: '#4caf50',
		light: '#80e27e',
		dark: '#087f23',
		contrastText: '#ffffff',
	},
	warning: {
		main: '#ff9800',
		light: '#ffc947',
		dark: '#c66900',
		contrastText: '#000000',
	},
	error: {
		main: '#f44336',
		light: '#ff7961',
		dark: '#ba000d',
		contrastText: '#ffffff',
	},
	info: {
		main: '#2196f3',
		light: '#6ec6ff',
		dark: '#0069c0',
		contrastText: '#ffffff',
	},
	background: {
		default: '#ffffff',
		paper: '#f5f5f5',
	},
	text: {
		primary: '#111111',
		secondary: '#757575',
		disabled: '#9e9e9e',
	},
};

/**
 * Create the base theme with customizations
 * This includes typography, colors, component styles, etc.
 */
let theme = createTheme({
	palette: {
		primary: colors.primary,
		secondary: colors.secondary,
		error: colors.error,
		warning: colors.warning,
		info: colors.info,
		success: colors.success,
		background: colors.background,
		text: colors.text,
	},
	typography: {
		fontFamily: [
			'Helvetica Neue',
			'Arial',
			'sans-serif',
		].join(','),
		h1: {
			fontSize: '3.5rem',
			fontWeight: 700,
			letterSpacing: '-0.01562em',
		},
		h2: {
			fontSize: '2.75rem',
			fontWeight: 700,
			letterSpacing: '-0.00833em',
		},
		h3: {
			fontSize: '2.25rem',
			fontWeight: 600,
			letterSpacing: '0em',
		},
		h4: {
			fontSize: '1.75rem',
			fontWeight: 600,
			letterSpacing: '0.00735em',
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 500,
			letterSpacing: '0em',
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: 500,
			letterSpacing: '0.0075em',
		},
		subtitle1: {
			fontSize: '1rem',
			fontWeight: 400,
			letterSpacing: '0.00938em',
		},
		subtitle2: {
			fontSize: '0.875rem',
			fontWeight: 500,
			letterSpacing: '0.00714em',
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
			letterSpacing: '0.00938em',
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: 400,
			letterSpacing: '0.01071em',
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 500,
			letterSpacing: '0.02857em',
			textTransform: 'none',
		},
		caption: {
			fontSize: '0.75rem',
			fontWeight: 400,
			letterSpacing: '0.03333em',
		},
		overline: {
			fontSize: '0.625rem',
			fontWeight: 400,
			letterSpacing: '0.08333em',
			textTransform: 'uppercase',
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		// Button customizations
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 20,
					padding: '8px 24px',
					fontWeight: 500,
				},
				contained: {
					boxShadow: 'none',
					'&:hover': {
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
					},
				},
				outlined: {
					borderWidth: 2,
					'&:hover': {
						borderWidth: 2,
					},
				},
			},
			// Add a custom 'accent' variant
			variants: [
				{
					props: { variant: 'accent' },
					style: {
						backgroundColor: colors.accent.main,
						color: colors.accent.contrastText,
						'&:hover': {
							backgroundColor: colors.accent.dark,
						},
					},
				},
			],
		},
		// Card customizations
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
				},
			},
		},
		// AppBar customizations
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
				},
			},
		},
		// Drawer customizations
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: colors.primary.main,
					color: colors.primary.contrastText,
				},
			},
		},
		// ListItemButton customizations for the sidebar
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
						'&:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.2)',
						},
					},
					'&:hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.05)',
					},
				},
			},
		},
		// ListItemIcon customizations for the sidebar
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: colors.primary.contrastText,
				},
			},
		},
		// ListItemText customizations for the sidebar
		MuiListItemText: {
			styleOverrides: {
				primary: {
					color: colors.primary.contrastText,
				},
			},
		},
		// TextField customizations
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						borderRadius: 8,
					},
				},
			},
		},
		// Chip customizations
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 16,
				},
			},
		},
	},
});

// Apply responsive font sizes to make typography responsive
theme = responsiveFontSizes(theme);

/**
 * Type declarations for custom theme properties
 * This allows TypeScript to recognize our custom theme additions
 */
declare module '@mui/material/styles' {
	interface Palette {
		accent: Palette['primary'];
	}
	interface PaletteOptions {
		accent?: PaletteOptions['primary'];
	}

	interface TypographyVariants {
		poster: React.CSSProperties;
	}
	interface TypographyVariantsOptions {
		poster?: React.CSSProperties;
	}
}

// Update the Button's props to include 'accent' variant
declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		accent: true;
	}
}

export default theme;
