# All Leagues

## Project Overview

All Leagues is a frontend Single Page Application (SPA) for exploring sports leagues in a clean, dashboard-style interface.

The application:

- displays football and other sports leagues
- supports fast searching and filtering
- renders leagues as cards in a responsive grid
- focuses on a simple, readable, and efficient user experience

This repository contains only the frontend. The backend already exists and exposes the API used by this app.

## Technology Stack

The project is built with:

- Angular
- TypeScript
- REST API integration (frontend consumes existing backend endpoints)

## Project Architecture

The frontend is structured with a modular Angular approach:

- UI built from Angular components
- API communication handled by services
- domain models and mappers used for stable data flow
- feature-oriented folders for maintainability
- responsive, card-based layout for desktop and mobile

## Development Approach

This project was generated and organized using SpecKit.

SpecKit was used to define:

- a project specification
- a project constitution
- development guidelines

Implementation follows an AI-assisted workflow where feature specs, plans, and task artifacts guide development in a consistent and traceable way.

## Installation

1. Clone the repository:

```bash
git clone git@github.com:vmaksym/all-leagues.git
cd all-leagues
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## Running the Project

Use either command below to run the Angular development server:

```bash
npm start
```

or

```bash
ng serve
```

After startup, open:

```text
http://localhost:4200
```

## Project Structure

Main project folders:

- `src/app/leagues` - feature UI components and local state for leagues
- `src/app/core/services` - API communication and data mapping
- `src/app/core/models` - domain model definitions
- `src/app` - app shell, routing, and global app composition
- `public` - static public files
- `specs/001-all-leagues` - SpecKit artifacts (specification, plan, research, tasks, contracts)

## Design Principles

The UI direction is based on:

- clean dashboard layout
- minimalistic interface with high readability
- card-based league presentation
- responsive behavior across device sizes
- sports-inspired visual language

## Additional Notes

- Angular CLI version: 21.2.1
- Build command: `npm run build`
