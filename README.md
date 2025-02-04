# Movie Collection Browser

## Overview
This is an Angular project that uses Tailwind CSS for styling and Cypress for testing. It is designed to be modular, scalable, and easy to set up.

## Features
- Angular framework
- Tailwind CSS for styling
- Cypress for end-to-end testing
- Organized folder structure
- Modern development tools

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/arasemami/movie-collection-browser.git
   cd movie-collection-browser
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Development Server
To start the development server, run:
```sh
ng serve
```
This will serve the application at `http://localhost:4200/`.

## Running Tests
To run Cypress tests:
```sh
npm run e2e
```

To run All Cypress tests in Command Line:
```sh
npm run e2e:ci
```

To run Unit tests:
```sh
ng test
```

## Building the Project
To build the project for production:
```sh
npm run build
```
The output will be in the `dist/` directory.


## Folder Structure
```
movie-collection-browser/
├── src/                                    # Application source code
│   ├── app/                            # Main application module and components
│   │   ├── components/         # Reusable UI components
│   │   ├── services/                # Angular services for API calls and state management
│   │   ├── models/                 # Data models
│   │   ├── app.module.ts       # Main Angular module
│   │   ├── app.component.ts # Root component
│   ├── assets/                        # Static assets (images, icons, etc.)
│   ├── environments/            # Environment-specific configurations
│   ├── main.ts                        # Application entry point
│   ├── index.html                   # Main HTML file
│   ├── styles.css                     # Global styles
├── public/                              # Static assets
├── cypress/                            # Cypress test files
│   ├── integration/                 # Test scripts
│   ├── support/                      # Cypress support files
├── angular.json                     # Angular configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── package.json                    # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── .gitignore                         # Git ignore file
├── README.md                    # Project documentation
```


