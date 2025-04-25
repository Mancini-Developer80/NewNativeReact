# Chat Application

## Project Overview
This project is a feature-rich chat application designed to provide users with seamless communication. The app enables users to exchange messages, share images, and send location data, while being fully accessible and functional both online and offline.

## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Key Features
- User-friendly interface:
  - A page where users can enter their name and choose a background color for the chat screen before joining the chat.
  - A chat page displaying the conversation, along with an input field and a submit button.
- Communication enhancements:
  - Users can send text messages, images, and location data.
  - Images can be picked from the device's image library or taken using the device’s camera app.
  - Location data is displayed as a map view in the chat.
- Offline functionality:
  - Messages are accessible offline for users to reread at any time.
- Accessibility:
  - Compatibility with screen readers for visually impaired users.

## Technical Requirements
- The app must be written in **React Native**.
- Development is carried out using **Expo**.
- Styled according to the given screen design.
- Chat conversations are stored:
  - Online in **Google Firestore Database**.
  - Offline for local access.
- **Google Firebase**:
  - Anonymous user authentication.
  - Images stored in Firebase Cloud Storage.
- The app integrates:
  - **Gifted Chat library** for chat interface and functionality.
  - Device camera and image library for sharing photos.
  - Location data reading and sharing.
- Codebase includes comprehensive comments.

## Installation
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install

3. Run theapplication:
   ```bash
   expo start

## Future Enhancement
* Additional themes for UI customization.
* Support for audio message sharing.



