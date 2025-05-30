let chatOuterContainer = null;
let chatContainer = null;
let chatHeader = null;
let chatMessagesArea = null;
let chatMessageInput = null;
let chatSendButton = null;
let chatMicButton = null;
let right_side_tab_buttons = null;
let right_side_tab_selector = null;


// Demo messages to start with
const chatInitialMessages = [
    // { text: "Hi there!", sender: "other", time: "10:01 AM" },
    // { text: "Hello! How can I help you today?", sender: "user", time: "10:02 AM" },
    // { text: "I have a question about your services.", sender: "other", time: "10:03 AM" }
];


// Function to send a new message
function chatSendMessage() {
    const chatMessageText = chatMessageInput.value.trim();
    // google_map_container.style.visibility = "hidden";
    hide2DCanvas();
    showChat();
    if (chatMessageText !== '') {
        const chatNow = new Date();
        const chatTime = chatNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Add user message
        chatAddMessage(chatMessageText, 'user', chatTime);
        interpretAIQuery(chatMessageText);
        
        // Clear input
        chatMessageInput.value = '';

        // If microphone is active, turn it off
        if (chatMicActive) {
            chatToggleMicrophone();
        }
        
        // Simulate a response (for demo purposes)
        setTimeout(() => {
            const chatResponses = [
                // "That's interesting!",
                // "Tell me more about that.",
                // "I understand what you mean.",
                // "Let me think about that.",
                // "Great question!"
                "Working ...."
            ];
            const chatRandomResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)];
            chatAddMessage(chatRandomResponse, 'other', chatTime);
        }, 1000);
    }
}

// // Function to add a message to the chat
// function chatAddMessage(ascii_text, sender, time) 
// {
//     let text = replaceNewlinesWithBR(ascii_text);
//     console.log("chatAddMessage chatAddMessage", ascii_text)
//     text = ascii_text;
//     const chatMessageElement = document.createElement('div');
//     chatMessageElement.classList.add('chat-message');
//     chatMessageElement.classList.add(sender === 'user' ? 'chat-message-user' : 'chat-message-other');
    
//     const chatMessageText = document.createElement('span');
//     chatMessageText.textContent = text;
    
//     const chatMessageTime = document.createElement('span');
//     chatMessageTime.classList.add('chat-message-time');
//     chatMessageTime.textContent = time;
    
//     chatMessageElement.appendChild(chatMessageText);
//     chatMessageElement.appendChild(chatMessageTime);
    
//     chatMessagesArea.appendChild(chatMessageElement);
    
//     // Scroll to the bottom
//     chatScrollToBottom();
// }

// Function to add a message to the chat
function chatAddMessage(ascii_text, sender, time) 
{
    // Create message container
    const chatMessageElement = document.createElement('div');
    chatMessageElement.classList.add('chat-message');
    chatMessageElement.classList.add(sender === 'user' ? 'chat-message-user' : 'chat-message-other');
    
    // Create message text element
    const chatMessageText = document.createElement('div'); // Changed to div for better multi-line support
    
    // Handle newlines properly
    const textWithLineBreaks = ascii_text.replace(/\n/g, '<br>');
    chatMessageText.innerHTML = textWithLineBreaks; // Use innerHTML to interpret the <br> tags
    
    // Create time element
    const chatMessageTime = document.createElement('span');
    chatMessageTime.classList.add('chat-message-time');
    chatMessageTime.textContent = time;
    
    // Append elements
    chatMessageElement.appendChild(chatMessageText);
    chatMessageElement.appendChild(chatMessageTime);
    
    // Add to messages area
    chatMessagesArea.appendChild(chatMessageElement);
    
    // Scroll to the bottom
    chatScrollToBottom();
}

// Function to scroll to the bottom of the chat
function chatScrollToBottom() {
    chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
}

// Microphone functionality
let chatMicActive = false;
let chatRecognition = null;


function chatToggleMicrophone() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        chatAddMessage("Speech recognition is not supported in this browser.", "other", new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        return;
    }

    let finalTranscript = '';
    
    if (chatMicActive) {
        // Stop listening
        if (chatRecognition) {
            chatRecognition.stop();
        }
        chatMicButton.style.color = "#3498db";
        chatMicActive = false;
    } else {
        // Start listening
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        chatRecognition = new SpeechRecognition();
        chatRecognition.continuous = true;
        chatRecognition.interimResults = true;
        
        chatRecognition.onresult = function(event) {
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                    console.log("chatRecognition.onresult finalTranscript", finalTranscript, chatMicActive);
                } else {
                    interimTranscript += transcript;
                    console.log("chatRecognition.onresult interimTranscript", interimTranscript, chatMicActive);
                }
            }
            
            // Update the input field with the current transcription
            if (finalTranscript) {
                chatMessageInput.value = finalTranscript;
            } else {
                chatMessageInput.value = interimTranscript;
            }
        };

        chatRecognition.onerror = function(event) {
            console.error("Speech recognition error", event.error);
            // Don't deactivate on error, just log it
        };
        
        chatRecognition.onend = function() {
            // Restart if still active (keeps it going until explicitly stopped)
            if (chatMicActive) {
                chatRecognition.start();
            }
            else
            {
                chatSendMessage();
            }
        };

        chatRecognition.start();
        chatMicButton.style.color = "#e74c3c"; // Red color when active
        chatMicActive = true;
    }
}


// Chat functionality script with namespaced functions
function chatInitialize(chatContainerSelector) {
    chatOuterContainer = document.querySelector(chatContainerSelector);
    if (!chatOuterContainer) return;
    
    // chatContainer = document.getElementById('.chat-container');
    chatHeader = chatOuterContainer.querySelector('.chat-header');
    chatMessagesArea = chatOuterContainer.querySelector('.chat-messages-container');
    chatMessageInput = chatOuterContainer.querySelector('#chat-message-input');
    chatSendButton = chatOuterContainer.querySelector('#chat-send-button');
    
    
    // Add initial messages
    chatInitialMessages.forEach(msg => {
        chatAddMessage(msg.text, msg.sender, msg.time);
    });

    // Add event listeners
    chatSendButton.addEventListener('click', chatSendMessage);
    chatMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            chatSendMessage();
        }
    });
    
    // Microphone button event
    chatMicButton = chatOuterContainer.querySelector('#chat-mic-button');
    chatMicButton.addEventListener('click', chatToggleMicrophone);

    right_side_tab_selector = document.querySelectorAll('.right-side-tab-selector');
    right_side_tab_selector[0].style.position = "absolute";
    right_side_tab_selector[0].style.left = (parseInt(chat_outer_container.style.left) - 60).toString() + "px";
    right_side_tab_selector[0].style.bottom = "140px";

    // Get all tab buttons and content sections
    const rightSideTabButtons = document.querySelectorAll('.right-side-tab-button');
    const rightSideTabContents = document.querySelectorAll('.right-side-tab-content');
    
    // Add click event listener to each tab button
    rightSideTabButtons.forEach(button => {
      button.addEventListener('click', () => 
      {
        // Get the tab ID from the data-tab attribute
        const tabId = button.getAttribute('data-tab');

        console.log("chatInitialize button", tabId);

        if (tabId == "chat")
        {
            hide2DCanvas();
            showChat();
            hideGoogleMap()
        }
        else if (tabId == "map")
        {
            hide2DCanvas();
            hideChat();
            showGoogleMap();
        }
        else if (tabId == "images")
        {
            show2DCanvas();
            hideChat();
            hideGoogleMap();
        }
        
        // Remove active class from all buttons and contents
        rightSideTabButtons.forEach(btn => btn.classList.remove('right-side-active'));
        rightSideTabContents.forEach(content => content.classList.remove('right-side-active'));
        
        // Add active class to the clicked button and corresponding content
        button.classList.add('right-side-active');
        // document.getElementById(`right-side-${tabId}-content`).classList.add('right-side-active');
      });
    });
    
}

// // Initialize the chat when the DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Pass the container selector
//     chatInitialize('#chat-outer-container .chat-container');
// });
