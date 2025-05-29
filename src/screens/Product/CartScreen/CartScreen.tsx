import {Text} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

const CartScreen = () => {
  return (
    <Animated.View entering={FadeIn.duration(1000)}>
      <Text style={{color: 'white'}}>Hello Reanimated 3</Text>
    </Animated.View>
  );
};

export default CartScreen;
