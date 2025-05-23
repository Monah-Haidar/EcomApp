import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { spacing } from '../../../constants/spacing';

interface ImageCarouselProps {
  images: Array<{
    url: string;
    _id?: string;
  }>;
  onLongPress?: (imageUrl: string) => void;
}

const ImageCarousel = ({ images, onLongPress }: ImageCarouselProps) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = Dimensions.get('window');
  
  const styles = imageCarouselStyles(theme, width);
  
  // Ensure images is not undefined or empty
  const validImages = images && images.length > 0 ? images : [];
  
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveIndex(currentIndex);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {validImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={image._id || index}
            onLongPress={() => onLongPress?.(image.url)}
          >
            <Image
              source={{ uri: `https://backend-practice.eurisko.me${image.url}` }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      
      {/* Pagination indicators */}
      {validImages.length > 1 && (
        <View style={styles.pagination}>
          {validImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const imageCarouselStyles = (theme: any, screenWidth: number) => StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: 250,
  },
  pagination: {
    position: 'absolute',
    bottom: spacing.md,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: spacing.xs / 2,
  },
  paginationDotActive: {
    backgroundColor: theme.buttonText,
    width: spacing.md_minus,
  },
});

export default ImageCarousel;