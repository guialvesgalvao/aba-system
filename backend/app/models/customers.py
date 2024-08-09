from ..extensions import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

class Customers(db.Model):
    __tablename__ = 'customers'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    fantasy_name = db.Column(db.String(255), default=None)
    status = db.Column(db.String(255), default=None)
    cnpj = db.Column(db.String(255), default=None)
    state_registration = db.Column(db.String(255), default=None)
    complete_address = db.Column(db.String(255), default=None)
    delivery_address = db.Column(db.String(255), default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    modified_by = db.Column(db.String(255), default=None)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow)
    created_by = db.Column(db.String(255), default=None)

    def as_dict(self):
        return {
            'id': self.id,
            'fantasy_name': self.fantasy_name,
            'cnpj': self.cnpj,
            'complete_address': self.complete_address,
            'delivery_address': self.delivery_address,
            'state_registration': self.state_registration,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'created_by': self.created_by,
            'modified_by': self.modified_by,
            'modified_at': self.modified_at.isoformat()
        }
