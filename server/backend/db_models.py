from .extensions import db


class AdminCredentials(db.Model):
    __tablename__ = "administrator"
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_password = db.Column(db.String(125))


class Costumer(db.Model):
    __tablename__ = "costumer"
    id = db.Column(db.Integer, primary_key=True)
    costumer_name = db.Column(db.String(126), nullable=False)

    current_table = db.relationship("Table", backref="costumer")

    def to_dict(self):
        return {"costumer_id": self.id, "costumer_name": self.costumer_name}


class Table(db.Model):
    __tablename__ = "table_status"
    id = db.Column(db.Integer, primary_key=True)
    table_name = db.Column(db.String(10), nullable=False, unique = True)
    table_type = db.Column(db.String(20), nullable=False)
    table_position_x = db.Column(db.Float(), nullable = True)
    table_position_y= db.Column(db.Float(), nullable = True)
    table_position_z = db.Column(db.Float(), nullable = True)
    isAvailable = db.Column(db.Boolean, default=True)
    current_costumer_name = db.Column(db.String(56), nullable=True, default="AVAILABLE")
    current_costumer_id = db.Column(
        db.Integer, db.ForeignKey("costumer.id"), nullable=True
    )

    def get_position(self):
        return [self.table_position_x, self.table_position_y, self.table_position_z]