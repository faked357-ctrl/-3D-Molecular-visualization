# Molecular AR Viewer

A cross-platform mobile application for visualizing 3D molecular structures in augmented reality, built with React Native, ViroReact, and Three.js.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.72.6-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Molecular AR Viewer is an educational and interactive mobile application that allows users to explore molecular structures in 3D using augmented reality. Place molecules in your real-world environment, manipulate them with touch gestures, and learn about their properties and structures.

### Key Features

- **AR Visualization**: Place 3D molecules in real-world spaces using ARKit (iOS) and ARCore (Android)
- **Rich Molecule Library**: Pre-loaded with common molecules including:
  - Simple molecules (H₂O, CO₂)
  - Organic compounds (Glucose, Benzene)
  - Biological molecules (DNA helix, Protein structures)
- **Interactive Controls**:
  - Pinch to scale molecules
  - Drag to move molecules in 3D space
  - Rotate with touch gestures
- **Educational Mode**: Toggle atom and bond labels for learning
- **Molecule Information Panel**: Detailed chemical properties and descriptions
- **Search Functionality**: Quickly find molecules by name, formula, or description
- **Category Filters**: Browse molecules by type (Simple, Organic, Biological)
- **Screenshot Capability**: Capture and save AR molecule visualizations

## Technology Stack

### Core Technologies
- **React Native** (0.72.6) - Cross-platform mobile framework
- **TypeScript** (5.2.2) - Type-safe development
- **ViroReact** (2.23.0) - AR functionality and 3D rendering
- **Three.js** (0.158.0) - 3D graphics library
- **React Navigation** (6.1.9) - Navigation management

### Key Libraries
- **react-native-gesture-handler** - Touch gesture recognition
- **react-native-reanimated** - Smooth animations
- **react-native-view-shot** - Screenshot functionality
- **react-native-vector-icons** - Icon support

## Project Structure

```
-3D-Molecular-visualization/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ARScene.tsx      # Main AR scene with ViroReact
│   │   ├── Molecule3D.tsx   # 3D molecule renderer
│   │   ├── MoleculeCarousel.tsx
│   │   ├── MoleculeInfoPanel.tsx
│   │   ├── ControlButtons.tsx
│   │   └── SearchBar.tsx
│   ├── screens/             # Application screens
│   │   ├── HomeScreen.tsx
│   │   ├── ARViewScreen.tsx
│   │   └── MoleculeLibraryScreen.tsx
│   ├── data/                # Molecule data
│   │   ├── molecules.json   # Molecule definitions
│   │   └── categories.json  # Category definitions
│   ├── utils/               # Utility functions
│   │   └── moleculeUtils.ts # Molecule data helpers
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── android/                 # Android-specific code
├── ios/                     # iOS-specific code
├── App.tsx                  # Main application component
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- For iOS: macOS, Xcode 14+, CocoaPods
- For Android: Android Studio, JDK 11+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd -3D-Molecular-visualization
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup**
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

4. **Android Setup**
   ```bash
   npm run android
   ```

For detailed setup instructions, see [SETUP.md](SETUP.md).

## Usage Guide

### Home Screen
- Start AR Experience: Launch directly into AR view
- Browse Molecules: Explore the full molecule library

### AR View Screen
- **Molecule Selection**: Swipe through the bottom carousel to select molecules
- **Placement**: Point camera at a flat surface, tap to place molecule
- **Gestures**:
  - **Pinch**: Scale molecule larger or smaller
  - **Drag**: Move molecule in 3D space
  - **Rotate**: Twist gesture to rotate molecule
- **Controls** (Right side buttons):
  - 📷 Screenshot: Capture current AR view
  - 📚 Educational Mode: Toggle atom/bond labels
  - ℹ️ Info Panel: Show detailed molecule information

### Molecule Library Screen
- **Search**: Type to search by name, formula, or description
- **Filter**: Select categories (All, Simple, Organic, Biological)
- **View Details**: Tap any molecule to view in AR

## Adding Custom Molecules

You can add your own molecules by editing `src/data/molecules.json`:

```json
{
  "id": "custom_molecule",
  "name": "Your Molecule",
  "formula": "XₙYₘ",
  "category": "organic",
  "description": "Description of your molecule",
  "properties": {
    "molecularWeight": 100.0,
    "meltingPoint": "25°C",
    "boilingPoint": "100°C",
    "density": "1.0 g/cm³",
    "solubility": "Soluble in water"
  },
  "atoms": [
    {
      "element": "Carbon",
      "symbol": "C",
      "position": [0, 0, 0],
      "color": "#404040",
      "radius": 0.12
    }
  ],
  "bonds": [
    {
      "atom1": 0,
      "atom2": 1,
      "type": "single",
      "color": "#CCCCCC"
    }
  ],
  "scale": 1.0
}
```

### Atom Colors (CPK Coloring Scheme)
- Carbon (C): `#404040` (Gray)
- Hydrogen (H): `#FFFFFF` (White)
- Oxygen (O): `#FF0000` (Red)
- Nitrogen (N): `#0000FF` (Blue)
- Phosphorus (P): `#FFA500` (Orange)

## Features in Detail

### AR Scene Component
The AR scene uses ViroReact to create an immersive AR experience:
- Automatic surface detection
- Realistic lighting with ambient and spot lights
- Physics-based interactions
- Placement indicator for user guidance

### Molecule 3D Rendering
Each molecule is rendered using:
- Spheres for atoms (sized by atomic radius)
- Cylinders for bonds (thickness by bond type)
- CPK coloring scheme for element identification
- Optional labels in educational mode

### Touch Gesture Handlers
Implemented using react-native-gesture-handler:
- **Pinch Gesture**: Scales molecule uniformly
- **Pan Gesture**: Moves molecule in AR space
- **Rotation Gesture**: Rotates molecule on Y-axis

### Screenshot System
Uses react-native-view-shot to capture:
- Current AR view with molecule
- High-quality PNG format
- Saves to device photo library

## Performance Optimization

- **Lazy Loading**: Molecules loaded on-demand
- **Memoization**: React.useMemo for expensive calculations
- **Native Drivers**: Animations use native thread
- **Efficient Rendering**: ViroReact handles 3D optimization

## Device Requirements

### iOS
- iOS 13.0 or higher
- ARKit-capable device (iPhone 6s or newer)
- Camera access permission

### Android
- Android 7.0 (API 24) or higher
- ARCore-compatible device ([Check compatibility](https://developers.google.com/ar/devices))
- Camera access permission

## Troubleshooting

### AR not working
- Ensure device supports AR (ARKit/ARCore)
- Check camera permissions are granted
- Use device in well-lit environment
- Try on a different surface

### Build errors
- Clear cache: `npm start -- --reset-cache`
- Clean builds:
  - iOS: Xcode → Product → Clean Build Folder
  - Android: `cd android && ./gradlew clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Module not found errors
- iOS: `cd ios && pod install`
- Android: Ensure ANDROID_HOME is set correctly

For more troubleshooting, see [SETUP.md](SETUP.md).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Test on both iOS and Android
- Ensure AR features work on physical devices

## Future Enhancements

Potential features for future releases:
- [ ] Import custom molecule files (.mol, .pdb, .sdf)
- [ ] Molecule comparison mode (view multiple molecules)
- [ ] Animation of chemical reactions
- [ ] Sharing AR screenshots to social media
- [ ] Voice-guided molecular tours
- [ ] Quiz mode for chemistry education
- [ ] Multi-language support
- [ ] Cloud sync for favorite molecules
- [ ] Recording video of AR sessions
- [ ] Integration with chemistry databases (PubChem, ChemSpider)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **ViroReact** for AR framework
- **Three.js** for 3D graphics
- **React Native** for cross-platform development
- Molecular data based on standard chemical databases
- CPK coloring scheme for atom visualization

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [ViroReact Documentation](https://docs.viromedia.com/)
- [ARKit Documentation](https://developer.apple.com/arkit/)
- [ARCore Documentation](https://developers.google.com/ar)
- [Three.js Documentation](https://threejs.org/docs/)

## Contact

For questions, issues, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting guide

---

**Built with ❤️ for chemistry education and AR exploration**
