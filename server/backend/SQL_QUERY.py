from .extensions import db
from .db_config import save_data, delete_all_data, delete_data, generate_payment_id
from .db_models import Table, AdminCredentials, Products, CostumerHistory, Reviews
from werkzeug.security import generate_password_hash

from dotenv import load_dotenv
import os

load_dotenv()


def create_sample_history(app):
    with app.app_context():
        existing_reviews = CostumerHistory.query.first()

        if not existing_reviews:
            print('Created sample history')
            reviews = [
                {
                    'costumer_name': 'Mika', #pag generate mo nalang chatgpt ng random names
                    'table_seated': 'B_12',
                    'total_payment': '2199', #ikaw na bahala kung pagkano binayad nila hehe from 2k - 8k sana 
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', 
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2018-01-01 15:24:10' # year-month-date   hours-minute-seconds  military time
                    #eto pinaka mahalaga dapat e from 2019 to 2025, basta may tig 5 na data per month sa isang year or kahit walang data ung ibang month sa loob ng isang taon
                    # kahit wag mona bagihun yung time, adjust nlng ng year month and date 

                },
                {
                    'costumer_name': 'Rainier',
                    'table_seated': 'B_2', 
                    'total_payment': '4679',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', 
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],

                    'dine_time': '2019-01-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Aki',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5975',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2018-01-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Kyle',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3579',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-01-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Rodnny',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5465',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-01-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'CJ',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7589',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-02-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Ijah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2498',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-02-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Tyrone',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5861',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-02-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Anne',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6458',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-02-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Jonah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2549',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-02-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Keanna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3587',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-03-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Aizen',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5798',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-03-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Sophia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7152',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-03-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Liam',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3565',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-03-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Olivia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1585',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-03-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Noah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5486',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-04-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Emma',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2588',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-04-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Elijah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5678',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-04-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Ava',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7965',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-04-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Mateo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3597',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-04-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Isabella',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5952',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-05-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Ethan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6498',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-05-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Mia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7846',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-05-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Lucas',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-05-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Amelia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2458',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-05-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Mason',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4597',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-06-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Harper',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3788',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-06-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Logan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7989',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-06-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Ella',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4898',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-06-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'James',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5486',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-06-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Charllote',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3489',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-07-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Benjamin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-07-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Evelyn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4872',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-07-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Alexander',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7235',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-07-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Abigail',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5482',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-07-31 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Henry',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1586',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-08-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Lily',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5796',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-08-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Jackson',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '8492',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-08-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Grace',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4537',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-08-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Sebastian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5142',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-08-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Zoe',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5712',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-09-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Leo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4515',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-09-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Aria',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7129',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-09-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Julian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4589',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-09-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Nora',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7899',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-09-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Gabriel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3159',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-10-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                    {
                    'costumer_name': 'Hazel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2145',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-10-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Caleb',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5852',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-10-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Violet',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4782',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-10-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nathan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4898',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-10-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Aurora',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5248',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-11-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ezra',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3259',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-11-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Stella',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2458',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-11-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Owen',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6478',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-11-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lucy',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4689',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-11-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Isaiah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3587',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-12-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Riley',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-12-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Asher',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5498',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-12-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Layla',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7892',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-12-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Levi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4598',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2019-12-31 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Aaron',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5678',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-01-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Bella',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3594',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-01-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Carter',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6879',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-01-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Daisy',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1548',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-01-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Dominic',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2582',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-01-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Eliza',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6597',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-02-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Finn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5234',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-02-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Freya',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3459',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-02-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Gavin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7892',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-02-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Gianna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5729',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-02-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Harrison',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2341',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-03-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hannah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5487',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-03-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7548',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-03-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ivy',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4897',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-03-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jace',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2341',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-03-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jasmine',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6487',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-04-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kaiden',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5487',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-04-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Keira',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2585',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-04-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Landon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5545',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-04-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lila',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4548',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-04-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Miles',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3458',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-05-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Mya',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7545',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-05-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nolan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5484',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-05-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Naomi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5678',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-05-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Oliver',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7545',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-05-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Olive',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-06-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Parker',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6754',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-06-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Penelope',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1321',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-06-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Quentin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7246',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-06-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Quinn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5484',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-06-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ryder',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3498',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-07-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rose',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3548',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-07-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Silas',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6798',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-07-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sienna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6881',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-07-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tristan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7162',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-07-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tessa',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5418',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-08-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Uriel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2154',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-08-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Uma',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3254',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-08-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Victor',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4895',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-08-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Vanessa',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7389',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-08-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Wesley',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6549',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-09-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Willow',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4564',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-09-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Xavier',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3545',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-09-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ximena',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7841',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-09-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Yosef',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5452',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-09-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Yara',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5482',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-10-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zachary',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3544',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-10-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zaylee',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2389',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-10-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Pheonix',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1578',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-10-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Skylar',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7898',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-10-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Atlas',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4569',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-11-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Luna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-11-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elias',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7812',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-11-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Juniper',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2158',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-11-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Theo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4569',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-11-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Esme',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1399',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-12-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rowan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7216',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-12-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Cleo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7513',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-12-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Milo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6481',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-12-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Indigo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5488',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2020-12-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                }, 
                   {
                    'costumer_name': 'Adrian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5782',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-01-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Blake',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7598',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-01-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Colin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5614',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-01-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Damien',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2458',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-01-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Derek',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-01-31 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Easton',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1589',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-02-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Felix',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-02-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Grayson',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-02-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hugo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3547',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-02-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Isaac',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7239',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-02-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jasper',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3587',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-03-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kyrie',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4899',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-03-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Levi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6891',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-03-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Marcus',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3587',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-03-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nathaniel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2329',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-03-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Orion',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1899',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-04-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Preston',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2899',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-04-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Quent',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6592',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-04-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Riley',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3284',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-04-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Simon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7121',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-04-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tyler',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5874',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-05-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Victor',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5841',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-05-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Wyatt',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7899',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-05-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zane',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6879',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-05-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Andre',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6781',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-05-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Beau',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3221',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-06-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Clyde',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3499',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-06-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Dante',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3577',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-06-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Emilio',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6711',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-06-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Finnian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4519',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-06-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Gideo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5122',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-07-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Heath',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7229',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-07-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ivan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-07-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jaxon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-07-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kieran',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3486',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-07-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Luka',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2488',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-08-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Magnus',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-08-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nico',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4211',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-08-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Omar',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2783',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-08-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Paolo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3289',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-08-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Quincy',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4599',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-09-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ronan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-09-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Seth',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7885',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-09-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tobias',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3816',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-09-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ulysses',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-09-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Vaughn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-10-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Wes',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3599',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-10-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Xander',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4899',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-10-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Yosef',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6782',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-10-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zeke',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-10-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ada',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7521',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-11-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Beatrice',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6449',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-11-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Cora',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1399',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-11-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Delilah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4599',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-11-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Eden',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3261',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-11-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Luffy',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3699',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-12-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zoro',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7541',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-12-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sanji',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1288',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-12-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Robin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3177',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-12-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ussop',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7211',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2021-12-31 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nami',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3477',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-01-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Meliodas',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7819',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-01-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Mishyai',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3581',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-01-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kocho',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1574',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-01-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ash',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3776',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-01-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Skye',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5447',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-02-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Cairo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7244',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-02-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Cleo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4823',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-02-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Koda',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4718',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-02-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zion',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-02-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Malani',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3719',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-03-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kaia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-03-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Onyx',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-03-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lennox',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2499',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-03-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zuri',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3778',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-03-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Oaklyn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-04-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Indie',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1889',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-04-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Knox',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3454',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-04-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Capri',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4399',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-04-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jett',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3729',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-04-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Mila',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-05-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rylan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3722',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-05-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elodie',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7499',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-05-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kairo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-05-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Brielle',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2488',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-05-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zayn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2564',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-06-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ayla',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-06-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Soren',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7188',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-06-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Luna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3726',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-06-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Bodhi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4759',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-06-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Everly',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7155',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-07-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ember',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4811',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-07-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zayden',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4822',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-07-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jax',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2719',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-07-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nova',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3713',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-07-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Orin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2779',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-08-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tamsin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-08-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kiera',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3811',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-08-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rowan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7188',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-08-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Leiora',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-08-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Vaelin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2711',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-09-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ysolde',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3829',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-09-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sorin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-09-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Frewyn',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-09-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Talon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7699',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-09-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elowen',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3715',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-10-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Corwin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4139',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-10-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Briar',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-10-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Aric',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-10-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lucan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-10-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Aerith',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-11-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Maelis',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4823',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-11-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ryker',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-11-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nimue',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5719',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-11-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Cassian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5822',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-11-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Vespera',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2711',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-12-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Dorian',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3719',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-12-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lyra',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2771',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-12-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Fenris',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-12-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Morrigan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2022-12-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Thorne',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2759',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-01-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elaria',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4729',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-01-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kael',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7289',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-01-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Isael',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7225',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-01-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sylas',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-01-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zephyra',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7443',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-02-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elric',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5782',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-02-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Draven',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4299',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-02-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Seraphina',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-02-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Galadriel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3811',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-02-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elara',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7443',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-03-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Cedric',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5799',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-03-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Thalia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1119',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-03-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Alaric',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5722',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-03-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Arwen',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2115',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-03-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lydia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3175',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-04-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Boaz',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-04-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Dinah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6669',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-04-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jonathan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3544',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-04-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Susanna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4199',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-04-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Asher',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2177',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-05-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Martha',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3722',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-05-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Caleb',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7779',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-05-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zipporah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2729',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-05-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Malachi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3822',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-05-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Phoebe',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-06-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Simeon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5277',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-06-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Joanna',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5822',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-06-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ezekiel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7897',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-06-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Priscilla',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3277',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-06-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Jairus',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2779',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-07-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lilah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6188',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-07-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Solomon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6969',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-07-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tabitha',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5125',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-07-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Gideo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3841',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-07-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Abigail',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7447',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-08-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Josiah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '9522',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-08-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Mary',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3444',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-08-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Abel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6522',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-08-20 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hannah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6332',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-08-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Micah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4610',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-09-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rachel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5122',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-09-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Reuben',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5216',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-09-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sarah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7212',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-09-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ezra',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5228',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-09-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Deborah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3177',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-10-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Lev',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6577',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-10-02 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Miriam',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7488',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-10-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Samuel',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7116',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-10-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Naomi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4512',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-10-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Isaac',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3552',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-11-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Esther',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4022',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-11-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Noah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6585',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-11-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ruth',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7115',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-11-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elijah',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5483',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-11-18 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Charon',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6889',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-12-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tyche',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3449',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-12-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Enyo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6177',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-12-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Themis',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4155',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-12-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Fenrir',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2772',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2023-12-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Eos',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4519',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-01-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Dione',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1898',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-01-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Bragi',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7115',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-01-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Morpheus',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5519',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-01-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hecate',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5277',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-01-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nemesis',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5129',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-02-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Medusa',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7218',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-02-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Pan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4153',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-02-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Circe',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5217',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-02-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rhea',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1553',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-02-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Helios',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2775',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-03-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nyx',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7122',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-03-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Triton',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1550',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-03-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Andromeda',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6522',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-03-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Atlas',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5124',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-03-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Demeter',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6227',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-04-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Calliope',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7049',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-04-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Achilles',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4577',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-04-23 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Juno',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-04-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Erol',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2776',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-04-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hestia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6879',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-05-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Selene',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3769',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-05-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hermes',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1895',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-05-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Gaia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7699',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-05-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Thor',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2816',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-05-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Iris',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5882',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-06-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Loki',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5586',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-06-06 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Artemis',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3782',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-06-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ares',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7779',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-06-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hera',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1499',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-06-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Odin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-07-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Freya',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7885',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-07-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Persues',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3488',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-07-14 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Athena',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5965',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-07-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Apollo',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3778',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-07-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Hollis',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6672',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-08-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Milan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5769',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-08-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zephyr',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2881',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-08-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zion',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6283',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-08-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Wren',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5963',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-08-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Toby',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-09-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Tegan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5882',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-09-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Teagan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2848',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-09-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Taylor',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4887',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-09-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sydney',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5429',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-09-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Stevie',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3788',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-10-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Spencer',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7979',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-10-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Skyler',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4893',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-10-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sky',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3228',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-10-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Shiloh',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1987',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-10-22 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sawyer',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3225',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-11-11 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Sage',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2785',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-11-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rowan',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1289',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-11-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Rory',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '3787',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-11-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'River',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6798',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-11-27 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Remy',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7689',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-12-03 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Reese',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2787',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-12-07 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Chin',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5788',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-12-15 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Peter',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6778',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-12-16 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kelsey',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6798',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2024-12-21 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Aveline',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5787',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-01-01 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kael',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-01-09 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Elara',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6997',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-01-12 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Dashiell',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7292',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-01-17 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Mirielle',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2189',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-01-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Isielde',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5787',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-02-04 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Caius',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '6576',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-02-08 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Nyra',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1989',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-02-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zephyr',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5829',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-02-28 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Liora',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2778',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-02-30 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Evren',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2549',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-03-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Zinnia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5878',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-03-10 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Ilias',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '1999',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-03-13 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Freesia',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2782',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-03-26 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Kaida',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4839',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-03-29 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Azura',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '7288',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-04-05 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Xanthe',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5788',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-04-19 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Amaris',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '4789',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-04-24 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                   {
                    'costumer_name': 'Idris',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '5882',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-04-25 10:24:10' # year-month-date   hours-minute-seconds  military time
                },
                {
                    'costumer_name': 'Ziva',
                    'table_seated': 'B_2', # range from A to B and 1 - 16 e.x: A_14 
                    'total_payment': '2881',
                    'total_order_items': 5,
                    'payment_id': generate_payment_id(),
                    'payment_method': 'Cash', # or PayMongo
                    'orders':[
                                {"quantity": 2, "food_name": "Pan-Seared Cod"},
                                {"quantity": 1, "food_name": "Kombu-Cured Bream"}, 
                                {"quantity": 1, "food_name": "Foie Gras Terrine"}
                            ],
                    'dine_time': '2025-04-30 10:24:10' # year-month-date   hours-minute-seconds  military time

              

                }
               
            ]

            for review in reviews:
            
                inject_data = CostumerHistory(costumer_name = review['costumer_name'],
                                              table_seated = review['table_seated'],
                                              total_payment = review['total_payment'],
                                              total_order_items = review['total_order_items'],
                                              payment_id = review['payment_id'],
                                              payment_method = review['payment_method'],
                                              dine_time = review['dine_time'],
                                              orders =[ order for order in review['orders']])
                save_data(inject_data)
        

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
            # Pastries
            croissant = Products(
                category="Pastries",
                food_name="Croissants",
                quantity=38,
                food_price=199,
                calories=230,
                waiting_time=15,
                img='croissants.png',
                description='Flaky, buttery croissants with a crisp golden crust.',
                details='Croissants are classic French pastries known for their delicate, flaky layers and rich, buttery flavor. Made through a labor-intensive laminating process, the dough is folded multiple times with butter to create an airy, melt-in-your-mouth texture. When baked, they develop a crisp, golden-brown crust with a soft, tender interior. Often enjoyed plain, they can also be filled with chocolate, almond cream, or ham and cheese for a savory twist. Perfect with coffee or tea, croissants are a beloved staple in bakeries worldwide.'
            )
            waffle = Products(
                category="Pastries",
                food_name="Waffle",
                quantity=38,
                food_price=249,
                calories=300,
                waiting_time=10,
                img='waffle.png',
                description='Crispy, golden waffle with a fluffy interior.',
                details='Waffles are a beloved breakfast and dessert treat, known for their crisp outer texture and soft, airy inside. Made from a simple batter of flour, eggs, milk, and butter, they are cooked in a waffle iron to create their signature grid pattern. They can be enjoyed sweet with toppings like maple syrup, whipped cream, fresh fruit, or chocolate, or served savory with fried chicken, cheese, or herbs. Whether Belgian-style (thick and fluffy) or classic American-style (thin and crispy), waffles are a versatile and delicious dish for any time of day.'
            )
            # Savory Breakfast

            smoke_salmon_bagel = Products(
                category="Savory Breakfast",
                food_name="Salmon Bagel",
                quantity=38,
                food_price=349,
                calories=450,
                waiting_time=10,
                img='smoke_salmon.png',
                description='Classic smoked salmon bagel with creamy cheese and fresh toppings.',
                details='A smoked salmon bagel is a savory and satisfying dish featuring silky, smoked salmon layered over a toasted bagel. Typically spread with cream cheese, the bagel is then topped with crisp red onions, capers, and fresh dill for a burst of flavor. The combination of the smoky, buttery salmon with the tangy and creamy elements creates a perfect balance. Whether enjoyed for breakfast or brunch, this timeless favorite is both delicious and elegant.'
            )
            avocado_bacon = Products(
                category="Savory Breakfast",
                food_name="Avocado Bacon",
                quantity=38,
                food_price=299,
                calories=400,
                waiting_time=10,
                img='avocado_bacon.png',
                description='Crispy bacon, creamy avocado, and egg on toasted artisan bread.',
                details='Avocado bacon and egg toast is a hearty and flavorful open-faced breakfast dish that combines creamy mashed avocado with crispy bacon and a perfectly cooked egg. The avocado provides a rich, buttery texture, while the bacon adds a smoky crunch. The egg—whether poached, fried, or soft-boiled—completes the dish with a silky yolk that blends beautifully with the other ingredients. Served on a toasted slice of sourdough or multigrain bread, this dish is a delicious balance of protein, healthy fats, and crunch, perfect for a satisfying start to the day.'
            )
            sushi = Products(
                category="Savory Breakfast",
                food_name="Sushi",
                quantity=38,
                food_price=499,
                calories=300,
                waiting_time=20,
                img='sushi.png',
                description='Delicate and flavorful sushi with fresh, high-quality ingredients.',
                details='Sushi is a traditional Japanese dish consisting of vinegared rice paired with fresh seafood, vegetables, or other ingredients. It comes in various forms, including nigiri (hand-pressed rice topped with fish), maki (rolled sushi wrapped in seaweed), and sashimi (thinly sliced raw fish without rice). The balance of flavors—umami-rich fish, slightly sweet rice, and a hint of soy sauce or wasabi—creates a harmonious taste experience. Often served with pickled ginger and wasabi, sushi is a beloved dish worldwide, known for its freshness, artistry, and refined flavors.'
            )
            # Healthy Options
            greek_yougart = Products(
                category="Healthy Options",
                food_name="Greek Yougart",
                quantity=38,
                food_price=249,
                calories=250,
                waiting_time=5,
                img='greek_yougart.png',
                description='Creamy Greek yogurt parfait with fresh fruit and crunchy granola.',
                details='A Greek yogurt parfait is a nutritious and delicious layered treat, combining thick and creamy Greek yogurt with fresh fruits, crunchy granola, and a drizzle of honey or syrup. The yogurt provides a rich, tangy base packed with protein and probiotics, while the fruits—such as berries, bananas, or mango—add natural sweetness and vibrant flavor. Granola or nuts bring a satisfying crunch, making this parfait a perfect balance of textures. Ideal for breakfast, a snack, or a light dessert, it’s a refreshing and wholesome choice for any time of day.'
            )
            berry_bliss_smoothie = Products(
                category="Healthy Options",
                food_name="Berry Bliss",
                quantity=38,
                food_price=279,
                calories=300,
                waiting_time=5,
                img='berry_bliss.png',
                description='Creamy Greek yogurt parfait with fresh fruit and crunchy granola.',
                details='A Greek yogurt parfait is a nutritious and delicious layered treat, combining thick and creamy Greek yogurt with fresh fruits, crunchy granola, and a drizzle of honey or syrup. The yogurt provides a rich, tangy base packed with protein and probiotics, while the fruits—such as berries, bananas, or mango—add natural sweetness and vibrant flavor. Granola or nuts bring a satisfying crunch, making this parfait a perfect balance of textures. Ideal for breakfast, a snack, or a light dessert, it’s a refreshing and wholesome choice for any time of day.'
            )
            # Appetizers
            pan_seared_cod = Products(
                category="Appetizers",
                food_name="Pan-Seared Cod",
                quantity=38,
                food_price=349,
                calories=250,
                waiting_time=15,
                img='pan_seared_cod.png',
                description='Delicate pan-seared cod with buttery beurre blanc.',
                details='Pan-seared cod with beurre blanc and crispy prosciutto is an elegant dish that highlights the delicate, flaky texture of cod. The fish is lightly seasoned and seared to a golden perfection, locking in its natural moisture. A velvety beurre blanc sauce, made from butter, white wine, and shallots, adds a luxurious richness that enhances the mild sweetness of the cod. Crispy prosciutto provides a salty, crunchy contrast, balancing the dish with its bold umami flavor. Served with roasted vegetables or a light salad, this dish is both refined and deeply satisfying.'
            )
            kombu_cured_bream = Products(
                category="Appetizers",
                food_name="Kombu-Cured Bream",
                quantity=38,
                food_price=399,
                calories=200,
                waiting_time=15,
                img='kombu_cured.png',
                description='Umami-rich kombu-cured bream with shio koji.',
                details='Kombu-cured bream with shio koji and celeriac dashi is a refined dish that highlights delicate flavors and umami depth. The bream is gently cured with kombu, a type of seaweed, enhancing its natural sweetness and silky texture. Shio koji, a fermented rice seasoning, adds a subtle savory complexity while tenderizing the fish. The dish is finished with a fragrant celeriac dashi, a light yet deeply flavorful broth that ties everything together with its earthy and umami-rich essence. This Japanese-inspired preparation creates a harmonious balance of taste and texture, perfect for an elegant dining experience.'
            )
            shrimp_and_crispy_vegetable = Products(
                category="Appetizers",
                food_name="Shrimp & Vegetable",
                quantity=38,
                food_price=299,
                calories=200,
                waiting_time=15,
                img='shrimp_and_crispy.png',
                description='Crispy shrimp and vegetable nest with a light.',
                details='Shrimp and crispy vegetable nest is a visually stunning dish featuring succulent shrimp nestled in a delicate, golden-brown web of crispy julienned vegetables. The shrimp are lightly seasoned and cooked to tender perfection, while the vegetables—such as carrots, zucchini, and potatoes—are finely shredded and fried until crunchy. The nest provides a delightful contrast of textures, with its airy crispiness complementing the juicy shrimp. Often served with a tangy dipping sauce or a drizzle of citrus-infused aioli, this dish is a perfect combination of elegance and crunch.'
            )
            foie_gras_terrine = Products(
                category="Appetizers",
                food_name="Foie Gras Terrine",
                quantity=38,
                food_price=599,
                calories=300,
                waiting_time=15,
                img='foie_gras.png',
                description='Silky, rich foie gras terrine with a delicate.',
                details='Foie gras terrine is a luxurious French delicacy made from carefully prepared duck or goose liver, slowly cooked and pressed into a smooth, velvety pâté. Its rich, buttery texture melts in the mouth, offering an indulgent depth of flavor. Typically served chilled, it is accompanied by toasted brioche, fig jam, or a touch of sea salt to enhance its natural sweetness. This elegant dish is a classic in fine dining, celebrated for its decadence and refined simplicity.'
            )
            ceasar_salad = Products(
                category="Appetizers",
                food_name="Caesar Salad",
                quantity=38,
                food_price=249,
                calories=150,
                waiting_time=10,
                img='caesar_salad.png',
                description='Crispy Caesar salad croquettes with a creamy.',
                details='Caesar salad croquettes are a creative twist on the classic Caesar salad, transforming its bold flavors into crispy, bite-sized delights. These golden-fried croquettes have a creamy filling made from romaine lettuce, Parmesan cheese, and a rich Caesar dressing-inspired mixture. The crispy outer shell adds a satisfying crunch, while the inside remains smooth and packed with umami. Often served with a tangy anchovy aioli or a light lemon drizzle, these croquettes offer a delicious balance of texture and flavor in every bite.'
            )
            chargrilled_octopus = Products(
                category="Appetizers",
                food_name="Chargrilled Octopus",
                quantity=38,
                food_price=499,
                calories=200,
                waiting_time=15,
                img='chargrilled_octopus.png',
                description='Tender, smoky chargrilled octopus.',
                details='Chargrilled octopus is a flavorful seafood dish known for its tender texture and rich, smoky taste. The octopus is first slow-cooked until perfectly tender, then charred over an open flame or grill to develop a crispy, caramelized exterior. It is often drizzled with olive oil, lemon juice, and herbs, enhancing its natural sweetness and briny depth. Served with roasted potatoes, grilled vegetables, or a tangy romesco sauce, this dish is a favorite in Mediterranean and Asian cuisine for its bold yet delicate flavors.'
            )
            # Main Course

            sirloin_steak = Products(
                category="Main Course",
                food_name="Sirloin Steak",
                quantity=38,
                food_price=699,
                calories=600,
                waiting_time=20,
                img='sirloin_steak.png',
                description='Juicy, flavorful, and perfectly grilled beef cut.',
                details='Sirloin steak is a popular cut of beef taken from the rear back portion of the cow, just above the tenderloin. It is known for its balance of tenderness and rich, beefy flavor, making it a favorite for grilling, pan-searing, or broiling. While not as tender as filet mignon, it has more flavor due to its moderate marbling, which keeps it juicy when cooked properly. Sirloin steak is often seasoned with salt, pepper, and garlic, and pairs well with sides like mashed potatoes, roasted vegetables, or a fresh salad.'
            )
            salmon_fillet = Products(
                category="Main Course",
                food_name="Salmon Fillet",
                quantity=38,
                food_price=599,
                calories=350,
                waiting_time=15,
                img='salmon_fillet.png',
                description='Tender and flavorful salmon fillet, perfectly cooked',
                details='Salmon fillet is a tender and flavorful cut of fish, rich in omega-3 fatty acids and high-quality protein. It can be grilled, baked, pan-seared, or steamed to bring out its natural taste and flaky texture. Often seasoned with herbs, lemon, and spices, it pairs well with vegetables, rice, or pasta. This versatile dish is a popular choice for a healthy and delicious meal.'
            )
            wagyu_yakiniku = Products(
                category="Main Course",
                food_name="Wagyu Yakiniku",
                quantity=38,
                food_price=1199,
                calories=700,
                waiting_time=20,
                img='wagyu_yakiniku.png',
                description='Juicy and marbled Wagyu beef, grilled to perfection.',
                details='Wagyu Yakiniku features premium, highly marbled Wagyu beef slices grilled over an open flame or tabletop grill. The rich fat content melts as it cooks, creating an incredibly tender and flavorful bite. It is often served with dipping sauces like ponzu or sesame, enhancing its natural umami taste. This Japanese-style barbecue is a favorite for its melt-in-your-mouth texture and luxurious flavor.'
            )
            grilled_octopus = Products(
                category="Main Course",
                food_name="Grilled Octopus",
                quantity=38,
                food_price=699,
                calories=300,
                waiting_time=20,
                img='grilled_octopus.png',
                description='Tender and smoky grilled octopus.',
                details='Grilled octopus is a delicious seafood dish known for its tender texture and smoky flavor. It is typically marinated with olive oil, lemon, garlic, and herbs before being grilled to perfection. The outside becomes slightly crispy while the inside remains soft and juicy. Often served with a side of vegetables, potatoes, or a citrusy dressing, it’s a favorite in Mediterranean and Asian cuisine.'
            )
            buttered_poached_king_crab = Products(
                category="Main Course",
                food_name="King Crab",
                quantity=38,
                food_price=1499,
                calories=600,
                waiting_time=25,
                img='butter_poached.png',
                description='King crab topped with caviar and cream sauce.',
                details='Butter-poached king crab is a decadent seafood dish, featuring succulent crab legs gently cooked in rich, melted butter to enhance their natural sweetness. The delicate, flaky meat is then topped with premium caviar, adding a burst of briny richness. A velvety cream sauce complements the dish, bringing a smooth, savory balance to the flavors. Often served with toasted brioche or a light salad, this dish is a true indulgence for seafood lovers.'
                
            )
            garlic_fennel_roast = Products(
                category="Main Course",
                food_name="Roast Lamb",
                quantity=38,
                food_price=1199,
                calories=600,
                waiting_time=25,
                img='garlic_fennel.png',
                description='Herb-crusted roast rack of lamb with garlic and fennel.',
                details='Garlic fennel roast rack of lamb is a flavorful and aromatic dish, featuring tender lamb coated with a fragrant blend of garlic, fennel seeds, and herbs. The lamb is seared to lock in its juices, then roasted to perfection, resulting in a crispy, golden crust and a juicy, succulent interior. The earthy sweetness of fennel complements the rich, slightly gamey flavor of the lamb, while roasted garlic enhances its depth.'
            )
            curried_cod = Products(
                category="Main Course",
                food_name="Curried Cod",
                quantity=38,
                food_price=599,
                calories=400,
                waiting_time=15,
                img='curried_cod.png',
                description='Fragrant and tender cod simmered in a rich curry sauce.',
                details='Curried cod is a flavorful dish where tender cod fillets are gently simmered in a fragrant, spiced curry sauce. The sauce, often made with coconut milk, tomatoes, and a blend of aromatic spices like turmeric, cumin, and coriander, enhances the mild sweetness of the fish. The cod absorbs the rich flavors while remaining delicate and flaky. Served with steamed rice or warm naan, this dish offers a comforting and delicious fusion of seafood and spices.'
            )
            venison_steak = Products(
                category="Main Course",
                food_name="Venison Steak",
                quantity=38,
                food_price=999,
                calories=500,
                waiting_time=20,
                img='venison_steak.png',
                description='Rich, tender venison steak with a bold, gamey flavor.',
                details='Venison steak is a lean and flavorful cut of deer meat, known for its tender texture and slightly gamey taste. It is best cooked medium-rare to preserve its juiciness and prevent dryness, as it has less fat than beef. Often seasoned with herbs like rosemary and thyme, it pairs well with red wine reductions, berry sauces, or roasted root vegetables. This dish is a favorite among game meat enthusiasts for its rich flavor and high protein content.'
            )
            honey_butter_pork = Products(
                category="Main Course",
                food_name="Pork Chop",
                quantity=38,
                food_price=599,
                calories=500,
                waiting_time=20,
                img='honey_butter_pork.png',
                description='Juicy honey-butter pork chop with savory Parmesan broccoli.',
                details='Honey butter pork chop is a delicious dish featuring tender, seared pork chops glazed with a rich blend of honey and butter, creating a perfect balance of sweetness and savory depth. The glaze caramelizes beautifully, enhancing the natural juiciness of the meat. It is paired with roasted broccoli tossed in Parmesan cheese, adding a nutty, cheesy crunch that complements the pork’s richness.'
            )
            # Desserts

            pistachio_cheesecake = Products(
                category="Desserts",
                food_name="Pistachio Cheesecake",
                quantity=38,
                food_price=349,
                calories=400,
                waiting_time=10,
                img='pistachio_cheesecake.png',
                description='Rich and creamy pistachio cheesecake with a nutty crunch.',
                details='Pistachio cheesecake is a luxurious dessert that combines the smooth richness of classic cheesecake with the delicate, nutty flavor of pistachios. The velvety filling, made with cream cheese and finely ground pistachios, sits atop a buttery biscuit or graham cracker crust, adding a delightful contrast in texture. Lightly sweet with a hint of earthiness, it’s often garnished with crushed pistachios, whipped cream, or a drizzle of honey. This elegant and indulgent treat is perfect for pistachio lovers seeking a unique twist on a classic dessert.'
            )
            miso_caramel_pot = Products(
                category="Desserts",
                food_name="Miso Caramel",
                quantity=38,
                food_price=299,
                calories=350,
                waiting_time=15,
                img='miso_caramel.png',
                description='Silky miso caramel pot de crème with a perfect balance of sweet and savory.',
                details='Miso caramel pot de crème is a luxurious French custard dessert infused with a unique umami twist. The rich, velvety custard is made with cream, egg yolks, and caramelized sugar, enhanced by the deep, salty complexity of miso. This fusion creates a perfectly balanced flavor—sweet, creamy, and subtly savory. Served chilled and often topped with a sprinkle of sea salt or whipped cream, this dessert offers an indulgent and sophisticated experience with every spoonful.'
            )
            chocolate_mousse_verrine = Products(
                category="Desserts",
                food_name="Chocolate Mousse",
                quantity=38,
                food_price=279,
                calories=300,
                waiting_time=10,
                img='chocolate_mousse.png',
                description='Decadent chocolate mousse verrine with layers of rich, velvety indulgence.',
                details='Chocolate mousse verrine is an elegant, layered dessert served in a glass, showcasing its luxurious texture and flavors. The silky, airy chocolate mousse is made with high-quality chocolate, cream, and whipped egg whites or ganache, creating a light yet deeply rich consistency. Often layered with elements like crushed biscuits, caramel, or fruit compote, it adds complexity and contrast to each bite. Topped with whipped cream, chocolate shavings, or a dusting of cocoa powder, this dessert is a visually stunning and indulgent treat perfect for any occasion.'
            )
            raspberry_glazed_cake = Products(
                category="Desserts",
                food_name="Raspberry Cake",
                quantity=38,
                food_price=349,
                calories=350,
                waiting_time=10,
                img='raspberry_cake.png',
                description='Moist raspberry-glazed cake with a tangy, fruity finish.',
                details='Raspberry glazed cake is a delightful dessert featuring a soft, buttery cake base topped with a vibrant, tangy raspberry glaze. The glaze, made from fresh raspberry puree and a touch of sugar, adds a glossy finish and bursts of fruity flavor that balance the cake’s sweetness. The moist crumb pairs beautifully with the tartness of the raspberries, creating a refreshing and indulgent treat. Often garnished with fresh berries or powdered sugar, this cake is perfect for any occasion, from afternoon tea to elegant celebrations.'
            )
            brown_sugar_pavlovas = Products(
                category="Desserts",
                food_name="Brown Pavlovas",
                quantity=38,
                food_price=299,
                calories=300,
                waiting_time=15,
                img='brown_sugar_pavlovas.png',
                description='Light and crispy brown sugar pavlovas with a caramelized sweetness.',
                details='Brown sugar pavlovas are delicate meringue-based desserts with a crisp, golden shell and a soft, marshmallow-like center. The addition of brown sugar gives them a rich, caramelized depth, enhancing their natural sweetness. These airy pavlovas are often topped with whipped cream, fresh fruits like berries or figs, and a drizzle of honey or caramel for extra indulgence. Their light texture and elegant presentation make them a perfect dessert for special occasions or a refined sweet treat.'
            )
            salted_caramel_chocolate = Products(
                category="Desserts",
                food_name="Salted Caramel",
                quantity=38,
                food_price=279,
                calories=350,
                waiting_time=10,
                img='salted_caramel.png',
                description='Luxurious salted caramel chocolate mousse with a perfect sweet-salty balance.',
                details='Salted caramel chocolate mousse is a rich and velvety dessert that combines deep chocolate flavors with the indulgent sweetness of caramel and a touch of sea salt. The airy mousse is made with high-quality chocolate and folded with salted caramel for a smooth, melt-in-your-mouth texture. The hint of salt enhances the richness of the chocolate, creating a perfectly balanced flavor. Often topped with whipped cream, caramel drizzle, or chocolate shavings, this elegant treat is a decadent choice for chocolate lovers.'
            )
            coffee_tiramisu = Products(
                category="Desserts",
                food_name="Coffee Tiramisu",
                quantity=38,
                food_price=349,
                calories=400,
                waiting_time=10,
                img='coffee_tiramisu.png',
                description='Rich and creamy coffee tiramisu cake with delicate espresso-soaked layers.',
                details='Coffee tiramisu cake is a decadent Italian-inspired dessert that blends the bold flavors of espresso with the light, creamy texture of mascarpone. Layers of coffee-soaked sponge cake or ladyfingers are stacked with a velvety mascarpone filling, lightly sweetened and infused with hints of cocoa. A dusting of cocoa powder on top adds a bittersweet contrast, enhancing the depth of flavor. Perfectly balanced between rich and airy, this indulgent cake is a favorite for coffee lovers and dessert enthusiasts alike.'
            )
            # Soups and Salads

            veloute_of_white_asparagus = Products(
                category="Soups & Salads",
                food_name="White Asparagus",
                quantity=38,
                food_price=399,
                calories=200,
                waiting_time=15,
                img='veloute.png',
                description='Silky white asparagus velouté with a delicate, creamy finish.',
                details='Velouté of white asparagus is a refined and elegant soup, known for its smooth, velvety texture and delicate flavor. Made by blending tender white asparagus with a classic velouté sauce—prepared from a light roux and stock—it achieves a rich yet airy consistency. A touch of cream enhances its silkiness, while subtle seasonings like nutmeg or white pepper bring depth. Often garnished with fresh herbs, croutons, or a drizzle of truffle oil, this dish is a luxurious way to savor the delicate essence of white asparagus.'
            )
            vichyssoise = Products(
                category="Soups & Salads",
                food_name="Vichyssoise",
                food_price=349,
                quantity=38,
                calories=200,
                waiting_time=15,
                img='vichyssoise.png',
                description='Chilled and creamy potato-leek soup with a velvety texture.',
                details='Vichyssoise is a classic French-inspired soup known for its rich, smooth consistency and refreshing chilled serving style. Made with pureed leeks, potatoes, onions, cream, and chicken or vegetable stock, it has a delicate, savory flavor with a hint of sweetness from the leeks. Traditionally served cold, it offers a soothing and creamy experience, perfect for warm weather, though it can also be enjoyed hot. Often garnished with fresh chives or a drizzle of olive oil, Vichyssoise is a timeless, elegant dish that balances comfort and sophistication.'
            )
            prosciutto = Products(
                category="Soups & Salads",
                food_name="Prosciutto Figs",
                food_price=449,
                calories=300,
                waiting_time=10,
                quantity=38,
                img='prosciutto_wrapped.png',
                description='Sweet and savory prosciutto-wrapped figs with feta salad.',
                details='Prosciutto-wrapped figs and feta salad is a delightful blend of sweet, salty, and tangy flavors. Juicy figs are wrapped in thin, savory prosciutto, then either served fresh or lightly grilled for a caramelized touch. They are paired with crisp greens, crumbled feta cheese, and a drizzle of honey or balsamic glaze, enhancing the contrast of flavors. Toasted nuts, such as walnuts or almonds, add a crunchy texture, making this salad a sophisticated yet simple dish perfect for any occasion.'
            )
            # Beverages

            rose_and_lychee = Products(
                category="Beverages",
                type='Non-Alcoholic',
                food_name="Rose & Lychee",
                food_price=199,
                calories=100,
                waiting_time=5,
                quantity=38,
                img='rose_and_lychee.png',
                description='Floral rose & lychee sparkling lemonade.',
                details='Rose & lychee sparkling lemonade is a delightful, fragrant beverage that combines the floral elegance of rose with the sweet, tropical essence of lychee. Freshly squeezed lemon juice adds a bright citrusy tang, perfectly balancing the drink’s sweetness. Sparkling water provides a refreshing effervescence, making it light and crisp with every sip. Often garnished with rose petals or lychee fruit, this drink is a beautifully aromatic and refreshing choice for any occasion.'
            )
            sugar_free_mint_iced_matcha = Products(
                category="Beverages",
                type='Non-Alcoholic',
                quantity=38,
                food_name="Iced Matcha",
                food_price=249,
                calories=80,
                waiting_time=5,
                img='sugar_free_mint.png',
                description='Refreshing sugar-free mint iced matcha latte with a smooth.',
                details='The sugar-free mint iced matcha latte is a vibrant and invigorating drink that blends the rich, earthy flavors of matcha with the cool freshness of mint. Made with high-quality ceremonial or culinary-grade matcha, it delivers a smooth, slightly grassy taste balanced by creamy milk or a dairy-free alternative. A touch of fresh mint enhances its natural sweetness, making it refreshing without the need for added sugar. Served over ice, this latte is a perfect choice for a light, energizing, and guilt-free beverage.'
            )
            honey_fermented = Products(
                category="Beverages",
                type='Non-Alcoholic',
                quantity=38,
                food_name="Honey-Fermented",
                food_price=299,
                calories=150,
                waiting_time=5,
                img='honey_fermented.png',
                description='Smooth honey-fermented cold brew.',
                details='Honey-fermented cold brew with lavender oat foam is a sophisticated and refreshing coffee experience. The cold brew is naturally sweetened and deepened in flavor through honey fermentation, enhancing its smooth, rich taste with subtle caramelized notes. A delicate lavender-infused oat foam crowns the drink, adding a creamy texture with a hint of floral aroma. The combination of bold coffee, natural sweetness, and silky, dairy-free foam creates a balanced and aromatic beverage, perfect for a calming yet energizing treat.'
            )
            rosemary_paloma = Products(
                category="Beverages",
                type='Cocktail',
                quantity=38,
                food_name="Rosemary Paloma",
                food_price=349,
                calories=150,
                waiting_time=5,
                img='rosemary_paloma.png',
                description='Crisp and herbaceous rosemary-infused Paloma cocktail.',
                details='The Rosemary Paloma is a refreshing twist on the classic Paloma, featuring the bright citrus notes of grapefruit and lime balanced with the aromatic essence of fresh rosemary. The cocktail is made with tequila, freshly squeezed grapefruit juice, a hint of lime, and lightly sweetened with agave or honey. A sprig of rosemary is either infused into the drink or used as a garnish, adding an earthy depth that complements the tart and bubbly profile. Served over ice with a salted rim, this cocktail is both invigorating and sophisticated.'
            )
            hibiscus_cocktail = Products(
                category="Beverages",
                type='Cocktail',
                food_name="Hibiscus",
                quantity=38,
                food_price=349,
                calories=150,
                waiting_time=5,
                img='hibiscus.png',
                description='Vibrant hibiscus cocktail with floral and citrus notes.',
                details='The hibiscus cocktail is a beautifully bold and refreshing drink, featuring the tart, floral essence of hibiscus flowers. Often infused into a tea or syrup, hibiscus adds a deep ruby-red hue and a slightly tangy flavor that pairs well with spirits like rum, gin, or tequila. A splash of citrus, such as lime or orange, brightens the drink, while a touch of honey or simple syrup balances its tartness. Garnished with fresh hibiscus petals or citrus slices, this cocktail is an elegant and aromatic choice for any occasion.'
            )
            cherry_blossom_cocktail = Products(
                category="Beverages",
                type='Cocktail',
                food_name="Cherry Blossom",
                quantity=38,
                food_price=349,
                calories=150,
                waiting_time=5,
                img='cherry_blossom.png',
                description='Delicate and floral cherry blossom cocktail with a hint of citrus.',
                details='The Cherry Blossom Cocktail is a beautifully light and fragrant drink inspired by the elegance of sakura (cherry blossoms). It blends floral notes with a touch of sweetness, often featuring ingredients like cherry liqueur, sake or gin, and a splash of citrus juice for brightness. A hint of almond or vanilla adds depth, complementing the delicate cherry essence. Served in a chilled glass and garnished with edible cherry blossoms or a twist of citrus peel, this cocktail is a refreshing and visually stunning choice for springtime or special occasions.'
            )
            red_wine = Products(
                category="Beverages",
                type='Champagne',
                food_name="Red Wine",
                food_price=399,
                quantity=38,
                calories=120,
                waiting_time=0,
                img='red_wine.png',
                description='Bold and rich red wine with deep, complex flavors.',
                details='Red wine is a timeless and elegant beverage made from fermented dark grapes, offering a wide range of flavors from fruity and jammy to earthy and spicy. Depending on the grape variety and aging process, it can have notes of blackberries, cherries, plums, or even hints of vanilla, oak, and pepper. Popular types include Cabernet Sauvignon, Merlot, Pinot Noir, and Syrah, each with its own unique character. Best enjoyed at a slightly cool temperature, red wine pairs well with red meats, cheeses, and rich pasta dishes, making it a staple in fine dining and casual gatherings alike.'
            )
            white_wine = Products(
                category="Beverages",
                type='Champagne',
                food_name="White Wine",
                quantity=38,
                food_price=399,
                calories=120,
                waiting_time=0,
                img='white_wine.png',
                description='Crisp and refreshing white wine with bright, fruity notes.',
                details='White wine is a light and versatile wine made from green or yellowish grapes, offering flavors ranging from citrusy and floral to creamy and nutty. Depending on the variety, it can have notes of apple, pear, peach, or tropical fruits, with some aged versions featuring hints of vanilla or honey. Popular types include Chardonnay, Sauvignon Blanc, Pinot Grigio, and Riesling, each with distinct characteristics. Served chilled, white wine pairs beautifully with seafood, poultry, salads, and creamy pasta, making it a refreshing choice for any occasion.'
            )
            for item in [
                croissant,
                waffle,
                smoke_salmon_bagel,
                avocado_bacon,
                sushi,
                pan_seared_cod,
                kombu_cured_bream,
                shrimp_and_crispy_vegetable,
                foie_gras_terrine,
                ceasar_salad,
                chargrilled_octopus,
                sirloin_steak,
                salmon_fillet,
                wagyu_yakiniku,
                grilled_octopus,
                buttered_poached_king_crab,
                curried_cod,
                garlic_fennel_roast,
                venison_steak,
                honey_butter_pork,
                pistachio_cheesecake,
                miso_caramel_pot,
                chocolate_mousse_verrine,
                raspberry_glazed_cake,
                brown_sugar_pavlovas,
                salted_caramel_chocolate,
                coffee_tiramisu,
                veloute_of_white_asparagus,
                vichyssoise,
                prosciutto,
                rose_and_lychee,
                sugar_free_mint_iced_matcha,
                honey_fermented,
                rosemary_paloma,
                hibiscus_cocktail,
                cherry_blossom_cocktail,
                white_wine,
                red_wine,
                greek_yougart,
                berry_bliss_smoothie,
            ]:
                db.session.add(item)
            db.session.commit()
            print("Products Created!")
        else:
            print("Products already existing")


def create_admin(app):

    with app.app_context():

        password = os.getenv("ADMIN_PASSWORD")
        hashed_password = generate_password_hash(password, method="pbkdf2:sha256")
        is_admin = AdminCredentials.query.first()

        if not is_admin:

            new_admin = AdminCredentials(admin_password=hashed_password)
            save_data(new_admin)

            print("Admin Created")
        else:
            print("Admin already created")


def create_table(app):

    with app.app_context():

        is_table_created = Table.query.first()

        if not is_table_created:

            tableA1 = Table(
                table_name="A_1",
                table_type="Single_seat",
                table_position_x=14.2,
                table_position_y=0.76,
                table_position_z=-18.3,
            )
            tableA2 = Table(
                table_name="A_2",
                table_type="Single_seat",
                table_position_x=14.2,
                table_position_y=0.76,
                table_position_z=-19.6,
            )
            tableA3 = Table(
                table_name="A_3",
                table_type="Single_seat",
                table_position_x=14.2,
                table_position_y=0.76,
                table_position_z=-20.9,
            )
            tableA4 = Table(
                table_name="A_4",
                table_type="Single_seat",
                table_position_x=14.2,
                table_position_y=0.76,
                table_position_z=-22.2,
            )
            tableA5 = Table(
                table_name="A_5",
                table_type="Single_seat",
                table_position_x=14.2,
                table_position_y=0.76,
                table_position_z=-23.5,
            )
            tableA6 = Table(
                table_name="A_6",
                table_type="Single_seat",
                table_position_x=14.2,
                table_position_y=0.76,
                table_position_z=-24.8,
            )
            tableA7 = Table(
                table_name="A_7",
                table_type="Quad_seat",
                table_position_x=15.3,
                table_position_y=0.76,
                table_position_z=-19,
            )
            tableA8 = Table(
                table_name="A_8",
                table_type="Quad_seat",
                table_position_x=15.3,
                table_position_y=0.76,
                table_position_z=-22.3,
            )
            tableA9 = Table(
                table_name="A_9",
                table_type="Double_seat",
                table_position_x=17.75,
                table_position_y=0.76,
                table_position_z=-18.5,
            )
            tableA10 = Table(
                table_name="A_10",
                table_type="Double_seat",
                table_position_x=17.75,
                table_position_y=0.76,
                table_position_z=-21,
            )
            tableA11 = Table(
                table_name="A_11",
                table_type="Double_seat",
                table_position_x=17.75,
                table_position_y=0.76,
                table_position_z=-23.5,
            )
            tableA12 = Table(
                table_name="A_12",
                table_type="Double_seat",
                table_position_x=19.4,
                table_position_y=0.76,
                table_position_z=-18.5,
            )
            tableA13 = Table(
                table_name="A_13",
                table_type="Double_seat",
                table_position_x=19.4,
                table_position_y=0.76,
                table_position_z=-21,
            )
            tableA14 = Table(
                table_name="A_14",
                table_type="Double_seat",
                table_position_x=19.4,
                table_position_y=0.76,
                table_position_z=-23.5,
            )
            tableA15 = Table(
                table_name="A_15",
                table_type="Quad_seat",
                table_position_x=21.3,
                table_position_y=0.76,
                table_position_z=-19,
            )
            tableA16 = Table(
                table_name="A_16",
                table_type="Quad_seat",
                table_position_x=21.3,
                table_position_y=0.76,
                table_position_z=-22.3,
            )

            tableB1 = Table(
                table_name="B_1",
                table_type="Quad_seat",
                table_position_x=14,
                table_position_y=3.98,
                table_position_z=-16.9,
            )
            tableB2 = Table(
                table_name="B_2",
                table_type="Double_seat",
                table_position_x=14.3,
                table_position_y=3.98,
                table_position_z=-20.2,
            )
            tableB3 = Table(
                table_name="B_3",
                table_type="Quad_seat",
                table_position_x=14,
                table_position_y=3.98,
                table_position_z=-23,
            )
            tableB4 = Table(
                table_name="B_4",
                table_type="Quad_seat",
                table_position_x=16.4,
                table_position_y=3.98,
                table_position_z=-18.4,
            )
            tableB5 = Table(
                table_name="B_5",
                table_type="Quad_seat",
                table_position_x=16.4,
                table_position_y=3.98,
                table_position_z=-21.5,
            )
            tableB6 = Table(
                table_name="B_6",
                table_type="Double_seat",
                table_position_x=19,
                table_position_y=3.98,
                table_position_z=-17.5,
            )
            tableB7 = Table(
                table_name="B_7",
                table_type="Double_seat",
                table_position_x=19,
                table_position_y=3.98,
                table_position_z=-20.25,
            )
            tableB8 = Table(
                table_name="B_8",
                table_type="Double_seat",
                table_position_x=19,
                table_position_y=3.98,
                table_position_z=-23,
            )
            tableB9 = Table(
                table_name="B_9",
                table_type="Double_seat",
                table_position_x=21,
                table_position_y=3.98,
                table_position_z=-17.5,
            )
            tableB10 = Table(
                table_name="B_10",
                table_type="Double_seat",
                table_position_x=21,
                table_position_y=3.98,
                table_position_z=-20.25,
            )
            tableB11 = Table(
                table_name="B_11",
                table_type="Double_seat",
                table_position_x=21,
                table_position_y=3.98,
                table_position_z=-23,
            )
            tableB12 = Table(
                table_name="B_12",
                table_type="Double_seat",
                table_position_x=23.7,
                table_position_y=3.98,
                table_position_z=-21.4,
            )
            tableB13 = Table(
                table_name="B_13",
                table_type="Double_seat",
                table_position_x=23.7,
                table_position_y=3.98,
                table_position_z=-23.8,
            )
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

            print("Sucessfully added")

        else:
            print("Table is existing na")
