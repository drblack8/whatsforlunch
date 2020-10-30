from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db, Social, Comment


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('/<int:user_id>', methods=['GET'])
def get_feed(user_id):
    socials = Social.query.filter(Social.user == user_id)
    social_list = [{"user": social.user, "following": social.following}
                   for social in socials]
    friends = [thing["following"] for thing in social_list]
    posts_array = []
    self_feed = Post.query.join(User, Post.user_id == User.id).add_columns(
        User.username).filter(Post.user_id == user_id).order_by(Post.id.desc())
    for social in social_list:
        person_posts = Post.query.join(User, Post.user_id == User.id).add_columns(
            User.username).filter(Post.user_id == social['following']).order_by(Post.id.desc())
        posts_array = [*posts_array, [{"image_url": thing.image_url, "user_id": thing.user_id,
                                       "id": thing.id,
                                       "username": username,
                                       "desc": thing.desc,
                                       "date": thing.date} for (thing, username) in person_posts]]
    posts_array = [*posts_array, [{"image_url": thing.image_url, "user_id": thing.user_id,
                                   "id": thing.id,
                                   "username": username,
                                   "desc": thing.desc,
                                   "date": thing.date} for (thing, username) in self_feed]]
    new_arr = []
    for arr in posts_array:
        new_arr = [*new_arr, *arr]
    sorted_arr = sorted(new_arr, key=lambda k: k['date'], reverse=True)
    comment_list = []
    for post in sorted_arr:
        _list = Comment.query.join(User, Comment.user_id == User.id).add_columns(
            User.username).filter(Comment.post_id == post["id"]).limit(2)
        # comment_list = [*comment_list, [{"content":thing.content, "user_id":thing.user_id, "username":username} for (thing, username) in _list]]
        post["comments"] = [{"content": thing.content, "user_id": thing.user_id,
                             "username": username} for (thing, username) in _list]
    return jsonify({"posts": sorted_arr, "comments": comment_list})
