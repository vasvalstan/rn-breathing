import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTimerModal from '../components/AddTimerModal';
import TimerCard from '../components/TimerCard';
import { mockTimers } from '../data/mockTimers';
import { BreathingTimer } from '../types';

export default function HomeScreen() {
  const router = useRouter();
  const [timers, setTimers] = useState<BreathingTimer[]>(mockTimers);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTimer = (newTimer: BreathingTimer) => {
    setTimers([...timers, newTimer]);
  };

  const handleTimerPress = (timer: BreathingTimer) => {
    router.push({
      pathname: '/breathing',
      params: {
        id: timer.id,
        name: timer.name,
        inhale: timer.inhale.toString(),
        hold: timer.hold.toString(),
        exhale: timer.exhale.toString(),
        cycles: timer.cycles.toString(),
        color: timer.color,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>Choose Your Practice</Text>
        </View>
      </View>

      <FlatList
        data={timers}
        renderItem={({ item }) => (
          <TimerCard timer={item} onPress={() => handleTimerPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <AddTimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTimer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: 'rgba(98, 191, 161, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(98, 191, 161, 0.2)',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    paddingVertical: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(98, 191, 161, 0.3)',
    borderWidth: 2,
    borderColor: '#62BFA1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#62BFA1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

