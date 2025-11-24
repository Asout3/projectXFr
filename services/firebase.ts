// Firebase initialization and Google sign-in helpers.
// Uses Vite env vars: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
// VITE_FIREBASE_APP_ID (optional), VITE_FIREBASE_CLIENT_ID (optional for OAuth config).
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	signOut as firebaseSignOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app;
try {
	app = initializeApp(firebaseConfig);
} catch (e) {
	// initializeApp will throw if called multiple times in some HMR/dev setups
	// It's safe to ignore as long as an app is already initialized.
	// eslint-disable-next-line no-console
	console.warn('Firebase app already initialized or failed to initialize:', e);
}

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only in browser and if measurementId is present
if (typeof window !== 'undefined' && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
	try {
		getAnalytics(app as any);
	} catch (e) {
		// Analytics isn't critical — do not crash the app if it fails to initialize
		// eslint-disable-next-line no-console
		console.warn('Firebase Analytics initialization failed:', e);
	}
}

// Attempt popup sign-in first. If popup is blocked (common on some iOS webviews),
// fall back to redirect sign-in which works more reliably on iOS/Safari.
export async function signInWithGoogle() {
	try {
		// Prioritize popup-based sign-in for a better UX.
		const result = await signInWithPopup(auth, googleProvider);
		return result;
	} catch (err: any) {
		// If popup fails (e.g. DOMException: The operation is insecure), fall back to redirect
		// or if user agent disallows popups (iOS in-app browsers).
		// eslint-disable-next-line no-console
		console.warn('Popup sign-in failed, falling back to redirect:', err && err.message);
		await signInWithRedirect(auth, googleProvider);
		// signInWithRedirect will redirect the page; the caller should not expect a result here.
		return null;
	}
}

export async function signOut() {
	return firebaseSignOut(auth);
}

export { onAuthStateChanged };

// Handle redirect result after signInWithRedirect. Call this on app startup to
// complete the redirect flow and surface any errors. Returns the RedirectResult
// or null if none.
export async function handleRedirectResult() {
	try {
		console.log('[Firebase] Calling getRedirectResult...');
		const result = await getRedirectResult(auth);
		if (result && result.user) {
			console.log('[Firebase] Redirect result found, user:', result.user.uid);
			return result;
		}
		console.log('[Firebase] No redirect result (normal on initial load).');
		return null;
	} catch (err: any) {
		// Some errors are expected (e.g., no redirect to process). Only log non-critical ones.
		if (err?.code !== 'auth/no-redirect-user-or-session') {
			console.warn('[Firebase] getRedirectResult error:', err?.message || err);
		}
		return null;
	}
}
