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


## Code Structure
The project follows a modular and feature-based architecture, making it scalable and maintainable. Below is an overview of the directory structure:  

```
src  
│-- app  
│   │-- movie  
│   │   │-- components  
│   │   │   │-- movie-detail/       # Displays detailed movie information  
│   │   │   │-- movie-list/         # Lists all available movies  
│   │   │-- services/               # Handles API calls and business logic  
│   │   │   │-- facade/             # Centralized movie data management  
│   │   │   │-- state/              # State management (e.g., NgRx, signals, or BehaviorSubject)  
│   │-- not-found/                  # Handles 404 pages  
│   │-- shared/  
│   │   │-- components/             # Reusable UI components  
│   │   │   │-- header/             # Navigation header  
│   │   │   │-- loading-spinner/    # Loader for async operations  
│   │   │   │-- movie-card/         # Reusable movie card component  
│   │   │   │-- watchlist-button/   # Button for adding/removing movies from watchlist  
│   │   │-- constant/               # Constants used across the application  
│   │   │-- interfaces/             # TypeScript interfaces for data models  
│   │   │-- services/               # Shared services used across modules  
│   │-- watchlist/  
│   │   │-- components/             # Components related to the user's watchlist  

cypress
│-- downloads/ # Stores downloaded files during tests
│-- fixtures/ # Mock data for testing
│ │-- movie/ # Fixtures related to movie tests
│ │-- watchlist/ # Fixtures related to watchlist tests
│-- support/ # Custom commands and utility functions
│ │-- step_definitions/ # Step definitions for BDD-style tests
│-- videos/ # Recorded test execution videos
│ │-- movie/ # Test recordings for movie-related tests
│ │-- watchlist/ # Test recordings for watchlist-related tests

```


### 🔹 **Key Highlights**  
✅ **Feature-Based Organization:** Each feature (Movie, Watchlist, Not Found) is self-contained.  
✅ **Shared Module:** Common components, constants, and services are placed in a `shared` directory to avoid redundancy.  
✅ **State Management:** Uses a dedicated `state` folder for handling application state (e.g., NgRx, signals, or RxJS).  
✅ **Facade Pattern:** A `facade` layer abstracts service complexities, improving maintainability.  
✅ **End-to-End Testing:** Cypress is used for automated testing with structured fixtures, step definitions, and video recordings.  

This structure ensures **scalability, reusability, and easy maintenance** as the project grows. 🚀  


