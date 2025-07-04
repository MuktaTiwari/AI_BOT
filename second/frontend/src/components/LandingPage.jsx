import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/sidebar";

import './style/LandingPage.css'; // Assuming you have a CSS file for styling
function LandingPage() {
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState("");
    const phrases = ["your personal assistant", "a smart chatbot", "your AI companion", "always available"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const typeEffect = () => {
            const currentPhrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                setTypedText(currentPhrase.substring(0, typedText.length - 1));
                setTypingSpeed(100);
            } else {
                setTypedText(currentPhrase.substring(0, typedText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && typedText === currentPhrase) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && typedText === "") {
                setIsDeleting(false);
                setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
            }
        };

        const timer = setTimeout(typeEffect, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, isDeleting, currentPhraseIndex]);

    return (
        <div className="landing-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Build Your Own <span className="highlight">AI Bot</span>
                    </h1>
                    <h2 className="hero-subtitle">
                        Meet {typedText}<span className="cursor">|</span>
                    </h2>
                    <p className="hero-description">
                        Create, customize, and deploy your personal AI assistant with our intuitive platform.
                        No coding required - just your imagination!
                    </p>
                    <div className="cta-buttons">
                        <button
                            className="primary-button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="secondary-button"
                            onClick={() => window.scrollTo({ top: document.querySelector('.features-section').offsetTop, behavior: 'smooth' })}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                {/* <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        alt="AI Bot Illustration"
                        className="hero-img"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1677442135136-760c813cd6f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
                        }}
                    />
                </div> */}
            </div>

            <div className="features-section">
                <h2 className="section-title">Why Choose Our AI Bot Platform</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Easy to Create</h3>
                        <p>Build your bot in minutes with our intuitive interface and pre-built templates.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🧠</div>
                        <h3>Smart Learning</h3>
                        <p>Your bot learns from interactions to provide better responses over time.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌐</div>
                        <h3>Multi-Platform</h3>
                        <p>Deploy your bot on websites, mobile apps, and messaging platforms.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure & Private</h3>
                        <p>Enterprise-grade security to protect your data and conversations.</p>
                    </div>
                </div>
            </div>

            <div className="demo-section">
                <h2 className="section-title">See It In Action</h2>
                <div className="demo-container">
                    <div className="demo-chat">
                        {/* This would be a mock chat interface */}
                        <div className="chat-message bot-message">
                            <p>Hello! I'm your AI assistant. How can I help you today?</p>
                        </div>
                        <div className="chat-message user-message">
                            <p>What can you do?</p>
                        </div>
                        <div className="chat-message bot-message">
                            <p>I can answer questions, automate tasks, provide recommendations, and much more! Try asking me something.</p>
                        </div>
                    </div>
                    <button
                        className="primary-button demo-button"
                        onClick={() => navigate("/demo")}
                    >
                        Try Live Demo
                    </button>
                </div>
            </div>

            <div className="pricing-section">
                <h2 className="section-title">Simple, Transparent Pricing</h2>
                <div className="pricing-cards">
                    <div className="pricing-card">
                        <h3>Starter</h3>
                        <div className="price">Free</div>
                        <ul className="features-list">
                            <li>✓ Basic bot creation</li>
                            <li>✓ 100 messages/month</li>
                            <li>✓ Web deployment</li>
                            <li>× No API access</li>
                        </ul>
                        <button className="secondary-button">Get Started</button>
                    </div>
                    <div className="pricing-card popular">
                        <div className="popular-badge">Most Popular</div>
                        <h3>Pro</h3>
                        <div className="price">$19<span>/month</span></div>
                        <ul className="features-list">
                            <li>✓ Advanced bot creation</li>
                            <li>✓ 1,000 messages/month</li>
                            <li>✓ Multi-platform deployment</li>
                            <li>✓ Basic API access</li>
                        </ul>
                        <button className="primary-button">Get Started</button>
                    </div>
                    <div className="pricing-card">
                        <h3>Enterprise</h3>
                        <div className="price">Custom</div>
                        <ul className="features-list">
                            <li>✓ Unlimited bot creation</li>
                            <li>✓ Unlimited messages</li>
                            <li>✓ All deployment options</li>
                            <li>✓ Full API access</li>
                        </ul>
                        <button className="secondary-button">Contact Sales</button>
                    </div>
                </div>
            </div>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-logo">AIBot</div>
                    <div className="footer-links">
                        <a href="#">About</a>
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Contact</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div className="footer-social">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} AIBot Project. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;