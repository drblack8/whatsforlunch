from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('/<int:userId>', methods=['GET'])
def get_feed(userId):
    user_id = userId
    feed = Post.query.filter(Post.user_id == user_id)
    return jsonify({"feed": [{"image_url": post.image_url, "user_id": post.user_id, "desc": post.desc} for post in feed]})