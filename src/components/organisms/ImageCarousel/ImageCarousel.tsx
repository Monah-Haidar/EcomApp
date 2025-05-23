import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { imageCarouselStyles } from './imageCarouselStyles';

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



export default ImageCarousel;