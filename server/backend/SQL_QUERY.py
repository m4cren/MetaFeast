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
            # Pastries
            croissant = Products(
                category="Pastries",
                food_name="Croissants",
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
                img='rose_and_lychee.png',
                description='Floral rose & lychee sparkling lemonade.',
                details='Rose & lychee sparkling lemonade is a delightful, fragrant beverage that combines the floral elegance of rose with the sweet, tropical essence of lychee. Freshly squeezed lemon juice adds a bright citrusy tang, perfectly balancing the drink’s sweetness. Sparkling water provides a refreshing effervescence, making it light and crisp with every sip. Often garnished with rose petals or lychee fruit, this drink is a beautifully aromatic and refreshing choice for any occasion.'
            )
            sugar_free_mint_iced_matcha = Products(
                category="Beverages",
                type='Non-Alcoholic',
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
