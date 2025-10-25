import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import SearchBar from '../components/SearchBar';
import {getAllMolecules, searchMolecules, getCategories} from '../utils/moleculeUtils';
import {MoleculeData} from '../types';

type MoleculeLibraryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Library'
>;

interface Props {
  navigation: MoleculeLibraryScreenNavigationProp;
}

const MoleculeLibraryScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getCategories();
  const allMolecules = getAllMolecules();

  const filteredMolecules = useMemo(() => {
    let molecules = allMolecules;

    // Filter by category
    if (selectedCategory) {
      molecules = molecules.filter(mol => mol.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      molecules = searchMolecules(searchQuery);
      if (selectedCategory) {
        molecules = molecules.filter(mol => mol.category === selectedCategory);
      }
    }

    return molecules;
  }, [searchQuery, selectedCategory, allMolecules]);

  const handleMoleculePress = (molecule: MoleculeData) => {
    navigation.navigate('ARView', {moleculeId: molecule.id});
  };

  const renderMoleculeItem = ({item}: {item: MoleculeData}) => (
    <TouchableOpacity
      style={styles.moleculeCard}
      onPress={() => handleMoleculePress(item)}
      activeOpacity={0.7}>
      <View style={styles.moleculeInfo}>
        <Text style={styles.moleculeName}>{item.name}</Text>
        <Text style={styles.moleculeFormula}>{item.formula}</Text>
        <Text style={styles.moleculeDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.moleculeMeta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.atomCount}>
            {item.atoms.length} atoms • {item.bonds.length} bonds
          </Text>
        </View>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilter}>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === null && styles.categoryButtonActive,
        ]}
        onPress={() => setSelectedCategory(null)}>
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategory === null && styles.categoryButtonTextActive,
          ]}>
          All
        </Text>
      </TouchableOpacity>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory === category.id && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory(category.id)}>
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === category.id &&
                styles.categoryButtonTextActive,
            ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search molecules..."
      />

      {renderCategoryFilter()}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredMolecules.length} molecule{filteredMolecules.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredMolecules}
        renderItem={renderMoleculeItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No molecules found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  categoryFilter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryButtonActive: {
    backgroundColor: '#0080ff',
    borderColor: '#0080ff',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#b0b0b0',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#808080',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  moleculeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moleculeInfo: {
    flex: 1,
  },
  moleculeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  moleculeFormula: {
    fontSize: 16,
    color: '#64b5f6',
    marginBottom: 8,
  },
  moleculeDescription: {
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 20,
    marginBottom: 10,
  },
  moleculeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0, 128, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 12,
    color: '#64b5f6',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  atomCount: {
    fontSize: 12,
    color: '#808080',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#808080',
    marginLeft: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#808080',
  },
});

export default MoleculeLibraryScreen;
