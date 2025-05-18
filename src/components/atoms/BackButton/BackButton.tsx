import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}>
      <Entypo name="chevron-with-circle-left" size={32} color="#4F8EF7" />
    </Pressable>
  );
};

export default BackButton;
