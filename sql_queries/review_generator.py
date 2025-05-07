from faker import Faker
import random
from datetime import datetime
from pathlib import Path

fake = Faker()

comment_options = {
    1: ["Not good", "Very bad experience", "Terrible food"],
    2: ["Could be better", "Not worth it", "Below average"],
    3: ["Its okay", "Average taste", "Neutral experience"],
    4: ["Pretty good", "I liked it", "Nice food"],
    5: ["Sobrang sarap!", "Highly recommended!", "Superb!", "Delicious!", "Will order again!"]
}

time_ranges = [
    ("2018-01-01", "2020-01-01"),
    ("2020-01-01", "2022-01-01"),
    ("2022-01-01", "2024-01-01"),
    ("2024-01-01", "2025-04-30")
]

def generate_review(start, end):
    start = datetime.strptime(start, '%Y-%m-%d')
    end = datetime.strptime(end, '%Y-%m-%d')
    is_male = random.random() < 0.5
    name = fake.first_name_male() if is_male else fake.first_name_female()
    gender = "boy" if is_male else "girl"
    email = "Anonymous" if random.random() < 0.3 else fake.email()
    rating = 5 if random.random() < 0.6 else random.randint(1, 4)
    comment = random.choice(comment_options[rating])
    date = fake.date_time_between(start_date=start, end_date=end).strftime('%Y-%m-%d %H:%M:%S')
    img_url = f"https://avatar.iran.liara.run/public/{gender}?username={name}"
    total_spend = random.choice([699, 899, 1299, 1599, 1999, 2499, 2999, 3499, 4299, 4999, 5899])
    order_items = random.randint(2, 3)
    
    return f"""INSERT INTO reviews (email, ratings, name, comment, date, img_profile_url, total_spend, order_items)
VALUES ('{email}', {rating}, '{name}', '{comment}', '{date}', '{img_url}', {total_spend}, {order_items});"""

# Generate all entries
sql_statements = []
for start, end in time_ranges:
    for _ in range(100):
        sql_statements.append(generate_review(start, end))

# Write to file
Path("reviews_400_combined.sql").write_text("\n".join(sql_statements))
print("✅ File generated: reviews_400_combined.sql")
