from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models.order_items import OrderItems
from ..config import Config
from datetime import datetime

order_items_bp = Blueprint('order_items', __name__)

def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    if api_key != Config.API_KEY:
        abort(401, 'Unauthorized: Missing or invalid API key')

@order_items_bp.before_request
def before_request_func():
    check_api_key()

@order_items_bp.route('/order_items', methods=['GET'])
def get_order_items():
    order_items = OrderItems.query.all()
    return jsonify([item.as_dict() for item in order_items])

@order_items_bp.route('/order_items/<int:id>', methods=['GET'])
def get_order_item_by_id(id):
    order_item = OrderItems.query.get_or_404(id)
    return jsonify(order_item.as_dict())

@order_items_bp.route('/order_items', methods=['POST'])
def create_new_order_item():
    data = request.get_json()
    if not data or not all(k in data for k in ("cost_value", "quantity", "status", "sale_value", "created_by", "order_id", "product_id")):
        abort(400, 'Invalid data')

    new_order_item = OrderItems(
        cost_value=data['cost_value'],
        quantity=data['quantity'],
        status=data['status'],
        sale_value=data['sale_value'],
        delivery_date=datetime.fromisoformat(data['delivery_date']) if data.get('delivery_date') else None,
        created_by=data['created_by'],
        modified_by=data.get('modified_by'),
        order_id=data['order_id'],
        product_id=data['product_id'],
        invoicing_id=data.get('invoicing_id'),
        delivery_person_id=data.get('delivery_person_id'),
        modified_at=datetime.now(),
        created_at=datetime.now()
    )
    db.session.add(new_order_item)
    db.session.commit()
    return jsonify(new_order_item.as_dict()), 201

@order_items_bp.route('/order_items/<int:id>', methods=['PUT'])
def edit_order_item_by_id(id):
    order_item = OrderItems.query.get_or_404(id)
    data = request.get_json()
    if not data:
        abort(400, 'Invalid data')

    order_item.cost_value = data.get('cost_value', order_item.cost_value)
    order_item.quantity = data.get('quantity', order_item.quantity)
    order_item.status = data.get('status', order_item.status)
    order_item.sale_value = data.get('sale_value', order_item.sale_value)
    order_item.delivery_date = datetime.fromisoformat(data['delivery_date']) if 'delivery_date' in data else order_item.delivery_date
    order_item.modified_by = data.get('modified_by', order_item.modified_by)
    order_item.order_id = data.get('order_id', order_item.order_id)
    order_item.product_id = data.get('product_id', order_item.product_id)
    order_item.invoicing_id = data.get('invoicing_id', order_item.invoicing_id)
    order_item.delivery_person_id = data.get('delivery_person_id', order_item.delivery_person_id)
    order_item.modified_at = datetime.now()

    db.session.commit()
    return jsonify(order_item.as_dict())

@order_items_bp.route('/order_items/<int:id>', methods=['DELETE'])
def delete_order_item(id):
    order_item = OrderItems.query.get_or_404(id)
    db.session.delete(order_item)
    db.session.commit()
    return '', 204
