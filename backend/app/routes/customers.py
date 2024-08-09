from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.customers import Customers
from ..config import Config
from datetime import datetime

customers_bp = Blueprint('customers', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@customers_bp.route('/customers', methods=['GET'])
def get_customers():
    check_api_key()
    # Capturando os parâmetros de consulta
    status = request.args.get('status')
    limit = request.args.get('limit', type=int)
    
    query = Customers.query
        
    # Definindo filtros para consulta
    if status:
        query = query.filter(Customers.status == status)
    if limit:
        query = query.limit(limit)
        
    # Executando a consulta
    customers = query.all()
    
    return jsonify([customer.as_dict() for customer in customers])

@customers_bp.route('/customers/<int:id>', methods=['GET'])
def get_origin_by_id(id):
    check_api_key()
    origin = Customers.query.get_or_404(id)
    return jsonify(origin.as_dict())

@customers_bp.route('/customers/<int:id>', methods=['PUT'])
def edit_origin_by_id(id):
    check_api_key()
    origin = Customers.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    origin.name = data.get('fantasy_name', origin.name)
    origin.status = data.get('status', origin.status)
    origin.modified_by = data.get('modified_by', origin.modified_by)
    origin.modified_at = datetime.now()

    db.session.commit()
    return jsonify(origin.as_dict())

@customers_bp.route('/customers', methods=['POST'])
def create_new_origin():
    check_api_key()
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "status", "created_by")):
        abort(400, 'Invalid data')

    new_customer = Customers(
        name=data['fantasy_name'],
        status=data['status'],
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_customer)
    db.session.commit()
    return jsonify(new_customer.as_dict()), 201

@customers_bp.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    check_api_key()
    origin = Customers.query.get_or_404(id)
    db.session.delete(origin)
    db.session.commit()
    return '', 204
