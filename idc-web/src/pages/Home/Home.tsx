import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CarouselContainer,
  CarouselImage,
  CarouselImageWrapper,
  ContentWrapper,
  PageContainer
} from './Home.styled';

// Import your own images
import cat01Image from '../../assets/images/carousel/cat01.jpg';
import horse01Image from '../../assets/images/carousel/horse01.jpg';
import turtle01Image from '../../assets/images/carousel/turtle01.jpg';

/**
 * Array of companion animal images for the carousel
 */
const animalImages = [
  {
    url: cat01Image,
    alt: 'Cat'
  },
  {
    url: horse01Image,
    alt: 'Horse'
  },
    {
    url: turtle01Image,
    alt: 'Turtle'
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
            Companion Animal <span className="highlight">Microchip</span> Registration & <span className="highlight">Database</span>
          </HeroTitle>
          <HeroSubtitle>
            <span className="highlight">Protect</span> your <span className="highlight">beloved companion</span> with our <span className="highlight">secure, reliable</span> microchip registration system. <span className="highlight">Reunite faster</span> if they ever go missing.
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
