from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db, Comment
import datetime
from sqlalchemy.orm import joinedload

post_routes = Blueprint('posts', __name__)


@post_routes.route('/new', methods=['POST'])
def new_post():
    data = request.get_json()
    newpost = Post(image_url=data["image_url"],
                   user_id=data["user_id"],
                   desc=data["desc"],
                   date=datetime.datetime.now())

    db.session.add(newpost)
    db.session.commit()
    print(newpost)
    return data['image_url']


@post_routes.route('/feed')
def index():
    res = Post.query.all()
    return {"posts": [{"id": post.id,"image_url": post.image_url, "user_id": post.user_id, "desc": post.desc, "date": post.date} for post in res]}


# @post_routes.route('/post/<post_id>')
# def single_post(post_id):
#     response = Post.query.get(post_id)
#     return {"post": {"image_url": response.image_url, "user_id": response.user_id, "desc": response.desc}}


@post_routes.route('/get/<int:post_id>', methods=['GET'])
def get_post(post_id):
    print('======================', post_id)
    single_post = Post.query.join(User, Post.user_id == User.id).options(joinedload(Post.users)).filter(Post.id == post_id).order_by(Post.date.desc())
    post = [post.to_dict() for post in single_post]
    _list = Comment.query.join(User, Comment.user_id == User.id).add_columns(
            User.username).filter(Comment.post_id == post[0]["id"]).order_by(
            Comment.id.desc())
    # single_post = *post
    post[0]["comments"] = [{"content": thing.content, "user_id": thing.user_id, "username": username} for (thing, username) in _list]
    return jsonify(post)