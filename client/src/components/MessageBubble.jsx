export default function MessageBubble({ role, text }) {
    return (
        <div className={`message-bubble ${role}`}>
            <span className="bubble-label">{role === 'user' ? 'You' : 'Nomad'}</span>
            <p>{text}</p>
        </div>
    );
}
