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
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    alt: 'Dog'
  },
  {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    alt: 'Cat'
  },
  {
    url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a',
    alt: 'Horse'
  },
  {
    url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4',
    alt: 'Eagle'
  },
  {
    url: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
    alt: 'Parrot'
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
            Pet <span className="highlight">Microchip</span> Registration & <span className="highlight">Database</span>
          </HeroTitle>
          <HeroSubtitle>
            Protect your beloved companion with our secure, reliable microchip registration system. Reunite faster if they ever go missing.
          </HeroSubtitle>
          <ActionButton variant="contained">
            Register Your Pet
          </ActionButton>
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
