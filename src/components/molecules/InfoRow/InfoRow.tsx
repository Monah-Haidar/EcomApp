import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../../store/ThemeStore/ThemeStore';
import {infoRowStyles} from './infoRowStyles';
import {useAuthStore} from '../../../store/AuthStore';
import Feather from 'react-native-vector-icons/Feather';

interface InfoRowProps {
  label: string;
  icon: React.ReactNode;  
}



const InfoRow = ({label, icon}: InfoRowProps) => {
  const user = useAuthStore(state => state.user);
  const {theme} = useTheme();


  const styles = infoRowStyles(theme);
  
  const userEmail = user?.email || 'Not available';
  

  return (
    <View style={[styles.infoRow, {borderBottomColor: theme.border}]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>
          {label}
        </Text>
        <Text style={styles.infoValue}>
          {label === 'Email' ? userEmail : '••••••••'}
        </Text>
      </View>
    </View>
  );
};

export default InfoRow;
