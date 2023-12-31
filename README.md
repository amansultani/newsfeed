# Newsfeed Application

## Overview

Newsfeed is a web application that lists articles from the NewsAPI. The system is composed of two projects

- a backend -> developed in Laravel
- and a frontend -> built with React.
  These projects communicate through APIs to provide a seamless user experience.

## Backend

### Technologies Used

- [Laravel](https://laravel.com/)
- [NewsAPI](https://newsapi.org/)

## Frontend

### Technologies Used

- [React](https://react.dev/)
- React Router Dom
- React Query (TanStack Query)
- Material UI for design

### Installation

1. **Install PHP dependencies:** Navigate to the backend folder and run the following command

```sh
composer install
```

2. **Copy the env example to your .env file:**

```sh
cp .env.example .env
```

3. **NewsAPI Key:** Users need to obtain a NewsAPI key by registering on the [NewsAPI](https://newsapi.org/) website. Once obtained, they should provide it in the .env file under the NEWSAPI_KEY variable.

4. **Database Configuration:** Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration accordingly if you prefere to use sqlite navigate to the backend folder and run the following command.

```sh
touch database/database.sqlite
```

5. **install frontend NPM dependencies:** Navigate to the frontend folder and run the following command

```sh
npm install
```

### Setup

After installation run the following commands to complete the setup

1. **Run database migrations and seed data:** in the **backend folder** run the following command

```sh
   php artisan migrate:refresh --seed
```

2. **Start the Laravel using artisan:**

```sh
   php artisan serve
```

3. **Optional:** Run the scheduler work to retrieve the latest articles every 24 hours (optional):

```sh
   php artisan schedule:work
```

4. In the frontend folder run the following command to start node.js to build the frontend

```sh
npm start
```

## Contributing

Feel free to contribute to the development of this project. If you have any questions or encounter issues, please create an issue in the repository.
