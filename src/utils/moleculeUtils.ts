import {MoleculeData} from '../types';
import moleculesData from '../data/molecules.json';
import categoriesData from '../data/categories.json';

export const getAllMolecules = (): MoleculeData[] => {
  return moleculesData as MoleculeData[];
};

export const getMoleculeById = (id: string): MoleculeData | undefined => {
  return moleculesData.find((mol: any) => mol.id === id) as
    | MoleculeData
    | undefined;
};

export const getMoleculesByCategory = (category: string): MoleculeData[] => {
  return moleculesData.filter((mol: any) => mol.category === category) as MoleculeData[];
};

export const searchMolecules = (query: string): MoleculeData[] => {
  const lowerQuery = query.toLowerCase();
  return moleculesData.filter(
    (mol: any) =>
      mol.name.toLowerCase().includes(lowerQuery) ||
      mol.formula.toLowerCase().includes(lowerQuery) ||
      mol.description.toLowerCase().includes(lowerQuery),
  ) as MoleculeData[];
};

export const getCategories = () => {
  return categoriesData;
};

export const calculateBondPosition = (
  atom1Pos: [number, number, number],
  atom2Pos: [number, number, number],
): [number, number, number] => {
  return [
    (atom1Pos[0] + atom2Pos[0]) / 2,
    (atom1Pos[1] + atom2Pos[1]) / 2,
    (atom1Pos[2] + atom2Pos[2]) / 2,
  ];
};

export const calculateBondLength = (
  atom1Pos: [number, number, number],
  atom2Pos: [number, number, number],
): number => {
  const dx = atom2Pos[0] - atom1Pos[0];
  const dy = atom2Pos[1] - atom1Pos[1];
  const dz = atom2Pos[2] - atom1Pos[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const calculateBondRotation = (
  atom1Pos: [number, number, number],
  atom2Pos: [number, number, number],
): [number, number, number] => {
  const dx = atom2Pos[0] - atom1Pos[0];
  const dy = atom2Pos[1] - atom1Pos[1];
  const dz = atom2Pos[2] - atom1Pos[2];

  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const theta = Math.acos(dy / length);
  const phi = Math.atan2(dz, dx);

  return [theta, 0, phi];
};

export const formatChemicalFormula = (formula: string): string => {
  return formula
    .replace(/(\d+)/g, '₀₁₂₃₄₅₆₇₈₉'[$1] || '$1')
    .replace(/₀/g, '₀')
    .replace(/₁/g, '₁')
    .replace(/₂/g, '₂')
    .replace(/₃/g, '₃')
    .replace(/₄/g, '₄')
    .replace(/₅/g, '₅')
    .replace(/₆/g, '₆')
    .replace(/₇/g, '₇')
    .replace(/₈/g, '₈')
    .replace(/₉/g, '₉');
};
