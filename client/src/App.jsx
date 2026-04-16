import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ResetButton from './components/ResetButton';
import './App.css';

export default function App() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function sendMessage(text) {
        setMessages(prev => [...prev, { role: 'user', text }]);
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
                signal: controller.signal,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Something went wrong');

            setMessages(prev => [...prev, { role: 'agent', text: data.reply }]);
        } catch (err) {
            const msg = err.name === 'AbortError' ? 'Request timed out. Please try again.' : err.message;
            setError(msg);
        } finally {
            clearTimeout(timeout);
            setLoading(false);
        }
    }

    async function resetChat() {
        await fetch('/api/reset', { method: 'POST' });
        setMessages([]);
        setError(null);
    }

    return (
        <div className="app">
            <header className="header">
                <h1>🌴 Nomad</h1>
                <ResetButton onReset={resetChat} />
            </header>
            <ChatWindow messages={messages} loading={loading} />
            {error && <p className="error-banner">{error}</p>}
            <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
    );
}
