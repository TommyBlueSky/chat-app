import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/messages`);
            const data = await response.json();
            setMessages(data.reverse());
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); // 初回データ取得

        const intervalId = setInterval(() => {
            fetchMessages(); // 定期的にデータ取得
        }, 5000); // 5秒ごとに更新

        return () => clearInterval(intervalId); // クリーンアップ
    }, []);
    const handleSendMessage = async (msg) => {
        try {
            if (editingMessage) {
                await fetch(`http://localhost:5000/messages/${msg.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(msg),
                });
                setEditingMessage(null);
            } else {
                await fetch(`http://localhost:5000/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(msg),
                });
            }
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleEditMessage = (msg) => {
        setEditingMessage(msg);
    };

    const handleDeleteMessage = async (id) => {
        try {
            console.log('Deleting message with ID:', id);
            await fetch(`http://localhost:5000/messages/${id}`, {
                method: 'DELETE',
            });
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
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
