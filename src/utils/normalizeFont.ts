import { PixelRatio, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const baseWidth = 392.7;

const scale = (size: number) =>
  PixelRatio.roundToNearestPixel((SCREEN_WIDTH / baseWidth) * size);

const normalizeFont = (size: number) => {
  const scaled = scale(size);
  const fontScale = PixelRatio.getFontScale();
  return PixelRatio.roundToNearestPixel(scaled * fontScale);
};

export { normalizeFont };
