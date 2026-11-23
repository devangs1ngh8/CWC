# CWC – React Native Application

A React Native mobile application built with TypeScript, focused on user onboarding, profile management, daily logs, reminders, and personalized user experiences.

## 🚀 Tech Stack

| Technology                            | Purpose                                        |
| ------------------------------------- | ---------------------------------------------- |
| React Native                          | Cross-platform mobile development              |
| TypeScript                            | Type safety and maintainable code              |
| Redux Toolkit                         | Global state management                        |
| React Hooks                           | Local component state and lifecycle management |
| Axios                                 | HTTP requests and API communication            |
| MMKV                                  | Fast local key-value storage                   |
| AsyncStorage                          | Persisting simple app preferences              |
| React Navigation                      | Screen navigation                              |
| i18next                               | Multi-language support                         |
| React Native Community DateTimePicker | Date and time selection                        |
| React Native Safe Area Context        | Safe area handling                             |

## ✨ Features

### 1. Authentication & Onboarding

- Sign Up and Sign In screens.
- Forgot Password functionality.
- Security PIN verification.
- New Password screen.
- Splash screen and onboarding flow.
- Language selection and persistence.

### 2. Multi-language Support

- Language selection during onboarding.
- Dynamic language switching using i18next.
- Persisted language preferences.
- Language-specific splash screen content.

### 3. Logs Management

- View logs based on the selected date.
- Fetch log data from backend APIs.
- Display different log categories and their available options.
- Handle log-related information, including:
  - Bleeding
  - Vulval Sensation
  - Cervical Fluid Color
  - Cervical Visual Observation
  - Mood
  - Symptoms
  - Sleep Disturbances
  - Basal Body Temperature
  - Urinary Hormones
  - Medications
  - Notes
- Manage application state using Redux Toolkit.

### 4. Reminders Management

- Fetch reminders from the backend.
- Create new reminders.
- Update existing reminders.
- Delete reminders.
- Enable or disable reminders.
- Support different reminder frequencies:
  - Daily
  - Weekly
  - Once
- Select specific weekdays for weekly reminders.
- Select reminder dates and times.
- Display loading and empty states.

### 5. Reusable UI Components

- Reusable buttons.
- Screen headers and body components.
- Input components.
- Date input component.
- Bottom sheet modal.
- Reminder cards.
- Error messages.

## 🏗️ Project Architecture

The application follows a modular structure that separates screens, reusable components, API services, state management, and utilities.

```text
src/
│
├── assets/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── primaryButton/
│   ├── screenHeader/
│   ├── screenBody/
│   ├── dateInput/
│   ├── bottomSheetModal/
│   └── ...
│
├── navigation/
│   └── RootStackNavigator.tsx
│
├── screens/
│   ├── Splash/
│   ├── Language/
│   ├── SignIn/
│   ├── SignUp/
│   ├── ForgotPassword/
│   ├── SecurityPin/
│   ├── NewPassword/
│   ├── Logs/
│   └── ...
│
├── services/
│   ├── reminderService.ts
│   └── ...
│
├── api/
│   ├── http.ts
│   └── endpoints.ts
│
├── redux/
│   ├── store.ts
│   └── slices/
│
├── storage/
│   └── ...
│
├── utils/
│   └── ...
│
└── i18n/
    └── ...
```

_Note: This is a logical overview of the architecture. Adjust folder names to match the actual repository structure._

## 🔄 State Management

The application uses different approaches depending on the type of data.

### Local State – useState

Used for screen-specific data such as:

- Form inputs.
- Modal visibility.
- Selected dates and times.
- Loading indicators.
- Temporary UI selections.

### Global State – Redux Toolkit

Used to manage shared application data, such as Logs data that needs to be accessed across components or screens.

### Persistent Storage

- **MMKV:** Fast local storage for application data.
- **AsyncStorage:** Stores preferences such as selected language and onboarding status.

## 🌐 API Integration

The application communicates with backend services using Axios.

A centralized HTTP client provides reusable methods:

- `apiGet()` – GET requests.
- `apiPost()` – POST requests.
- `apiPut()` – PUT requests.
- `apiPatch()` – PATCH requests.
- `apiDelete()` – DELETE requests.

### Reminder API

Base endpoint:

`/v1/user/reminder`

| Method | Endpoint                            | Description       |
| ------ | ----------------------------------- | ----------------- |
| GET    | `/v1/user/reminder`                 | Fetch reminders   |
| POST   | `/v1/user/reminder`                 | Create a reminder |
| PUT    | `/v1/user/reminder`                 | Update a reminder |
| DELETE | `/v1/user/reminder?reminderId={id}` | Delete a reminder |

API functions are maintained separately in service files to keep screen components clean and maintainable.

## ⚙️ Installation & Setup

### Prerequisites

- Node.js
- Yarn
- React Native development environment
- Android Studio for Android development
- Xcode and CocoaPods for iOS development

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd <project-folder>
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. iOS Setup

```bash
cd ios
pod install
cd ..
```

### 5. Run the Application

**Android**

```bash
yarn android
```

**iOS**

```bash
yarn ios
```

For a specific iOS simulator, use the simulator name supported by your project's React Native CLI configuration.

## 🔐 Environment Configuration

Configure the backend API base URL and any required environment variables according to your development environment.

Do not commit:

- API secrets.
- Authentication tokens.
- Private credentials.
- Environment-specific sensitive configuration.

## 🧑‍💻 Development Guidelines

- Use TypeScript interfaces for API request and response structures.
- Keep API calls inside service files.
- Use reusable components wherever possible.
- Use Redux Toolkit for shared application state.
- Use local state for screen-specific UI interactions.
- Keep navigation and screen responsibilities separate.
- Handle API loading, success, and error states.
- Use consistent naming conventions and project formatting.

---

**Built with React Native and TypeScript.**
