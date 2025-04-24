import { HfInference } from '@huggingface/inference';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await hf.textGeneration({
      model: 'facebook/opt-125m',
      inputs: message,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        return_full_text: true
      }
    });


    res.json({ reply: response.generated_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 