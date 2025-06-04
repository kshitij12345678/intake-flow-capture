
# Patient Intake Application

A comprehensive, mobile-first web application for healthcare patient intake with audio recording, image upload, and Firebase integration.

## Features

- **Audio Recording**: Record patient information with pause/resume functionality and real-time timer
- **Image Upload**: Upload and preview Aadhaar card photos with validation
- **Dynamic Forms**: Auto-populated forms based on backend processing results
- **Firebase Integration**: Secure data storage in Firestore
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: ARIA labels and high-contrast design
- **Real-time Validation**: Form validation with user-friendly error messages

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Backend Integration**: Fetch API with multipart/form-data
- **Database**: Firebase Firestore
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── form-sections/               # Form section components
│   │   ├── PatientProfileSection.tsx
│   │   ├── HealthcareAccessSection.tsx
│   │   └── HabitLifestyleSection.tsx
│   ├── AudioRecorder.tsx            # Audio recording component
│   ├── ImageUploader.tsx            # Image upload component
│   └── LoadingSpinner.tsx           # Loading component
├── pages/
│   ├── Index.tsx                    # Main routing component
│   ├── RecordPage.tsx               # Audio & image capture page
│   ├── VerifyPage.tsx               # Form verification page
│   └── SuccessPage.tsx              # Success confirmation page
├── services/
│   ├── api.ts                       # Backend API integration
│   └── firebase.ts                  # Firebase configuration
└── hooks/                           # Custom React hooks
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Backend API Configuration
REACT_APP_BACKEND_URL=https://your-backend-api.com

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore Database
3. Add your web app and copy the configuration
4. Update the environment variables with your Firebase config
5. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /patient_intake/{document} {
      allow read, write: if true; // Configure based on your auth requirements
    }
  }
}
```

### 4. Backend API Integration

The application expects a backend endpoint at `/process` that:
- Accepts `multipart/form-data` with `audioFile` and `aadhaarImage` fields
- Returns JSON matching the questionnaire schema
- Example response structure is provided in `src/services/api.ts`

## Development

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Usage Flow

### Step 1: Capture & Upload
1. Record audio information using the circular record button
2. Upload Aadhaar card photo (JPEG/PNG, max 10MB)
3. Both steps must be completed to enable submission
4. Click "Submit & Process" to send data to backend

### Step 2: Verify & Confirm
1. Review auto-populated form sections:
   - **Patient Profile**: Personal and family information
   - **Healthcare Access**: Insurance, facilities, and costs
   - **Habit & Lifestyle**: Physical measurements and health habits
2. Edit any incorrect information
3. Expand/collapse sections for better navigation
4. Click "Confirm & Submit to Firebase" to save data

### Step 3: Success
1. Confirmation page with submission details
2. Option to submit another patient intake
3. Reference information for follow-up

## Key Features

### Audio Recording
- **Record**: Large circular button for easy mobile interaction
- **Pause/Resume**: Pause and continue recording in same session
- **Timer**: Real-time mm:ss display during recording and playback
- **Preview**: Audio playback before submission
- **Reset**: Option to re-record

### Image Upload
- **Validation**: JPEG/PNG only, 10MB size limit
- **Preview**: Thumbnail display with file information
- **Replace**: Easy option to change uploaded image
- **Status**: Visual indicators for upload completion

### Dynamic Forms
- **Auto-population**: Forms pre-filled from backend response
- **Validation**: Required field checking before submission
- **Responsive**: Mobile-first grid layouts
- **Collapsible**: Sections can be expanded/collapsed
- **Interactive**: Real-time updates and change tracking

### Accessibility
- **ARIA Labels**: Screen reader support
- **High Contrast**: Clear visual hierarchy
- **Touch Friendly**: Large buttons for mobile devices
- **Keyboard Navigation**: Full keyboard support

## Browser Support

- **Chrome**: Latest versions (primary target)
- **Firefox**: Latest versions
- **Safari**: Latest versions
- **Edge**: Latest versions

## Mobile Compatibility

- **iOS Safari**: 12+
- **Android Chrome**: Latest versions
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Error Handling

- **Network Errors**: User-friendly messages for API failures
- **Validation Errors**: Real-time form validation feedback
- **File Upload Errors**: Size and type validation with clear messages
- **Audio Recording Errors**: Microphone permission handling
- **Firebase Errors**: Connection and submission error handling

## Security Considerations

- **File Validation**: Type and size restrictions on uploads
- **Data Sanitization**: Form input validation
- **Firebase Rules**: Configure appropriate database security
- **HTTPS**: Ensure SSL certificates for production
- **Environment Variables**: Keep sensitive data in env files

## Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Compressed uploads and previews
- **Bundle Analysis**: Tree shaking and minimal dependencies
- **Caching**: Service worker for offline functionality (optional)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For technical support or questions:
- Create an issue on GitHub
- Contact: your-email@domain.com
- Documentation: Link to additional docs

## Changelog

### v1.0.0
- Initial release
- Audio recording with pause/resume
- Image upload with validation
- Dynamic form generation
- Firebase integration
- Mobile-responsive design
