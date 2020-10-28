from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db


post_routes = Blueprint('posts', __name__)


@post_routes.route('/new', methods=['POST'])
def new_post():
    data = request.get_json()
    newpost = Post(image_url=data["image_url"],
                   user_id=1,
                   desc=data["desc"])
    db.session.add(newpost)
    db.session.commit()
    print(newpost)
    return data['image_url']


@post_routes.route('/feed')
def index():
    res = Post.query.all()
    return {"posts": [{"image_url": post.image_url, "user_id": post.user_id, "desc": post.desc} for post in res]}
