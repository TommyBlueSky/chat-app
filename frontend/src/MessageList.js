import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const MessageList = ({ messages, onEdit, onDelete }) => {
    const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="container mt-4">
            <div className="message-list">
                {messages.map((msg) => (
                    <div key={msg.id} className="message mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{msg.username} <span style={{fontWeight:'normal', fontSize:'14px'}}>{msg.created_at}</span></h5>
                                <p className="card-text">{msg.message}</p>
                                <button onClick={() => onEdit(msg)} className="btn btn-warning me-2">Edit</button>
                                <button onClick={() => onDelete(msg.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};

export default MessageList;
