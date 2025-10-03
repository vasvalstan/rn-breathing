import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BreathingAnimation from '../components/BreathingAnimation';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export default function BreathingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const timerName = params.name as string;
  const inhaleTime = parseInt(params.inhale as string);
  const holdTime = parseInt(params.hold as string);
  const exhaleTime = parseInt(params.exhale as string);
  const totalCycles = parseInt(params.cycles as string);
  const color = params.color as string;

  const [phase, setPhase] = useState<Phase>('idle');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            advancePhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase, currentCycle, isCompleted]);

  const advancePhase = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (phase === 'idle' || phase === 'exhale') {
      if (currentCycle >= totalCycles - 1 && phase === 'exhale') {
        setIsActive(false);
        setIsCompleted(true);
        setPhase('idle');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return;
      }

      setPhase('inhale');
      setTimeLeft(inhaleTime);
      if (phase === 'exhale') {
        setCurrentCycle((prev) => prev + 1);
      }
    } else if (phase === 'inhale') {
      setPhase('hold');
      setTimeLeft(holdTime);
    } else if (phase === 'hold') {
      setPhase('exhale');
      setTimeLeft(exhaleTime);
    }
  };

  const handleStartStop = () => {
    if (isCompleted) {
      // Reset
      setIsCompleted(false);
      setCurrentCycle(0);
      setPhase('idle');
      setTimeLeft(0);
      return;
    }

    if (!isActive) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsActive(true);
      if (phase === 'idle') {
        advancePhase();
      }
    } else {
      setIsActive(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const getPhaseText = () => {
    if (isCompleted) return 'Complete! 🎉';
    if (!isActive && phase === 'idle') return 'Ready to begin';
    if (phase === 'inhale') return 'Breathe in...';
    if (phase === 'hold') return 'Hold...';
    if (phase === 'exhale') return 'Breathe out...';
    return '';
  };

  const getPhaseColor = () => {
    if (phase === 'inhale') return '#667EEA';
    if (phase === 'hold') return '#F6AD55';
    if (phase === 'exhale') return '#48BB78';
    return color;
  };

  const getPhaseDuration = () => {
    if (phase === 'inhale') return inhaleTime;
    if (phase === 'hold') return holdTime;
    if (phase === 'exhale') return exhaleTime;
    return 0;
  };

  return (
    <View style={styles.container}>
      <BreathingAnimation 
        phase={phase} 
        color={getPhaseColor()} 
        duration={getPhaseDuration()}
        isActive={isActive}
      />
      
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.timerName}>{timerName}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.cycleContainer}>
            <Text style={styles.cycleText}>
              Cycle {isCompleted ? totalCycles : currentCycle + 1} of {totalCycles}
            </Text>
          </View>

          <View style={styles.spacer} />

          <View style={styles.instructionContainer}>
            <Text style={styles.phaseText}>{getPhaseText()}</Text>
            {isActive && !isCompleted && (
              <Text style={styles.timeText}>{timeLeft}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.controlButton, isActive && styles.controlButtonActive]}
            onPress={handleStartStop}
            activeOpacity={0.8}
          >
            <Text style={styles.controlButtonText}>
              {isCompleted ? 'Start Again' : isActive ? 'Pause' : 'Start'}
            </Text>
          </TouchableOpacity>

          {isCompleted && (
            <View style={styles.completionMessage}>
              <Text style={styles.completionText}>
                Great job! You've completed your breathing exercise.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  cycleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cycleText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  spacer: {
    flex: 1,
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  phaseText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(245, 101, 101, 0.3)',
    borderColor: 'rgba(245, 101, 101, 0.5)',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  completionMessage: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  completionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
});

