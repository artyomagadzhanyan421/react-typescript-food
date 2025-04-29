# BiteBook

MERN stack culinary application using TypeScript for people who want to check out unique and interesting recipes. This application was completed as a freelance project for a small local business in the catering industry.

![node.js](https://img.shields.io/badge/node-v20.16.0-green?style=flat)
![react](https://img.shields.io/badge/react-^19.0.0-blue?style=flat)
![typescript](https://img.shields.io/badge/typescript-~5.7.2-blue?style=flat)

### How does it work?

* JWT based authentication system with automatic log out
* Role orriented structure (user and admin)
* Custom hooks for rendering and searching recipes
* Full CRUD functionality for an admin (create, trash and edit recipes)
* Ability to rate (like or dislike) and save prefered recipes
* [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) for loading states
* [TipTap](https://github.com/ueberdosis/tiptap) for custom reach text editor

### Documentation

> [!IMPORTANT]  
> Make sure you've installed the latest version of [Git](https://git-scm.com/) on your machine already!

Open your terminal and clone this repository:

```bash
git clone https://github.com/artyomagadzhanyan421/react-typescript-food.git
```

Navigate to the project directory:

```bash
cd react-typescript-food
```

Install dependencies:

```bash
npm install
```

Create a ```.env``` file in the root directory, update the values as needed:

```env
VITE_API_URL=https://node-express-food.vercel.app/
VITE_PEXELS_API_KEY=W0iiGa7sv9vBnTmD1kxkF2C8yrV5SiP56y2lvkfcZgOMxAGD0wDtHf0e
VITE_LOCALHOST_API_URL=http://localhost:5000/
```

Start the development server:

```bash
npm run dev
```

The app should now be running at http://localhost:5173 (using Vite framework).