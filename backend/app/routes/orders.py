from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..config import Config
from datetime import datetime

from ..models.customers import Customers
from ..models.origins import Origins
from ..models.orders import Orders
from ..models.order_itens import OrderItens
from ..models.delivery_persons import DeliveryPersons
from ..models.products import Products
from ..models.suppliers import Suppliers

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
    if not data or not all(k in data for k in ("client_id", "status", "order_date", "created_by")):
        abort(400, 'Invalid data')

    new_order = Orders(
        client_id=data['client_id'],
        origin_id=data['origin_id'],
        status=data['status'],
        total_cost_value=data.get('total_cost_value'),
        total_sale_value=data.get('total_sale_value'),
        extra_details=data.get('extra_details'),
        order_date=datetime.fromisoformat(data['order_date']),
        invoicing_date=datetime.fromisoformat(data['invoicing_date']) if data.get('invoicing_date') else None,
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

    order.client_id = data.get('client_id', order.client_id)
    order.origin_id = data.get('origin_id', order.origin_id)
    order.status = data.get('status', order.status)
    order.total_cost_value = data.get('total_cost_value', order.total_cost_value)
    order.total_sale_value = data.get('total_sale_value', order.total_sale_value)
    order.extra_details = data.get('extra_details', order.extra_details)
    order.order_date = datetime.fromisoformat(data['order_date']) if 'order_date' in data else order.order_date
    order.invoicing_date = datetime.fromisoformat(data['invoicing_date']) if 'invoicing_date' in data else order.invoicing_date
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

@orders_bp.route('/order_full/<int:order_id>', methods=['GET'])
def get_order_full(order_id):
    check_api_key()

    # Obtendo o pedido pelo ID
    order = Orders.query.get_or_404(order_id)

    # Obter os itens de ordem relacionados ao pedido
    order_itens = OrderItens.query.filter_by(order_id=order_id).all()

    # Incluir as informações dos produtos, entregadores e fornecedores associadas
    order_itens_info = []
    for item in order_itens:
        product = Products.query.get(item.product_id)
        delivery_person = DeliveryPersons.query.get(item.delivery_person_id)
        supplier = Suppliers.query.get(item.invoicing_id)

        item_info = {
            'id': item.id,
            'order_id': item.order_id,
            'product_id': item.product_id,
            'delivery_person_id': item.delivery_person_id,
            'invoicing_id': item.invoicing_id,
            'quantity': item.quantity,
            'cost_value': item.cost_value,
            'sale_value': item.sale_value,
            'status': item.status,
            'delivery_date': item.delivery_date,
            'created_at': item.created_at,
            'created_by': item.created_by,
            'modified_at': item.modified_at,
            'modified_by': item.modified_by,
            'product': product.as_dict() if product else None,
            'delivery_person': delivery_person.as_dict() if delivery_person else None,
            'supplier': supplier.as_dict() if supplier else None
        }

        order_itens_info.append(item_info)

    # Obter informações adicionais de cliente e origem
    client = Customers.query.get(order.client_id)
    origin = Origins.query.get(order.origin_id)

    # Construir a resposta final
    response = {
        'id': order.id,
        'client_id': order.client_id,
        'origin_id': order.origin_id,
        'status': order.status,
        'total_cost_value': order.total_cost_value,
        'total_sale_value': order.total_sale_value,
        'extra_details': order.extra_details,
        'order_date': order.order_date,
        'invoicing_date': order.invoicing_date,
        'client_data': client.as_dict() if client else None,
        'origin_data': origin.as_dict() if origin else None,
        'order_itens': order_itens_info,
        'created_at': order.created_at,
        'created_by': order.created_by,
        'modified_at': order.modified_at,
        'modified_by': order.modified_by
    }

    return jsonify(response)

@orders_bp.route('/orders_full/<int:id>', methods=['DELETE'])
def delete_order_full(id):
    check_api_key()
    
    order = Orders.query.get_or_404(id)
    
    # Excluindo todos os produtos relacionados a esse fornecedor
    OrderItens.query.filter_by(order_id=id).delete()
    
    # Forçando a execução da exclusão antes de continuar
    db.session.flush()
    
    # Excluindo o fornecedor
    db.session.delete(order)
    
    # Commitando todas as exclusões
    db.session.commit()
    
    return '', 204
