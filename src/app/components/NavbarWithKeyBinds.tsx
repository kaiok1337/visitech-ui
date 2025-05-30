'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import KeybindsMenu with SSR disabled to prevent server-side errors
const KeybindsMenu = dynamic(() => import('./KeybindsMenu'), {
  ssr: false,
  loading: () => <button className="fallback-button">Shortcuts</button>
});

// Fallback button in case the component fails to load
const KeybindsFallback = () => (
  <button className="fallback-button">Shortcuts</button>
);

export default function NavbarWithKeyBinds() {
  return (
    <div style={{ 
      padding: '1rem', 
      borderBottom: '1px solid #eaeaea', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <a href="/" style={{ marginRight: '1rem' }}>Home</a>
        <a href="/login" style={{ marginRight: '1rem' }}>Login</a>
        <a href="/graphing.html" style={{ marginRight: '1rem' }}>Graphing Tool</a>
      </div>
      
      {/* Error boundary to catch any rendering errors */}
        <Suspense fallback={<KeybindsFallback />}>
          <KeybindsMenu />
        </Suspense>
    </div>
  );
}

// // Simple error boundary component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render shows the fallback UI
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can log the error to an error reporting service
//     console.error("KeybindsMenu Error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return this.props.fallback;
//     }

//     return this.props.children;
//   }
// } 