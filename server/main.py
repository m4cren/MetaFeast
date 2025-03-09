from backend import socketio, create_website, db
from backend.db_config import host, port

# ITO MAIN FILE, TYPE 'cd client' KUNG ASA ROOT FOLDER KA 'METAFEAST' TAS 'python main.py' ALWAYS BUKSAN TO BEFORE BUKSAN YUNG FRONTEND

app = create_website()


# paltan yung host doon sa db_config.py based sa ip address or paltan ng 'localhost' tas yung port ay 3306

if __name__ == "__main__":
    socketio.run(app, debug=True, host=host, port=port)
