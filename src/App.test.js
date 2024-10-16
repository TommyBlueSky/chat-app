// Appコンポーネントのテスト
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import App from './App';

jest.mock('axios');

describe('App Component', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
    // 各テストの前にモックレスポンスを設定
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: [{ id: 1, username: 'User1', message: 'Hello', created_at: '2023-10-09' }] });
        axios.post.mockResolvedValue({ data: { id: 2, username: 'User2', message: 'Hi' } });
        axios.put.mockResolvedValue({ data: { id: 1, username: 'User1', message: 'Updated Message' } });
        axios.delete.mockResolvedValue({});
    });

    // メッセージが取得され表示されることを確認
    test('fetches and displays messages on load', async () => {
        render(<App />);
        const message = await screen.findByText('Hello');
        expect(message).toBeInTheDocument();
    });

    // 新しいメッセージが送信されることを確認
    test('sends a new message', async () => {
        render(<App />);
        fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'User2' } });
        fireEvent.change(screen.getByPlaceholderText('Type your message...'), { target: { value: 'Hi' } });
        fireEvent.click(screen.getByText('Send'));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/messages', { id: null, username: 'User2', message: 'Hi' });
    });

    // メッセージが編集されることを確認
    test('edits a message', async () => {
        render(<App />);
        fireEvent.click(screen.getByText('Edit'));
        
        fireEvent.change(screen.getByPlaceholderText('Type your message...'), { target: { value: 'Updated Message' } });
        fireEvent.click(screen.getByText('Update'));

        expect(axios.put).toHaveBeenCalledWith('http://localhost:5000/messages/1', { id: 1, username: 'User1', message: 'Updated Message' });
    });

    // メッセージが削除されることを確認
    test('deletes a message', async () => {
        render(<App />);
        fireEvent.click(screen.getByText('Delete'));

        expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/messages/1');
    });
});
