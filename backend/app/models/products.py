from ..extensions import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

class Products(db.Model):
    __tablename__ = 'products'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), default=None)
    description = db.Column(db.String(1000), default=None)
    status = db.Column(db.String(255), default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_by = db.Column(db.String(255), default=None)
    modified_by = db.Column(db.String(255), default=None)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'created_by': self.created_by,
            'modified_by': self.modified_by,
            'modified_at': self.modified_at.isoformat()
        }
