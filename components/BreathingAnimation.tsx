import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import Circle from './Circle';

interface BreathingAnimationProps {
  phase: 'inhale' | 'hold' | 'exhale' | 'idle';
  color: string;
  duration: number;
  isActive: boolean;
}

const getGradientColors = (color: string, phase: string): string[] => {
  // Define gradient colors based on phase
  if (phase === 'inhale') {
    return ['#62BFA1', '#529CA0']; // Calm green-blue
  } else if (phase === 'hold') {
    return ['#F6AD55', '#ED8936']; // Warm orange
  } else if (phase === 'exhale') {
    return ['#68D391', '#48BB78']; // Fresh green
  }
  return ['#667EEA', '#764BA2']; // Default purple
};

export default function BreathingAnimation({ phase, color, duration, isActive }: BreathingAnimationProps) {
  const progress = useSharedValue(0);
  const goesDown = useSharedValue(false);

  useEffect(() => {
    if (!isActive || phase === 'idle') {
      progress.value = withTiming(0, { 
        duration: 500, 
        easing: Easing.bezier(0.5, 0, 0.5, 1) 
      });
      goesDown.value = false;
      return;
    }

    if (phase === 'inhale') {
      // Expand from 0 to 1
      goesDown.value = false;
      progress.value = withTiming(1, {
        duration: duration * 1000,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      });
    } else if (phase === 'hold') {
      // Stay at current position (should be 1)
      progress.value = withTiming(1, {
        duration: 100,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      });
    } else if (phase === 'exhale') {
      // Contract from 1 to 0
      goesDown.value = true;
      progress.value = withTiming(0, {
        duration: duration * 1000,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      });
    }
  }, [phase, duration, isActive, progress, goesDown]);

  const style = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ rotate: `${mix(progress.value, -Math.PI, 0)}rad` }],
  }));

  const gradientColors = getGradientColors(color, phase);

  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        {new Array(6).fill(0).map((_, index) => (
          <Circle
            progress={progress}
            index={index}
            key={index}
            goesDown={goesDown}
            colors={gradientColors}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
