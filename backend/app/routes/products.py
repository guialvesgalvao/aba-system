from flask import Blueprint, request, jsonify, abort
from flask_cors import cross_origin
from ..extensions import db
from ..models.products import Products
from ..config import Config
from datetime import datetime

products_bp = Blueprint('products', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    print(request.headers)
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@products_bp.route('/products', methods=['GET'])
def get_products():
    check_api_key()
    # Capturando os parâmetros de consulta
    status = request.args.get('status')
    limit = request.args.get('limit', type=int)
    
    query = Products.query
    
    # Definindo filtros para consulta
    if status:
        query = query.filter(Products.status == status)
    if limit:
        query = query.limit(limit)
        
    # Executando a consulta
    products = query.all()
    
    return jsonify([product.as_dict() for product in products])

@products_bp.route('/products/<int:id>', methods=['GET'])
def get_product_by_id(id):
    check_api_key()
    product = Products.query.get_or_404(id)
    return jsonify(product.as_dict())

@products_bp.route('/products/<int:id>', methods=['PUT'])
def edit_product_by_id(id):
    check_api_key()
    product = Products.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    product.name = data.get('name', product.name)
    product.description=data.get('description', product.description)	
    product.status = data.get('status', product.status)
    product.modified_by = data.get('modified_by', product.modified_by)
    product.modified_at = datetime.now()

    db.session.commit()
    return jsonify(product.as_dict())

@products_bp.route('/products', methods=['POST'])
def create_new_product():
    check_api_key()
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "status", "created_by")):
        abort(400, 'Invalid data')

    new_product = Products(
        name=data['name'],
        description=data['description'],	
        status=data['status'],
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.as_dict()), 201

@products_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    check_api_key()
    product = Products.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204
