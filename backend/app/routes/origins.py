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

@origins_bp.route('/origins', methods=['GET'])
def get_origins():
    check_api_key()
    # Capturando os parâmetros de consulta
    status = request.args.get('status')
    limit = request.args.get('limit', type=int)
    
    query = Origins.query
        
    # Definindo filtros para consulta
    if status:
        query = query.filter(Origins.status == status)
    if limit:
        query = query.limit(limit)
        
    # Executando a consulta
    origins = query.all()
    
    return jsonify([origin.as_dict() for origin in origins])

@origins_bp.route('/origins/<int:id>', methods=['GET'])
def get_origin_by_id(id):
    check_api_key()
    origin = Origins.query.get_or_404(id)
    return jsonify(origin.as_dict())

@origins_bp.route('/origins/<int:id>', methods=['PUT'])
def edit_origin_by_id(id):
    check_api_key()
    origin = Origins.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    origin.name = data.get('name', origin.name)
    origin.status = data.get('status', origin.status)
    origin.modified_by = data.get('modified_by', origin.modified_by)
    origin.modified_at = datetime.now()

    db.session.commit()
    return jsonify(origin.as_dict())

@origins_bp.route('/origins', methods=['POST'])
def create_new_origin():
    check_api_key()
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "status", "created_by")):
        abort(400, 'Invalid data')

    new_origin = Origins(
        name=data['name'],
        status=data['status'],
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_origin)
    db.session.commit()
    return jsonify(new_origin.as_dict()), 201

@origins_bp.route('/origins/<int:id>', methods=['DELETE'])
def delete_origin(id):
    check_api_key()
    origin = Origins.query.get_or_404(id)
    db.session.delete(origin)
    db.session.commit()
    return '', 204
