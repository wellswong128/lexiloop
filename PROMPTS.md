# LexiLand Prompts

This file contains reusable prompts for building, debugging, refactoring, and extending LexiLand in Cursor.

Use one prompt at a time. Keep the task small, then test the result before asking for the next change.

## Project Role Prompt

```text
You are the technical project manager and full-stack engineer for LexiLand, an English vocabulary memory app.

Tech stack:
- React
- Vite
- Tailwind CSS
- React Router
- localStorage first
- Supabase later
- Vercel deployment

Please help me make small, beginner-friendly changes. Explain the plan before editing files, keep code readable, and update the task list when useful.
```

## Planning Prompt

```text
Please review PROJECT_PLAN.md, TASKS.md, and DATA_MODEL.md.

Then suggest the next 3 small development tasks I should do.
Keep the tasks beginner-friendly and do not jump ahead to advanced features.
```

## Create Vite App Prompt

```text
Please help me create the Vite React project for LexiLand in the current folder.

Requirements:
- React
- Vite
- Keep the existing markdown planning files
- Do not add app features yet
- After setup, run the dev server or explain how to run it
```

## Tailwind Setup Prompt

```text
Please add Tailwind CSS to this Vite React app.

Requirements:
- Follow the current Tailwind setup instructions for Vite
- Keep styling simple
- Add a basic centered layout so I can confirm Tailwind works
- Do not build feature pages yet
```

## React Router Prompt

```text
Please add React Router to LexiLand.

Create these routes:
- /
- /words
- /words/new
- /review/flashcards
- /review/quiz
- /mistakes
- /import
- /settings

Create simple placeholder pages first. Add navigation links so I can click through the app.
```

## Folder Structure Prompt

```text
Please organize the React project folder structure for LexiLand.

Use this structure:
src/components
src/pages
src/features/words
src/features/review
src/features/import
src/lib
src/data

Move existing placeholder pages into the correct folders. Keep the app running.
```

## Data Model Implementation Prompt

```text
Please implement the local Word data model from DATA_MODEL.md.

Create helper functions for:
- creating a new word
- generating an ID
- creating timestamps
- normalizing imported word input
- checking duplicate terms

Keep the implementation simple and readable for a beginner.
```

## localStorage Prompt

```text
Please implement localStorage support for LexiLand.

Requirements:
- Use the key lexiland.words.v1
- Add loadWords
- Add saveWords
- Add resetWords
- Return an empty array if storage is empty
- Handle broken JSON safely
- Do not add Supabase yet
```

## Add Word Prompt

```text
Please build the Add Word page.

Requirements:
- Fields: term, definition, translation, pronunciation, part of speech, example, notes, tags
- term and definition are required
- Show simple validation errors
- Save to localStorage
- Redirect to the Word List page after saving
- Keep the code beginner-friendly
```

## Word List Prompt

```text
Please build the Word List page.

Requirements:
- Show all saved words
- Show an empty state if there are no words
- Add search by term or definition
- Show tags when available
- Add a delete button with confirmation
- Make sure changes persist after refresh
```

## Flashcard Prompt

```text
Please build the Flashcards page.

Requirements:
- Show due words based on nextReviewAt
- Show one card at a time
- Show the answer only after clicking Show Answer
- Add Remembered and Forgot buttons
- Update review fields after each answer
- Show a completion message at the end
```

## Quiz Prompt

```text
Please build the first Quiz page.

Use multiple choice questions:
- Show the English word
- Let the user choose the correct definition
- Use other saved word definitions as wrong choices
- Show correct or incorrect feedback
- Track score
- Add incorrect answers to the mistake notebook
- Handle the case where there are not enough words
```

## Mistake Notebook Prompt

```text
Please build the Mistake Notebook page.

Requirements:
- Show words where mistake.isMistake is true
- Show mistake count and last mistake date
- Add a button to clear a word from mistakes
- Add a link or button to review mistakes
- Keep state saved in localStorage
```

## Import JSON Prompt

```text
Please build the JSON Import page.

Requirements:
- Add a textarea for JSON input
- Accept an array of word objects
- Require term and definition
- Validate the JSON before importing
- Show a preview
- Skip duplicate terms
- Show how many words were imported and skipped
- Save imported words to localStorage
```

## Debug Prompt

```text
Please debug the current LexiLand issue.

Problem:
[Describe the problem here]

Steps to reproduce:
1. [First step]
2. [Second step]
3. [What happened]

Expected behavior:
[Describe what should happen]

Please inspect the related files first, explain the likely cause, then make a small fix.
```

## Refactor Prompt

```text
Please refactor the current LexiLand code without changing behavior.

Goals:
- Improve readability
- Reduce repeated code
- Keep beginner-friendly names
- Avoid large architecture changes
- Run or explain basic checks after the refactor
```

## Supabase Planning Prompt

```text
Please plan the Supabase upgrade for LexiLand.

Use DATA_MODEL.md as the source of truth.

Please provide:
- Required tables
- Required columns
- Row Level Security policy plan
- Which localStorage functions will be replaced
- A safe migration order from localStorage to Supabase

Do not implement Supabase yet unless I ask.
```

## Supabase Implementation Prompt

```text
Please start implementing Supabase for LexiLand.

Requirements:
- Add Supabase client setup
- Use environment variables for Supabase URL and anon key
- Do not hard-code secrets
- Start with reading and writing words
- Keep localStorage code available until Supabase works
- Explain any manual Supabase dashboard steps I need to do
```

## AI Auto-Completion Planning Prompt

```text
Please design the future AI auto-completion feature for LexiLand.

Goal:
When I type an English word, AI can suggest definition, translation, pronunciation, part of speech, example sentence, and tags.

Please explain:
- UI flow
- API flow
- Data format
- Error handling
- Security concerns
- Why API keys should not be stored in frontend code

Do not implement it yet.
```

## Vercel Deployment Prompt

```text
Please prepare LexiLand for Vercel deployment.

Requirements:
- Confirm npm run build works
- Fix build errors
- Check React Router deployment behavior
- Add deployment notes to README.md
- Do not add Supabase environment variables unless needed
```

## Code Review Prompt

```text
Please review the current LexiLand code like a senior engineer.

Focus on:
- Bugs
- Data loss risks
- localStorage mistakes
- React state issues
- Routing issues
- Missing validation
- Beginner-unfriendly complexity

List the most important findings first.
```

