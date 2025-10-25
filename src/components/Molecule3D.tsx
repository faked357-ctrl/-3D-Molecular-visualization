import React from 'react';
import {
  ViroNode,
  ViroSphere,
  ViroBox,
  ViroText,
  ViroAnimations,
} from '@viro-community/react-viro';
import {MoleculeData, Atom, Bond} from '../types';
import {
  calculateBondPosition,
  calculateBondLength,
  calculateBondRotation,
} from '../utils/moleculeUtils';

interface Molecule3DProps {
  molecule: MoleculeData;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  showLabels?: boolean;
  onDrag?: (position: [number, number, number]) => void;
  onPinch?: (scale: number) => void;
  onRotate?: (rotation: [number, number, number]) => void;
}

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 2000,
  },
  pulse: {
    properties: {
      scaleX: 1.1,
      scaleY: 1.1,
      scaleZ: 1.1,
    },
    duration: 500,
    easing: 'bounce',
  },
});

const Molecule3D: React.FC<Molecule3DProps> = ({
  molecule,
  position = [0, 0, -2],
  rotation = [0, 0, 0],
  scale: customScale,
  showLabels = false,
  onDrag,
  onPinch,
  onRotate,
}) => {
  const scale = customScale || [
    molecule.scale,
    molecule.scale,
    molecule.scale,
  ];

  const renderAtom = (atom: Atom, index: number) => {
    return (
      <ViroNode key={`atom-${index}`} position={atom.position}>
        <ViroSphere
          radius={atom.radius}
          materials={[{diffuseColor: atom.color}]}
          physicsBody={{
            type: 'Dynamic',
            mass: 1,
          }}
        />
        {showLabels && (
          <ViroText
            text={atom.symbol}
            scale={[0.2, 0.2, 0.2]}
            position={[0, atom.radius + 0.1, 0]}
            style={{
              fontFamily: 'Arial',
              fontSize: 30,
              color: '#FFFFFF',
            }}
            transformBehaviors={['billboard']}
          />
        )}
      </ViroNode>
    );
  };

  const renderBond = (bond: Bond, index: number) => {
    const atom1 = molecule.atoms[bond.atom1];
    const atom2 = molecule.atoms[bond.atom2];

    if (!atom1 || !atom2) {
      return null;
    }

    const bondPosition = calculateBondPosition(atom1.position, atom2.position);
    const bondLength = calculateBondLength(atom1.position, atom2.position);
    const bondRotation = calculateBondRotation(atom1.position, atom2.position);

    const bondWidth = bond.type === 'single' ? 0.03 : bond.type === 'double' ? 0.05 : 0.07;

    return (
      <ViroNode
        key={`bond-${index}`}
        position={bondPosition}
        rotation={[
          (bondRotation[0] * 180) / Math.PI,
          (bondRotation[1] * 180) / Math.PI,
          (bondRotation[2] * 180) / Math.PI,
        ]}>
        <ViroBox
          height={bondLength}
          width={bondWidth}
          length={bondWidth}
          materials={[{diffuseColor: bond.color}]}
        />
      </ViroNode>
    );
  };

  return (
    <ViroNode
      position={position}
      rotation={rotation}
      scale={scale}
      dragType="FixedToWorld"
      onDrag={(dragToPos) => {
        if (onDrag) {
          onDrag(dragToPos as [number, number, number]);
        }
      }}
      onPinch={(pinchState, scaleFactor) => {
        if (onPinch && pinchState === 3) {
          onPinch(scaleFactor);
        }
      }}
      onRotate={(rotateState, rotationFactor, source) => {
        if (onRotate && rotateState === 3) {
          onRotate([
            rotation[0],
            rotation[1] + rotationFactor,
            rotation[2],
          ]);
        }
      }}>
      {/* Render all bonds first (so they appear behind atoms) */}
      {molecule.bonds.map((bond, index) => renderBond(bond, index))}

      {/* Render all atoms */}
      {molecule.atoms.map((atom, index) => renderAtom(atom, index))}
    </ViroNode>
  );
};

export default Molecule3D;
