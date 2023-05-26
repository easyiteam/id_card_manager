
## Project Installation

To install the project you need to have version 16 of Node.js and npm version 8. The first step is to run `npm install` command. Next you need to copy the `.env.example` file and name it `.env`. There are the variables for the database and the URLs:
- DB_LINK="mongodb-link-to-connect"

- JWT_SECRET="token"

- APP_URL_CLIENT= with the default value of http://localhost:3000
- APP_URL_API= with the default value of http://localhost:8080

- add your mailtrap credentials in the MAILTRAP_USER and MAILTRAP_PASSWORD

## Usage

For a token-based authentication `passport` and `passport-jwt` modules were used. Also for managing the database, `mongoose` helped. Two scripts seeding and clearing the collections and documents are found in the `/src/mongo`. The FREE version has a single table of `users` with a default user `admin@jsonapi.com` with the password `secret`.

To migrate and seed the tables the commands are:
- npm run seed
- npm run clear

To start the API you need to run the command `npm run start:dev`. For example, your React project can use it by adding in your package.json `"proxy": "http://localhost:8080/"` if in your local development. Check your .env variables to match your URLs.

It offers endpoint for login with the default users or it can register a new one. In the case of forgetting the password, the user can request a reset passsword and reset it. For getting and updating the user's profile it uses a Profile API.

Node API offers endpoints for common CRUD functionalities:
- Authentication API: login, logout, forget passwors and reset password
- Profile API: get profile, update profile
