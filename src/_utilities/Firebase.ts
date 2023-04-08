import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const firestore = getFirestore(app);
