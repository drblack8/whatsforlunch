from flask import Blueprint, jsonify, request
from starter_app.models import db, Social, User


social_routes = Blueprint('social', __name__)


@social_routes.route('/', methods=['POST'])
def new_follow():
    data = request.get_json()
    print(data)
    check = Social.query.filter_by(
        user=data["user_id"], following=data["follow_id"]).first()
    if check is None:
        new_social = Social(
            user=data["user_id"],
            following=data["follow_id"])
        db.session.add(new_social)
        db.session.commit()
        return {"message": "Followed"}
    else:
        return {"message": 'Already Following'}


@social_routes.route('/<username>')
def followed():
    data = request.get_json()
    friend = User.query.filter_by(username=username).first()
    print(data)
    check = Social.query.filter_by(
        user=data["user_id"], following=friend.id).first()
    if check is not None:
        return {"followed": True}
