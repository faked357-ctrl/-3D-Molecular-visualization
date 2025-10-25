import React, {useState, useRef} from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import ARScene from '../components/ARScene';
import MoleculeCarousel from '../components/MoleculeCarousel';
import MoleculeInfoPanel from '../components/MoleculeInfoPanel';
import ControlButtons from '../components/ControlButtons';
import {getAllMolecules, getMoleculeById} from '../utils/moleculeUtils';
import {MoleculeData} from '../types';
import {captureRef} from 'react-native-view-shot';

type ARViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ARView'
>;
type ARViewScreenRouteProp = RouteProp<RootStackParamList, 'ARView'>;

interface Props {
  navigation: ARViewScreenNavigationProp;
  route: ARViewScreenRouteProp;
}

const ARViewScreen: React.FC<Props> = ({route}) => {
  const viewRef = useRef(null);
  const molecules = getAllMolecules();

  const initialMoleculeId = route.params?.moleculeId;
  const initialMolecule = initialMoleculeId
    ? getMoleculeById(initialMoleculeId)
    : molecules[0];

  const [selectedMolecule, setSelectedMolecule] = useState<MoleculeData | null>(
    initialMolecule || null,
  );
  const [educationalMode, setEducationalMode] = useState(false);
  const [infoPanelVisible, setInfoPanelVisible] = useState(false);

  const handleMoleculeSelect = (molecule: MoleculeData) => {
    setSelectedMolecule(molecule);
  };

  const handleToggleEducationalMode = () => {
    setEducationalMode(!educationalMode);
  };

  const handleToggleInfoPanel = () => {
    setInfoPanelVisible(!infoPanelVisible);
  };

  const handleScreenshot = async () => {
    try {
      if (viewRef.current) {
        const uri = await captureRef(viewRef, {
          format: 'png',
          quality: 0.9,
        });

        Alert.alert(
          'Screenshot Saved',
          `Screenshot saved to: ${uri}`,
          [
            {
              text: 'OK',
              onPress: () => console.log('Screenshot saved:', uri),
            },
          ],
          {cancelable: true},
        );
      }
    } catch (error) {
      console.error('Screenshot error:', error);
      Alert.alert('Error', 'Failed to capture screenshot');
    }
  };

  return (
    <View style={styles.container} ref={viewRef}>
      <ARScene
        molecule={selectedMolecule}
        educationalMode={educationalMode}
      />

      <ControlButtons
        onScreenshot={handleScreenshot}
        onToggleEducationalMode={handleToggleEducationalMode}
        onToggleInfo={handleToggleInfoPanel}
        educationalMode={educationalMode}
        infoVisible={infoPanelVisible}
      />

      <MoleculeCarousel
        molecules={molecules}
        selectedMoleculeId={selectedMolecule?.id || null}
        onMoleculeSelect={handleMoleculeSelect}
      />

      <MoleculeInfoPanel
        molecule={selectedMolecule}
        isVisible={infoPanelVisible}
        onClose={handleToggleInfoPanel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default ARViewScreen;
