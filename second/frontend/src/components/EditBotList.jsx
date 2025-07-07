import { useState, useEffect } from 'react';
import './style/CreateBotModal.css';

const EditBotModal = ({ show, bot, onClose, onUpdate }) => {
    const [botName, setBotName] = useState('');
    const [messages, setMessages] = useState([{ text: '', url: '' }]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form with bot data when component mounts or bot changes
    useEffect(() => {
        if (bot) {
            setBotName(bot.botName);
            setMessages(bot.messages.length > 0 ? bot.messages : [{ text: '', url: '' }]);
        }
    }, [bot]);

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
            await onUpdate({ 
                ...bot, 
                botName, 
                messages,
                updatedAt: new Date().toISOString() 
            });
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to update bot');
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Bot: {bot?.botName}</h2>
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

                    <div className="form-group">
                        <label>Created At</label>
                        <input
                            type="text"
                            value={new Date(bot?.createdAt).toLocaleString()}
                            readOnly
                            disabled
                        />
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
                            {isLoading ? 'Updating...' : 'Update Bot'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBotModal;