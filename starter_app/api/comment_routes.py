from flask import Blueprint, jsonify, request
from starter_app.models import User, Comment, db


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/new', methods=['POST'])
def new_comment():
    data = request.get_json()
    newcomment = Comment(
                    content=data["content"],
                    user_id=1,
                    post_id=data["post_id"]),
    db.session.add(newcomment)
    db.session.commit()
    print(newcomment)
    return data['content']


@comment_routes.route('/')
def index():
    res = Comment.query.all()
    return {"comments": [{"content": comment.content, "user_id": post.user_id, "post_id": comment.post_id} for comment in res]}
