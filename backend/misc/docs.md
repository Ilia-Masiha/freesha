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
  npm run seed
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

OTP is a 5-character string consisting of 0-9 and A-Z except capital i (`I`) and capital o (`O`), because they can be confused with `1` and `0`. This gives 45,435,424 distinct OTPs.

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

## Endpoints

- `POST /register`:  
  This endpoint is used for registering a new user. This endpoint can also be used to resend the OTP. Send user information in the request body in this format:  
  ```json
  REQUEST BODY
  {
    "name": "John Doe",
    "email": "john@doe.com",
    "password": "verySecure!123"
  }
  ```
  Response body will contain a `message` about the result of your request. These status codes are expected:  
  - `400`: Validation error. More information in `message`.
  - `409`: Duplicate email. The email that you are trying to register with, already exists in the database.
  - `429`: Too many OTP requests. Wait some more time before sending an OTP request again.
  - `200`: OK. OTP is sent to the email for verification.

- `POST /verifyemail`:  
  This endpoint is used for verifying your email using the OTP that was sent to it. Send information in the request body in this format:  
  ```json
  REQUEST BODY
  {
    "email": "john@doe.com",
    "otp": "ABCDE",
  }
  ```
  Response body will contain a `message` about the result of your request. If successful, `data` will also contain information about the verified user. Response body will be in this format (If status code is `201`):  
  ```json
  RESPONSE BODY
  {
    "message": "ثبت نام با موفقیت انجام شد",
    "data": {
      "id": 5,
      "name": "John Doe",
      "email": "john@doe.com",
      "roleName": "user",
      "createdAt": "2025-10-02T11:52:24.977Z",
      "updatedAt": "2025-10-02T11:52:24.977Z"
    }
  }
  ```
  If status code is `201`, a session key will be sent as an `httponly` cookie. These status codes are expected:  
  - `400`: Validation error. More information in `message`.
  - `401`: Invalid OTP.
  - `201`: Successfully verified the OTP and created the user in database.

- `POST /login`:  
  This endpoint is used for logging in. Send information in the request body in this format:  
  ```json
  REQUEST BODY
  {
    "email": "john@doe.com",
    "password": "verySecure!123",
  }
  ```
  Response body will contain a `message` about the result of your request. If successful, `data` will also contain information about the logged in user. Response body will be in this format (If status code is `200`):  
  ```json
  RESPONSE BODY
  {
    "message": "شما با موفقیت وارد شدید",
    "data": {
      "id": 5,
      "name": "John Doe",
      "email": "john@doe.com",
      "roleName": "user",
      "createdAt": "2025-10-02T11:52:24.977Z",
      "updatedAt": "2025-10-02T11:52:24.977Z"
    }
  }
  ```
  If status code is `200`, a session key will be sent as an `httponly` cookie. These status codes are expected:  
  - `400`: Validation error. More information in `message`.
  - `401`: Bad credentials.
  - `200`: Successfully logged in.

- `PATCH /users` (Protected):  
  This endpoint is used for editing a user's information. Send information in the request body in this format:  
  ```json
  REQUEST BODY
  {
    "name": "John Doe",
    "postalCode": "0123456789",
    "homeAddress": "221B Baker St. London",
    "genderId": 2,
    "jobTitle": "Front-End Web Developer",
    "bio": "Hi. This is some information about me",
    "birthDate": "1999-01-20",
    "skills": [
      "Cooking",
      "Coding"
    ],
    "languageCodes": [
      "fa",
      "en"
    ]
  }
  ```
  All of the properties are optional, but the request body must contain at least one property. Including a property but leaving it empty (`""` or `[]`) is the equivalent of removing that record from the user's profile. `birthDate` can't set to be `""`.  
  Response body will contain a `message` about the result of your request. If successful, `data` will also contain information about the updated user. Response body will be in this format (If status code is `200`):  
  ```json
  RESPONSE BODY
  {
    "message": "اطلاعات کاربر با موفقیت بروزرسانی شد",
    "data": {
      "id": 5,
      "name": "John Doe",
      "email": "john@doe.com",
      "roleName": "user",
      "postalCode": "0123456789",
      "homeAddress": "221B Baker St. London",
      "genderName": "M",
      "jobTitle": "Hello brother",
      "bio": "Hi. This is some information about me",
      "birthDate": "1999-01-20",
      "createdAt": "2025-10-02T11:52:24.977Z",
      "updatedAt": "2025-10-17T18:40:02.152Z",
      "lastLoginAt": "2025-10-17T18:39:37.428Z",
      "skills": [
        "Cooking",
        "Coding"
      ],
      "languages": [
        "فارسی",
        "انگلیسی"
      ]
    }
  }
  ```
  These status codes are expected:  
  - `400`: Validation error. More information in `message`.
  - `401`: Invalid session key.
  - `200`: Successfully updated user information.