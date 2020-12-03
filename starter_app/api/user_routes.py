from flask import Blueprint, jsonify, request
from starter_app.models import User, db
from flask_login import current_user, login_required
from starter_app.forms import SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/<user_name>')
@login_required
def index(user_name):
    response = User.query.filter(User.username == user_name).one()
    return jsonify(response.to_dict())


@user_routes.route('/by_id/<user_id>')
@login_required
def index_by_id(user_id):
    response = User.query.filter(User.id == user_id).one()
    return jsonify(response.to_dict())


@user_routes.route('/<currentUserId>', methods=["GET"])
@login_required
def user(currentUserId):
    response = User.query.get(currentUserId)
    return {"user": response.to_dict()}


@user_routes.route('/new', methods=["POST"])
def new_user():
    sign_up_form = SignUpForm()
    if sign_up_form.validate():
        data = request.get_json()
        new_user = User(username=data["username"],
                        email=data["email"],
                        password=data["password"])
        db.session.add(new_user)
        db.session.commit()
    else:
        return jsonify(success=False, errors=sign_up_form.errors), 400
    return jsonify('ok')


@user_routes.route('/search/<search_string>', methods=["GET"])
@login_required
def search_route(search_string):
    response = User.query.filter(
        User.username.ilike(f'%{search_string}%')).limit(15)
    user_list = [user.username for user in response]
    return jsonify(user_list)


@user_routes.route('/profile_pic', methods=["POST"])
@login_required
def change_pic_url():
    try:
        data = request.get_json()
        user = User.query.filter(User.id == data["user_id"]).one()
        user.pic_url = data["image_url"]
        db.session.commit()
        return jsonify('profile pic changed')
    except:
        return jsonify('something went wrong')

