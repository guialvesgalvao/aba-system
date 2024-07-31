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

@suppliers_products_bp.route('/suppliers_products', methods=['GET'])
def get_suppliers_products():    
    check_api_key()
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
    check_api_key()
    supplier_product = SuppliersProducts.query.get_or_404(id)
    return jsonify(supplier_product.as_dict())

@suppliers_products_bp.route('/suppliers_products_by_supplier/<int:supplier_id>', methods=['GET'])
def get_products_by_supplier(supplier_id):
    check_api_key()
    
    # Obtendo os itens de suppliers_products relacionados ao supplier_id fornecido
    supplier_products = SuppliersProducts.query.filter_by(supplier_id=supplier_id).all()
    
    if not supplier_products:
        abort(404, 'No products found for the given supplier ID')
    
    # Incluindo as informações dos produtos associados
    products_info = []
    for sp in supplier_products:
        product = sp.product  # Assumindo que há um relacionamento definido no modelo SuppliersProducts para acessar o produto
        sp_dict = sp.as_dict()
        sp_dict['product_info'] = product.as_dict()  # Assumindo que o modelo Product tem um método as_dict()
        products_info.append(sp_dict)
    
    return jsonify(products_info)

@suppliers_products_bp.route('/suppliers_products/<int:id>', methods=['PUT'])
def edit_supplier_product_by_id(id):
    check_api_key()
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
    check_api_key()
    data = request.get_json()
    if not data or not all(k in data for k in ("validity_period", "value", "created_by", "product_id", "supplier_id")):
        abort(400, 'Invalid data')

    new_supplier_product = SuppliersProducts(
        validity_period=data['validity_period'],
        value=data['value'],
        product_id=data['product_id'],
        supplier_id=data['supplier_id'],
        modified_by=data.get('modified_by'),
        created_by=data['created_by'],
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_supplier_product)
    db.session.commit()
    return jsonify(new_supplier_product.as_dict()), 201

@suppliers_products_bp.route('/suppliers_products/<int:id>', methods=['DELETE'])
def delete_supplier_product(id):
    check_api_key()
    supplier_product = SuppliersProducts.query.get_or_404(id)
    db.session.delete(supplier_product)
    db.session.commit()
    return '', 204
