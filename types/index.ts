export interface OnboardingData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BreathingTimer {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  color: string;
}

export interface BreathingPhase {
  type: 'inhale' | 'hold' | 'exhale';
  duration: number;
}

