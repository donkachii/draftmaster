# draftmaster
DraftMaster: Write smarter, faster, and more creatively—powered by AI.

## Supabase Setup

1. Create a `.env` file in the root of your project.
2. Add the following environment variables:

```
VITE_SUPABASE_URL=your-supabase-url-here
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

Replace the values with your actual Supabase project credentials from the Supabase dashboard.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure OpenAI API:
   - Open `src/services/openaiService.js`.
   - Replace `'YOUR_OPENAI_API_KEY'` with your actual OpenAI API key.

3. Run the development server:
   ```bash
   npm run dev
   ```

## Features
- Responsive SPA using Vue.js and Bootstrap
- Rich-text blog editor (Quill)
- AI-powered buttons: Generate Title, Summarize Content, Suggest Keywords
- OpenAI API integration via fetch
- Draft storage (local or mock API)
