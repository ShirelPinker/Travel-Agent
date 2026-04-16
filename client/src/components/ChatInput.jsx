import { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (!disabled) textareaRef.current?.focus();
    }, [disabled]);

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    }

    function submit() {
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setValue('');
    }

    return (
        <div className="chat-input-area">
            <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Type a message..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            <button onClick={submit} disabled={disabled || !value.trim()}>
                Send
            </button>
        </div>
    );
}
