from .extensions import db


class AdminCredentials(db.Model):
    __tablename__ = "administrator"
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_password = db.Column(db.String(125))


class Costumer(db.Model):
    __tablename__ = 'costumer'
    id = db.Column(db.Integer, primary_key = True)
    costumer_name = db.Column(db.String(126), nullable= False)

    def to_dict(self):
        return{
            'costumer_id': self.id,
            'costumer_name': self.costumer_name
        }
       