import React, { useState, useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CarouselContainer,
  CarouselImage,
  CarouselImageWrapper,
  ContentWrapper,
  ActionButton,
  PageContainer
} from './Home.styled';

/**
 * Array of companion animal images for the carousel
 */
const animalImages = [
  {
    url: 'https://images.unsplash.com/photo-1583511655826-05700442b31b',
    alt: 'Close-up of a dog\'s face'
  },
  {
    url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7',
    alt: 'Close-up of a cat\'s face'
  },
  {
    url: 'https://images.unsplash.com/photo-1598974357809-112c788eba71',
    alt: 'Close-up of a horse\'s head'
  },
  {
    url: 'https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e',
    alt: 'Close-up of an eagle\'s head'
  },
  {
    url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3',
    alt: 'Close-up of a parrot\'s head'
  }
];

/**
 * Home Component
 */
const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselIntervalRef = useRef<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isStacked = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Width of the sidebar
  const SIDEBAR_WIDTH = 240;
  // Height of the top bar (approximate)
  const TOP_BAR_HEIGHT = 64;
  
  useEffect(() => {
    carouselIntervalRef.current = window.setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % animalImages.length);
    }, 5000);
    
    return () => {
      if (carouselIntervalRef.current !== null) {
        window.clearInterval(carouselIntervalRef.current);
      }
    };
  }, []);

  return (
    <PageContainer 
      isMobile={isMobile} 
      topBarHeight={TOP_BAR_HEIGHT}
      sidebarWidth={SIDEBAR_WIDTH}
    >
      <ContentWrapper isStacked={isStacked}>
        <HeroContent>
          <HeroTitle>
            Companion Animals <span className="highlight">Microchip</span> Registration & <span className="highlight">Database</span>
          </HeroTitle>
          <HeroSubtitle>
            Protect your <span className="emphasis">beloved companion</span> with our <span className="emphasis">secure, reliable</span> microchip registration system. <span className="emphasis">Reunite faster</span> if they ever go missing.
          </HeroSubtitle>
        </HeroContent>

        <CarouselContainer>
          {animalImages.map((image, index) => (
            <CarouselImageWrapper
              key={index}
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: index === currentImageIndex ? 1 : 0,
              }}
            >
              <CarouselImage
                src={image.url}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </CarouselImageWrapper>
          ))}
        </CarouselContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;
