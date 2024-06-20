from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.origins import Origins
from ..config import Config
from datetime import datetime

origins_bp = Blueprint('origins', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@origins_bp.before_request
def before_request_func():
    check_api_key()

@origins_bp.route('/origins', methods=['GET'])
def get_origins():
    origins = Origins.query.all()
    return jsonify([origin.as_dict() for origin in origins])

@origins_bp.route('/origins/<int:id>', methods=['GET'])
def get_origin_by_id(id):
    origin = Origins.query.get_or_404(id)
    return jsonify(origin.as_dict())

@origins_bp.route('/origins/<int:id>', methods=['PUT'])
def edit_origin_by_id(id):
    origin = Origins.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    origin.name = data.get('name', origin.name)
    origin.status = data.get('status', origin.status)
    origin.modified_by = data.get('modified_by', origin.modified_by)
    origin.modified_at = datetime.now(datetime.UTC)

    db.session.commit()
    return jsonify(origin.as_dict())

@origins_bp.route('/origins', methods=['POST'])
def create_new_origin():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "status", "created_by")):
        abort(400, 'Invalid data')

    new_origin = Origins(
        name=data['name'],
        status=data['status'],
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(datetime.UTC),
        created_at=datetime.now(datetime.UTC)
    )
    db.session.add(new_origin)
    db.session.commit()
    return jsonify(new_origin.as_dict()), 201

@origins_bp.route('/origins/<int:id>', methods=['DELETE'])
def delete_origin(id):
    origin = Origins.query.get_or_404(id)
    db.session.delete(origin)
    db.session.commit()
    return '', 204
