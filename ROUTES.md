# Workout Tracker Route Structure

This document outlines the route structure of the Workout Tracker Expo application. The app uses Expo Router for navigation, which follows a file-based routing system similar to Next.js.

## Root Layout (`app/_layout.tsx`)

The root layout serves as the main wrapper for the entire application. It includes:
- Query client configuration with persistence
- Safe area handling
- Theme provider setup
- Authentication provider
- GluestackUI provider for UI components

The root navigation is handled by a Stack navigator with two main groups:
- Authentication routes: `(auth)`
- Main app routes: `(tabs)`

## Authentication Routes (`app/(auth)/`)

The authentication group contains the following routes:
- `/` (index.tsx) - Main authentication screen (likely login)
- `/sign_up` - User registration screen
- Custom layout for auth screens (`_layout.tsx`)

## Main App Routes (`app/(tabs)/`)

The main application uses a tab-based navigation structure with the following routes:

### Primary Tabs
- `/history` - Workout history view
- `/settings` - Application settings
- `/workout/*` - Workout-related screens

### Workout Routes (`app/(tabs)/(workout)/`)
- `/` (index.tsx) - Main workout screen/list
- `/[id]` - Dynamic route for individual workout views
- Custom layout for workout screens (`_layout.tsx`)

## Navigation Structure

```
/ (Root)
├── (auth)
│   ├── index (Login)
│   └── sign_up
└── (tabs)
    ├── history
    ├── settings
    └── (workout)
        ├── index
        └── [id]
```

## Notes

- The application uses a nested navigation structure with Stack and Tab navigators
- Authentication routes are separated from main app routes for better organization
- Dynamic routing is implemented for individual workout views
- Each group can have its own layout file (`_layout.tsx`) for group-specific configuration 