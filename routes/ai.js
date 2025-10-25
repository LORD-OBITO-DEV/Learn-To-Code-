const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ answer: "Question manquante" });

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: question }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ answer: 'Erreur lors de la génération de la réponse.' });
  }
});

module.exports = router;
