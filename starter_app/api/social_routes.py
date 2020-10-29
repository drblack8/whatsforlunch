from flask import Blueprint, jsonify, request
from starter_app.models import User, Post, db, Social


social_routes = Blueprint('social', __name__)


@feed_routes.route('/<int:user_id>', methods=['GET'])
