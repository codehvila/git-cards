# Git Cards

A quick-reference cheatsheet of Git and Bash commands, presented as terminal-style cards. Click any command to copy it to your clipboard.

Built with [React](https://react.dev/) 19 and [Vite](https://vite.dev/).

## Getting started

```bash
git clone git@github.com:<username>/git-cards.git
cd git-cards
npm install
npm run dev
```

Open the URL printed in the terminal (typically [http://localhost:5173](http://localhost:5173)) to view the app. The page updates automatically as you edit source files.

## Available scripts

### `npm run dev`

Starts the Vite dev server in development mode with hot module reloading.

### `npm test`

Runs the test suite with [Vitest](https://vitest.dev/).

### `npm run build`

Builds the app for production to the `dist` folder, bundled and minified by Vite.

### `npm run preview`

Serves the production build from `dist` locally, to sanity-check it before deploying.

## Adding commands

Cards are generated from `src/data/data.js`. Each entry maps a card title to a list of one or more command strings shown on that card:

```js
const cardGitList = {
  "Clone a repository": [
    "git clone git@github.com:<username>/<repository-name>.git",
  ],
  // ...
};
```

Add a new key to `cardGitList` or `cardBashList` to add a new card.
