# Newsfeed Application

## Overview

Newsfeed is a web application that lists articles from the NewsAPI. The system is composed of two projects - a backend developed in Laravel and a frontend built with React. These projects communicate through APIs to provide a seamless user experience.

## Backend

### Technologies Used

- Laravel
- MySQL (as the database)
- NewsAPI

### Configuration

1. **NewsAPI Key:** Users need to obtain a NewsAPI key by registering on the NewsAPI platform. Once obtained, they should provide it in the .env file under the NEWSAPI_KEY variable.

2. **Database Configuration:** Users should configure their database settings in the .env file.

### Setup

After configuring the .env file:

1. Run database migrations and seed data:
   php artisan migrate:refresh --seed

2. Start the Laravel using artisan:
   php artisan serve

3. Optional: Run the scheduler work to retrieve the latest articles every 24 hours (optional):
   php artisan schedule:work

## Frontend

### Technologies Used

- React
- React Router Dom
- React Query (TanStack Query)
- Material UI

### Setup

1. Navigate to the frontend folder:
   cd frontend

2. Install dependencies:
   npm install

## Contributing

Feel free to contribute to the development of this project. If you have any questions or encounter issues, please create an issue in the repository.
