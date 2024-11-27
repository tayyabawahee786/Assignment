const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for handling incoming chat messages
app.post('/api/message', (req, res) => {
    const userMessage = req.body.message;

    // Simulate a bot response
    const botResponse = `You said: ${userMessage}`;

    res.json({ response: botResponse });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});