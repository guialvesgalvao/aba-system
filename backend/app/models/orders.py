from ..extensions import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

class Orders(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    client_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('customers.id'), default=None)
    origin_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('origins.id'), default=None)
    status = db.Column(db.String(255), default=None)
    total_cost_value = db.Column(db.Float, default=None)
    total_sale_value = db.Column(db.Float, default=None)
    extra_details = db.Column(db.String(255), default=None)
    order_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    invoicing_date = db.Column(db.DateTime, default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_by = db.Column(db.String(255), default=None)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow)
    modified_by = db.Column(db.String(255), default=None)

    def as_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'origin_id': self.origin_id,
            'status': self.status,
            'total_cost_value': self.total_cost_value,
            'total_sale_value': self.total_sale_value,
            'extra_details': self.extra_details,
            'order_date': self.order_date.isoformat(),
            'invoicing_date': self.invoicing_date if self.invoicing_date else None,
            'client_address': self.client_address,
            'created_at': self.created_at.isoformat(),
            'created_by': self.created_by,
            'modified_at': self.modified_at.isoformat(),
            'modified_by': self.modified_by
        }