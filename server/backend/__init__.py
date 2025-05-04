import eventlet
eventlet.monkey_patch()


from flask import Flask
from .extensions import db, migrate, socketio, jwt
from .db_config import m4cren_host, m4cren_password, m4cren_port, m4cren_schema, m4cren_username, mika_host, mika_password, mika_port, mika_schema, mika_username
from .sockets import SocketIO
import os
import pymysql
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv
from .SQL_QUERY import create_table, create_admin, create_products, create_sample_history

load_dotenv()

pymysql.install_as_MySQLdb()



def create_website():

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')
    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
    CORS(app, supports_credentials=True)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=8)

    
    

    # PALITAN SA db_config.py YUNG CREDENTIALS NANG DATABASE, YUNG SCHEMA IS YUNG MAKIKITA PAG NAOPEN NA UNG DATABASE SA WORKBENCH SA LEFT SIDE
 
    venv_path = os.environ.get('VIRTUAL_ENV')

    if venv_path:
        if venv_path == r'/home/m4cren/webDev/MetaFeast/server/venv_m4cren':
            print('Rainier virtual environment is activated')

          
            app.config["SQLALCHEMY_DATABASE_URI"] = (
                f"mysql+pymysql://{m4cren_username}:{m4cren_password}@{m4cren_host}/{m4cren_schema}?charset=utf8"
            )
            # app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///rainier.db'
            
        elif venv_path == r'C:\Users\lenovo\webDev\MetaFeast\server\venv_mika':


            print('Mika virtual environment is activated')
            app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///mikaela.db'
            
           
        else:
            print('PLease activate a virtual environment')
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') PARA LANG TO SA PAG DEDEPLOY

    

    
    from .api.payment import payment
    from .api.order import order
    from .api.costumer import costumer
    from .api.tables import tables
    from .api.admin import admin
    from .api.products import products

 
    app.register_blueprint(payment)
    app.register_blueprint(order)
    app.register_blueprint(costumer)
    app.register_blueprint(tables)
    app.register_blueprint(admin)
    app.register_blueprint(products)
    
    from .db_models import Table


    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, async_mode="eventlet", cors_allowed_origins="*")

    create_database(app)

    

    create_table(app)
    create_admin(app)
    create_products(app)
    create_sample_history(app)

    
    return app


def create_database(app):
    
    with app.app_context():
        db.create_all()
