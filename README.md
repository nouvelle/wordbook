“This was created during my time as a student at Code Chrysalis”

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

6. Open the app in web browser

```
http://localhost:3000/
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

- GET

```bash

```

- POST

```bash

```

- DELET

```bash

```

- PATCH

```bash

```

# Credits

This software uses the following open source packages:

- Express
- Knex

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License

[MIT](https://choosealicense.com/licenses/mit/)
