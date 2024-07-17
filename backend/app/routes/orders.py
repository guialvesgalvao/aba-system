from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.orders import Orders
from ..config import Config
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@orders_bp.route('/orders', methods=['GET'])
def get_orders():
    check_api_key()
    # Capturando os parâmetros de consulta
    status = request.args.get('status')
    limit = request.args.get('limit', type=int)
    
    query = Orders.query
    
    # Definindo filtros para consulta
    if status:
        query = query.filter(Orders.status == status)
    if limit:
        query = query.limit(limit)

    # Executando a consulta
    orders = query.all()
    
    return jsonify([order.as_dict() for order in orders])

@orders_bp.route('/orders/<int:id>', methods=['GET'])
def get_order_by_id(id):
    check_api_key()
    order = Orders.query.get_or_404(id)
    return jsonify(order.as_dict())

@orders_bp.route('/orders', methods=['POST'])
def create_new_order():
    check_api_key()
    data = request.get_json()
    if not data or not all(k in data for k in ("client_name", "status", "order_date", "created_by")):
        abort(400, 'Invalid data')

    new_order = Orders(
        client_name=data['client_name'],
        status=data['status'],
        total_cost_value=data.get('total_cost_value'),
        total_sale_value=data.get('total_sale_value'),
        extra_details=data.get('extra_details'),
        order_date=datetime.fromisoformat(data['order_date']),
        invoicing_date=datetime.fromisoformat(data['invoicing_date']) if data.get('invoicing_date') else None,
        client_address=data.get('client_address'),
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify(new_order.as_dict()), 201

@orders_bp.route('/orders/<int:id>', methods=['PUT'])
def edit_order_by_id(id):
    check_api_key()
    order = Orders.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    order.client_name = data.get('client_name', order.client_name)
    order.status = data.get('status', order.status)
    order.total_cost_value = data.get('total_cost_value', order.total_cost_value)
    order.total_sale_value = data.get('total_sale_value', order.total_sale_value)
    order.extra_details = data.get('extra_details', order.extra_details)
    order.order_date = datetime.fromisoformat(data['order_date']) if 'order_date' in data else order.order_date
    order.invoicing_date = datetime.fromisoformat(data['invoicing_date']) if 'invoicing_date' in data else order.invoicing_date
    order.client_address = data.get('client_address', order.client_address)
    order.modified_by = data.get('modified_by', order.modified_by)
    order.modified_at = datetime.now()

    db.session.commit()
    return jsonify(order.as_dict())

@orders_bp.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    check_api_key()
    order = Orders.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return '', 204
