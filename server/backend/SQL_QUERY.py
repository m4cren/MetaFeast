from .extensions import db
from .db_config import save_data, delete_all_data, delete_data
from .db_models import Table, AdminCredentials, Products
from werkzeug.security import generate_password_hash

from dotenv import load_dotenv
import os
load_dotenv()


def create_products(app):
     with app.app_context():

#     category = db.Column(db.String(64), nullable = False)
#     quantity = db.Column(db.Integer, default = 0)
#     food_name = db.Column(db.String(64), nullable = False)
#     food_price = db.Column(db.String(64), nullable = False)
#     calories = db.Column(db.Integer, default = 0)
#     waiting_time = db.Column(db.String(64), nullable = False)
          existing_products = Products.query.first()

          if not existing_products:
               #Pastries
               croissant = Products(category = 'Pastries', food_name = 'Croissants', food_price = 199, calories = 230, waiting_time = '20mins')
               waffle = Products(category = 'Pastries', food_name = 'Waffle', food_price = 249, calories = 300, waiting_time = '15mins')
               #Savory Breakfast
             
               smoke_salmon_bagel = Products(category = 'Savory Breakfast', food_name = 'Salmon Bagel', food_price = 349, calories = 450, waiting_time = '15mins')
               avocado_bacon = Products(category = 'Savory Breakfast', food_name = 'Avocado Bacon', food_price = 299, calories = 400, waiting_time = '15mins')
               sushi = Products(category = 'Savory Breakfast', food_name = 'Sushi', food_price = 499, calories = 300, waiting_time = '30mins')
               #Healthy Options
               greek_yougart = Products(category = 'Healthy Options', food_name = 'Greek Yougart', food_price = 249, calories = 250, waiting_time = '10mins')
               berry_bliss_smoothie = Products(category = 'Healthy Options', food_name = 'Berry Bliss', food_price = 279, calories = 300, waiting_time = '10mins')
               #Appetizers
               pan_seared_cod = Products(category = 'Appetizers', food_name = 'Pan-Seared Cod', food_price = 349, calories = 250, waiting_time = '20mins')
               kombu_cured_bream = Products(category = 'Appetizers', food_name = 'Kombu-Cured Bream', food_price = 399, calories = 200, waiting_time = '25mins')
               shrimp_and_crispy_vegetable = Products(category = 'Appetizers', food_name = 'Shrimp & Vegetable', food_price =299, calories = 200, waiting_time = '20mins')
               foie_gras_terrine = Products(category = 'Appetizers', food_name = 'Foie Gras Terrine', food_price = 599, calories = 300, waiting_time = '25mins')
               ceasar_salad = Products(category = 'Appetizers', food_name = 'Caesar Salad', food_price = 249, calories = 150, waiting_time = '15mins')
               chargrilled_octopus = Products(category = 'Appetizers', food_name = 'Chargrilled Octopus', food_price = 499, calories = 200, waiting_time = '25mins')
               #Main Course

               sirloin_steak = Products(category = 'Main Course', food_name = 'Sirloin Steak', food_price = 699, calories = 600, waiting_time = '30mins')
               salmon_fillet = Products(category = 'Main Course', food_name = 'Salmon Fillet', food_price = 599, calories = 350, waiting_time = '25mins')
               wagyu_yakiniku = Products(category = 'Main Course', food_name = 'Wagyu Yakiniku', food_price = 1199, calories = 700, waiting_time = '30mins')
               grilled_octopus = Products(category = 'Main Course', food_name = 'Grilled Octopus', food_price = 699, calories = 300, waiting_time = '30mins')
               buttered_poached_king_crab = Products(category = 'Main Course', food_name = 'King Crab', food_price = 1499, calories = 600, waiting_time = '40mins')
               garlic_fennel_roast = Products(category = 'Main Course', food_name = 'Roast Lamb', food_price = 1199, calories = 600, waiting_time = '40mins')
               curried_cod = Products(category = 'Main Course', food_name = 'Curried Cod', food_price = 599, calories = 400, waiting_time = '25mins')
               venison_steak = Products(category = 'Main Course', food_name = 'Venison Steak', food_price = 999, calories = 500, waiting_time = '35mins')
               honey_butter_pork = Products(category = 'Main Course', food_name = 'Pork Chop', food_price = 599, calories = 500, waiting_time = '30mins')
               #Desserts
              
               pistachio_cheesecake = Products(category = 'Desserts', food_name = 'Pistachio Cheesecake', food_price = 349, calories = 400, waiting_time = '15mins')
               miso_caramel_pot = Products(category = 'Desserts', food_name = 'Miso Caramel', food_price = 299, calories = 350, waiting_time = '20mins')
               chocolate_mousse_verrine = Products(category = 'Desserts', food_name = 'Chocolate Mousse', food_price = 279, calories = 300, waiting_time = '15mins')
               raspberry_glazed_cake = Products(category = 'Desserts', food_name = 'Raspberry Cake', food_price = 349, calories = 350, waiting_time = '15mins')
               brown_sugar_pavlovas = Products(category = 'Desserts', food_name = 'Brown Pavlovas', food_price = 299, calories = 300, waiting_time = '20mins')
               salted_caramel_chocolate = Products(category = 'Desserts', food_name = 'Salted Caramel', food_price = 279, calories = 350, waiting_time = '15mins')
               coffee_tiramisu = Products(category = 'Desserts', food_name = 'Coffee Tiramisu', food_price = 349, calories = 400, waiting_time = '15mins')
               #Soups and Salads

               veloute_of_white_asparagus = Products(category = 'Soups & Salads', food_name = 'White Asparagus', food_price = 399, calories = 200, waiting_time = '25mins')
               vichyssoise = Products(category = 'Soups & Salads', food_name = 'Vichyssoise', food_price = 349, calories = 200, waiting_time = '20mins')
               prosciutto = Products(category = 'Soups & Salads', food_name = 'Prosciutto Figs', food_price = 449, calories = 300, waiting_time = '15mins')
               #Beverages
               
               rose_and_lychee = Products(category = 'Non-Alcoholic', food_name = 'Rose & Lychee', food_price = 199, calories = 100, waiting_time = '10mins')
               sugar_free_mint_iced_matcha = Products(category = 'Non-Alcoholic', food_name = 'Iced Matcha', food_price = 249, calories = 80, waiting_time = '10mins')
               honey_fermented = Products(category = 'Non-Alcoholic', food_name = 'Honey-Fermented', food_price = 299, calories = 150, waiting_time = '10mins')
               rosemary_paloma = Products(category = 'Cocktail', food_name = 'Rosemary Paloma', food_price = 349, calories = 150, waiting_time = '10mins')
               hibiscus_cocktail = Products(category = 'Cocktail', food_name = 'Hibiscus', food_price = 349, calories = 150, waiting_time = '10mins')
               cherry_blossom_cocktail = Products(category = 'Cocktail', food_name = 'Cherry Blossom', food_price = 349, calories = 150, waiting_time = '10mins')
               white_wine = Products(category = 'Champagne', food_name = 'White Wine', food_price = 399, calories = 120, waiting_time = 'Instant')
               red_wine = Products(category = 'Champagne', food_name = 'Red Wine', food_price = 399, calories = 120, waiting_time = 'Instant')
               for item in [
                    croissant, waffle, smoke_salmon_bagel, avocado_bacon, sushi, 
                    pan_seared_cod, kombu_cured_bream, shrimp_and_crispy_vegetable, foie_gras_terrine, 
                    ceasar_salad, chargrilled_octopus, sirloin_steak, salmon_fillet, wagyu_yakiniku, 
                    grilled_octopus, buttered_poached_king_crab, curried_cod, garlic_fennel_roast, 
                    venison_steak, honey_butter_pork, pistachio_cheesecake, miso_caramel_pot, 
                    chocolate_mousse_verrine, raspberry_glazed_cake, brown_sugar_pavlovas, 
                    salted_caramel_chocolate, coffee_tiramisu, veloute_of_white_asparagus, vichyssoise, 
                    prosciutto, rose_and_lychee, sugar_free_mint_iced_matcha, honey_fermented, 
                    rosemary_paloma, hibiscus_cocktail, cherry_blossom_cocktail, white_wine, red_wine, greek_yougart, berry_bliss_smoothie ]:
                    db.session.add(item)
               db.session.commit()
               print('Products Created!')
          else:
               print('Products already existing')
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