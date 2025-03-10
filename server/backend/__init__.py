import eventlet

eventlet.monkey_patch()

from flask import Flask
from .extensions import db, migrate, socketio, jwt
from .db_config import schema, password, username, host
from .sockets import SocketIO
import os
import pymysql
from flask_cors import CORS

pymysql.install_as_MySQLdb()


def create_website():

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.urandom(10)
    app.config["JWT_SECRET_KEY"] = os.urandom(27)
    CORS(app, supports_credentials=True)

    # PALITAN SA db_config.py YUNG CREDENTIALS NANG DATABASE, YUNG SCHEMA IS YUNG MAKIKITA PAG NAOPEN NA UNG DATABASE SA WORKBENCH SA LEFT SIDE

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"mysql+pymysql://{username}:{password}@{host}/{schema}?charset=utf8"
    )
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') PARA LANG TO SA PAG DEDEPLOY

    from .api.auth import auth
    from .api.order import order
 

    app.register_blueprint(order)
    app.register_blueprint(auth)

  

    from .db_models import AdminCredentials

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, async_mode="eventlet", cors_allowed_origins="*")

    create_database(app)

    return app


def create_database(app):
    
    with app.app_context():
        db.create_all()
