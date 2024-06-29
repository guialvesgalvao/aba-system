from flask import Flask
from .config import Config
from .extensions import db
from .routes import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensões
    db.init_app(app)

    # Registrar blueprints
    register_blueprints(app)

    return app
