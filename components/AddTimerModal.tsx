import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { BreathingTimer } from '../types';

interface AddTimerModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (timer: BreathingTimer) => void;
}

export default function AddTimerModal({ visible, onClose, onAdd }: AddTimerModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inhale, setInhale] = useState('4');
  const [hold, setHold] = useState('4');
  const [exhale, setExhale] = useState('4');
  const [cycles, setCycles] = useState('5');

  const handleAdd = () => {
    if (!name.trim()) return;

    const newTimer: BreathingTimer = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim() || 'Custom breathing pattern',
      inhale: parseInt(inhale) || 4,
      hold: parseInt(hold) || 4,
      exhale: parseInt(exhale) || 4,
      cycles: parseInt(cycles) || 5,
      color: '#9F7AEA',
    };

    onAdd(newTimer);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setInhale('4');
    setHold('4');
    setExhale('4');
    setCycles('5');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={styles.modal}>
          <View style={styles.handle} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Create Custom Timer</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g., Morning Breathing"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="e.g., Start your day with calm"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.smallInput]}>
                <Text style={styles.label}>Inhale (sec)</Text>
                <TextInput
                  style={styles.input}
                  value={inhale}
                  onChangeText={setInhale}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>

              <View style={[styles.inputGroup, styles.smallInput]}>
                <Text style={styles.label}>Hold (sec)</Text>
                <TextInput
                  style={styles.input}
                  value={hold}
                  onChangeText={setHold}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.smallInput]}>
                <Text style={styles.label}>Exhale (sec)</Text>
                <TextInput
                  style={styles.input}
                  value={exhale}
                  onChangeText={setExhale}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>

              <View style={[styles.inputGroup, styles.smallInput]}>
                <Text style={styles.label}>Cycles</Text>
                <TextInput
                  style={styles.input}
                  value={cycles}
                  onChangeText={setCycles}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleAdd}
                disabled={!name.trim()}
              >
                <Text style={styles.addButtonText}>Add Timer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modal: {
    backgroundColor: '#2D3748',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    maxHeight: '85%',
    borderTopWidth: 2,
    borderTopColor: 'rgba(98, 191, 161, 0.3)',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'rgba(98, 191, 161, 0.3)',
    borderWidth: 2,
    borderColor: '#62BFA1',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

