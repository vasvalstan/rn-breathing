import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem('onboarding_completed');
      
      // Small delay for smoother transition
      setTimeout(() => {
        if (completed === 'true') {
          router.replace('/home');
        } else {
          router.replace('/onboarding');
        }
      }, 500);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      router.replace('/onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#62BFA1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A202C',
  },
});
