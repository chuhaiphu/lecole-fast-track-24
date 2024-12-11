# DOAN VINH PHU TRACK TWO
#### A React application with RBAC (Role-Based Access Control). The app will include a list of users with roles and secret phrases.
#### The Page URL: http://44.223.4.163:3000/track-two

## Design Principles
- Clean, readable, and maintainable code
- Structure components in a way that is easy to maintain

## Features
- UI/UX is intuitive and user-friendly, notification with React Toastify
- An Authentication Form for users to log in
- Provider-based access for different user roles (non-authenticated, authenticated, and admin users)
  - Non-authenticated users can only see the list of username
  - Authenticated users can see the list of username and their roles. They can also update their secret phrase
  - Admin users can see all of the information of all users, and can update the secret phrase of any user
  - All of the data is displayed in a table format
  - Implementation of Socket.io to keep user data updated in real-time
  - Data is efficiently loaded and rendered with useCallback and useMemo hooks
  - Global state management with Redux and Redux Thunk
  - TypeScript is used throughout the project

## Getting Started

### Test Accounts
- User: `user1` - `secret123`
- Admin: `admin1` - `admin123`

### Installation

Install the dependencies:

```bash
yarn install
```

### Development

Start the development server with HMR:

```bash
yarn dev
```

Start the server:

```bash
yarn dev:server
```

Your front-end application will be available at `http://localhost:5173`.
Your back-end application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
yarn build
```

## Deployment


## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.
