[![Live Link][live-link-shield]][live-link-url]

<br/>

<p align="center">
  <a target="_blank" href="https://aawhatsforlunch.herokuapp.com/">
    <img src="client/src/style/images/WFL.jpg" alt="WFLLogo" height="200">
  </a>
</p>

<br/><br/>

# About The Project
Whatsforlunch is a clone of instagram, but solely catered towards food. A user can upload pictures, post comments, follow friends, and like posts.

<br/>

## Built With
We developed this full-stack application using a JavaScript / React frontend and a Python / Flask backend.
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/flask/flask.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sql/sql.png">
<img align="left" height="20" src="https://wtforms.readthedocs.io/en/stable/_static/wtforms.png">
<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png">
<img align="left" height="20" src="https://www.sqlalchemy.org/img/sqla_logo.png">
<img align="left" height="20" src="https://pypi.org/static/images/logo-small.6eef541e.svg">
​
<br/><br/>

* [React](https://reactjs.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)
* [PostgreSQL](https://www.postgresql.org/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Alembic](https://alembic.sqlalchemy.org/en/latest/)

Deployed with:
* [<img alt="Heroku icon" src="https://img.icons8.com/color/452/heroku.png" align="left" height="20">](https://www.heroku.com/) [Heroku](https://www.heroku.com/)

Packaged with:
* [<img align="left" height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png">](https://www.docker.com/) [Docker](https://www.docker.com/)

<br />

## User Stories
----------------
​-uploading an image as an user
   -where is the uploading coming from?
      -upload link in the nav bar

-how is the feed going to work?
   -how are you going to model out followers?
   -how will follows work?
   -how will newsfeed be organized
      -chronologically
   -how do you follow someone?
      -follow button on user profile

-username or userid in url?
   -what is on the profile page?
      -pictures that the user has uploaded
      -profile picture
      -number of posts
      -bio
      -number following, number followers


# Features - MVP
-----------------
- [x] Images
- [ ] Likes
- [x] Commenting on images
- [x] Following & Photo feed
- [x] login with auth
- [x] signup
​
​
# FEATURES - Reach
--------------------
- [ ] Bonus: direct messaging
- [ ] Bonus: hashtags
- [ ] Bonus: OAuth
- [ ] Bonus: Dark Theme
​
​
# Tables
----------
- Users
    -id
    -userName
    -hashedPassword
    -dateCreated
- Posts
    -id
    -liked(bool)
    -url
    userId
- Hashtags
    -array?
- DMs
    -senderid
    -friendid
    -time
    -message
- Comments
    -id
    -postId
    -comment
    -userId
    -time
- Follows(join)
    -userId
    -friendId
​
​
# Pages & Routes
-----------------
​
`/` Home
----------
​
`/sign-up` Sign-Up
--------------------
​
`/login` Login
----------------
​
`logout` Logout
-----------------
​
`/profile/:username` user profile with pictures
------------------------------------------------
​
`/hashtags/:hashtag` filtered timeline
---------------------------------------
​
`photofeed/userid` Main news feed after login
-----------------------------------------------


# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository

2. Install dependencies
   ```bash
   pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   python -m database && flask run
   ```
6. To run the React App in development, checkout the [README](./client/README.md) inside the client directory.




***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***


## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run
   ```bash
   heroku login
   ```
5. Login to the heroku container registry
   ```bash
   heroku container:login
   ```
6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry
   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```
8. Release your docker container to heroku
   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```
9. set up your database:
   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} python -m database
   ```
10. Under Settings find "Config Vars" and add any additional/secret .env variables.
11. profit






[live-link-shield]: https://img.shields.io/badge/-LiveLink-yellow?style=for-the-badge&logo=yellow
[live-link-url]: https://aawhatsforlunch.herokuapp.com/
