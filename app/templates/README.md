<%= siteName %>: built with generator-egress
====

### Getting Started:

1. If it does not exist, create a `.env` file in the root directory of this project.
2. Your `.env` file should contain your PostgreSQL connection string in the following format, the `?ssl=true` query parameter is necessary only if your database connection requires SSL (Heroku's databases do) and will default to false if omitted:
    ```
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>?ssl=true
    ```
This will allow your application to connect to your database

3. Modify the `config` object in `config.js` to modify the application settings.
4. Running `foreman start` will serve the application on the post listed in config.js (defaulting to 5000),
and process the `DATABASE_URL` variable, locally. *Alternatively, running `node app.js` will do the same thing if you don't want to use foreman.*

### Deploying to Heroku:

1. Authenticate via the Heroku command line, `heroku login`
2. Set your environment variables on Heroku
    * If you've already setup your `.env` file as documented above, simply run `heroku config:push`
    * Otherwise you can run the following command:
    `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>?ssl=true`
    Then run `heroku config:push`
3. Push your code up to your Heroku app
4. You're done!

## Modifying site content

* The `jade` directory contains files for various markup files used to generate web pages.
* The `controllers` directory contains files for specific functionality for views, along with the files in `routes` for how they're invoked.
* Add additional frontend assets to the `public` directory, then reference them in the files found in `jade/includes`, particularly `head.jade` and `scripts.jade`