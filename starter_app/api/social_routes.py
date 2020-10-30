from flask import Blueprint, jsonify, request
from starter_app.models import db, Social


social_routes = Blueprint('social', __name__)


@social_routes.route('/', methods=['POST'])
def new_follow():
    e
    data = request.get_json()
    new_social = Social(
        user=data["user_id"],
        following=data["follow_id"])
    db.session.add(new_social)
    db.session.commit()
    return data['user_id']

@ social_routes.route('/')
def index():
    res=Social.query.all()
    return {"social": [{"user": social.user, "following": social.following} for social in res]}
