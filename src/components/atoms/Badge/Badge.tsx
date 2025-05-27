import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {badgeStyles} from './badgeStyles';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import React, { useMemo } from 'react';

interface BadgeProps {
  isVerified: boolean | undefined;
  text: string;
  icon: string;
}

const Badge = ({isVerified, text, icon}: BadgeProps) => {
  const {theme} = useTheme();
  const styles = useMemo(() => badgeStyles(theme), [theme]);
  return (
    <View
      style={[
        styles.verifiedBadge,
        {backgroundColor: isVerified ? '#e8f5e9' : '#ffebee'},
      ]}>
      <MaterialIcons
        name={icon}
        size={16}
        color={isVerified ? '#34a853' : '#d32f2f'}
      />
      <Text
        style={[styles.verifiedText, {color: isVerified ? '#34a853' : 'red'}]}>
        {text}
      </Text>
    </View>
  );
};

export default React.memo(Badge);
