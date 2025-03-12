from backend import socketio, create_website, db
from backend.db_config import host, port
import os


venv_path = os.environ.get('VIRTUAL_ENV')

# ITO MAIN FILE, TYPE 'cd client' KUNG ASA ROOT FOLDER KA 'METAFEAST' TAS 'python main.py' ALWAYS BUKSAN TO BEFORE BUKSAN YUNG FRONTEND

app = create_website()


# paltan yung host doon sa db_config.py based sa ip address or paltan ng 'localhost' tas yung port ay 3306




if venv_path:
    if venv_path == r'C:\Users\renre\webDev\MetaFeast\server\venv_m4cren':
       
       if __name__ == "__main__":
            socketio.run(app, debug=True,  host=host, port=port)
    elif venv_path == r'C:\Users\lenovo\webDev\MetaFeast\server\venv_mika':
       
       if __name__ == "__main__":
            socketio.run(app, debug=True)
    else:
        print('PLease activate a virtual environment')
