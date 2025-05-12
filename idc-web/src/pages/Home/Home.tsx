import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery, Box } from '@mui/material';
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
import dog01Image from '../../assets/images/carousel/dog01.jpg';
import dog02Image from '../../assets/images/carousel/dog02.png';
import cat01Image from '../../assets/images/carousel/cat01.jpg';
import cat02Image from '../../assets/images/carousel/cat02.png';
import horse01Image from '../../assets/images/carousel/horse01.jpg';
import turtle01Image from '../../assets/images/carousel/turtle01.jpg';
import parrot01Image from '../../assets/images/carousel/parrot01.png';
import eagle01Image from '../../assets/images/carousel/eagle01.jpg';
import ferret01Image from '../../assets/images/carousel/ferret01.jpg';
import fish01Image from '../../assets/images/carousel/fish01.jpg';
import rabbitImage from '../../assets/images/carousel/rabbit01.jpg';

/** Original array of companion animal images for the carousel */
const originalAnimalImages = [
  {
    url: dog01Image,
    alt: 'Dog'
  },
  {
    url: dog02Image,
    alt: 'Dog'
  },
  {
    url: cat01Image,
    alt: 'Cat'
  },
  {
    url: cat02Image,
    alt: 'Cat'
  },
  {
    url: horse01Image,
    alt: 'Horse'
  },
  {
    url: turtle01Image,
    alt: 'Turtle'
  },
  {
    url: parrot01Image,
    alt: 'Parrot'
  },
  {
    url: eagle01Image,
    alt: 'Eagle'
  },
  {
    url: ferret01Image,
    alt: 'Ferret'
  },
  {
    url: fish01Image,
    alt: 'Fish'
  },
  {
    url: rabbitImage,
    alt: 'rabbit'
  }
];

/** 
 * Fisher-Yates (Knuth) shuffle algorithm to randomize array 
 * @param array The array to shuffle 
 * @returns A new shuffled array 
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/** Home Component */
const Home: React.FC = () => {
  // Create a randomized array of images on component mount
  const [animalImages] = useState(() => shuffleArray(originalAnimalImages));
  
  // Start with a random image index
  const [currentImageIndex, setCurrentImageIndex] = useState(
    () => Math.floor(Math.random() * animalImages.length)
  );
  
  const carouselIntervalRef = useRef<number | null>(null);
  const theme = useTheme();
   const isStacked = useMediaQuery(theme.breakpoints.down('lg'));
  
  useEffect(() => {
    carouselIntervalRef.current = window.setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % animalImages.length);
    }, 5000);
    
    return () => {
      if (carouselIntervalRef.current !== null) {
        window.clearInterval(carouselIntervalRef.current);
      }
    };
  }, [animalImages.length]);

  return (
    // Wrapper box with negative margin to counteract the MainLayout padding
    <Box sx={{ 
      margin: '-24px',
      marginLeft: { xs: '-24px', md: '-24px' }, // Counteract the padding
      width: 'calc(100% + 48px)',
      overflow: 'hidden'
    }}>
      <PageContainer>
        <ContentWrapper isStacked={isStacked}>
          <HeroContent>
            <HeroTitle>
              All Companion Animals Microchip Registration
            </HeroTitle>
            <HeroSubtitle>
              Protect your beloved companion with our secure, reliable microchip registration system. Reunite faster if they ever go missing.
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
    </Box>
  );
};

export default Home;
