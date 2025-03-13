# PARA DOON SA INFORMATION NG DATABASE CREDENTIALS, BAGUHIN YUNG HOST BASED SA CURRENT NG IP ADDRESS


from .extensions import db
import os


venv_path = os.environ.get('VIRTUAL_ENV')

if venv_path:
    if venv_path == r'C:\Users\renre\webDev\MetaFeast\server\venv_m4cren':
        print('Rainier\'s virtual environment is activated')
        host = "192.168.1.35"
        schema = "metafeastdb"
        username = "root"
        password = f"%40%23OctObEr102704"
        port = "6969"
    elif venv_path == r'C:\Users\lenovo\webDev\MetaFeast\server\venv_mika':
        print('Mikaela\'s virtual environment is activated')
        host = "127.0.0.1:3306"
        schema = "MetaFeast"
        username = "root"
        password = "7894561230"
        port = "3306"
    else:
        print('PLease activate a virtual environment')


# SHORTCUT DOON SA DB.SESSION.ADD AT DB.SESSION.COMMIT NA MAY KASAMANG ROLLBACK PAG ERROR
def save_data(data):

    try:
        db.session.add(data)
        db.session.commit()

        return "success"
    except:
        db.session.rollback()
        return "failed"


# SHORTCUT DOON SA DB.SESSION.DELETE AT DB.SESSION.COMMIT NA MAY KASAMANG ROLLBACK PAG ERROR
def delete_data(data):

    try:
        db.session.delete(data)
        db.session.commit()

        return "success"
    except:
        db.session.rollback()
        return "failed"


# SHORTCUT DOON SA DB.SESSION.DELETE (ALL) AT DB.SESSION.COMMIT NA MAY KASAMANG ROLLBACK PAG ERROR


def delete_all_data(data):

    try:
        for x in data:
            db.session.delete(x)
        db.session.commit()

        return "success"
    except:
        db.session.rollback()
        return "failed"
