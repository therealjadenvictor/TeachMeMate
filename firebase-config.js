// Central Firebase initialization for TeachMeMate (ES module)
// Import this file from any <script type="module"> to reuse the same app/auth/db.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Shared config used across the whole site
const firebaseConfig = {
  apiKey: "AIzaSyCWfzeXnsjSSL_ShSnZGEgorg6llFLxBJ0",
  authDomain: "teachmemate-347ab.firebaseapp.com",
  projectId: "teachmemate-347ab",
  storageBucket: "teachmemate-347ab.firebasestorage.app",
  messagingSenderId: "739144710255",
  appId: "1:739144710255:web:91de287fdbf35a8db4b59a"
};

// Initialize once and export shared instances
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

