import { BreathingTimer } from '../types';

export const mockTimers: BreathingTimer[] = [
  {
    id: '1',
    name: '4-7-8 Relaxation',
    description: 'Great for sleep and anxiety relief',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
    color: '#667EEA',
  },
  {
    id: '2',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for focus',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 5,
    color: '#48BB78',
  },
  {
    id: '3',
    name: 'Quick Energy',
    description: 'Short energizing session',
    inhale: 3,
    hold: 3,
    exhale: 3,
    cycles: 3,
    color: '#F56565',
  },
];

