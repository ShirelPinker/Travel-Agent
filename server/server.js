import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { TravelAi } from './core/travelAi.js';

const app = express();
const agent = new TravelAi();
const PORT = 3001;

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    req.socket.setTimeout(60000);
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'message is required' });
    }

    try {
        const reply = await agent.chat(message);
        res.json({ reply });
    } catch (err) {
        console.error('Agent error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/reset', (req, res) => {
    agent.reset();
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
