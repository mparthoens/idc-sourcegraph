import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  Theme,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SecurityIcon from '@mui/icons-material/Security';

/**
 * Props interface for the LeftSidebar component
 */
interface LeftSidebarProps {
  /** Boolean indicating if the mobile sidebar is open */
  mobileOpen: boolean;

  /** Boolean indicating if the desktop sidebar is open */
  desktopOpen: boolean;

  /** Callback function to close the mobile sidebar */
  onMobileClose: () => void;
}

/**
 * LeftSidebar component that provides navigation links in a collapsible sidebar.
 * It has different behavior for mobile and desktop viewports.
 *
 * @param {LeftSidebarProps} props - Component props
 * @returns {JSX.Element} Rendered LeftSidebar component
 */
const LeftSidebar = ({
  mobileOpen,
  desktopOpen,
  onMobileClose,
}: LeftSidebarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Determine if the current viewport is desktop size
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  // Width of the sidebar when open
  const drawerWidth = 240;

  // Navigation menu items with icons and translation keys
  const menuItems = [
    { text: t('navigation.home'), icon: <HomeIcon />, path: '/' },
    {
      text: t('navigation.contact'),
      icon: <ContactMailIcon />,
      path: '/contact',
    },
    { text: t('navigation.gdpr'), icon: <SecurityIcon />, path: '/gdpr' },
  ];

  /**
   * Handles navigation to a specific path and closes the mobile drawer if on mobile
   *
   * @param {string} path - The route path to navigate to
   */
  const handleNavigation = (path: string) => {
    navigate(path);
    if (!isDesktop) {
      onMobileClose();
    }
  };

  // Shared drawer content for both mobile and desktop versions
  const drawer = (
    <>
      {/* Toolbar spacer to push content below the app bar */}
      <Toolbar />

      {/* Navigation menu list */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile drawer - temporary, shown as overlay when open */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        {drawer}
      </Drawer>

      {/* Desktop drawer - persistent, pushes content when open */}
      <Box
        component='nav'
        sx={{
          width: { md: desktopOpen ? drawerWidth : 0 },
          flexShrink: { md: 0 },
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          display: { xs: 'none', md: 'block' },
        }}>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: desktopOpen ? drawerWidth : 0,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              overflowX: 'hidden',
            },
          }}
          open={desktopOpen}>
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default LeftSidebar;
