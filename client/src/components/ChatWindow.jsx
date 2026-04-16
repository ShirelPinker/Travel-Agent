import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, loading }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    return (
        <div className="chat-window">
            {messages.length === 0 && !loading && (
                <p className="empty-state">Ask me anything about your next trip ✈️</p>
            )}
            {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} text={msg.text} />
            ))}
            {loading && (
                <div className="message-bubble agent loading-bubble">
                    <span className="bubble-label">Nomad</span>
                    <p className="loading-dots"><span>.</span><span>.</span><span>.</span></p>
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}
