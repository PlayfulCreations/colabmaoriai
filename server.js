const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Simple token auth middleware
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid auth token.' });
  }
  // Optionally validate the token here
  next();
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 256,
    });
    res.json({ generated: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate text.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
