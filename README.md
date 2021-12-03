# Welcome to my api project.

##Hosted upon Heroku at [NC-Games-API]()https://nc-games-lookup.herokuapp.com/api

This is an api that holds a repository of book reviews and comments upon these reviews and users votes.
Within you will find an SQL database with the following tables:

#### Categories

#### Comments

#### Reviews

#### Users

Adding these as a suffix to the URL will return the relevant information from the tables.

This api will allow you to access these tables of information via a web browser at the hosted web address of - nc-games-lookup.herokuapp.com - using endpoints in the browser.
Entering /api as suffix to the web address will return a list of the endpoints available. parametric endpoints (:review_id for example) must be replaced by the user with a numeric value.

To view the returned items best you will need the Chrome (or equivalent) extension - JSON viewer.

## To run the Back-End on a computer

Please fork from my repository on Github and clone with the green copy code button to your VS code (or equivalent code viewer application).

In order to run the code side in VS Code or equivalent you will require two environment files:
Please create a file called ".env.test" inside which you will require the line - PGDATABASE=nc_games_test
Please create a file called ".env.development", inside which you will require the line - PGDATABASE=nc_games

You will require Node.js and Postgres to employ the use of the code side of the api. These will ideally be the most current.

Once you have these if you install any dependencies from the list inside the package.json and connect to postgres and seed the database with running the run-seed.js file through Node.
