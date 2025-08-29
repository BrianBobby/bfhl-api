require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const buildUserId = (fullName, dob) => {
  if (!fullName) fullName = 'john_doe';
  if (!dob) dob = '17091999';
  return `${fullName.trim().toLowerCase().replace(/\s+/g, '_')}_${dob}`;
};

const isIntegerToken = (s) => /^-?\d+$/.test(s);
const isAlphaToken = (s) => /^[A-Za-z]+$/.test(s);

app.get('/', (req, res) => {
  res.send('Server is running ✅. Try POST /bfhl');
});

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: '"data" must be an array of tokens (strings or numbers).'
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const alphaChars = [];

    data.forEach(rawItem => {
      const token = String(rawItem);
      if (isIntegerToken(token)) {
        const n = parseInt(token, 10);
        if (n % 2 === 0) even_numbers.push(token); else odd_numbers.push(token);
        sum += n;
      } else if (isAlphaToken(token)) {
        alphabets.push(token.toUpperCase());
        for (const ch of token) alphaChars.push(ch);
      } else {
        special_character = token;
        special_characters.push(token);
      }
    });

    const reversedChars = alphaChars.reverse();
    const concat_string = reversedChars
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    const response = {
      is_success: true,
      user_id: buildUserId(process.env.FULL_NAME, process.env.DOB),
      email: process.env.EMAIL || 'john@xyz.com',
      roll_number: process.env.ROLL_NUMBER || 'ABCD123',
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error('Error in /bfhl:', err);
    return res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`bfhl API listening on port ${PORT}`));