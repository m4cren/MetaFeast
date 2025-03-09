from .extensions import db, socketio
from .db_config import save_data
from sqlalchemy import desc
from flask_socketio import SocketIO, emit


@socketio.on('connect')
def connect():

     print('client connected')

