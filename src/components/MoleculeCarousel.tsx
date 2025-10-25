import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {MoleculeData} from '../types';

interface MoleculeCarouselProps {
  molecules: MoleculeData[];
  selectedMoleculeId: string | null;
  onMoleculeSelect: (molecule: MoleculeData) => void;
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_MARGIN = 10;

const MoleculeCarousel: React.FC<MoleculeCarouselProps> = ({
  molecules,
  selectedMoleculeId,
  onMoleculeSelect,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast">
        {molecules.map((molecule) => {
          const isSelected = molecule.id === selectedMoleculeId;
          return (
            <TouchableOpacity
              key={molecule.id}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => onMoleculeSelect(molecule)}
              activeOpacity={0.7}>
              <View style={styles.cardContent}>
                <Text style={styles.moleculeName}>{molecule.name}</Text>
                <Text style={styles.moleculeFormula}>{molecule.formula}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{molecule.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 120,
  },
  scrollContent: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
  },
  card: {
    width: CARD_WIDTH,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginHorizontal: CARD_MARGIN,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: 'rgba(100, 200, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#0080ff',
  },
  cardContent: {
    alignItems: 'center',
  },
  moleculeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 5,
  },
  moleculeFormula: {
    fontSize: 16,
    color: '#16213e',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(0, 128, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#0080ff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default MoleculeCarousel;
