from .suppliers import suppliers_bp

def register_blueprints(app):
    app.register_blueprint(suppliers_bp, url_prefix='/api')

