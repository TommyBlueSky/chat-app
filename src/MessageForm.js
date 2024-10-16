import React, { useEffect, useState } from 'react';

const MessageForm = ({ onSend, editingMessage, setEditingMessage }) => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editingMessage) {
            setUsername(editingMessage.username);
            setMessage(editingMessage.message);
        } else {
            setUsername('');
            setMessage('');
        }
    }, [editingMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend({ id: editingMessage ? editingMessage.id : null, username, message });
        if (!editingMessage) {
            setMessage('');
        }
    };

    return (
        <form className="container mt-4" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group mt-2">
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">{editingMessage ? 'Update' : 'Send'}</button>
            {editingMessage && (
                <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => setEditingMessage(null)}>Cancel</button>
            )}
        </form>
    );
};

export default MessageForm;
