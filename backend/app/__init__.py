from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db
from .routes import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize CORS
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)    
    
    # Inicializar extensões
    db.init_app(app)

    # Registrar blueprints
    register_blueprints(app)
    
    

    return app
