import React, {useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {imageCarouselStyles} from './imageCarouselStyles';
import Animated, { FadeIn } from 'react-native-reanimated';
import Config from 'react-native-config';

interface ImageCarouselProps {
  images: Array<{
    url: string;
    _id?: string;
  }>;
  onLongPress?: (imageUrl: string) => void;
}

interface CarouselImage {
  url: string;
  _id?: string;
}

const ImageCarousel = ({images, onLongPress}: ImageCarouselProps) => {
  const {theme} = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const {width} = Dimensions.get('window');

  const styles = useMemo(
    () => imageCarouselStyles(theme, width),
    [theme, width],
  );

  const validImages = useMemo(
    () => (images && images.length > 0 ? images : []),
    [images],
  );

  const handleScroll = useCallback(
    (event: any) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setActiveIndex(currentIndex);
    },
    [width],
  );

  const renderImage = useCallback(
    (image: CarouselImage, index: number) => (
      <TouchableWithoutFeedback
        key={image._id || index}
        onLongPress={() => onLongPress?.(image.url)}>
        <Animated.Image entering={FadeIn.duration(300)}
          sharedTransitionTag="sharedTag"
          source={{uri: `${Config.BASE_URL}${image.url}`}}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    ),
    [onLongPress, styles.image],
  );

  const renderPaginationDot = useCallback(
    (_: any, index: number) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          index === activeIndex && styles.paginationDotActive,
        ]}
      />
    ),
    [activeIndex, styles.paginationDot, styles.paginationDotActive],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}>
        {validImages.map(renderImage)}
      </ScrollView>

      {validImages.length > 1 && (
        <View style={styles.pagination}>
          {validImages.map(renderPaginationDot)}
        </View>
      )}
    </View>
  );
};

export default React.memo(ImageCarousel);
