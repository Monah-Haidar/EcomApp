import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useAuthStore } from '../../../store/AuthStore';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { infoRowStyles } from './infoRowStyles';

interface InfoRowProps {
  label: string;
  icon: React.ReactNode;  
}



const InfoRow = ({label, icon}: InfoRowProps) => {
  const user = useAuthStore(state => state.user);
  const {theme} = useTheme();


  const styles =  useMemo(() => infoRowStyles(theme), [theme]);
  
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

export default React.memo(InfoRow);
