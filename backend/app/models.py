from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

db = SQLAlchemy()

class Suppliers(db.Model):
    __tablename__ = 'suppliers'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    cnpj = db.Column(db.String(255), nullable=False)
    automatic_invoicing = db.Column(db.Boolean, nullable=False)
    status = db.Column(db.String(255), nullable=False)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    modified_by = db.Column(db.String(255), nullable=True)
    created_by = db.Column(db.String(255), nullable=True)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cnpj': self.cnpj,
            'automatic_invoicing': self.automatic_invoicing,
            'status': self.status,
            'created_by': self.created_by,
            'modified_by': self.modified_by,
            'modified_at': self.modified_at.isoformat(),
            'created_at': self.created_at.isoformat()
        }
