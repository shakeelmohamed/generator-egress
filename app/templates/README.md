<%= siteName %>: built with egress
====

### Development with Foreman:

1. Create a `.env` file in the root directory of this project
2. Your `.env` file should contain your PostgreSQL connection string in the following format, the `?ssl=true` bit is necessary only if your database connection requires SSL (Heroku's databases do):
    ```
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>?ssl=true
    ```
This will allow your application to connect to your database

3. Modify the `config` object in `config.js`
4. Running `foreman start` will process the `DATABASE_URL` variable, locally.

### Deploying to Heroku:

1. Authenticate via the Heroku command line, `heroku login`
2. Set your environment variables on Heroku
    * If you've already setup your `.env` file as documented above, simply run `heroku config:push`
    * Otherwise you can run the following command before `heroku config:push`
    `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>?ssl=true`
3. Modify the `config` object in `config.js`
4. Push your code up to your Heroku app, done

## Modifying site content

* See the `jade` directory for various markup files used to create the web views.
* See the `controllers` directory for specific functionality for the views, along with the files in `routes` for how they're invoked.
* Add additional frontend assets to the `public` directory, then reference them in the files found in `jade/includes`, particularly `head.jade` and `scripts.jade`