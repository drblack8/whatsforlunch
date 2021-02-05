[![Live Link][live-link-shield]][live-link-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![LinkedIn][linkedin-shieldd]][linkedin-urld]
[![LinkedIn][linkedin-shieldj]][linkedin-urlj]
[![LinkedIn][linkedin-shieldq]][linkedin-urlq]

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

<br /><br />

<p align="center">
  <a target="_blank" href="https://aawhatsforlunch.herokuapp.com/">
    <img src="https://lh3.googleusercontent.com/aYB09lIocwN8ywybNQwEvJ1AaLbA0Fa_MDj82M09wv-mcqW3RzNryYb7-lzqM3hVqZ5lnnGJfSDI_0BrNsOgvUe6XYzk5jIcinsD3V0UMCm8k4QYK-Uk4gj9B4EHbl6ZEur5qjyoog=w2400" alt="WFL" height="400">
  </a>
</p>

<br /><br />

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


## Features / MVP
-----------------
- [x] Images
- [x] Likes
- [x] Commenting on images
- [x] Following & Photo feed
- [x] login with auth
- [x] signup
​
​
## Features - Reach
--------------------
- [ ] Bonus: direct messaging
- [ ] Bonus: hashtags
- [ ] Bonus: OAuth
- [ ] Bonus: Dark Theme
​
​
## Tables
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
## Pages & Routes
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

<br /><br /><br />







[live-link-shield]: https://img.shields.io/badge/-LiveLink-yellow?style=for-the-badge&logo=yellow
[live-link-url]: https://aawhatsforlunch.herokuapp.com/
[linkedin-shield]: https://img.shields.io/badge/-Andrea-yellow.svg?style=for-the-badge&logo=linkedin&colorB=yellow
[linkedin-url]: https://www.linkedin.com/in/andrea-jackson1/
[linkedin-shieldd]: https://img.shields.io/badge/-Dan-yellow.svg?style=for-the-badge&logo=linkedin&colorB=yellow
[linkedin-urld]: https://www.linkedin.com/in/danielrobertblack/
[linkedin-shieldj]: https://img.shields.io/badge/-Jaron-yellow.svg?style=for-the-badge&logo=linkedin&colorB=yellow
[linkedin-urlj]: https://www.linkedin.com/in/jarondegen/
[linkedin-shieldq]: https://img.shields.io/badge/-Quincy-yellow.svg?style=for-the-badge&logo=linkedin&colorB=yellow
[linkedin-urlq]: hhttps://www.linkedin.com/in/don-quincy-jones/
