// src/components/Topbar.tsx
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  Theme,
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

  return (
    <AppBar
      position='fixed'
      color='primary' // Explicitly set to use primary color
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Mobile menu toggle button - only visible on mobile */}
        {!isDesktop && onMenuClick && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={onMenuClick}
            sx={{ mr: 2 }}>
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
            sx={{ mr: 2 }}>
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
            }}
          />
          {/* Removed the ID Chips text */}
        </Box>
        {/* Right-side controls container */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
