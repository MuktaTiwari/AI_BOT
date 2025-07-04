// src/models/AIbotModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const AIbot = sequelize.define("ai_bot", {
    id: {
        type: DataTypes.INTEGER,  // Changed from sequelize.INTEGER
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "AIbots",
    timestamps: true
});

export default AIbot;