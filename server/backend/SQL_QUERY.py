from .extensions import db
from .db_config import save_data, delete_all_data, delete_data
from .db_models import Table, AdminCredentials
from werkzeug.security import generate_password_hash

from dotenv import load_dotenv
import os
load_dotenv()


def create_admin(app):

     with app.app_context():

          password = os.getenv('ADMIN_PASSWORD')
          hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
          is_admin = AdminCredentials.query.first()

          if not is_admin:

               new_admin = AdminCredentials(admin_password = hashed_password)
               save_data(new_admin)

               print('Admin Created')
          else:
               print('Admin already created')



def create_table(app):

     with app.app_context():

          is_table_created = Table.query.first()

          if not is_table_created:
          
               tableA1 = Table(table_name = 'A_1', table_type = 'Single_seat', table_position_x = 14.2, table_position_y = 0.76, table_position_z = -18.3)
               tableA2 = Table(table_name = 'A_2', table_type = 'Single_seat', table_position_x = 14.2, table_position_y = 0.76, table_position_z = -19.6)
               tableA3 = Table(table_name = 'A_3', table_type = 'Single_seat', table_position_x = 14.2, table_position_y = 0.76, table_position_z = -20.9)
               tableA4 = Table(table_name = 'A_4', table_type = 'Single_seat', table_position_x = 14.2, table_position_y = 0.76, table_position_z = -22.2)
               tableA5 = Table(table_name = 'A_5', table_type = 'Single_seat', table_position_x = 14.2, table_position_y = 0.76, table_position_z = -23.5)
               tableA6 = Table(table_name = 'A_6', table_type = 'Single_seat', table_position_x = 14.2, table_position_y = 0.76, table_position_z = -24.8)
               tableA7 = Table(table_name = 'A_7', table_type = 'Quad_seat', table_position_x = 15.3, table_position_y = 0.76, table_position_z = -19)
               tableA8 = Table(table_name = 'A_8', table_type = 'Quad_seat', table_position_x = 15.3, table_position_y = 0.76, table_position_z = -22.3)
               tableA9 = Table(table_name = 'A_9', table_type = 'Double_seat', table_position_x = 17.75, table_position_y = 0.76, table_position_z = -18.5)
               tableA10 = Table(table_name = 'A_10', table_type = 'Double_seat', table_position_x = 17.75, table_position_y = 0.76, table_position_z = -21)
               tableA11 = Table(table_name = 'A_11', table_type = 'Double_seat', table_position_x = 17.75, table_position_y = 0.76, table_position_z = -23.5)
               tableA12 = Table(table_name = 'A_12', table_type = 'Double_seat', table_position_x = 19.4, table_position_y = 0.76, table_position_z = -18.5)
               tableA13 = Table(table_name = 'A_13', table_type = 'Double_seat', table_position_x = 19.4, table_position_y = 0.76, table_position_z = -21)
               tableA14 = Table(table_name = 'A_14', table_type = 'Double_seat', table_position_x = 19.4, table_position_y = 0.76, table_position_z = -23.5)
               tableA15 = Table(table_name = 'A_15', table_type = 'Quad_seat', table_position_x = 21.3, table_position_y = 0.76, table_position_z = -19)
               tableA16 = Table(table_name = 'A_16', table_type = 'Quad_seat', table_position_x = 21.3, table_position_y = 0.76, table_position_z = -22.3)

               tableB1 = Table(table_name = 'B_1', table_type = 'Quad_seat', table_position_x = 14, table_position_y = 3.98, table_position_z = -16.9)
               tableB2 = Table(table_name = 'B_2', table_type = 'Double_seat', table_position_x = 14.3, table_position_y = 3.98, table_position_z = -20.2)
               tableB3 = Table(table_name = 'B_3', table_type = 'Quad_seat', table_position_x = 14, table_position_y = 3.98, table_position_z = -23)
               tableB4 = Table(table_name = 'B_4', table_type = 'Quad_seat', table_position_x = 16.4, table_position_y = 3.98, table_position_z = -18.4)
               tableB5 = Table(table_name = 'B_5', table_type = 'Quad_seat', table_position_x = 16.4, table_position_y = 3.98, table_position_z = -21.5)
               tableB6 = Table(table_name = 'B_6', table_type = 'Double_seat', table_position_x = 19, table_position_y = 3.98, table_position_z = -17.5)
               tableB7 = Table(table_name = 'B_7', table_type = 'Double_seat', table_position_x = 19, table_position_y = 3.98, table_position_z = -20.25)
               tableB8 = Table(table_name = 'B_8', table_type = 'Double_seat', table_position_x = 19, table_position_y = 3.98, table_position_z = -23)
               tableB9 = Table(table_name = 'B_9', table_type = 'Double_seat', table_position_x = 21, table_position_y = 3.98, table_position_z = -17.5)
               tableB10 = Table(table_name = 'B_10', table_type = 'Double_seat', table_position_x = 21, table_position_y = 3.98, table_position_z = -20.25)
               tableB11 = Table(table_name = 'B_11', table_type = 'Double_seat', table_position_x = 21, table_position_y = 3.98, table_position_z = -23)
               tableB12 = Table(table_name = 'B_12', table_type = 'Double_seat', table_position_x = 23.7, table_position_y = 3.98, table_position_z = -21.4)
               tableB13 = Table(table_name = 'B_13', table_type = 'Double_seat', table_position_x = 23.7, table_position_y = 3.98, table_position_z = -23.8)
               db.session.add(tableA1)
               db.session.add(tableA2)
               db.session.add(tableA3)
               db.session.add(tableA4)
               db.session.add(tableA5)
               db.session.add(tableA6)
               db.session.add(tableA7)
               db.session.add(tableA8)
               db.session.add(tableA9)
               db.session.add(tableA10)
               db.session.add(tableA11)
               db.session.add(tableA12)
               db.session.add(tableA13)
               db.session.add(tableA14)
               db.session.add(tableA15)
               db.session.add(tableA16)

               db.session.add(tableB1)
               db.session.add(tableB2)
               db.session.add(tableB3)
               db.session.add(tableB4)
               db.session.add(tableB5)
               db.session.add(tableB6)
               db.session.add(tableB7)
               db.session.add(tableB8)
               db.session.add(tableB9)
               db.session.add(tableB10)
               db.session.add(tableB11)
               db.session.add(tableB12)
               db.session.add(tableB13)
               
               db.session.commit()

               print('Sucessfully added')

          else:
               print('Table is existing na')