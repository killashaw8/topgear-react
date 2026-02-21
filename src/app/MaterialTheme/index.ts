import { createTheme } from '@mui/material/styles';
import shadow from './shadow';
import typography from './typography';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		mode: 'dark' as const,
		background: {
			default: '#0B0B0C',
			paper: '#161618',
		},
		primary: {
			contrastText: '#FFFFFF',
			main: '#3B82F6',
		},
		secondary: {
			contrastText: '#FFFFFF',
			main: '#2563EB',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#A1A1AA',
			disabled: '#52525B',
		},
		divider: '#27272A',
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { background: '#0B0B0C', color: '#FFFFFF', height: '100%', minHeight: '100%' },
			},
		},
	},
	shadow,
	typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
