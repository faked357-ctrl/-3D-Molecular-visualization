import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ControlButtonsProps {
  onScreenshot: () => void;
  onToggleEducationalMode: () => void;
  onToggleInfo: () => void;
  educationalMode: boolean;
  infoVisible: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onScreenshot,
  onToggleEducationalMode,
  onToggleInfo,
  educationalMode,
  infoVisible,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, infoVisible && styles.activeButton]}
        onPress={onToggleInfo}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>ℹ️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, educationalMode && styles.activeButton]}
        onPress={onToggleEducationalMode}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>📚</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onScreenshot}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>📷</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: 'rgba(100, 200, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#0080ff',
  },
  buttonText: {
    fontSize: 24,
  },
});

export default ControlButtons;
