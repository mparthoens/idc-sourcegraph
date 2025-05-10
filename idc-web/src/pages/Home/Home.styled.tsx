import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

interface ContentWrapperProps {
  isStacked?: boolean;
}

interface PageContainerProps {
  isMobile?: boolean;
  topBarHeight: number;
  sidebarWidth: number;
}

/**
 * Main page container with proper spacing
 */
export const PageContainer = styled(Box, {
  shouldForwardProp: (prop) => !['isMobile', 'topBarHeight', 'sidebarWidth'].includes(prop as string)
})<PageContainerProps>(({ theme, isMobile, topBarHeight, sidebarWidth }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  minHeight: '100vh',
  zIndex: 0,
  bgcolor: 'background.default',
  overflow: 'auto',
  // Add left margin on non-mobile screens to account for sidebar
  ...(isMobile ? {} : { 
    marginLeft: `${sidebarWidth}px`, 
    width: `calc(100% - ${sidebarWidth}px)` 
  }),
  // Add padding top to account for the top bar - reduced for large screens
  paddingTop: `${topBarHeight + 16}px`, // Reduced from 32px to 16px
  paddingBottom: theme.spacing(4), // Reduced from 6 to 4
  display: 'flex',
  flexDirection: 'column',
}));

/**
 * Wrapper for content to create the split layout
 */
export const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isStacked'
})<ContentWrapperProps>(({ theme, isStacked }) => ({
  display: 'flex',
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(2, 2),
  gap: theme.spacing(5),
  flex: 1,
  // Align content to the top on large screens or center if stacked
  alignItems: isStacked ? 'center' : 'flex-start',
  marginTop: theme.spacing(2), // Add a small top margin
  
  // Handle stacked layout (tablet and below)
  ...(isStacked && {
    flexDirection: 'column',
    gap: theme.spacing(4),
  }),
  
  [theme.breakpoints.down('lg')]: {
    maxWidth: '960px',
    gap: theme.spacing(4),
  },
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 2),
    gap: theme.spacing(3),
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 1.5),
    gap: theme.spacing(2),
  },
}));

/**
 * Container for the hero content (title and subtitle)
 */
export const HeroContent = styled(Box)(({ theme }) => ({
  width: '50%', // Increased from 45% to 50%
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Align to top instead of center
  paddingTop: theme.spacing(3), // Add padding to align with carousel
  
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    maxWidth: '700px',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    paddingTop: 0, // Remove padding in stacked layout
  },
}));

/**
 * Main title in the hero section with fluid typography and mixed colors
 */
export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600, // Reduced from 800 to 600
  // Fluid typography formula: calc(min size + (max size - min size) * ((viewport width - min width) / (max width - min width)))
  fontSize: 'clamp(2rem, 1.3rem + 2.5vw, 3.5rem)',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  lineHeight: 1.2, // Increased from 1.1 to 1.2 for better readability
  
  '& .highlight': {
    color: theme.palette.primary.main,
    fontWeight: 700, // Slightly bolder for highlighted text
  },
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
  },
}));

/**
 * Subtitle in the hero section with fluid typography
 */
export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400, // Reduced from 500 to 400
  // Fluid typography for subtitle
  fontSize: 'clamp(1.1rem, 0.9rem + 0.8vw, 1.5rem)',
  color: theme.palette.text.secondary,
  marginBottom: 'clamp(1.5rem, 1rem + 1.5vw, 2.5rem)',
  lineHeight: 1.4, // Added for better readability
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

/**
 * Container for the carousel with aspect ratio preservation
 */
export const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '45%', // Reduced from 55% to 45%
  // Use aspect-ratio property for modern browsers
  aspectRatio: '4/3',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2, // Increased border radius
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 10px 30px rgba(0,0,0,0.3)' 
    : '0 10px 30px rgba(0,0,0,0.15)',
  
  // Fallback for browsers that don't support aspect-ratio
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '75%', // 4:3 aspect ratio (3/4 = 0.75 = 75%)
  },
  
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    maxWidth: '600px', // Reduced from 700px to 600px
    marginTop: theme.spacing(2),
  },
  
  [theme.breakpoints.down('md')]: {
    maxWidth: '500px', // Reduced from 600px to 500px
  },
  
  [theme.breakpoints.down('sm')]: {
    maxWidth: '85%', // Reduced from 90% to 85%
    aspectRatio: '3/2', // Slightly different aspect ratio for small screens
    
    '&::before': {
      paddingTop: '66.67%', // 3:2 aspect ratio (2/3 = 0.6667 = 66.67%)
    },
  },
  
  // Remove fixed heights and let aspect ratio control the height
  '@supports (aspect-ratio: 4/3)': {
    '&::before': {
      display: 'none',
    },
  },
}));

/**
 * Wrapper for each carousel image
 */
export const CarouselImageWrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'opacity 1.5s ease-in-out',
});

/**
 * Carousel image styling
 */
export const CarouselImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: theme.palette.mode === 'dark' ? 'brightness(0.85)' : 'none',
}));

/**
 * Action button styling with responsive text
 */
export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  // Responsive padding
  padding: 'clamp(0.75rem, 0.6rem + 0.5vw, 1.5rem) clamp(2.5rem, 2rem + 1vw, 4rem)',
  // Responsive font size
  fontSize: 'clamp(0.9rem, 0.8rem + 0.3vw, 1.1rem)',
  fontWeight: 600,
  borderRadius: 30,
  textTransform: 'none',
  boxShadow: theme.palette.mode === 'dark'
    ? `0 4px 10px ${theme.palette.primary.dark}`
    : `0 4px 10px rgba(0,0,0,0.2)`,
  alignSelf: 'flex-start',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #4a95ff 0%, #3570d8 100%)'
    : 'linear-gradient(135deg, #3a86ff 0%, #2667cc 100%)',
  
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.palette.mode === 'dark'
      ? `0 6px 15px ${theme.palette.primary.dark}`
      : `0 6px 15px rgba(0,0,0,0.3)`,
  },
  
  [theme.breakpoints.down('lg')]: {
    alignSelf: 'center',
  },
}));
