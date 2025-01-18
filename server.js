const express = require('express');
const fetch = require('node-fetch'); // Install with `npm install node-fetch`
const bodyParser = require('body-parser');
const app = express();

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1330173184871235695/lOtIB6FEivCWw5KcjFYgt6OUzgr7gMnI-i0DuJKnJ-bwidYIHAOShrwj0rj7w0CqjlXV'; // Replace with your Discord webhook URL

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message content is required' });
    }

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
