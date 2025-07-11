import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './style/ChatWindow.css';

function ChatWindow({ bot }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    // Initialize with a greeting message
    useEffect(() => {
        if (bot?.botName) {
            setMessages([{ 
                from: "bot", 
                text: `Hello! I'm ${bot.botName}. Ask me anything about my topics.` 
            }]);
        }
    }, [bot]);

    const handleSend = () => {
        if (!input.trim()) return;
        
        // Add user message
        const userMsg = { from: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        
        // Process bot response
        setIsTyping(true);
        
        // Simulate API delay
        setTimeout(() => {
            let botReply = { text: "Sorry, I don't understand. Could you rephrase that?", url: null };
            
            if (bot?.messages?.length > 0) {
                // Convert input to lowercase for case-insensitive matching
                const inputLower = input.toLowerCase();
                
                // Find the best matching message
                const matchedMessage = bot.messages.find(msg => 
                    msg.text && inputLower.includes(msg.text.toLowerCase())
                );
                
                if (matchedMessage) {
                    botReply = {
                        text: `Here's information about ${matchedMessage.text}:`,
                        url: matchedMessage.url
                    };
                    console.log("responsefewn::::::", matchedMessage);
                }

            
            }

            
            // Add the bot's response
            setMessages(prev => [
                ...prev, 
                { 
                    from: "bot", 
                    text: botReply.text,
                    url: botReply.url 
                }
            ]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="chat-window-container">
            <div className="chat-header">
                <button onClick={() => navigate('/conversations')} className="back-button">
                    &larr; Back to Bots
                </button>
                <h2>Chatting with {bot?.botName || 'Bot'}</h2>
            </div>
            
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.from}-message`}>
                        <div className="message-sender">{msg.from === "user" ? "You" : bot?.botName || 'Bot'}</div>
                        <div className="message-text">{msg.text}</div>
                        {msg.url && (
                            <a href={msg.url} target="_blank" rel="noopener noreferrer" className="message-link">
                                Learn more
                            </a>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="message bot-message">
                        <div className="message-sender">{bot?.botName || 'Bot'}</div>
                        <div className="message-text typing">Typing...</div>
                    </div>
                )}
            </div>
            
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message here..."
                    disabled={isTyping}
                />
                <button 
                    onClick={handleSend} 
                    disabled={isTyping || !input.trim()}
                    className="send-button"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;