from flask import Blueprint, jsonify, request
from starter_app.models import User, db
from flask_login import current_user, login_required

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}

@user_routes.route('/<currentUserId>', methods=["GET"])
@login_required
def user(currentUserId):
    response = User.query.get(currentUserId)
    return {"user": response.to_dict()}


@user_routes.route('/new', methods=["POST"])
def new_user():
    try:
        data = request.get_json()
        new_user = User(username=data["username"], email=data["email"], password=data["password"])
        db.session.add(new_user)
        db.session.commit()
    except:
        return jsonify(data)
    return jsonify('ok')