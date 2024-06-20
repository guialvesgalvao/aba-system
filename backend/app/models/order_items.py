from ..extensions import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

class OrderItems(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    cost_value = db.Column(db.Float, default=None)
    quantity = db.Column(db.Float, default=None)
    status = db.Column(db.String(255), default=None)
    sale_value = db.Column(db.Float, default=None)
    delivery_date = db.Column(db.DateTime, default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_by = db.Column(db.String(255), default=None)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, onupdate=datetime.utcnow)
    modified_by = db.Column(db.String(255), default=None)
    order_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('orders.id'), default=None)
    product_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('products.id'), default=None)
    invoicing_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('suppliers.id'), default=None)
    delivery_person_id = db.Column(INTEGER(unsigned=True), db.ForeignKey('delivery_persons.id'), default=None)

    def as_dict(self):
        return {
            'id': self.id,
            'cost_value': self.cost_value,
            'quantity': self.quantity,
            'status': self.status,
            'sale_value': self.sale_value,
            'delivery_date': self.delivery_date.isoformat() if self.delivery_date else None,
            'created_at': self.created_at.isoformat(),
            'created_by': self.created_by,
            'modified_at': self.modified_at.isoformat(),
            'modified_by': self.modified_by,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'invoicing_id': self.invoicing_id,
            'delivery_person_id': self.delivery_person_id
        }
