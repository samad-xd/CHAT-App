import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {

    return (
        <>
            <header>
                <div className="heading-container">
                    <Link to='/home' className="heading">CHAT App</Link>
                </div>
                <div className="login-signup-container">
                    <Link to='/login' className="login-signup">Login</Link>
                    <Link to='/signup' className="login-signup">Signup</Link>
                </div>
            </header>
            <main>
                <div className="hero">
                    <div className="hero-text-container">
                        <span className="hero-heading">CONNECT INSTANTLY</span>
                        <span className="hero-heading">Anytime, Anywhere.</span>
                        <span className="hero-text">Experience the power of real-time conversations with CHAT App. Join now and
                            start chatting with
                            friends,
                            family, and colleagues effortlessly.</span>
                        <Link to='/signup' className="signup-now-button">Sign Up Now</Link>
                    </div>
                    <div className="hero-image">
                        <img src="social-media-users.svg" alt="picture" />
                    </div>
                </div>
                <div className="features">
                    <div className="feature">
                        <div className="feature-image">
                            <img src="say-hello-to-new-people.svg" alt="picture" />
                        </div>
                        <div className="feature-content">
                            <span className="feature-heading">Real-time Messaging</span>
                            <span className="feature-description">Stay connected with friends in the blink of an eye.</span>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-content">
                            <span className="feature-heading">Group Chats</span>
                            <span className="feature-description">Create and join groups to chat with multiple friends at once.</span>
                        </div>
                        <div className="feature-image">
                            <img src="Group Chat-amico.svg" alt="picture" />
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-image">
                            <img src="ai-intelligence.svg" alt="picture" />
                        </div>
                        <div className="feature-content">
                            <span className="feature-heading">Chat with AI</span>
                            <span className="feature-description">Meet our AI Chatbot, your intelligent companion in every
                                conversation! Fueled by the advanced ChatGPT API, it learns and responds based on your chat
                                history, delivering personalized and context-aware interactions.</span>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-content">
                            <span className="feature-heading">Privacy and Security</span>
                            <span className="feature-description">Your conversations are private and secure with end-to-end
                                encryption.</span>
                        </div>
                        <div className="feature-image">
                            <img src="authentication.svg" alt="picture" />
                        </div>
                    </div>
                </div>
                <div className="support">
                    <div className="support-container">
                        <div className="support-content">
                            <span className="support-heading">Need Help?</span>
                            <span className="support-description">Have a question or need assistance? You can contact me at
                                support@mail.com</span>
                        </div>
                        <div className="support-image">
                            <img src="support.svg" alt="picture" />
                        </div>
                    </div>
                </div>
            </main>
            <footer>

            </footer>
        </>
    );
}