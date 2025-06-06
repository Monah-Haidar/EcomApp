import React, { useCallback, useMemo } from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {
  getCrashlytics,
  crash,
  log,
  recordError,
} from '@react-native-firebase/crashlytics';
import { crashTestButtonStyles } from './crashTestButtonStyles';

interface CrashTestButtonProps {
  onPress?: () => void;
}

const CrashTestButton: React.FC<CrashTestButtonProps> = ({onPress}) => {
  
  const styles = useMemo(() => crashTestButtonStyles, []);

  
  const crashlyticsInstance = useMemo(() => getCrashlytics(), []);

  const handleCrash = useCallback(() => {
    Alert.alert(
      'Test Crash',
      'This will force a crash for testing Firebase Crashlytics. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },        {
          text: 'Native Crash',
          style: 'destructive',
          onPress: () => {
            // Check if Crashlytics is enabled
            const isEnabled = crashlyticsInstance.isCrashlyticsCollectionEnabled;
            console.log('Crashlytics enabled:', isEnabled);

            // Log the crash before it happens
            log(crashlyticsInstance, 'User triggered native test crash');

            // Force a native crash
            crash(crashlyticsInstance);
          },
        },
        {
          text: 'JS Crash',
          style: 'destructive',
          onPress: () => {
            // Log the crash before it happens
            log(crashlyticsInstance, 'User triggered JavaScript test crash');

            // Force a JavaScript crash (works better in debug)
            setTimeout(() => {
              throw new Error(
                'Test JavaScript Crash - This is intentional for Firebase Crashlytics testing',
              );
            }, 100);
          },
        },
      ],
    );
  }, [crashlyticsInstance]);  
  
  
  const handleNonFatalError = useCallback(() => {
    // Check if Crashlytics is enabled
    const isEnabled = crashlyticsInstance.isCrashlyticsCollectionEnabled;
    console.log('Crashlytics enabled for non-fatal:', isEnabled);

    // Record a non-fatal error (won't crash the app)
    recordError(
      crashlyticsInstance,
      new Error('Test Non-Fatal Error for Crashlytics'),
    );
    Alert.alert(
      'Non-Fatal Error Logged',
      'Check Firebase Console for the error report',
    );
  }, [crashlyticsInstance]);

  const handleTestCrashlyticsStatus = useCallback(() => {
    const isEnabled = crashlyticsInstance.isCrashlyticsCollectionEnabled;

    Alert.alert(
      'Crashlytics Status',
      `Crashlytics Collection Enabled: ${isEnabled}\n\nNote: Native crashes may not work in debug builds or when debugger is attached.`,
    );
  }, [crashlyticsInstance]);



  return (
    <>
      <TouchableOpacity style={styles.crashButton} onPress={handleCrash}>
        <Text style={styles.crashButtonText}>🔥 Test Crash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nonFatalButton}
        onPress={handleNonFatalError}>
        <Text style={styles.nonFatalButtonText}>⚠️ Log Non-Fatal Error</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.statusButton}
        onPress={handleTestCrashlyticsStatus}>
        <Text style={styles.statusButtonText}>ℹ️ Check Status</Text>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(CrashTestButton);
