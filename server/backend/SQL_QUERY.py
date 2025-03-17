from .extensions import db
from .db_config import save_data, delete_all_data, delete_data
from .db_models import Table




def create_table(app):

     with app.app_context():

          is_table_created = Table.query.first()

          if not is_table_created:
          
               tables1st = [Table(table_name = f'A-{i}') for i in range(1,17)]
               tables2nd = [Table(table_name = f'B-{i}') for i in range(1,14)]
               
               db.session.add_all(tables1st)
               db.session.add_all(tables2nd)
               db.session.commit()

               print('Sucessfully added')

          else:
               print('Table is existing na')