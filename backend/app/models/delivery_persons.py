from ..extensions import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

class DeliveryPersons(db.Model):
    __tablename__ = 'delivery_persons'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), default=None)
    status = db.Column(db.String(255), default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow)
    modified_by = db.Column(db.String(255), default=None)
    created_by = db.Column(db.String(255), default=None)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'modified_at': self.modified_at.isoformat(),
            'modified_by': self.modified_by,
            'created_by': self.created_by
        }
