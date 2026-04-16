export default function ResetButton({ onReset }) {
    return (
        <button className="reset-button" onClick={onReset}>
            New trip
        </button>
    );
}
