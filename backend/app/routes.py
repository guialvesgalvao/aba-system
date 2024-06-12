from flask import Blueprint, request, jsonify, abort
from .models import db, Suppliers
import os
import dotenv
suppliers_bp = Blueprint('suppliers', __name__)

dotenv.load_dotenv()

api_key_env = os.getenv('API_KEY')

# Função para verificar a chave API em todas as solicitações
def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    for header, value in request.headers.items():
        print(f"{header}: {value}")
    if api_key != api_key_env:
        abort(401, 'Unauthorized: Missing or invalid API key')
        
# Buscar Todos
@suppliers_bp.route('/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = Suppliers.query.all()
    return jsonify([suppliers.as_dict() for supplier in suppliers])

# Buscar por IDw
@suppliers_bp.route('/suppliers/<int:id>', methods=['GET'])
def get_supplier_by_id(id):
    supplier = Suppliers.query.get_or_404(id)
    return jsonify(supplier.as_dict())

# Alterar
@suppliers_bp.route('/suppliers/<int:id>', methods=['PUT'])
def edit_supplier_by_id(id):
    supplier = Suppliers.query.get_or_404(id)
    data = request.get_json()
    supplier.name = data.get('name', supplier.name)
    supplier.amount = data.get('amount', supplier.amount)
    supplier.due_date = data.get('due_date', supplier.due_date)
    db.session.commit()
    return jsonify(supplier.as_dict())

# Criar
@suppliers_bp.route('/suppliers', methods=['POST'])
def create_new_supplier():
    data = request.get_json()
    new_supplier = Suppliers(
        name=data['name'],
        amount=data['amount'],
        due_date=data['due_date']
    )
    db.session.add(new_supplier)
    db.session.commit()
    return jsonify(new_supplier.as_dict()), 201

# Excluir
@suppliers_bp.route('/suppliers/<int:id>', methods=['DELETE'])
def delete_supplier(id):
    supplier = Suppliers.query.get_or_404(id)
    db.session.delete(supplier)
    db.session.commit()
    return '', 204