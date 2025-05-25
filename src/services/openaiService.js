import { OPENAI_API_KEY, OPENAI_API_URL } from '../config';

const promptTemplates = {
  title: (content) => `Generate a catchy blog post title for the following content:\n${content}`,
  summary: (content) => `Summarize the following blog content in 2-3 sentences:\n${content}`,
  keywords: (content) => `Suggest 5 relevant SEO keywords for the following blog content:\n${content}`,
};

async function generateSuggestions(content, type) {
    
  const prompt = promptTemplates[type]?.(content);

  console.log(prompt, " content ", type, " type ");
  if (!prompt) throw new Error('Invalid suggestion type');

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-8b-instruct:free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim() || '';

  if (type === 'keywords') {
    return text.split(/,|\n/).map(k => k.trim()).filter(Boolean);
  }

  console.log(text, " text ");
  return text;
}

export default { generateSuggestions }; 