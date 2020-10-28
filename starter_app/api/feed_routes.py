from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db, Social


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('/<int:userId>', methods=['GET'])
def get_feed(userId):
    user_id = userId
    # socials = Social.query.filter(Social.user == user_id)
    # print('sajkdhfkasdlfjhalksdjfh', socials)
    # social_feed = []
    # for social in socials:
    #     person_posts = Post.query.join(User, Post.user_id == User.id).add_columns(User.username).filter(Post.user_id == social.following).order_by(Post.id.desc())
    #     print('jkashdaklsjhdhd', person_posts)
    #     for person_post in person_posts:
    #         social_feed.append({"image_url": person_post.image_url,
    #                           "user_id": person_post.user_id,
    #                           "username": username,
    #                           "desc": person_post.desc,
    #                           "date": person_post.date})
    # return jsonify(social_feed)
    feed = Post.query.join(User, Post.user_id == User.id).add_columns(User.username).filter(Post.user_id == user_id).order_by(Post.id.desc())
    return jsonify({"feed": [{"image_url": post.image_url,
                              "user_id": post.user_id,
                              "username": username,
                              "desc": post.desc,
                              "date": post.date}
                              for post, username in feed]})
