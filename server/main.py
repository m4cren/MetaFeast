from backend import socketio, create_website
from backend.db_config import m4cren_host, m4cren_port
from backend.extensions import upgrade
import os

venv_path = os.environ.get('VIRTUAL_ENV')

# ITO MAIN FILE, TYPE 'cd client' KUNG ASA ROOT FOLDER KA 'METAFEAST' TAS 'python main.py' ALWAYS BUKSAN TO BEFORE BUKSAN YUNG FRONTEND

app = create_website()


# paltan yung host doon sa db_config.py based sa ip address or paltan ng 'localhost' tas yung port ay 3306




if venv_path:
    if venv_path == r'C:\Users\renre\webDev\MetaFeast\server\venv_m4cren':
     
        
       if __name__ == "__main__":
           
            socketio.run(app, debug=True,  host=m4cren_host, port=8080)
         
    elif venv_path == r'C:\Users\lenovo\webDev\MetaFeast\server\venv_mika':
       
    
       if __name__ == "__main__":
            
          
            socketio.run(app, debug=True, host="192.168.1.5", port=8080) 
    else:
        print('PLease activate a virtual environment')
