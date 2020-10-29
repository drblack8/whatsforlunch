from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db, Social


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('/<int:userId>', methods=['GET'])
def get_feed(userId):
    user_id = userId
    socials = Social.query.filter(Social.user == user_id)
    social_list = [{"user": social.user, "following": social.following} for social in socials]
    posts_array = []
    self_feed = Post.query.join(User, Post.user_id == User.id).add_columns(User.username).filter(Post.user_id == user_id).order_by(Post.id.desc())
    for social in social_list:
        person_posts = Post.query.join(User, Post.user_id == User.id).add_columns(User.username).filter(Post.user_id == social['following']).order_by(Post.id.desc())
        posts_array = [*posts_array, [{"image_url": thing.image_url,"user_id": thing.user_id,
                        "id": thing.id,
                        "username": username,
                        "desc": thing.desc,
                        "date": thing.date} for (thing, username) in person_posts]]
    posts_array = [*posts_array, [{"image_url": thing.image_url,"user_id": thing.user_id,
                        "id": thing.id,
                        "username": username,
                        "desc": thing.desc,
                        "date": thing.date} for (thing, username) in self_feed]]
    new_arr = []
    for arr in posts_array:
        new_arr = [*new_arr, *arr]
    sorted_arr =  sorted(new_arr, key=lambda k: k['date'], reverse=True)
    return jsonify(sorted_arr)
