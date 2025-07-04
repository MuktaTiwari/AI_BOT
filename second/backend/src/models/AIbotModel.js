// src/models/AIbotModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const AIbot = sequelize.define("ai_bot", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
     userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // This should match your users table name
            key: 'id'
        }
    },
   botName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    messages: {
        type: DataTypes.JSON, // Store messages as JSON array
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: "ai_bots", // Changed to lowercase for consistency
    timestamps: true
});

export default AIbot;