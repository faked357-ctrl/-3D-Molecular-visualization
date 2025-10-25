import React, {useState, useEffect} from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroQuad,
} from '@viro-community/react-viro';
import {StyleSheet} from 'react-native';
import Molecule3D from './Molecule3D';
import {MoleculeData} from '../types';

interface ARSceneProps {
  molecule: MoleculeData | null;
  educationalMode: boolean;
}

const ARSceneComponent: React.FC<ARSceneProps> = ({
  molecule,
  educationalMode,
}) => {
  const [isPlaced, setIsPlaced] = useState(false);
  const [moleculePosition, setMoleculePosition] = useState<
    [number, number, number]
  >([0, 0, -2]);
  const [moleculeRotation, setMoleculeRotation] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [moleculeScale, setMoleculeScale] = useState(1);

  useEffect(() => {
    // Reset placement when molecule changes
    setIsPlaced(false);
    setMoleculePosition([0, 0, -2]);
    setMoleculeRotation([0, 0, 0]);
    setMoleculeScale(1);
  }, [molecule?.id]);

  const handlePlaneSelected = (anchor: any) => {
    setIsPlaced(true);
    setMoleculePosition([
      anchor.position[0],
      anchor.position[1] + 0.2,
      anchor.position[2],
    ]);
  };

  const handleDrag = (position: [number, number, number]) => {
    setMoleculePosition(position);
  };

  const handlePinch = (scaleFactor: number) => {
    setMoleculeScale(moleculeScale * scaleFactor);
  };

  const handleRotate = (rotation: [number, number, number]) => {
    setMoleculeRotation(rotation);
  };

  return (
    <ViroARScene>
      {/* Lighting */}
      <ViroAmbientLight color="#FFFFFF" intensity={200} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 0]}
        color="#FFFFFF"
        castsShadow={true}
        intensity={1000}
      />

      {/* AR Plane Selector for placing molecules */}
      {!isPlaced && molecule && (
        <ViroARPlaneSelector onPlaneSelected={handlePlaneSelected}>
          <ViroNode>
            <ViroQuad
              rotation={[-90, 0, 0]}
              width={0.5}
              height={0.5}
              materials={[
                {
                  diffuseColor: '#00FF00',
                  opacity: 0.3,
                },
              ]}
            />
          </ViroNode>
        </ViroARPlaneSelector>
      )}

      {/* Render molecule once placed */}
      {isPlaced && molecule && (
        <Molecule3D
          molecule={molecule}
          position={moleculePosition}
          rotation={moleculeRotation}
          scale={[moleculeScale, moleculeScale, moleculeScale]}
          showLabels={educationalMode}
          onDrag={handleDrag}
          onPinch={handlePinch}
          onRotate={handleRotate}
        />
      )}

      {/* Show molecule preview before placement */}
      {!isPlaced && molecule && (
        <Molecule3D
          molecule={molecule}
          position={[0, -0.5, -2]}
          rotation={[0, 0, 0]}
          showLabels={educationalMode}
        />
      )}
    </ViroARScene>
  );
};

interface ARSceneNavigatorProps {
  molecule: MoleculeData | null;
  educationalMode: boolean;
}

const ARSceneNavigator: React.FC<ARSceneNavigatorProps> = ({
  molecule,
  educationalMode,
}) => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => (
          <ARSceneComponent
            molecule={molecule}
            educationalMode={educationalMode}
          />
        ),
      }}
      style={styles.arView}
    />
  );
};

const styles = StyleSheet.create({
  arView: {
    flex: 1,
  },
});

export default ARSceneNavigator;
