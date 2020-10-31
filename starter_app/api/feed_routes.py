from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db, Social, Comment
from sqlalchemy.orm import joinedload


feed_routes = Blueprint('feed', __name__)

@feed_routes.route('/<int:user_id>', methods=['GET'])
def get_feed(user_id):
    socials = Social.query.filter(Social.user == user_id)
    social_ids = [social.following for social in socials]
    social_ids.append(user_id)
    feed = Post.query.join(User, Post.user_id == User.id).options(
        joinedload(Post.users)).filter(Post.user_id.in_(social_ids)).order_by(Post.date.desc()).all()
    posts = [post.to_dict() for post in feed]
    for post in posts:
        _list = Comment.query.join(User, Comment.user_id == User.id).add_columns(
            User.username).filter(Comment.post_id == post["id"]).order_by(Comment.id.desc())
        post["comments"] = [{"content": thing.content, "user_id": thing.user_id,
                             "username": username} for (thing, username) in _list]
    return jsonify({"posts": posts})
