from flask import Blueprint, jsonify, request
from starter_app.models import User, Comment
from starter_app import db


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/new', methods=['POST'])
def new_comment():
    data = request.get_json()
    post_id = int(data["post_id"])
    newcomment = Comment(
                    content=data["content"],
                    user_id=data["user_id"],
                    post_id=post_id)
    db.session.add(newcomment)
    db.session.commit()
    return data['content']


@comment_routes.route('/<post_id>', methods=['GET'])
def post_comments(post_id):
    _list = Comment.query.join(User, Comment.user_id == User.id).add_columns(User.username).filter(Comment.post_id == post_id).limit(2)
    comment_list = [{"content":thing.content, "user_id":thing.user_id, "username":username} for (thing, username) in _list]
    print(comment_list)
    return jsonify(comment_list)



@ comment_routes.route('/')
def index():
    res=Comment.query.all()
    return {"comments": [{"content": comment.content, "user_id": post.user_id, "post_id": comment.post_id} for comment in res]}
