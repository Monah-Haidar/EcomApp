import {useNavigation} from '@react-navigation/native';
import React, { useCallback } from 'react';
import {Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const BackButton = () => {
  const navigation = useNavigation();

  const goBack = useCallback(() => { navigation.goBack(); }, [navigation]);

  return (
    <Pressable
      onPress={goBack}>
      <Entypo name="chevron-with-circle-left" size={32} color="#4F8EF7" />
    </Pressable>
  );
};

export default React.memo(BackButton);
