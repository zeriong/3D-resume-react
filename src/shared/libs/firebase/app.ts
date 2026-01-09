import { firebaseConfig } from "@/shared/config/firebase";
import { initializeApp, type FirebaseApp } from "firebase/app";

let app: FirebaseApp | null = null;

export const getFirebaseApp = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
};
