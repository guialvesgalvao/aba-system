from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.delivery_persons import DeliveryPersons
from ..config import Config
from datetime import datetime

delivery_persons_bp = Blueprint('delivery_persons', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@delivery_persons_bp.before_request
def before_request_func():
    check_api_key()

@delivery_persons_bp.route('/delivery_persons', methods=['GET'])
def get_delivery_persons():
    # Capturando os parâmetros de consulta
    status = request.args.get('status')
    limit = request.args.get('limit', type=int)
    
    query = DeliveryPersons.query
    
    # Definindo filtros para consulta
    if status:
        query = query.filter(DeliveryPersons.status == status)
    if limit:
        query = query.limit(limit)
        
    # Executando a consulta
    delivery_persons = query.all()
    
    return jsonify([person.as_dict() for person in delivery_persons])

@delivery_persons_bp.route('/delivery_persons/<int:id>', methods=['GET'])
def get_delivery_person_by_id(id):
    delivery_person = DeliveryPersons.query.get_or_404(id)
    return jsonify(delivery_person.as_dict())

@delivery_persons_bp.route('/delivery_persons', methods=['POST'])
def create_new_delivery_person():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "status", "created_by")):
        abort(400, 'Invalid data')

    new_delivery_person = DeliveryPersons(
        name=data['name'],
        status=data['status'],
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_delivery_person)
    db.session.commit()
    return jsonify(new_delivery_person.as_dict()), 201

@delivery_persons_bp.route('/delivery_persons/<int:id>', methods=['PUT'])
def edit_delivery_person_by_id(id):
    delivery_person = DeliveryPersons.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    delivery_person.name = data.get('name', delivery_person.name)
    delivery_person.status = data.get('status', delivery_person.status)
    delivery_person.modified_by = data.get('modified_by', delivery_person.modified_by)
    delivery_person.modified_at = datetime.now()

    db.session.commit()
    return jsonify(delivery_person.as_dict())

@delivery_persons_bp.route('/delivery_persons/<int:id>', methods=['DELETE'])
def delete_delivery_person(id):
    delivery_person = DeliveryPersons.query.get_or_404(id)
    db.session.delete(delivery_person)
    db.session.commit()
    return '', 204
