<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15_cGo9D-tcdVvOp0FCw1HzIYhyG5nfCE

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Firebase Google Authentication

- Create a Firebase project and enable Google sign-in in the Authentication > Sign-in methods section.
- Add a Web App in Firebase and copy the config values.
- Create a `.env.local` file with the following keys (Vite requires `VITE_` prefix):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

- For iOS Safari / in-app browsers: popup sign-in may be blocked. The app falls back to redirect-based sign-in automatically.
- For native iOS/Android apps embedding this web app in a WebView, prefer using Firebase native SDKs (iOS/Android) or using an OAuth redirect flow registered in Firebase with appropriate redirect URIs.

Installation notes:

```
npm install
npm run dev
```
# projectXFr
