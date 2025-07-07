import React from 'react';

const DeleteConfirmationModal = ({ show, onClose, onConfirm, botName }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete Bot</h3>
        <p>Are you sure you want to delete the bot "{botName}"? This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;