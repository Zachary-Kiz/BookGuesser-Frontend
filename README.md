# BookGuesser Frontend

Link to project: [BookGuesser.app](https://bookguesser.app/today)

## Overview

BookGuesser is a daily puzzle game where players attempt to identify a book based on a pixelated cover image. Each day, a new book is selected, and users have six guesses to determine the correct title. With each incorrect guess, the cover becomes progressively clearer, giving players more clues while maintaining the challenge.

This repository contains the frontend application for BookGuesser, built with modern web technologies to provide a responsive and interactive user experience.

## Features

- Daily book cover guessing game
- Progressive image reveal system with six levels of pixelation
- User authentication and persistent sessions
- Player statistics and score tracking
- Friend system for comparing scores with other users
- Responsive design optimized for desktop and mobile devices

## Technical Overview

The frontend was developed using:

- **Next.js** - React framework for building the application and managing routing
- **React** - Component-based UI development
- **TypeScript** - Type-safe frontend development
- **Tailwind CSS** - Responsive styling and UI design

The frontend communicates with a Spring Boot backend through RESTful APIs to handle:
- User authentication
- Daily puzzle retrieval
- Guess validation
- User statistics
- Friend management
