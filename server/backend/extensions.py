# WAG PANSININ TO, DITO KO LANG INIMPORT MGA KELANGAN, PARA LANG MALINIS YUNG FILE

from flask_sqlalchemy import SQLAlchemy

from flask_socketio import SocketIO
from flask_migrate import Migrate, upgrade
from flask_login import LoginManager
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
)
import pyfiglet
from colorama import init, Fore, Style
import os

init(autoreset=True)

db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()
login_manager = LoginManager()
jwt = JWTManager()


def print_metafeast_logo():
 
    haba_ng_terminal = os.get_terminal_size().columns


    banner = pyfiglet.figlet_format("W e l c o m e     t o     M e t a F e a s t ")

    centered_banner = '\n'.join(line.center(haba_ng_terminal) for line in banner.splitlines())

    print(Fore.MAGENTA + Style.BRIGHT + centered_banner)
