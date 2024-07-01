from .suppliers import suppliers_bp
from .suppliers_products import suppliers_products_bp
from .products import products_bp
from .origins import origins_bp
from .orders import orders_bp
from .order_items import order_items_bp
from .delivery_persons import delivery_persons_bp


def register_blueprints(app):
    app.register_blueprint(suppliers_bp, url_prefix='/api')
    app.register_blueprint(suppliers_products_bp, url_prefix='/api')
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(origins_bp, url_prefix='/api')
    app.register_blueprint(orders_bp, url_prefix='/api')
    app.register_blueprint(order_items_bp, url_prefix='/api')
    app.register_blueprint(delivery_persons_bp, url_prefix='/api')

