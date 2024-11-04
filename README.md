
# React Web Scraper

This project is a single-page web application (SPA) built with React and TypeScript. It provides a modern, interactive interface with the following key features:

- **Axios** to interact with a backend API service.
- **Auth0** for authentication.
- **React Router** for routing.
- **Redux** for state management.
- **Tailwind CSS** and **ShadCN** for component building and styling.

## Setup

### 1. Install Dependencies
First, ensure that **Yarn** is installed, and then install project dependencies:

```bash
# Install Yarn globally
npm install -g yarn

# Install project dependencies
yarn
```

### 2. Setup Environment Variables
Copy the `.env.example` file to `.env`

```zsh
cp .env.example .env
```
Configure the following variables:
```bash
# React
PORT=3000

# Auth0
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_AUDIENCE=
REACT_APP_AUTH0_DOMAIN=${AUTH0_DOMAIN}
REACT_APP_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
REACT_APP_AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
REACT_APP_REDIRECT_URL=http://localhost:3000
REACT_APP_API_SERVER_URL=http://localhost:5011/api
```

### 3. Run the Application
To start the application in development mode, use the following command:

```bash
yarn start
```

The application should now be running at `http://localhost:3000`.

## Additional Information

- **Auth0**: Ensure that `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_AUDIENCE` are configured for your Auth0 application.
- **Backend API**: The app assumes the backend API server is running at `http://localhost:5011/api`.
- **Routing**: The app uses React Router for navigation between different pages.
- **State Management**: Redux is used to manage the application state.
- **Styling**: Tailwind CSS and ShadCN are used to style components for a consistent and customizable UI.
