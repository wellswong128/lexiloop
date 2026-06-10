# LexiLand Project Plan

LexiLand (力思樂園) is an English vocabulary learning app for learners who want to collect words, review them with flashcards, test themselves with quizzes, and gradually remember words through simple spaced repetition.

The project will start as a local-only React app using `localStorage`. After the MVP is stable, the same data model can be moved to Supabase for login, cloud sync, and multi-device usage.

## Product Goals

1. Help users save English words with useful learning information.
2. Make review simple through flashcards and quizzes.
3. Track mistakes so users can focus on weak words.
4. Use a beginner-friendly code structure that is easy to debug and extend.
5. Keep the first version small enough to finish, test, and deploy to Vercel.

## MVP Scope

The MVP should include:

1. Add a new English word.
2. View and search the word list.
3. Review words using flashcards.
4. Take a simple quiz.
5. Save incorrect answers to a mistake notebook.
6. Use a simple spaced repetition schedule.
7. Import word data from a JSON file or JSON text.
8. Prepare the structure for future AI auto-completion.

The MVP should not include user accounts, payments, complex analytics, or advanced AI workflows yet.

## Recommended Tech Stack

- React for the UI.
- Vite for local development and production build.
- Tailwind CSS for styling.
- React Router for page navigation.
- `localStorage` for the first data layer.
- Supabase for the future cloud data layer.
- Vercel for deployment.

## App Pages

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Show overview, review count, and quick actions. |
| Word List | `/words` | Show all saved words and basic filters. |
| Add Word | `/words/new` | Add a new word manually. |
| Word Detail | `/words/:id` | View or edit one word. |
| Flashcards | `/review/flashcards` | Review due words one card at a time. |
| Quiz | `/review/quiz` | Test the user with multiple choice or typed answers. |
| Mistakes | `/mistakes` | Show words answered incorrectly. |
| Import | `/import` | Import words from JSON. |
| Settings | `/settings` | Manage storage, reset data, and future sync settings. |

## Development Phases

### Phase 1: Project Setup

Create the Vite React project, install Tailwind CSS, add React Router, and set up the base folders.

### Phase 2: Data Layer

Create the vocabulary data model, localStorage helpers, sample data, and validation helpers.

### Phase 3: Core Word Management

Build add word, word list, word detail, edit word, delete word, and basic search.

### Phase 4: Review Features

Build flashcards, quiz, mistakes, and simple spaced repetition updates.

### Phase 5: Import Feature

Allow users to paste or upload JSON word data, validate it, preview it, and import it.

### Phase 6: Polish and Debug

Improve empty states, loading states, error messages, layout, mobile behavior, and basic accessibility.

### Phase 7: Deployment

Build the app, fix production issues, deploy to Vercel, and document the deployment process.

### Phase 8: Supabase Upgrade

Add authentication, move data to Supabase tables, and keep localStorage as a possible offline cache later.

## Engineering Principles

1. Build one feature at a time.
2. Keep components small and readable.
3. Put business logic outside UI components when possible.
4. Use clear names instead of clever abstractions.
5. Keep the localStorage version simple, but design data so it can move to Supabase later.
6. Test manually after every small milestone.

## MVP Completion Checklist

- Users can add words.
- Users can see saved words after refreshing the page.
- Users can review words with flashcards.
- Users can complete a quiz.
- Incorrect quiz answers appear in the mistake notebook.
- Review results update each word's review state.
- Users can import valid JSON data.
- Invalid JSON shows a helpful error.
- The app can be deployed to Vercel.

