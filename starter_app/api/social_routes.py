from flask import Blueprint, jsonify, request
from starter_app.models import db, Social, User


social_routes = Blueprint('social', __name__)


@social_routes.route('/', methods=['POST'])
def new_follow():
    data = request.get_json()
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


@social_routes.route('/<friend>')
def followed(friend):
    profile = friend.split('-@')[0]
    current = int(friend.split('-@')[1])
    friendName = User.query.filter_by(username=profile).first()
    try:
        check = Social.query.filter_by(
            user=current, following=friendName.id).one()
    except:
        return jsonify({"followed": False, "id": friendName.id})
    return jsonify({"followed": True, "id": friendName.id})


@social_routes.route('/')
def index():
    res = Social.query.all()
    return {"social": [{"user": social.user, "following": social.following} for social in res]}
