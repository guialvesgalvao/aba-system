from ..extensions import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

class SuppliersProducts(db.Model):
    __tablename__ = 'suppliers_products'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    validity_period = db.Column(db.Integer, default=None)
    value = db.Column(db.Float, default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_by = db.Column(db.String(255), default=None)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow)
    modified_by = db.Column(db.String(255), default=None)
    product_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('products.id'), default=None)
    supplier_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('suppliers.id'), default=None)

    def as_dict(self):
        return {
            'id': self.id,
            'validity_period': self.validity_period,
            'value': self.value,
            'created_at': self.created_at.isoformat(),
            'created_by': self.created_by,
            'modified_at': self.modified_at.isoformat(),
            'modified_by': self.modified_by,
            'product_id': self.product_id,
            'supplier_id': self.supplier_id
        }
