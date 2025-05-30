// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkdN1OEWanIkrKMPYRvFTNNDQDVtEpFFw",
    authDomain: "d2tcode.firebaseapp.com",
    databaseURL: "https://d2tcode-default-rtdb.firebaseio.com",
    projectId: "d2tcode",
    storageBucket: "d2tcode.appspot.com",
    messagingSenderId: "1050127685381",
    appId: "1:1050127685381:web:a08d73ae4b74eb18de496c",
    measurementId: "G-JQVDFL43P2"
};

var firestore_db;
var signed_in = false;

// Initialize Firebase when the script loads
if (typeof firebase !== 'undefined') {
    initializeFirebase();
} else {
    // If in Next.js context, we need to wait for Firebase scripts to load
    window.addEventListener('DOMContentLoaded', function() {
        if (typeof firebase !== 'undefined') {
            initializeFirebase();
        } else {
            console.error('Firebase SDK not loaded');
        }
    });
}

function initializeFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firestore_db = firebase.firestore();
        
        // Check auth state
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is signed in:", user.email);
                signed_in = true;
                setDataInFirestore();
                updateUISignedIn();
            } else if (signed_in) {
                console.log("User is signed out");
                signed_in = false;
                updateUISignedOut();
            }
        });
    }
}

async function main() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK not loaded');
        return;
    }
    
    if (!firebase.apps.length) {
        initializeFirebase();
    }
}

function updateUISignedIn() {
    setLoginCookie();
    
    // Check if we're in the Next.js app or the vanilla JS app
    if (window.location.pathname.includes('/login') || window.location.pathname === '/') {
        window.location.href = '/graphing.html';
    }
}

function updateUISignedOut() {
    // If on the graphing page, redirect to login
    if (window.location.pathname.includes('/graphing.html')) {
        window.location.href = '/login';
    }
}

async function signIn(email, password) {
    if (typeof firebase === 'undefined') {
        throw new Error('Firebase SDK not loaded');
    }
    
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log("User signed in:", user.email);
        return user;
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
}

async function createAccount() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!email || !password) {
        return;
    }

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log("User created:", user.email);
        return user;
    } catch (error) {
        console.error("Error creating account:", error);
        alert("Account creation failed: " + error.message);
        throw error;
    }
}

async function signOut() {
    try {
        await firebase.auth().signOut();
        console.log("User signed out");
    } catch (error) {
        console.error("Error during sign-out:", error);
        throw error;
    }
}

function handleSignIn() {
    console.log("handleSignIn");
    var email = document.getElementById('signInEmail')?.value;
    var password = document.getElementById('signInPassword')?.value;
    
    if (email && password) {
        signIn(email, password);
    } else {
        console.error('Email or password missing');
    }
}

function handleSignUp() {
    var email = document.getElementById('signUpEmail')?.value;
    var password = document.getElementById('signUpPassword')?.value;
    
    if (email && password) {
        signUp(email, password);
    } else {
        console.error('Email or password missing');
    }
}

function signUp(email, password) {
    console.log('Signing up with:', email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
            console.error("Error during sign-up:", error);
            alert("Sign-up failed: " + error.message);
        });
}

function setLoginCookie() {
    const cookieName = "visitedApp";
    const cookieValue = "true";
    const daysToExpire = 30;
    
    // Calculate expiration date
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    
    // Set the cookie for the root domain
    document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/; domain=.visitech.ai`;
}

function handleTitleClick() {
    // Clear the cookie by setting its expiration to a past date
    document.cookie = "visitedApp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.visitech.ai";
    
    // Redirect to visitech.ai
    window.location.href = 'https://visitech.ai';
}

// Expose functions to window object for Next.js integration
window.signIn = async function(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("User signed in successfully");
        
        // Check if we're on the login page and redirect if needed
        if (window.location.pathname.includes('/login')) {
            window.location.href = '/graphing';
        }
        return true;
    } catch (error) {
        console.error("Sign in error:", error);
        throw error;
    }
};

window.createAccount = function() {
    // Redirect to signup page or open modal
    // For now, just alert the user
    alert("Please contact the administrator to create an account");
};

window.signOut = async function() {
    try {
        await firebase.auth().signOut();
        console.log("User signed out successfully");
        
        // Redirect to login page
        window.location.href = '/login';
        return true;
    } catch (error) {
        console.error("Sign out error:", error);
        throw error;
    }
};

// Add auth state change listener when Firebase is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in
                console.log("User is signed in:", user.email);
                
                // If on login page, redirect to graphing
                if (window.location.pathname.includes('/login')) {
                    window.location.href = '/graphing';
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                
                // If on a protected page, redirect to login
                if (window.location.pathname.includes('/graphing') && 
                    !window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        });
    }
});

// Auto-initialize if this script is loaded directly (not via Next.js)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(main, 1);
} else {
    document.addEventListener('DOMContentLoaded', main);
}