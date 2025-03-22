# PARA DOON SA INFORMATION NG DATABASE CREDENTIALS, BAGUHIN YUNG HOST BASED SA CURRENT NG IP ADDRESS


import urllib.parse
from .extensions import db
from dotenv import load_dotenv
import os
import urllib
from datetime import datetime, timezone

load_dotenv()


m4cren_host = os.getenv("M4CREN_HOST")
m4cren_schema = os.getenv("M4CREN_SCHEMA")
m4cren_username = os.getenv("M4CREN_USERNAME")
m4cren_password = urllib.parse.quote(os.getenv("M4CREN_PASSWORD", ""))
m4cren_port = os.getenv("M4CREN_PORT")

mika_host = os.getenv("MIKA_HOST")
mika_schema = os.getenv("MIKA_SCHEMA")
mika_username = os.getenv("MIKA_USERNAME")
mika_password = urllib.parse.quote(os.getenv("MIKA_PASSWORD", ""))
mika_port = os.getenv("MIKA_PORT")


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
    

def time_ago(time):
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    delta = now - time

    if delta.days > 0:
        return f"{delta.days} days ago"
    elif delta.seconds >= 3600:
        if delta.seconds // 3600 == 1:
            return f"{delta.seconds // 3600} hour ago"
        return f"{delta.seconds // 3600} hours ago"
    elif delta.seconds >= 60:
        return f"{delta.seconds // 60} minutes ago"
    else:
        return f"{delta.seconds} seconds ago"