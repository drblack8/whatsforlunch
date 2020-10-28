from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('/<int:userId>', methods=['GET'])
def get_feed(userId):
    user_id = userId
    feed = Post.query.join(User, Post.user_id == User.id).add_columns(User.username).filter(Post.user_id == user_id).order_by(Post.id.desc())
    return jsonify({"feed": [{"image_url": post.image_url, 
                              "user_id": post.user_id, 
                              "username": username, 
                              "desc": post.desc,
                              "date": post.date} 
                              for post, username in feed]})