# freesha-backend

This is the documentation for the backend of freesha.

## Installation

1. First, install these softwares:
  - [Node.js](https://nodejs.org)
  - [NPM](https://www.npmjs.com/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Redis](https://redis.io/)

2. Create a database in PostgreSQL using psql or pgAdmin:
  ```sql
  CREATE DATABASE "freesha";
  ```

3. After cloning [freesha](https://github.com/Ilia-Masiha/freesha), go inside the `backend` directory and run all the shell commands there.

4. Install dependencies:
  ```sh
  npm install
  ```

5. Run migration commands:
  ```sh
  npm run generate
  npm run migrate
  ```

6. Create a new email address or use your own email address for OTP sending. If you want to use your own email address, read the next section: [OTP](https://github.com/ilia-abbasi/freesha/blob/main/backend/misc/docs.md#otp)

7. Create the `.env` file outside the `backend` directory, in the root of this repository:
  ```env
  DATABASE_URL=postgresql://user:pass@localhost:5432/freesha
  REDIS_URL=redis://127.0.0.1:6379
  EMAIL_SERVICE=gmail
  EMAIL_USER=john@doe.com
  EMAIL_PASS=aaaabbbbccccdddd
  ```

8. Make sure Redis is already running

## OTP

To use your own email address for sending OTPs, follow these steps (GMAIL):

  1. Go to your google account settings.
  2. In the `Security` section, enable 2FA.
  3. Then go to `App passwords` and make a new password to use it in this project. You can call the new app `freesha`.
  4. The password must be a 16-character string containing a-z.
  5. Put this password in `EMAIL_PASS` environment variable.
  6. Put your own email address in `EMAIL_USER` environment variable.
  7. Put `gmail` in `EMAIL_SERVICE` environment variable.

## Running

You can either use `npm run dev` to run the backend in watch mode, or build it first and then run the Javascript files instead:  
  ```sh
  npm run build
  npm run start
  ```

## Response format

Every response has a `message` and `data` property:

  - `message`: This is a string explaining the response.
  - `data`: This could either be an array or an object based on the type of request. For example if you requested the list of users, you should expect `data` to be an array, but if you requested the information of a single user, you should expect `data` to be an object.