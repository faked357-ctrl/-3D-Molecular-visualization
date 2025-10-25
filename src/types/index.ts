export interface Atom {
  element: string;
  symbol: string;
  position: [number, number, number];
  color: string;
  radius: number;
}

export interface Bond {
  atom1: number;
  atom2: number;
  type: 'single' | 'double' | 'triple';
  color: string;
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  category: string;
  description: string;
  properties: {
    molecularWeight: number;
    meltingPoint?: string;
    boilingPoint?: string;
    density?: string;
    solubility?: string;
  };
  atoms: Atom[];
  bonds: Bond[];
  scale: number;
}

export interface MoleculeCategory {
  id: string;
  name: string;
  icon: string;
}

export interface EducationalLabel {
  id: string;
  text: string;
  position: [number, number, number];
  atomIndex?: number;
  bondIndex?: number;
}

export interface ARSceneState {
  selectedMoleculeId: string | null;
  moleculePosition: [number, number, number];
  moleculeRotation: [number, number, number];
  moleculeScale: number;
  isPlaced: boolean;
  educationalMode: boolean;
}

export interface GestureState {
  scale: number;
  rotation: number;
  translationX: number;
  translationY: number;
}
