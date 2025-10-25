# Contributing to Molecular AR Viewer

Thank you for your interest in contributing to Molecular AR Viewer! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Adding New Molecules](#adding-new-molecules)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/-3D-Molecular-visualization.git
   cd -3D-Molecular-visualization
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### 1. Setting Up Your Development Environment

Follow the [SETUP.md](SETUP.md) guide to set up your development environment for iOS and Android.

### 2. Making Changes

- Make your changes in your feature branch
- Test your changes on both iOS and Android if possible
- Ensure your code follows the project's coding standards
- Add comments for complex logic
- Update documentation if needed

### 3. Commit Messages

Write clear and meaningful commit messages:

```
feat: Add new molecule category filter
fix: Resolve AR placement issue on Android
docs: Update setup instructions for iOS
refactor: Simplify molecule data loading
```

Use conventional commit prefixes:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Pull Request Process

1. **Update your branch** with the latest from main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Screenshots or videos for UI changes
   - Reference any related issues

4. **Address review feedback**:
   - Make requested changes
   - Push updates to the same branch
   - Respond to reviewer comments

5. **Merge**: Once approved, a maintainer will merge your PR

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all props and data structures
- Avoid using `any` type
- Use meaningful variable and function names

Example:
```typescript
interface MoleculeProps {
  molecule: MoleculeData;
  onSelect: (id: string) => void;
}

const MoleculeCard: React.FC<MoleculeProps> = ({ molecule, onSelect }) => {
  // Component logic
};
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component names

### Styling

- Use StyleSheet.create for all styles
- Follow the existing color scheme
- Ensure responsive design
- Test on different screen sizes

### File Organization

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── data/          # Static data files
├── utils/         # Utility functions
└── types/         # TypeScript definitions
```

## Adding New Molecules

To add a new molecule to the library:

1. **Edit** `src/data/molecules.json`
2. **Follow the schema**:
   ```json
   {
     "id": "unique_id",
     "name": "Molecule Name",
     "formula": "Chemical Formula",
     "category": "simple|organic|biological",
     "description": "Brief description",
     "properties": {
       "molecularWeight": 0.0,
       "meltingPoint": "XX°C",
       "boilingPoint": "XX°C",
       "density": "X.XX g/cm³",
       "solubility": "Description"
     },
     "atoms": [
       {
         "element": "Element Name",
         "symbol": "Symbol",
         "position": [x, y, z],
         "color": "#RRGGBB",
         "radius": 0.0
       }
     ],
     "bonds": [
       {
         "atom1": 0,
         "atom2": 1,
         "type": "single|double|triple",
         "color": "#CCCCCC"
       }
     ],
     "scale": 1.0
   }
   ```

3. **Use standard CPK colors**:
   - Carbon: `#404040`
   - Hydrogen: `#FFFFFF`
   - Oxygen: `#FF0000`
   - Nitrogen: `#0000FF`
   - Phosphorus: `#FFA500`

4. **Test the molecule**:
   - Verify it renders correctly
   - Check all properties display
   - Test in AR mode

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] App builds successfully on iOS
- [ ] App builds successfully on Android
- [ ] No TypeScript errors
- [ ] No runtime errors or warnings
- [ ] All new features work as expected
- [ ] Existing features still work
- [ ] AR functionality works on device
- [ ] UI looks good on different screen sizes
- [ ] Performance is acceptable

### Testing AR Features

AR features must be tested on physical devices:

- Test molecule placement
- Test gesture controls (pinch, drag, rotate)
- Test different lighting conditions
- Test on different surfaces
- Verify screenshot functionality

### Code Quality

Run linting before committing:
```bash
npm run lint
```

Format code:
```bash
npm run format  # if available
```

## Feature Requests

To request a new feature:

1. Check if the feature already exists or is planned
2. Open an issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Proposed implementation (if applicable)
3. Discuss with maintainers before implementing

## Bug Reports

To report a bug:

1. Check if the bug is already reported
2. Open an issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots or videos
   - Device and OS version
   - App version

## Documentation

When adding features, update:

- Code comments
- README.md (if needed)
- SETUP.md (if setup changes)
- This CONTRIBUTING.md (if process changes)

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Open a discussion on GitHub
4. Ask in the issue tracker

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for major contributions
- Special thanks in the README (for significant features)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Molecular AR Viewer!
