from .extensions import db

class AdminCredentials(db.Model):
     __tablename__ = 'administrator'
     admin_id = db.Column(db.Integer, primary_key = True)
     admin_password = db.Column(db.String(125))
 
  