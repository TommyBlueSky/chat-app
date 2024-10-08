import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';


const App = () => {
    const [messages, setMessages] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    

    const fetchMessages = async () => {
        const response = await axios.get('http://localhost:5000/messages');
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendMessage = async (msg) => {
        try {
            if (editingMessage) {
                await axios.put(`http://localhost:5000/messages/${msg.id}`, msg);
                setEditingMessage(null);
            } else {
                await axios.post('http://localhost:5000/messages', msg);
            }
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    };       

    const handleEditMessage = (msg) => {
        setEditingMessage(msg);
    };

    const handleDeleteMessage = async (id) => {
        try {
            console.log('Deleting message with ID:', id);
            const response = await axios.delete(`http://localhost:5000/messages/${id}`);
            console.log('Delete response:', response); // 成功時のレスポンスを確認
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error.response ? error.response.data : error.message);
        }
    };
    
    

    return (
        <div>
            <h1 className="text-center mt-4">Chat App</h1>
            <MessageList messages={messages} onEdit={handleEditMessage} onDelete={handleDeleteMessage} />
            <MessageForm onSend={handleSendMessage} editingMessage={editingMessage} setEditingMessage={setEditingMessage} />
        </div>
    );
};

export default App;
