import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_login import (
    LoginManager,
    current_user,
    login_user,
    logout_user,
    login_required
)

from starter_app.models import db, User, Comment, Post, Social
from starter_app.api.user_routes import user_routes
from starter_app.api.post_routes import post_routes
from starter_app.api.auth_routes import auth_routes
from starter_app.api.feed_routes import feed_routes
from starter_app.api.social_routes import social_routes
from starter_app.api.comment_routes import comment_routes

from starter_app.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(feed_routes, url_prefix='/api/feed')
app.register_blueprint(social_routes, url_prefix='/api/social')
app.register_blueprint(comment_routes, url_prefix='/api/comments')


db.init_app(app)
Migrate(app, db)

login_manager = LoginManager(app)

# Application Security
CORS(app)
CSRFProtect(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route('/api/csrf/restore')
def restore_csrf():
    id = current_user.id if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user_id": id}


@app.route('/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return {"errors": ["Missing required parameters"]}, 400

    authenticated, user = User.authenticate(username, password)
    if authenticated:
        login_user(user)
        return {"current_user_id": current_user.id, "current_username": username}, 200

    return {"errors": ["Invalid username or password"]}, 401


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {'msg': 'You have been logged out'}, 200
