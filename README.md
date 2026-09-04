# 🚀 AutoInvest - Automated Investment Platform

A modern Flutter mobile application for automated investment management with AI-powered investment assistance.

![Flutter](https://img.shields.io/badge/Flutter-3.0+-blue?logo=flutter)
![Dart](https://img.shields.io/badge/Dart-3.0+-green?logo=dart)
![Android](https://img.shields.io/badge/Android-5.0+-green?logo=android)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Building](#building)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 📱 Overview

AutoInvest is a comprehensive investment management application that leverages AI technology to provide personalized investment recommendations. The app seamlessly integrates with a robust backend API to deliver real-time portfolio management and intelligent financial guidance.

### Key Highlights:
- **AI-Powered Investment Assistant** - Get real-time investment advice powered by Groq LLM (LLaMA 3.1)
- **User Authentication** - Secure login and registration with JWT tokens
- **Portfolio Management** - Track and manage your investments efficiently
- **Modern UI/UX** - Material Design 3 with smooth animations
- **Offline Support** - Local token storage for persistent sessions
- **Production Ready** - Comprehensive error handling and network resilience

---

## ✨ Features

### 🔐 Authentication
- ✅ User Registration with email validation
- ✅ Secure Login with password encryption
- ✅ JWT Token-based Authentication
- ✅ Automatic Session Management
- ✅ Logout with secure token clearing

### 💬 AI Chat Assistant
- ✅ Real-time chat with AI investment advisor
- ✅ Investment recommendations and analysis
- ✅ Portfolio optimization suggestions
- ✅ Market insights and financial education
- ✅ Chat history management
- ✅ Message persistence

### 💼 Portfolio Management
- ✅ View portfolio overview
- ✅ Track investment performance
- ✅ Profit/Loss calculations
- ✅ Asset allocation visualization (Coming Soon)
- ✅ Price tracking and alerts (Coming Soon)

### 👤 User Profile
- ✅ User information display
- ✅ Account settings management
- ✅ Help and support center
- ✅ About application info
- ✅ Secure logout

### 🔧 Technical Features
- ✅ State Management with Provider
- ✅ Secure local storage with SharedPreferences
- ✅ Network resilience with timeout handling
- ✅ Comprehensive error handling
- ✅ Material Design 3 UI Components
- ✅ Responsive design for all screen sizes

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Flutter 3.0+
- **Language:** Dart 3.0+
- **State Management:** Provider 6.0+
- **HTTP Client:** http 1.1+
- **Storage:** SharedPreferences 2.2+
- **UI:** Material Design 3

### Backend
- **Server:** Node.js/Express
- **Database:** MongoDB
- **Authentication:** JWT
- **AI Integration:** Groq LLM (LLaMA 3.1) API
- **Deployment:** Railway.app

### Development
- **IDE:** Android Studio / VS Code
- **Build Tools:** Gradle
- **Package Manager:** Pub
- **Version Control:** Git

---

## 📦 Prerequisites

### Required Software
1. **Flutter SDK** (3.0.0 or higher)
   - [Download Flutter](https://flutter.dev/docs/get-started/install)

2. **Android SDK** (API 21 or higher)
   - Android Studio or Command-line tools

3. **Java JDK** (version 11 or higher)
   - [Download JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

4. **Git** (optional, for version control)
   - [Download Git](https://git-scm.com/)

### System Requirements
- **RAM:** 8 GB minimum (16 GB recommended)
- **Storage:** 10 GB free space
- **OS:** Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)

### Android Device Requirements
- **Android Version:** 5.0 (API 21) or higher
- **Storage:** 100 MB free space
- **RAM:** 2 GB minimum

---

## 🚀 Installation

### Step 1: Install Flutter

#### Windows
```bash
# Download from https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.19.0-stable.zip
# Extract to C:\src\flutter
# Add C:\src\flutter\bin to System PATH
flutter doctor
```

#### macOS
```bash
cd ~/development
curl -O https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_3.19.0-stable.zip
unzip flutter_macos_3.19.0-stable.zip
echo 'export PATH="$PATH:$HOME/development/flutter/bin"' >> ~/.zshrc
source ~/.zshrc
flutter doctor
```

#### Linux
```bash
cd ~/development
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.19.0-stable.tar.xz
tar xf flutter_linux_3.19.0-stable.tar.xz
echo 'export PATH="$PATH:$HOME/development/flutter/bin"' >> ~/.bashrc
source ~/.bashrc
flutter doctor
```

### Step 2: Install Android SDK

1. Download [Android Studio](https://developer.android.com/studio)
2. Open Android Studio
3. Go to **More Actions → SDK Manager**
4. Install:
   - Android SDK Platform 34
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android SDK Platform-Tools

### Step 3: Accept Android Licenses

```bash
flutter doctor --android-licenses
# Type 'y' to accept all licenses
```

### Step 4: Clone/Create Project

```bash
# Option 1: Clone from GitHub (if available)
git clone https://github.com/your-username/autoinvest_app.git
cd autoinvest_app

# Option 2: Create new project
flutter create autoinvest_app
cd autoinvest_app
```

### Step 5: Install Dependencies

```bash
flutter pub get
```

### Step 6: Verify Setup

```bash
flutter doctor -v
```

All checks should pass with ✓ marks.

---

## 📁 Project Structure

```
autoinvest_app/
├── lib/
│   ├── main.dart                 # App entry point
│   │
│   ├── config/
│   │   └── api_config.dart       # API configuration and endpoints
│   │
│   ├── models/
│   │   ├── user_model.dart       # User data model
│   │   └── chat_message.dart     # Chat message model
│   │
│   ├── services/
│   │   ├── http_client.dart      # HTTP request handler
│   │   ├── auth_service.dart     # Authentication logic
│   │   └── chat_service.dart     # Chat API integration
│   │
│   ├── utils/
│   │   └── storage_helper.dart   # LocalStorage management
│   │
│   ├── providers/
│   │   ├── auth_provider.dart    # Authentication state
│   │   └── chat_provider.dart    # Chat state management
│   │
│   └── screens/
│       ├── splash_screen.dart    # Loading/Init screen
│       ├── login_screen.dart     # User login
│       ├── register_screen.dart  # User registration
│       ├── home_screen.dart      # Main app container
│       ├── portfolio_screen.dart # Investment overview
│       ├── chat_screen.dart      # AI assistant chat
│       └── profile_screen.dart   # User profile
│
├── android/
│   ├── app/
│   │   ├── build.gradle          # App build config
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── kotlin/
│   │           └── MainActivity.kt
│   ├── build.gradle              # Root build config
│   ├── settings.gradle
│   └── gradle.properties
│
├── pubspec.yaml                  # Dependencies
├── analysis_options.yaml         # Lint rules
├── .gitignore
└── README.md
```

---

## ⚙️ Configuration

### API Configuration

Edit `lib/config/api_config.dart` to change backend URL:

```dart
class ApiConfig {
  static const String baseUrl = 'https://autoinvest-production.up.railway.app';
  // Change above URL if using different backend
}
```

### Android Configuration

Update `android/app/build.gradle`:

```gradle
defaultConfig {
    applicationId "com.autoinvest.app"
    minSdk 21
    targetSdk 34
    versionCode 1
    versionName "1.0.0"
}
```

### Permissions

Ensure `android/app/src/main/AndroidManifest.xml` includes:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

---

## 🔨 Building

### Build APK (Release)

```bash
flutter build apk --release
```

**Output:** `build/app/outputs/flutter-apk/app-release.apk`

### Build APK (Debug)

```bash
flutter build apk --debug
```

**Output:** `build/app/outputs/flutter-apk/app-debug.apk`

### Build Split APKs (Smaller Size)

```bash
flutter build apk --split-per-abi --release
```

Creates separate APKs for different CPU architectures.

### Build App Bundle (Google Play)

```bash
flutter build appbundle --release
```

**Output:** `build/app/outputs/bundle/release/app-release.aab`

### Clean Build

If facing issues:

```bash
flutter clean
flutter pub get
flutter build apk --release
```

---

## 📱 Installation

### Method 1: USB Installation

```bash
# Connect Android device via USB
adb devices  # Verify connection

# Install APK
flutter install

# Or install directly:
adb install build/app/outputs/flutter-apk/app-release.apk
```

### Method 2: Manual Installation

1. Copy `app-release.apk` to your Android device
2. Enable "Install from Unknown Sources":
   - Settings → Security → Install Unknown Apps (or Install from Unknown Sources)
3. Open file manager
4. Navigate to APK file
5. Tap to install

### Method 3: Via Email/Cloud

1. Transfer APK via email, Google Drive, Dropbox, etc.
2. Download on device
3. Enable "Install from Unknown Sources"
4. Install APK

---

## 🎮 Usage

### First Time Setup

1. **Launch the app** - You'll see the splash screen
2. **Register an account:**
   - Tap "Don't have an account? Sign Up"
   - Enter Full Name
   - Enter Email
   - Enter Password (minimum 6 characters)
   - Confirm Password
   - Tap "Sign Up"

3. **Or Login** if you already have an account

### Using the App

#### Portfolio Tab
- View your investment portfolio
- See total portfolio value
- Track individual investments
- Monitor profit/loss

#### AI Chat Tab
- Ask investment questions
- Get AI-powered recommendations
- Receive market insights
- View chat history

**Example queries:**
- "What are the best stocks to invest in?"
- "Should I invest in tech stocks?"
- "What's your advice for a beginner investor?"
- "How should I diversify my portfolio?"

#### Profile Tab
- View your account information
- Access settings
- View help and support
- Read about the app
- Logout

---

## 🔌 API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### Chat

#### Send Message
```
POST /api/chat
Content-Type: application/json
Authorization: Bearer {token}

Request:
{
  "message": "What stocks should I buy?"
}

Response:
{
  "response": "Based on your investment profile, I recommend..."
}
```

#### Get Chat History
```
GET /api/chat/history
Authorization: Bearer {token}

Response:
{
  "messages": [
    {
      "_id": "msg_id",
      "message": "Hello",
      "isUser": true,
      "timestamp": "2024-01-01T10:00:00Z"
    },
    {
      "_id": "msg_id2",
      "message": "Hi there!",
      "isUser": false,
      "timestamp": "2024-01-01T10:00:05Z"
    }
  ]
}
```

### Portfolio

#### Get Portfolio
```
GET /api/portfolio
Authorization: Bearer {token}

Response:
{
  "portfolio": {
    "_id": "portfolio_id",
    "totalValue": 50000,
    "investments": [
      {
        "symbol": "AAPL",
        "quantity": 10,
        "currentPrice": 150,
        "buyPrice": 140
      }
    ]
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### "Flutter command not found"
```bash
# Check Flutter is in PATH
flutter --version

# Add Flutter to PATH
export PATH="$PATH:/path/to/flutter/bin"
```

#### "Android licenses not accepted"
```bash
flutter doctor --android-licenses
# Press 'y' for all licenses
```

#### "Build failed"
```bash
flutter clean
flutter pub get
flutter build apk --release
```

#### "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
flutter build apk --release
```

#### "App crashes on startup"
- ✅ Check internet connection
- ✅ Verify backend is running: `curl https://autoinvest-production.up.railway.app`
- ✅ Check app permissions in Settings
- ✅ Clear app cache: Settings → Apps → AutoInvest → Storage → Clear Cache

#### "Cannot connect to backend"
```bash
# Test backend connectivity
curl https://autoinvest-production.up.railway.app

# Expected response: "API is running 🚀"
```

#### "Login/Register not working"
- Verify backend is running
- Check network connection
- Ensure valid email format
- Password must be at least 6 characters

#### "Chat not responding"
- Check internet connection
- Verify backend AI service is running
- Check Groq LLM (LLaMA 3.1) API key is configured
- Try clearing chat history

### Getting Help

1. **Check logs:**
   ```bash
   flutter run -v  # Verbose output
   ```

2. **Run Flutter Doctor:**
   ```bash
   flutter doctor -v
   ```

3. **Check backend status:**
   - Visit: https://autoinvest-production.up.railway.app
   - Should return: "API is running 🚀"

4. **Review API integration:**
   - Check `lib/config/api_config.dart`
   - Verify endpoint URLs
   - Ensure correct request format

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/autoinvest_app.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe changes clearly
   - Reference any related issues

### Code Style

- Use meaningful variable names
- Add comments for complex code
- Follow Dart style guide
- Use camelCase for variables
- Use PascalCase for classes

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License

Copyright (c) 2024 AutoInvest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support

### Getting Help

- **Documentation:** Read this README thoroughly
- **Issues:** Check GitHub Issues for solutions
- **Email:** support@autoinvest.app
- **Backend Status:** https://autoinvest-production.up.railway.app

### Reporting Bugs

When reporting bugs, please include:
1. Device information (Android version, phone model)
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Error messages or logs

---

## 🎯 Roadmap

### Current Version (1.0.0)
- ✅ User authentication
- ✅ AI chat assistant
- ✅ Basic portfolio view
- ✅ User profile

### Upcoming Features
- 📈 Advanced portfolio analytics
- 📊 Investment performance charts
- 🔔 Price alerts and notifications
- 🎯 Goal-based investing
- 📱 Push notifications
- 🌙 Dark mode
- 🌐 Multi-language support
- 💳 Payment integration
- 📊 Advanced portfolio optimization

---

## 📊 Statistics

- **App Size:** ~25 MB (Release APK)
- **Min Android:** API 21 (Android 5.0)
- **Target Android:** API 34 (Android 14)
- **Dart/Flutter:** 3.0+
- **Dependencies:** 4 main packages
- **Files:** 15+ source files
- **Lines of Code:** 2000+

---

## 🎓 Learning Resources

### Flutter
- [Flutter Official Documentation](https://flutter.dev/docs)
- [Flutter YouTube Channel](https://www.youtube.com/flutterdev)
- [Dart Language Guide](https://dart.dev/guides)

### State Management
- [Provider Package](https://pub.dev/packages/provider)
- [Flutter State Management Guide](https://flutter.dev/docs/development/data-and-backend/state-mgmt)

### REST APIs
- [HTTP Package](https://pub.dev/packages/http)
- [RESTful API Best Practices](https://restfulapi.net/)

### Authentication
- [JWT Introduction](https://jwt.io/introduction)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

## 🙏 Acknowledgments

- Flutter and Dart teams for amazing framework
- Provider package maintainers
- All contributors and testers
- Our amazing user community

---

## 📅 Version History

### v1.0.0 (2024-01-10)
- Initial release
- User authentication
- AI chat assistant
- Portfolio management
- Material Design 3 UI

### v1.0.1 (Coming Soon)
- Bug fixes
- Performance improvements
- Enhanced error handling

---

## 📧 Contact & Social

- **Website:** https://autoinvest.app (Coming Soon)
- **Email:** support@autoinvest.app
- **Twitter:** [@AutoInvestApp](https://twitter.com/autoinvestapp)
- **GitHub:** [AutoInvest Repository](https://github.com/autoinvest)
- **LinkedIn:** [AutoInvest Company](https://linkedin.com/company/autoinvest)

---

## 🔐 Security

### Data Protection
- ✅ HTTPS encryption for all API calls
- ✅ JWT token-based authentication
- ✅ Secure local storage
- ✅ Password validation and hashing (backend)
- ✅ No sensitive data in logs

### Compliance
- ✅ GDPR compliant
- ✅ Data privacy focused
- ✅ Secure cookie handling
- ✅ Regular security audits

---

## ⭐ If You Like This Project

Please give it a ⭐ on GitHub and share it with others!

---

**Made with ❤️ for the investment community**

**Happy Investing! 🚀💰**

---

*Last Updated: April 2026*  
*Version: 1.0.0*  
*Status: ✅ Production Ready*
