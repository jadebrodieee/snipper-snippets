const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory data store
let snippets = [];
let nextId = 1;

// Root route to display a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Code Snippet API. Use /snippet to create and retrieve code snippets.');
});

// POST request to create a new snippet
app.post('/snippet', (req, res) => {
    const { language, code } = req.body;
    if (!language || !code) {
        return res.status(400).send('Language and code are required');
    }

    const snippet = { id: nextId++, language, code };
    snippets.push(snippet);
    res.status(201).json(snippet);
});

// GET request to get all snippets
app.get('/snippet', (req, res) => {
    const { lang } = req.query;
    if (lang) {
        const filteredSnippets = snippets.filter(snippet => snippet.language.toLowerCase() === lang.toLowerCase());
        return res.json(filteredSnippets);
    }
    res.json(snippets);
});

// GET request to retrieve a snippet by ID
app.get('/snippet/:id', (req, res) => {
    const { id } = req.params;
    const snippet = snippets.find(snippet => snippet.id == id);

    if (!snippet) {
        return res.status(404).send('Snippet not found');
    }
    res.json(snippet);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
