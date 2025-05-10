import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const baseWidth = 392.7;
const baseHeight = 850.9;

const scale = (size: number) =>
  PixelRatio.roundToNearestPixel((SCREEN_WIDTH / baseWidth) * size);

const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / baseHeight) * size);

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
