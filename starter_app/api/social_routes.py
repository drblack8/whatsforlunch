from flask import Blueprint, jsonify, request
from starter_app.models import db, Social


social_routes = Blueprint('social', __name__)


@social_routes.route('/', methods=['POST'])
def new_follow():
    data = request.get_json()
    new_social = Social(
        user=data["user_id"],
        following=data["follow_id"])
    db.session.add(new_social)
    db.session.commit()
    return data['user_id']