import { useState } from 'react';
import './style/CreateBotModal.css';

const CreateBotModal = ({ show, onClose, onCreate }) => {
    const [botName, setBotName] = useState('');
    const [messages, setMessages] = useState([{ text: '', url: '' }]);
    const [error, setError] = useState(''); // Added error state
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const handleAddMessage = () => {
        setMessages([...messages, { text: '', url: '' }]);
    };

    const handleMessageChange = (index, field, value) => {
        const updatedMessages = [...messages];
        updatedMessages[index][field] = value;
        setMessages(updatedMessages);
    };

    const handleRemoveMessage = (index) => {
        if (messages.length > 1) {
            const updatedMessages = [...messages];
            updatedMessages.splice(index, 1);
            setMessages(updatedMessages);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await onCreate({ botName, messages });
            setBotName('');
            setMessages([{ text: '', url: '' }]);
        } catch (err) {
            setError(err.message || 'Failed to create bot');
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Bot</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Bot Name</label>
                        <input
                            type="text"
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="messages-container">
                        <label>Messages & URLs</label>
                        <div className="messages-scrollable">
                            {messages.map((message, index) => (
                                <div key={index} className="message-group">
                                    <input
                                        type="text"
                                        placeholder="Message"
                                        value={message.text}
                                        onChange={(e) => handleMessageChange(index, 'text', e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <input
                                        type="url"
                                        placeholder="URL"
                                        value={message.url}
                                        onChange={(e) => handleMessageChange(index, 'url', e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    {messages.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-message"
                                            onClick={() => handleRemoveMessage(index)}
                                            disabled={isLoading}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="add-message"
                            onClick={handleAddMessage}
                            disabled={isLoading}
                        >
                            Add Another Message
                        </button>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="save-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Bot'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBotModal;