import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/sidebar";
import './style/Conversations.css';
import { getAllAIBot } from '../api/auth.js';

function Conversations() {
    const [botList, setBotList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBotList = async () => {
            try {
                const response = await getAllAIBot();
                setBotList(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch the list", error);
                setError("Failed to load bots");
                setLoading(false);
            }
        };
        fetchBotList();
    }, []);

    const handleBotSelect = (e) => {
        const selectedBotId = e.target.value;
        if (selectedBotId) {
            navigate(`/chat/${selectedBotId}`);
        }
    };

    if (loading) return <div className="loading">Loading bots...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="conversations-container">
            <Navbar />
            <Sidebar />
            <div className="conversations-content">
                <h1>Available Bots</h1>
                <div className="bot-select-container">
                    <select
                        className="select-bot"
                        defaultValue=""
                        onChange={handleBotSelect}
                    >
                        <option value="">Select a bot to chat with</option>
                        {botList.map((bot) => (
                            <option key={bot.id} value={bot.id}>
                                {bot.botName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="instructions">
                    <p>Select a bot from the dropdown to start chatting</p>
                </div>
            </div>
        </div>
    );
}

export default Conversations;