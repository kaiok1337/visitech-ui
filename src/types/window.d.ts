// Type definitions for global window object extensions
interface Window {
  firebase: any; // Add explicit Firebase to the window object
  signIn?: (email: string, password: string) => Promise<any>;
  createAccount?: () => void;
  signOut?: () => Promise<void>;
  handleSignIn?: (email: string, password: string) => Promise<void>;
  handleSignUp?: (email: string, password: string) => Promise<void>;
  signUp?: (email: string, password: string) => void;
  main?: () => Promise<void>;
} 