import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  Theme,
  useTheme,
  alpha,
} from '@mui/material';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from '../ThemeToggle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

/**
 * Props interface for the Topbar component
 */
interface TopbarProps {
  /** Callback function for mobile menu button click */
  onMenuClick?: () => void;
  /** Callback function for desktop menu button click */
  onDesktopMenuClick?: () => void;
  /** Boolean indicating if the desktop sidebar is open */
  isDesktopOpen?: boolean;
}

/**
 * Topbar component that displays the application header with navigation controls,
 * language switcher, and theme toggle. It adapts to different screen sizes and provides
 * controls for toggling the sidebar visibility.
 *
 * @param {TopbarProps} props - Component props
 * @returns {JSX.Element} Rendered Topbar component
 */
const Topbar = ({
  onMenuClick,
  onDesktopMenuClick,
  isDesktopOpen = true,
}: TopbarProps) => {
  // Determine if the current viewport is desktop size
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const theme = useTheme();
  
  return (
    <AppBar
      position='fixed'
      color='transparent' // Use transparent instead of primary
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: alpha(theme.palette.background.default, 0.8), // Semi-transparent background
        backdropFilter: 'blur(10px)', // Frosted glass effect
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`, // Subtle border
        color: theme.palette.text.primary, // Use text color instead of white
      }}>
      <Toolbar>
        {/* Mobile menu toggle button - only visible on mobile */}
        {!isDesktop && onMenuClick && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}>
            <MenuIcon />
          </IconButton>
        )}
        {/* Desktop menu toggle button - only visible on desktop */}
        {isDesktop && onDesktopMenuClick && (
          <IconButton
            color='inherit'
            aria-label={isDesktopOpen ? 'close drawer' : 'open drawer'}
            edge='start'
            onClick={onDesktopMenuClick}
            sx={{ 
              mr: 2,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}>
            {/* Show different icon based on sidebar state */}
            {isDesktopOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        )}
        {/* Application logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Logo image */}
          <Box
            component='img'
            src='/images/logo.png'
            alt='ID Chips Logo'
            sx={{
              height: 40,
              mr: 1,
              filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none', // Slightly brighter in dark mode
            }}
          />
          {/* Removed the ID Chips text */}
        </Box>
        {/* Right-side controls container */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Language selection dropdown */}
          <LanguageSwitcher />
          {/* Theme toggle button */}
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
