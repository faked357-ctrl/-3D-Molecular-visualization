import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {MoleculeData} from '../types';

interface MoleculeInfoPanelProps {
  molecule: MoleculeData | null;
  isVisible: boolean;
  onClose: () => void;
}

const MoleculeInfoPanel: React.FC<MoleculeInfoPanelProps> = ({
  molecule,
  isVisible,
  onClose,
}) => {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  if (!molecule) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateX: slideAnim}],
        },
      ]}>
      <View style={styles.header}>
        <Text style={styles.title}>{molecule.name}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chemical Formula</Text>
          <Text style={styles.formula}>{molecule.formula}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{molecule.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Properties</Text>
          <View style={styles.propertyRow}>
            <Text style={styles.propertyLabel}>Molecular Weight:</Text>
            <Text style={styles.propertyValue}>
              {molecule.properties.molecularWeight} g/mol
            </Text>
          </View>
          {molecule.properties.meltingPoint && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>Melting Point:</Text>
              <Text style={styles.propertyValue}>
                {molecule.properties.meltingPoint}
              </Text>
            </View>
          )}
          {molecule.properties.boilingPoint && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>Boiling Point:</Text>
              <Text style={styles.propertyValue}>
                {molecule.properties.boilingPoint}
              </Text>
            </View>
          )}
          {molecule.properties.density && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>Density:</Text>
              <Text style={styles.propertyValue}>
                {molecule.properties.density}
              </Text>
            </View>
          )}
          {molecule.properties.solubility && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>Solubility:</Text>
              <Text style={styles.propertyValue}>
                {molecule.properties.solubility}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Structure</Text>
          <View style={styles.propertyRow}>
            <Text style={styles.propertyLabel}>Atoms:</Text>
            <Text style={styles.propertyValue}>{molecule.atoms.length}</Text>
          </View>
          <View style={styles.propertyRow}>
            <Text style={styles.propertyLabel}>Bonds:</Text>
            <Text style={styles.propertyValue}>{molecule.bonds.length}</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64b5f6',
    marginBottom: 10,
  },
  formula: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  propertyLabel: {
    fontSize: 14,
    color: '#b0b0b0',
    flex: 1,
  },
  propertyValue: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'right',
  },
});

export default MoleculeInfoPanel;
