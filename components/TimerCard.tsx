import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BreathingTimer } from '../types';

interface TimerCardProps {
  timer: BreathingTimer;
  onPress: () => void;
}

export default function TimerCard({ timer, onPress }: TimerCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.colorBar, { backgroundColor: timer.color }]} />
      <View style={styles.content}>
        <Text style={styles.name}>{timer.name}</Text>
        <Text style={styles.description}>{timer.description}</Text>
        <View style={styles.timingContainer}>
          <View style={styles.timingItem}>
            <Text style={styles.timingLabel}>Inhale</Text>
            <Text style={styles.timingValue}>{timer.inhale}s</Text>
          </View>
          <View style={styles.timingItem}>
            <Text style={styles.timingLabel}>Hold</Text>
            <Text style={styles.timingValue}>{timer.hold}s</Text>
          </View>
          <View style={styles.timingItem}>
            <Text style={styles.timingLabel}>Exhale</Text>
            <Text style={styles.timingValue}>{timer.exhale}s</Text>
          </View>
          <View style={styles.timingItem}>
            <Text style={styles.timingLabel}>Cycles</Text>
            <Text style={styles.timingValue}>{timer.cycles}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  colorBar: {
    height: 6,
    width: '100%',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  timingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timingItem: {
    alignItems: 'center',
  },
  timingLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  timingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

