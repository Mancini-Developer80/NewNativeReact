# Chat Application

A feature-rich chat application built with React Native and Firebase, designed to provide seamless communication. The app allows users to exchange messages, share images, and send location data, while offering offline functionality and accessibility for visually impaired users.

---

## **Project Overview**

This chat application is designed to provide a user-friendly and accessible communication platform. It supports real-time messaging, media sharing, and location sharing, with offline capabilities for message retrieval. The app is built using modern technologies like React Native, Expo, and Firebase.

---

## **User Stories**

- **As a new user**, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- **As a user**, I want to be able to send messages to my friends and family members to exchange the latest news.
- **As a user**, I want to send images to my friends to show them what I’m currently doing.
- **As a user**, I want to share my location with my friends to show them where I am.
- **As a user**, I want to be able to read my messages offline so I can reread conversations at any time.
- **As a user with a visual impairment**, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

---

## **Key Features**

### **User-Friendly Interface**
- A **Start Screen** where users can:
  - Enter their name.
  - Choose a background color for the chat screen.
- A **Chat Screen** that displays:
  - The conversation history.
  - An input field for sending messages.
  - A "+" button for sharing images or location data.

### **Communication Enhancements**
- **Text Messaging**: Users can send and receive text messages in real-time.
- **Image Sharing**:
  - Users can select images from their device's library or take photos using the camera.
  - Images are uploaded to Firebase Cloud Storage and displayed in the chat.
- **Location Sharing**:
  - Users can share their current location, which is displayed as a map view in the chat.

### **Offline Functionality**
- Messages are stored locally, allowing users to access and reread conversations even when offline.

### **Accessibility**
- Fully compatible with screen readers to ensure accessibility for visually impaired users.

---

## **Technical Requirements**

### **Technologies Used**
- **React Native**: Framework for building cross-platform mobile applications.
- **Expo**: For development, testing, and deployment.
- **Firebase**:
  - **Firestore**: For real-time message storage and retrieval.
  - **Cloud Storage**: For storing and sharing images.
  - **Authentication**: For anonymous user authentication.
- **Gifted Chat**: Library for chat interface and functionality.
- **Expo Image Picker**: For selecting images from the device.
- **Expo Location**: For retrieving and sharing location data.

### **Features Implemented**
- **Real-Time Messaging**: Messages are stored in Firestore and retrieved in real-time.
- **Offline Support**: Messages are cached locally for offline access.
- **Anonymous Authentication**: Users can log in anonymously to start chatting.
- **Media Sharing**: Images are uploaded to Firebase Cloud Storage and shared in the chat.
- **Location Sharing**: Users can share their current location, displayed as a map in the chat.

---

## **Installation**

### **Prerequisites**
- Node.js installed on your system.
- Expo CLI installed globally:
  ```bash
  npm install -g expo-cli
## **Step to Run the Application**

1. Clone this repository:
  git clone https://github.com/Mancini-Developer80/chat-application.git
2. Navigate to the project directory:
   cd hello-world
3. Install dependencies:
   npm install
4. Start the application:
   expo start
5. use the Expo Go app on your mobile device or an emulator to run the application.

---
## Future Enhancement
  + **Additional Themes**: Add more background color options for UI customization.
  + **Audio Messagin**: Support for recording and sharing audio messages.
  + **Push Notification**: Notify users of new messages when the app is in the background.
  + **Group Chats**: enable users to create and partecipate in group conversation.
