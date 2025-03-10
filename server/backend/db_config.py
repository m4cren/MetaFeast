# PARA DOON SA INFORMATION NG DATABASE CREDENTIALS, BAGUHIN YUNG HOST BASED SA CURRENT NG IP ADDRESS


from .extensions import db

host = "localhost:3306"
schema = "MetaFeast"
username = "root"
password = "7894561230"
port = "6969"


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
