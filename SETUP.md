# Setup Instructions for Molecular AR Viewer

This guide will help you set up the development environment for both iOS and Android platforms.

## Prerequisites

### Common Requirements
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Git**: Latest version
- **React Native CLI**: Install globally with `npm install -g react-native-cli`

### iOS Development Requirements
- **macOS**: Required for iOS development
- **Xcode**: 14.0 or higher (Download from Mac App Store)
- **CocoaPods**: Install with `sudo gem install cocoapods`
- **iOS Device or Simulator**: iOS 13.0 or higher
- **Apple Developer Account**: For device testing

### Android Development Requirements
- **Android Studio**: Latest stable version
- **Android SDK**: API Level 24 or higher (Android 7.0)
- **Java Development Kit (JDK)**: JDK 11 or higher
- **Android Device or Emulator**: Android 7.0 (API 24) or higher with ARCore support

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd -3D-Molecular-visualization
```

### 2. Install Dependencies

```bash
npm install
```

### 3. iOS Setup

#### Step 3.1: Install CocoaPods Dependencies

```bash
cd ios
pod install
cd ..
```

#### Step 3.2: Configure Xcode

1. Open `ios/MolecularARViewer.xcworkspace` in Xcode (NOT .xcodeproj)
2. Select your development team:
   - Click on the project in the navigator
   - Select the "MolecularARViewer" target
   - Go to "Signing & Capabilities"
   - Select your Team from the dropdown
3. Update the Bundle Identifier if needed (must be unique)

#### Step 3.3: Camera and AR Permissions

The Info.plist already includes necessary permissions:
- Camera access for AR functionality
- Photo library access for screenshots

#### Step 3.4: Run on iOS

**On Simulator:**
```bash
npm run ios
```

**On Physical Device:**
1. Connect your iOS device via USB
2. Trust the computer on your device
3. In Xcode, select your device from the device dropdown
4. Click the "Run" button or use:
```bash
npx react-native run-ios --device
```

**Note:** AR features require a physical device with ARKit support (iPhone 6s or newer).

### 4. Android Setup

#### Step 4.1: Install Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio)
2. During installation, ensure these components are selected:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
   - Performance (Intel HAXM) - for emulator

#### Step 4.2: Configure Android SDK

1. Open Android Studio
2. Go to "Settings" → "Appearance & Behavior" → "System Settings" → "Android SDK"
3. Install the following SDK packages:
   - Android 13.0 (API Level 33)
   - Android SDK Platform-Tools
   - Android SDK Build-Tools
   - Google Play Services

#### Step 4.3: Set Up Environment Variables

Add these to your `~/.bash_profile`, `~/.zshrc`, or `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# OR
export ANDROID_HOME=$HOME/Android/Sdk  # Linux

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Reload your shell configuration:
```bash
source ~/.bash_profile  # or ~/.zshrc
```

#### Step 4.4: Create Android Virtual Device (AVD)

1. Open Android Studio
2. Go to "Tools" → "Device Manager"
3. Click "Create Device"
4. Select a device with Play Store support (for ARCore)
5. Select a system image with Google APIs (API 24+)
6. Click "Finish"

#### Step 4.5: Enable ARCore Support

For physical devices:
1. Install [Google Play Services for AR](https://play.google.com/store/apps/details?id=com.google.ar.core)
2. Ensure your device is [ARCore compatible](https://developers.google.com/ar/devices)

#### Step 4.6: Run on Android

**On Emulator:**
1. Start your AVD from Android Studio
2. Run:
```bash
npm run android
```

**On Physical Device:**
1. Enable Developer Options on your device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging in Developer Options
3. Connect device via USB
4. Authorize USB debugging on your device
5. Run:
```bash
npm run android
```

**Note:** AR features require a physical device with ARCore support.

## Troubleshooting

### Common iOS Issues

#### Issue: "Command PhaseScriptExecution failed"
**Solution:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

#### Issue: "Library not found"
**Solution:**
1. Clean build folder in Xcode (Cmd + Shift + K)
2. Rebuild the project

#### Issue: Metro bundler issues
**Solution:**
```bash
npm start -- --reset-cache
```

### Common Android Issues

#### Issue: "SDK location not found"
**Solution:**
Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk  # macOS
# OR
sdk.dir=/home/YOUR_USERNAME/Android/Sdk  # Linux
```

#### Issue: "Execution failed for task ':app:installDebug'"
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### Issue: "Unable to load script"
**Solution:**
1. Ensure Metro bundler is running
2. Check device/emulator can reach development server
3. Try:
```bash
adb reverse tcp:8081 tcp:8081
npm start
```

#### Issue: ARCore not working
**Solution:**
1. Verify device is ARCore compatible
2. Install/update Google Play Services for AR
3. Check camera permissions are granted

### ViroReact Specific Issues

#### Issue: ViroReact module not found
**Solution:**
```bash
# iOS
cd ios && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..
```

#### Issue: AR scene not rendering
**Solution:**
1. Check camera permissions
2. Verify device AR capabilities
3. Ensure proper lighting conditions
4. Check device is not in low power mode

## Running the App

### Development Mode

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

### Start Metro Bundler Separately

```bash
npm start
```

### Clear Cache and Restart

```bash
npm start -- --reset-cache
```

## Building for Production

### iOS Production Build

1. Open Xcode project
2. Select "Generic iOS Device" or your device
3. Product → Archive
4. Follow the distribution wizard

### Android Production Build

```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Hardware Requirements for AR

### iOS Devices with ARKit Support
- iPhone 6s and newer
- iPad Pro (all models)
- iPad (5th generation and newer)
- iPad Air (3rd generation and newer)
- iPad mini (5th generation and newer)

### Android Devices with ARCore Support
- Check the [official ARCore device list](https://developers.google.com/ar/devices)
- Generally requires Android 7.0+ and specific hardware sensors

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [ViroReact Documentation](https://docs.viromedia.com/)
- [ARKit Documentation](https://developer.apple.com/arkit/)
- [ARCore Documentation](https://developers.google.com/ar)

## Support

For issues and questions:
1. Check this setup guide
2. Review the troubleshooting section
3. Check React Native and ViroReact documentation
4. Open an issue in the repository

## Next Steps

After successful setup:
1. Explore the app features
2. Review the codebase structure
3. Read the main README.md for feature documentation
4. Start developing new features or molecules
