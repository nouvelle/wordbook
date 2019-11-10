“This was created during my time as a student at Code Chrysalis”

# Word Book 🗒️

![image](https://github.com/nouvelle/wordbook/blob/master/images/2_main-page.png?raw=true)

1. [About](#About)
1. [Environment](#Environment)
1. [Installation](#Installation)
1. [Other command](#Other%20command)
1. [How To Use API](#How%20To%20Use%20API)
1. [Credits](#Credits)
1. [Contributing](#Contributing)
1. [License](#License)

# About

This is a Japanese / English word book app.  
You can customize your word book to suit your needs.

# Environment

- Postgres  
  You will need postgres installed. If you haven't installed it already, download and install the PostgresApp and verify its working by running the command psql in your terminal.

Create a database for this project by running:

```bash
$ echo "CREATE DATABASE voca;" | psql
```

# Installation

To clone and run this application, you'll need Git and Node.js (which comes with yarn) installed on your computer.  
From your command line:

**Downloading and installing steps**

1. Clone this repository

```bash
$ git clone https://github.com/nouvelle/wordbook.git
```

2. Go into the repository

```bash
$ cd wordbook
```

3. Install dependencies

```bash
$ yarn
```

4. Run migrations and set up the database

```bash
$ yarn migrate
```

5. Run the app

```bash
$ yarn start
```

# Other command

- To roll back migrations

```bash
$ yarn rollback
```

- To run tests

```bash
$ yarn test
```

- To insert test data

```bash
$ yarn seed
```

# How To Use API

Explain URL : `/explain_api_url.html`

![aboutPage](https://github.com/nouvelle/wordbook/blob/master/images/4_API-page.png?raw=true)

- `GET /api/list`

  - To get your data

- `POST /api/list`

  - To add your data

- `DELETE /api/list`

  - To delete your data

- `PATCH /api/list`
  - To update your data

# Credits

This software uses the following open source packages:

- Express
- Knex

# Contributing

Pull requests are welcome!! 😊

# License

[MIT](https://choosealicense.com/licenses/mit/)

![topPage](https://github.com/nouvelle/wordbook/blob/master/images/1_top-page.png?raw=true)
