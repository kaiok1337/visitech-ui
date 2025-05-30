"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Script from 'next/script';
import dynamic from 'next/dynamic';

// Dynamically import the NavbarWithKeyBinds component
const NavbarWithKeyBinds = dynamic(
  () => import('./components/NavbarWithKeyBinds'),
  { ssr: false, loading: () => (
    <div style={{ padding: '1rem', borderBottom: '1px solid #eaeaea' }}>
      <a href="/" style={{ marginRight: '1rem' }}>Home</a>
      <a href="/login" style={{ marginRight: '1rem' }}>Login</a>
      <a href="/graphing.html" style={{ marginRight: '1rem' }}>Graphing Tool</a>
    </div>
  )}
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Your App</title>
        
        {/* Add Firebase scripts back with defer to ensure they don't block rendering */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.0/firebase-app-compat.min.js"
          strategy="afterInteractive"
          defer
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.0/firebase-auth-compat.min.js"
          strategy="afterInteractive"
          defer
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.0/firebase-firestore-compat.min.js"
          strategy="afterInteractive"
          defer
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* Use the new NavbarWithKeyBinds component with fallback */}
          <NavbarWithKeyBinds />
          {children}
        </Providers>

        {/* Initialize Firebase after scripts are loaded */}
        <Script id="initialize-firebase" strategy="afterInteractive">
          {`
            // Make sure to initialize Firebase as soon as it's available
            function initFirebase() {
              if (typeof firebase !== 'undefined') {
                // Check if Firebase has apps property and no apps are initialized
                if (!firebase.apps || !firebase.apps.length) {
                  console.log("Initializing Firebase in layout");
                  firebase.initializeApp({
                    apiKey: "AIzaSyCkdN1OEWanIkrKMPYRvFTNNDQDVtEpFFw",
                    authDomain: "d2tcode.firebaseapp.com",
                    databaseURL: "https://d2tcode-default-rtdb.firebaseio.com",
                    projectId: "d2tcode",
                    storageBucket: "d2tcode.appspot.com",
                    messagingSenderId: "1050127685381",
                    appId: "1:1050127685381:web:a08d73ae4b74eb18de496c",
                    measurementId: "G-JQVDFL43P2"
                  });
                  console.log("Firebase initialized successfully in layout");
                } else {
                  console.log("Firebase already initialized");
                }
              } else {
                console.log("Firebase not loaded yet, will try again");
                setTimeout(initFirebase, 500);
              }
            }
            
            // Try to initialize Firebase immediately
            initFirebase();
            
            // Also try again after a delay to ensure it's loaded
            setTimeout(initFirebase, 1000);
          `}
        </Script>
      </body>
    </html>
  );
}
