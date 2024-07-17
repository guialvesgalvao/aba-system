from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.suppliers_products import SuppliersProducts
from ..config import Config
from datetime import datetime

suppliers_products_bp = Blueprint('suppliers_products', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@suppliers_products_bp.before_request
def before_request_func():
    check_api_key()

@suppliers_products_bp.route('/suppliers_products', methods=['GET'])
def get_suppliers_products():    
    # Capturando os parâmetros de consulta
    limit = request.args.get('limit', type=int)
    
    query = SuppliersProducts.query
    
    # Definindo filtros para consulta
    if limit:
        query = query.limit(limit)
        
    # Executando a consulta
    suppliers_products = query.all()
    
    return jsonify([supplier_product.as_dict() for supplier_product in suppliers_products])

@suppliers_products_bp.route('/suppliers_products/<int:id>', methods=['GET'])
def get_supplier_product_by_id(id):
    supplier_product = SuppliersProducts.query.get_or_404(id)
    return jsonify(supplier_product.as_dict())

@suppliers_products_bp.route('/suppliers_products/<int:id>', methods=['PUT'])
def edit_supplier_product_by_id(id):
    supplier_product = SuppliersProducts.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    supplier_product.validity_period = data.get('validity_period', supplier_product.validity_period)
    supplier_product.value = data.get('value', supplier_product.value)
    supplier_product.modified_by = data.get('modified_by', supplier_product.modified_by)
    supplier_product.modified_at = datetime.now()

    db.session.commit()
    return jsonify(supplier_product.as_dict())

@suppliers_products_bp.route('/suppliers_products', methods=['POST'])
def create_new_supplier_product():
    data = request.get_json()
    if not data or not all(k in data for k in ("validity_period", "value", "created_by", "product_id", "supplier_id")):
        abort(400, 'Invalid data')

    new_supplier_product = SuppliersProducts(
        validity_period=data['validity_period'],
        value=data['value'],
        created_by=data['created_by'],
        product_id=data['product_id'],
        supplier_id=data['supplier_id'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_supplier_product)
    db.session.commit()
    return jsonify(new_supplier_product.as_dict()), 201

@suppliers_products_bp.route('/suppliers_products/<int:id>', methods=['DELETE'])
def delete_supplier_product(id):
    supplier_product = SuppliersProducts.query.get_or_404(id)
    db.session.delete(supplier_product)
    db.session.commit()
    return '', 204
