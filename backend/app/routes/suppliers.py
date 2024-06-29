from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.suppliers import Suppliers
from ..config import Config
from datetime import datetime

suppliers_bp = Blueprint('suppliers', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@suppliers_bp.before_request
def before_request_func():
    check_api_key()

@suppliers_bp.route('/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = Suppliers.query.all()
    return jsonify([supplier.as_dict() for supplier in suppliers])

@suppliers_bp.route('/suppliers/<int:id>', methods=['GET'])
def get_supplier_by_id(id):
    supplier = Suppliers.query.get_or_404(id)
    return jsonify(supplier.as_dict())

@suppliers_bp.route('/suppliers/<int:id>', methods=['PUT'])
def edit_supplier_by_id(id):
    supplier = Suppliers.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    supplier.name = data.get('name', supplier.name)
    supplier.cnpj = data.get('cnpj', supplier.cnpj)
    supplier.automatic_invoicing = data.get('automatic_invoicing', supplier.automatic_invoicing)
    supplier.status = data.get('status', supplier.status)
    supplier.modified_by = data.get('modified_by', supplier.modified_by)
    supplier.modified_at = datetime.now()

    db.session.commit()
    return jsonify(supplier.as_dict())

@suppliers_bp.route('/suppliers', methods=['POST'])
def create_new_supplier():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "cnpj", "automatic_invoicing", "status", "created_by")):
        abort(400, 'Invalid data')

    new_supplier = Suppliers(
        name=data['name'],
        cnpj=data['cnpj'],
        automatic_invoicing=data['automatic_invoicing'],
        status=data['status'],
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_supplier)
    db.session.commit()
    return jsonify(new_supplier.as_dict()), 201

@suppliers_bp.route('/suppliers/<int:id>', methods=['DELETE'])
def delete_supplier(id):
    supplier = Suppliers.query.get_or_404(id)
    db.session.delete(supplier)
    db.session.commit()
    return '', 204
