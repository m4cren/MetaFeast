import layout from "../../../../styles/layouts/product_details.module.css";
import { ArrowBigLeft, ShoppingBasket, Flame, Hourglass } from "lucide-react";

import { ProductProps } from "../../../../types/types";
import { ProductDetailsType } from "../../../../types/types";
import { useState } from "react";

interface Props {
    selectedCuisine: string;
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    productDetails: ProductDetailsType[];
}

const ProductDetails = ({
    selectedCuisine,
    setSelectedCuisine,
    productDetails,
}: Props) => {
    const [orderQuantity, setOrderQuantity] = useState<number>(0);
    const product: ProductProps[] = [
        {
            img: "sirloin_steak.png",
            name: "Sirloin Steak",
            description: "Juicy, flavorful, and perfectly grilled beef cut.",
            price: productDetails.find(
                (product) => product.food_name === "Sirloin Steak",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Sirloin Steak",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Sirloin Steak",
            )?.waiting_time,
            height: 30,
            details: `Sirloin steak is a popular cut of beef taken from the rear back portion of the cow, just above the tenderloin. It is known for its balance of tenderness and rich, beefy flavor, making it a favorite for grilling, pan-searing, or broiling. While not as tender as filet mignon, it has more flavor due to its moderate marbling, which keeps it juicy when cooked properly. Sirloin steak is often seasoned with salt, pepper, and garlic, and pairs well with sides like mashed potatoes, roasted vegetables, or a fresh salad.`,
        },
        {
            img: "salmon_fillet.png",
            name: "Salmon Fillet",
            description:
                "Tender and flavorful salmon fillet, perfectly cooked.",
            price: productDetails.find(
                (product) => product.food_name === "Salmon Fillet",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Salmon Fillet",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Salmon Fillet",
            )?.waiting_time,
            height: 40,
            details: `Salmon fillet is a tender and flavorful cut of fish, rich in omega-3 fatty acids and high-quality protein. It can be grilled, baked, pan-seared, or steamed to bring out its natural taste and flaky texture. Often seasoned with herbs, lemon, and spices, it pairs well with vegetables, rice, or pasta. This versatile dish is a popular choice for a healthy and delicious meal.`,
        },
        {
            img: "wagyu_yakiniku.png",
            name: "Wagyu Yakiniku",
            description: "Juicy and marbled Wagyu beef, grilled to perfection.",
            price: productDetails.find(
                (product) => product.food_name === "Wagyu Yakiniku",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Wagyu Yakiniku",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Wagyu Yakiniku",
            )?.waiting_time,
            height: 31,
            details: `Wagyu Yakiniku features premium, highly marbled Wagyu beef slices grilled over an open flame or tabletop grill. The rich fat content melts as it cooks, creating an incredibly tender and flavorful bite. It is often served with dipping sauces like ponzu or sesame, enhancing its natural umami taste. This Japanese-style barbecue is a favorite for its melt-in-your-mouth texture and luxurious flavor.`,
        },
        {
            img: "grilled_octopus.png",
            name: "Grilled Octopus",
            description: "Tender and smoky grilled octopus.",
            price: productDetails.find(
                (product) => product.food_name === "Grilled Octopus",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Grilled Octopus",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Grilled Octopus",
            )?.waiting_time,
            height: 31,
            details: `Grilled octopus is a delicious seafood dish known for its tender texture and smoky flavor. It is typically marinated with olive oil, lemon, garlic, and herbs before being grilled to perfection. The outside becomes slightly crispy while the inside remains soft and juicy. Often served with a side of vegetables, potatoes, or a citrusy dressing, it’s a favorite in Mediterranean and Asian cuisine.`,
        },
        {
            img: "butter_poached.png",
            name: "King Crab",
            description: "King crab topped with caviar and cream sauce.",
            price: productDetails.find(
                (product) => product.food_name === "King Crab",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "King Crab",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "King Crab",
            )?.waiting_time,
            height: 40,
            details: `Butter-poached king crab is a decadent seafood dish, featuring succulent crab legs gently cooked in rich, melted butter to enhance their natural sweetness. The delicate, flaky meat is then topped with premium caviar, adding a burst of briny richness. A velvety cream sauce complements the dish, bringing a smooth, savory balance to the flavors. Often served with toasted brioche or a light salad, this dish is a true indulgence for seafood lovers.`,
        },
        {
            img: "garlic_fennel.png",
            name: "Roast Lamb",
            description:
                "Herb-crusted roast rack of lamb with garlic and fennel.",
            price: productDetails.find(
                (product) => product.food_name === "Roast Lamb",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Roast Lamb",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Roast Lamb",
            )?.waiting_time,
            height: 31,
            details: `Garlic fennel roast rack of lamb is a flavorful and aromatic dish, featuring tender lamb coated with a fragrant blend of garlic, fennel seeds, and herbs. The lamb is seared to lock in its juices, then roasted to perfection, resulting in a crispy, golden crust and a juicy, succulent interior. The earthy sweetness of fennel complements the rich, slightly gamey flavor of the lamb, while roasted garlic enhances its depth.`,
        },
        {
            img: "curried_cod.png",
            name: "Curried Cod",
            description:
                "Fragrant and tender cod simmered in a rich curry sauce.",
            price: productDetails.find(
                (product) => product.food_name === "Curried Cod",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Curried Cod",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Curried Cod",
            )?.waiting_time,
            height: 31,
            details: `Curried cod is a flavorful dish where tender cod fillets are gently simmered in a fragrant, spiced curry sauce. The sauce, often made with coconut milk, tomatoes, and a blend of aromatic spices like turmeric, cumin, and coriander, enhances the mild sweetness of the fish. The cod absorbs the rich flavors while remaining delicate and flaky. Served with steamed rice or warm naan, this dish offers a comforting and delicious fusion of seafood and spices.`,
        },
        {
            img: "venison_steak.png",
            name: "Venison Steak",
            description:
                "Rich, tender venison steak with a bold, gamey flavor.",
            price: productDetails.find(
                (product) => product.food_name === "Venison Steak",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Venison Steak",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Venison Steak",
            )?.waiting_time,
            height: 31,
            details: `Venison steak is a lean and flavorful cut of deer meat, known for its tender texture and slightly gamey taste. It is best cooked medium-rare to preserve its juiciness and prevent dryness, as it has less fat than beef. Often seasoned with herbs like rosemary and thyme, it pairs well with red wine reductions, berry sauces, or roasted root vegetables. This dish is a favorite among game meat enthusiasts for its rich flavor and high protein content.`,
        },
        {
            img: "honey_butter_pork.png",
            name: "Pork Chop",
            description:
                "Juicy honey-butter pork chop with savory Parmesan broccoli.",
            price: productDetails.find(
                (product) => product.food_name === "Pork Chop",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Pork Chop",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Pork Chop",
            )?.waiting_time,
            height: 31,
            details: `Honey butter pork chop is a delicious dish featuring tender, seared pork chops glazed with a rich blend of honey and butter, creating a perfect balance of sweetness and savory depth. The glaze caramelizes beautifully, enhancing the natural juiciness of the meat. It is paired with roasted broccoli tossed in Parmesan cheese, adding a nutty, cheesy crunch that complements the pork’s richness.`,
        },
        {
            img: "pan_seared_cod.png",
            name: "Pan-Seared Cod",
            description: "Delicate pan-seared cod with buttery beurre blanc.",
            price: productDetails.find(
                (product) => product.food_name === "Pan-Seared Cod",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Pan-Seared Cod",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Pan-Seared Cod",
            )?.waiting_time,
            height: 31,
            details: `Pan-seared cod with beurre blanc and crispy prosciutto is an elegant dish that highlights the delicate, flaky texture of cod. The fish is lightly seasoned and seared to a golden perfection, locking in its natural moisture. A velvety beurre blanc sauce, made from butter, white wine, and shallots, adds a luxurious richness that enhances the mild sweetness of the cod. Crispy prosciutto provides a salty, crunchy contrast, balancing the dish with its bold umami flavor. Served with roasted vegetables or a light salad, this dish is both refined and deeply satisfying.`,
        },
        {
            img: "kombu_cured.png",
            name: "Kombu-Cured Bream",
            description: "Umami-rich kombu-cured bream with shio koji.",
            price: productDetails.find(
                (product) => product.food_name === "Kombu-Cured Bream",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Kombu-Cured Bream",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Kombu-Cured Bream",
            )?.waiting_time,
            height: 31,
            details: `Kombu-cured bream with shio koji and celeriac dashi is a refined dish that highlights delicate flavors and umami depth. The bream is gently cured with kombu, a type of seaweed, enhancing its natural sweetness and silky texture. Shio koji, a fermented rice seasoning, adds a subtle savory complexity while tenderizing the fish. The dish is finished with a fragrant celeriac dashi, a light yet deeply flavorful broth that ties everything together with its earthy and umami-rich essence. This Japanese-inspired preparation creates a harmonious balance of taste and texture, perfect for an elegant dining experience.`,
        },
        {
            img: "shrimp_and_crispy.png",
            name: "Shrimp & Vegetable",
            description: "Crispy shrimp and vegetable nest with a light.",
            price: productDetails.find(
                (product) => product.food_name === "Shrimp & Vegetable",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Shrimp & Vegetable",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Shrimp & Vegetable",
            )?.waiting_time,
            height: 31,
            details: `Shrimp and crispy vegetable nest is a visually stunning dish featuring succulent shrimp nestled in a delicate, golden-brown web of crispy julienned vegetables. The shrimp are lightly seasoned and cooked to tender perfection, while the vegetables—such as carrots, zucchini, and potatoes—are finely shredded and fried until crunchy. The nest provides a delightful contrast of textures, with its airy crispiness complementing the juicy shrimp. Often served with a tangy dipping sauce or a drizzle of citrus-infused aioli, this dish is a perfect combination of elegance and crunch.`,
        },
        {
            img: "foie_gras.png",
            name: "Foie Gras Terrine",
            description: "Silky, rich foie gras terrine with a delicate.",
            price: productDetails.find(
                (product) => product.food_name === "Foie Gras Terrine",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Foie Gras Terrine",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Foie Gras Terrine",
            )?.waiting_time,
            height: 31,
            details: `Foie gras terrine is a luxurious French delicacy made from carefully prepared duck or goose liver, slowly cooked and pressed into a smooth, velvety pâté. Its rich, buttery texture melts in the mouth, offering an indulgent depth of flavor. Typically served chilled, it is accompanied by toasted brioche, fig jam, or a touch of sea salt to enhance its natural sweetness. This elegant dish is a classic in fine dining, celebrated for its decadence and refined simplicity.`,
        },
        {
            img: "caesar_salad.png",
            name: "Caesar Salad",
            description: "Crispy Caesar salad croquettes with a creamy.",
            price: productDetails.find(
                (product) => product.food_name === "Caesar Salad",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Caesar Salad",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Caesar Salad",
            )?.waiting_time,
            height: 31,
            details: `Caesar salad croquettes are a creative twist on the classic Caesar salad, transforming its bold flavors into crispy, bite-sized delights. These golden-fried croquettes have a creamy filling made from romaine lettuce, Parmesan cheese, and a rich Caesar dressing-inspired mixture. The crispy outer shell adds a satisfying crunch, while the inside remains smooth and packed with umami. Often served with a tangy anchovy aioli or a light lemon drizzle, these croquettes offer a delicious balance of texture and flavor in every bite.`,
        },
        {
            img: "chargrilled_octopus.png",
            name: "Chargrilled Octopus",
            description: "Tender, smoky chargrilled octopus.",
            price: productDetails.find(
                (product) => product.food_name === "Chargrilled Octopus",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Chargrilled Octopus",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Chargrilled Octopus",
            )?.waiting_time,
            height: 31,
            details: `Chargrilled octopus is a flavorful seafood dish known for its tender texture and rich, smoky taste. The octopus is first slow-cooked until perfectly tender, then charred over an open flame or grill to develop a crispy, caramelized exterior. It is often drizzled with olive oil, lemon juice, and herbs, enhancing its natural sweetness and briny depth. Served with roasted potatoes, grilled vegetables, or a tangy romesco sauce, this dish is a favorite in Mediterranean and Asian cuisine for its bold yet delicate flavors.`,
        },
        {
            img: "rose_and_lychee.png",
            name: "Rose & Lychee",
            description: "Floral rose & lychee sparkling lemonade.",
            price: productDetails.find(
                (product) => product.food_name === "Rose & Lychee",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Rose & Lychee",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Rose & Lychee",
            )?.waiting_time,
            height: 31,
            details: `Rose & lychee sparkling lemonade is a delightful, fragrant beverage that combines the floral elegance of rose with the sweet, tropical essence of lychee. Freshly squeezed lemon juice adds a bright citrusy tang, perfectly balancing the drink’s sweetness. Sparkling water provides a refreshing effervescence, making it light and crisp with every sip. Often garnished with rose petals or lychee fruit, this drink is a beautifully aromatic and refreshing choice for any occasion.`,
        },
        {
            img: "sugar_free_mint.png",
            name: "Iced Matcha",
            description:
                "Refreshing sugar-free mint iced matcha latte with a smooth..",
            price: productDetails.find(
                (product) => product.food_name === "Iced Matcha",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Iced Matcha",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Iced Matcha",
            )?.waiting_time,
            height: 31,
            details: `The sugar-free mint iced matcha latte is a vibrant and invigorating drink that blends the rich, earthy flavors of matcha with the cool freshness of mint. Made with high-quality ceremonial or culinary-grade matcha, it delivers a smooth, slightly grassy taste balanced by creamy milk or a dairy-free alternative. A touch of fresh mint enhances its natural sweetness, making it refreshing without the need for added sugar. Served over ice, this latte is a perfect choice for a light, energizing, and guilt-free beverage.`,
        },
        {
            img: "honey_fermented.png",
            name: "Honey-Fermented",
            description: "Smooth honey-fermented cold brew.",
            price: productDetails.find(
                (product) => product.food_name === "Honey-Fermented",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Honey-Fermented",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Honey-Fermented",
            )?.waiting_time,
            height: 31,
            details: `Honey-fermented cold brew with lavender oat foam is a sophisticated and refreshing coffee experience. The cold brew is naturally sweetened and deepened in flavor through honey fermentation, enhancing its smooth, rich taste with subtle caramelized notes. A delicate lavender-infused oat foam crowns the drink, adding a creamy texture with a hint of floral aroma. The combination of bold coffee, natural sweetness, and silky, dairy-free foam creates a balanced and aromatic beverage, perfect for a calming yet energizing treat.`,
        },
        {
            img: "rosemary_paloma.png",
            name: "Rosemary Paloma",
            description:
                "Crisp and herbaceous rosemary-infused Paloma cocktail.",
            price: productDetails.find(
                (product) => product.food_name === "Rosemary Paloma",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Rosemary Paloma",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Rosemary Paloma",
            )?.waiting_time,
            height: 31,
            details: `The Rosemary Paloma is a refreshing twist on the classic Paloma, featuring the bright citrus notes of grapefruit and lime balanced with the aromatic essence of fresh rosemary. The cocktail is made with tequila, freshly squeezed grapefruit juice, a hint of lime, and lightly sweetened with agave or honey. A sprig of rosemary is either infused into the drink or used as a garnish, adding an earthy depth that complements the tart and bubbly profile. Served over ice with a salted rim, this cocktail is both invigorating and sophisticated.`,
        },
        {
            img: "hibiscus.png",
            name: "Hibiscus",
            description:
                "Vibrant hibiscus cocktail with floral and citrus notes.",
            price: productDetails.find(
                (product) => product.food_name === "Hibiscus",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Hibiscus",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Hibiscus",
            )?.waiting_time,
            height: 31,
            details: `The hibiscus cocktail is a beautifully bold and refreshing drink, featuring the tart, floral essence of hibiscus flowers. Often infused into a tea or syrup, hibiscus adds a deep ruby-red hue and a slightly tangy flavor that pairs well with spirits like rum, gin, or tequila. A splash of citrus, such as lime or orange, brightens the drink, while a touch of honey or simple syrup balances its tartness. Garnished with fresh hibiscus petals or citrus slices, this cocktail is an elegant and aromatic choice for any occasion.`,
        },
        {
            img: "cherry_blossom.png",
            name: "Cherry Blossom",
            description:
                "Delicate and floral cherry blossom cocktail with a hint of citrus.",
            price: productDetails.find(
                (product) => product.food_name === "Cherry Blossom",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Cherry Blossom",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Cherry Blossom",
            )?.waiting_time,
            height: 31,
            details: `The Cherry Blossom Cocktail is a beautifully light and fragrant drink inspired by the elegance of sakura (cherry blossoms). It blends floral notes with a touch of sweetness, often featuring ingredients like cherry liqueur, sake or gin, and a splash of citrus juice for brightness. A hint of almond or vanilla adds depth, complementing the delicate cherry essence. Served in a chilled glass and garnished with edible cherry blossoms or a twist of citrus peel, this cocktail is a refreshing and visually stunning choice for springtime or special occasions.`,
        },
        {
            img: "red_wine.png",
            name: "Red Wine",
            description: "Bold and rich red wine with deep, complex flavors.",
            price: productDetails.find(
                (product) => product.food_name === "Red Wine",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Red Wine",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Red Wine",
            )?.waiting_time,
            height: 31,
            details: `Red wine is a timeless and elegant beverage made from fermented dark grapes, offering a wide range of flavors from fruity and jammy to earthy and spicy. Depending on the grape variety and aging process, it can have notes of blackberries, cherries, plums, or even hints of vanilla, oak, and pepper. Popular types include Cabernet Sauvignon, Merlot, Pinot Noir, and Syrah, each with its own unique character. Best enjoyed at a slightly cool temperature, red wine pairs well with red meats, cheeses, and rich pasta dishes, making it a staple in fine dining and casual gatherings alike.`,
        },
        {
            img: "white_wine.png",
            name: "White Wine",
            description:
                "Crisp and refreshing white wine with bright, fruity notes.",
            price: productDetails.find(
                (product) => product.food_name === "White Wine",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "White Wine",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "White Wine",
            )?.waiting_time,
            height: 31,
            details: `White wine is a light and versatile wine made from green or yellowish grapes, offering flavors ranging from citrusy and floral to creamy and nutty. Depending on the variety, it can have notes of apple, pear, peach, or tropical fruits, with some aged versions featuring hints of vanilla or honey. Popular types include Chardonnay, Sauvignon Blanc, Pinot Grigio, and Riesling, each with distinct characteristics. Served chilled, white wine pairs beautifully with seafood, poultry, salads, and creamy pasta, making it a refreshing choice for any occasion.`,
        },
        {
            img: "croissants.png",
            name: "Croissants",
            description: "Flaky, buttery croissants with a crisp golden crust.",
            price: productDetails.find(
                (product) => product.food_name === "Croissants",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Croissants",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Croissants",
            )?.waiting_time,
            height: 31,
            details: `Croissants are classic French pastries known for their delicate, flaky layers and rich, buttery flavor. Made through a labor-intensive laminating process, the dough is folded multiple times with butter to create an airy, melt-in-your-mouth texture. When baked, they develop a crisp, golden-brown crust with a soft, tender interior. Often enjoyed plain, they can also be filled with chocolate, almond cream, or ham and cheese for a savory twist. Perfect with coffee or tea, croissants are a beloved staple in bakeries worldwide.`,
        },
        {
            img: "waffle.png",
            name: "Waffle",
            description: "Crispy, golden waffle with a fluffy interior.",
            price: productDetails.find(
                (product) => product.food_name === "Waffle",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Waffle",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Waffle",
            )?.waiting_time,
            height: 31,
            details: `Waffles are a beloved breakfast and dessert treat, known for their crisp outer texture and soft, airy inside. Made from a simple batter of flour, eggs, milk, and butter, they are cooked in a waffle iron to create their signature grid pattern. They can be enjoyed sweet with toppings like maple syrup, whipped cream, fresh fruit, or chocolate, or served savory with fried chicken, cheese, or herbs. Whether Belgian-style (thick and fluffy) or classic American-style (thin and crispy), waffles are a versatile and delicious dish for any time of day.`,
        },
        {
            img: "greek_yougart.png",
            name: "Greek Yougart",
            description:
                "Creamy Greek yogurt parfait with fresh fruit and crunchy granola.",
            price: productDetails.find(
                (product) => product.food_name === "Greek Yougart",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Greek Yougart",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Greek Yougart",
            )?.waiting_time,
            height: 31,
            details: `A Greek yogurt parfait is a nutritious and delicious layered treat, combining thick and creamy Greek yogurt with fresh fruits, crunchy granola, and a drizzle of honey or syrup. The yogurt provides a rich, tangy base packed with protein and probiotics, while the fruits—such as berries, bananas, or mango—add natural sweetness and vibrant flavor. Granola or nuts bring a satisfying crunch, making this parfait a perfect balance of textures. Ideal for breakfast, a snack, or a light dessert, it’s a refreshing and wholesome choice for any time of day.`,
        },
        {
            img: "berry_bliss.png",
            name: "Berry Bliss",
            description:
                "Creamy Greek yogurt parfait with fresh fruit and crunchy granola.",
            price: productDetails.find(
                (product) => product.food_name === "Berry Bliss",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Berry Bliss",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Berry Bliss",
            )?.waiting_time,
            height: 31,
            details: `A Greek yogurt parfait is a nutritious and delicious layered treat, combining thick and creamy Greek yogurt with fresh fruits, crunchy granola, and a drizzle of honey or syrup. The yogurt provides a rich, tangy base packed with protein and probiotics, while the fruits—such as berries, bananas, or mango—add natural sweetness and vibrant flavor. Granola or nuts bring a satisfying crunch, making this parfait a perfect balance of textures. Ideal for breakfast, a snack, or a light dessert, it’s a refreshing and wholesome choice for any time of day.`,
        },
        {
            img: "veloute.png",
            name: "White Asparagus",
            description:
                "Silky white asparagus velouté with a delicate, creamy finish.",
            price: productDetails.find(
                (product) => product.food_name === "White Asparagus",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "White Asparagus",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "White Asparagus",
            )?.waiting_time,
            height: 31,
            details: `Velouté of white asparagus is a refined and elegant soup, known for its smooth, velvety texture and delicate flavor. Made by blending tender white asparagus with a classic velouté sauce—prepared from a light roux and stock—it achieves a rich yet airy consistency. A touch of cream enhances its silkiness, while subtle seasonings like nutmeg or white pepper bring depth. Often garnished with fresh herbs, croutons, or a drizzle of truffle oil, this dish is a luxurious way to savor the delicate essence of white asparagus.`,
        },
        {
            img: "vichyssoise.png",
            name: "Vichyssoise",
            description:
                "Chilled and creamy potato-leek soup with a velvety texture.",
            price: productDetails.find(
                (product) => product.food_name === "Vichyssoise",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Vichyssoise",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Vichyssoise",
            )?.waiting_time,
            height: 31,
            details: `Vichyssoise is a classic French-inspired soup known for its rich, smooth consistency and refreshing chilled serving style. Made with pureed leeks, potatoes, onions, cream, and chicken or vegetable stock, it has a delicate, savory flavor with a hint of sweetness from the leeks. Traditionally served cold, it offers a soothing and creamy experience, perfect for warm weather, though it can also be enjoyed hot. Often garnished with fresh chives or a drizzle of olive oil, Vichyssoise is a timeless, elegant dish that balances comfort and sophistication.`,
        },
        {
            img: "prosciutto_wrapped.png",
            name: "Prosciutto Figs",
            description:
                "Sweet and savory prosciutto-wrapped figs with feta salad.",
            price: productDetails.find(
                (product) => product.food_name === "Prosciutto Figs",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Prosciutto Figs",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Prosciutto Figs",
            )?.waiting_time,
            height: 31,
            details: `Prosciutto-wrapped figs and feta salad is a delightful blend of sweet, salty, and tangy flavors. Juicy figs are wrapped in thin, savory prosciutto, then either served fresh or lightly grilled for a caramelized touch. They are paired with crisp greens, crumbled feta cheese, and a drizzle of honey or balsamic glaze, enhancing the contrast of flavors. Toasted nuts, such as walnuts or almonds, add a crunchy texture, making this salad a sophisticated yet simple dish perfect for any occasion.`,
        },
        {
            img: "pistachio_cheesecake.png",
            name: "Pistachio Cheesecake",
            description:
                "Rich and creamy pistachio cheesecake with a nutty crunch.",
            price: productDetails.find(
                (product) => product.food_name === "Pistachio Cheesecake",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Pistachio Cheesecake",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Pistachio Cheesecake",
            )?.waiting_time,
            height: 31,
            details: `Pistachio cheesecake is a luxurious dessert that combines the smooth richness of classic cheesecake with the delicate, nutty flavor of pistachios. The velvety filling, made with cream cheese and finely ground pistachios, sits atop a buttery biscuit or graham cracker crust, adding a delightful contrast in texture. Lightly sweet with a hint of earthiness, it’s often garnished with crushed pistachios, whipped cream, or a drizzle of honey. This elegant and indulgent treat is perfect for pistachio lovers seeking a unique twist on a classic dessert.`,
        },
        {
            img: "miso_caramel.png",
            name: "Miso Caramel",
            description:
                "Silky miso caramel pot de crème with a perfect balance of sweet and savory.",
            price: productDetails.find(
                (product) => product.food_name === "Miso Caramel",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Miso Caramel",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Miso Caramel",
            )?.waiting_time,
            height: 31,
            details: `Miso caramel pot de crème is a luxurious French custard dessert infused with a unique umami twist. The rich, velvety custard is made with cream, egg yolks, and caramelized sugar, enhanced by the deep, salty complexity of miso. This fusion creates a perfectly balanced flavor—sweet, creamy, and subtly savory. Served chilled and often topped with a sprinkle of sea salt or whipped cream, this dessert offers an indulgent and sophisticated experience with every spoonful.`,
        },
        {
            img: "chocolate_mousse.png",
            name: "Chocolate Mousse",
            description:
                "Decadent chocolate mousse verrine with layers of rich, velvety indulgence.",
            price: productDetails.find(
                (product) => product.food_name === "Chocolate Mousse",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Chocolate Mousse",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Chocolate Mousse",
            )?.waiting_time,
            height: 31,
            details: `Chocolate mousse verrine is an elegant, layered dessert served in a glass, showcasing its luxurious texture and flavors. The silky, airy chocolate mousse is made with high-quality chocolate, cream, and whipped egg whites or ganache, creating a light yet deeply rich consistency. Often layered with elements like crushed biscuits, caramel, or fruit compote, it adds complexity and contrast to each bite. Topped with whipped cream, chocolate shavings, or a dusting of cocoa powder, this dessert is a visually stunning and indulgent treat perfect for any occasion.`,
        },
        {
            img: "raspberry_cake.png",
            name: "Raspberry Cake",
            description:
                "Moist raspberry-glazed cake with a tangy, fruity finish.",
            price: productDetails.find(
                (product) => product.food_name === "Raspberry Cake",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Raspberry Cake",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Raspberry Cake",
            )?.waiting_time,
            height: 31,
            details: `Raspberry glazed cake is a delightful dessert featuring a soft, buttery cake base topped with a vibrant, tangy raspberry glaze. The glaze, made from fresh raspberry puree and a touch of sugar, adds a glossy finish and bursts of fruity flavor that balance the cake’s sweetness. The moist crumb pairs beautifully with the tartness of the raspberries, creating a refreshing and indulgent treat. Often garnished with fresh berries or powdered sugar, this cake is perfect for any occasion, from afternoon tea to elegant celebrations.`,
        },
        {
            img: "brown_sugar_pavlovas.png",
            name: "Brown Pavlovas",
            description:
                "Light and crispy brown sugar pavlovas with a caramelized sweetness.",
            price: productDetails.find(
                (product) => product.food_name === "Brown Pavlovas",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Brown Pavlovas",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Brown Pavlovas",
            )?.waiting_time,
            height: 31,
            details: `Brown sugar pavlovas are delicate meringue-based desserts with a crisp, golden shell and a soft, marshmallow-like center. The addition of brown sugar gives them a rich, caramelized depth, enhancing their natural sweetness. These airy pavlovas are often topped with whipped cream, fresh fruits like berries or figs, and a drizzle of honey or caramel for extra indulgence. Their light texture and elegant presentation make them a perfect dessert for special occasions or a refined sweet treat.`,
        },
        {
            img: "salted_caramel.png",
            name: "Salted Caramel",
            description:
                "Luxurious salted caramel chocolate mousse with a perfect sweet-salty balance.",
            price: productDetails.find(
                (product) => product.food_name === "Salted Caramel",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Salted Caramel",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Salted Caramel",
            )?.waiting_time,
            height: 31,
            details: `Salted caramel chocolate mousse is a rich and velvety dessert that combines deep chocolate flavors with the indulgent sweetness of caramel and a touch of sea salt. The airy mousse is made with high-quality chocolate and folded with salted caramel for a smooth, melt-in-your-mouth texture. The hint of salt enhances the richness of the chocolate, creating a perfectly balanced flavor. Often topped with whipped cream, caramel drizzle, or chocolate shavings, this elegant treat is a decadent choice for chocolate lovers.`,
        },
        {
            img: "coffee_tiramisu.png",
            name: "Coffee Tiramisu",
            description:
                "Rich and creamy coffee tiramisu cake with delicate espresso-soaked layers.",
            price: productDetails.find(
                (product) => product.food_name === "Coffee Tiramisu",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Coffee Tiramisu",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Coffee Tiramisu",
            )?.waiting_time,
            height: 31,
            details: `Coffee tiramisu cake is a decadent Italian-inspired dessert that blends the bold flavors of espresso with the light, creamy texture of mascarpone. Layers of coffee-soaked sponge cake or ladyfingers are stacked with a velvety mascarpone filling, lightly sweetened and infused with hints of cocoa. A dusting of cocoa powder on top adds a bittersweet contrast, enhancing the depth of flavor. Perfectly balanced between rich and airy, this indulgent cake is a favorite for coffee lovers and dessert enthusiasts alike.`,
        },
        {
            img: "smoke_salmon.png",
            name: "Salmon Bagel",
            description:
                "Classic smoked salmon bagel with creamy cheese and fresh toppings.",
            price: productDetails.find(
                (product) => product.food_name === "Salmon Bagel",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Salmon Bagel",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Salmon Bagel",
            )?.waiting_time,
            height: 31,
            details: `A smoked salmon bagel is a savory and satisfying dish featuring silky, smoked salmon layered over a toasted bagel. Typically spread with cream cheese, the bagel is then topped with crisp red onions, capers, and fresh dill for a burst of flavor. The combination of the smoky, buttery salmon with the tangy and creamy elements creates a perfect balance. Whether enjoyed for breakfast or brunch, this timeless favorite is both delicious and elegant.`,
        },
        {
            img: "avocado_bacon.png",
            name: "Avocado Bacon",
            description:
                "Crispy bacon, creamy avocado, and egg on toasted artisan bread.",
            price: productDetails.find(
                (product) => product.food_name === "Avocado Bacon",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Avocado Bacon",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Avocado Bacon",
            )?.waiting_time,
            height: 31,
            details: `Avocado bacon and egg toast is a hearty and flavorful open-faced breakfast dish that combines creamy mashed avocado with crispy bacon and a perfectly cooked egg. The avocado provides a rich, buttery texture, while the bacon adds a smoky crunch. The egg—whether poached, fried, or soft-boiled—completes the dish with a silky yolk that blends beautifully with the other ingredients. Served on a toasted slice of sourdough or multigrain bread, this dish is a delicious balance of protein, healthy fats, and crunch, perfect for a satisfying start to the day.`,
        },
        {
            img: "sushi.png",
            name: "Sushi",
            description:
                "Delicate and flavorful sushi with fresh, high-quality ingredients.",
            price: productDetails.find(
                (product) => product.food_name === "Sushi",
            )?.food_price,
            calorie: productDetails.find(
                (product) => product.food_name === "Sushi",
            )?.calories,
            waiting_time: productDetails.find(
                (product) => product.food_name === "Sushi",
            )?.waiting_time,
            height: 31,
            details: `Sushi is a traditional Japanese dish consisting of vinegared rice paired with fresh seafood, vegetables, or other ingredients. It comes in various forms, including nigiri (hand-pressed rice topped with fish), maki (rolled sushi wrapped in seaweed), and sashimi (thinly sliced raw fish without rice). The balance of flavors—umami-rich fish, slightly sweet rice, and a hint of soy sauce or wasabi—creates a harmonious taste experience. Often served with pickled ginger and wasabi, sushi is a beloved dish worldwide, known for its freshness, artistry, and refined flavors.`,
        },
    ];

    const selectedProduct = product.find(
        (item) => item.name === selectedCuisine,
    );
    return (
        <div
            className={`${layout.main} w-screen h-full backdrop-blur-[10px] [-webkit-backdrop-blur:10px] relative`}
        >
            <div
                className={`${layout.head} flex flex-row justify-between px-6`}
            >
                <button
                    className="text-primary text-shadow-md"
                    onClick={() => setSelectedCuisine("")}
                >
                    <ArrowBigLeft size={45} />
                </button>
                <button className="text-primary text-shadow-md">
                    <ShoppingBasket size={45} />
                </button>
            </div>
            <div
                className={`${layout["image-container"]} pointer-events-none translate-y-[-70px] min-[390px]:translate-y-[-${selectedProduct?.height}px] scale-90 min-[390px]:scale-100`}
            >
                <img
                    className="drop-shadow-lg"
                    src={`/images/products/${selectedProduct?.img}`}
                />
            </div>
            <div
                className={`${layout["food-title"]} flex flex-col justify-between pl-6`}
            >
                <div className="flex flex-col gap-[0.5]">
                    <h1 className="text-primary text-[1.3rem] min-[390px]:text-2xl whitespace-nowrap overflow-visible">
                        {selectedProduct?.name}
                    </h1>
                    <p className="text-white/50 font-extralight text-[0.7rem] min-[390px]:text-[0.8rem] leading-4">
                        {selectedProduct?.description}
                    </p>
                </div>
                <div className="flex flex-row text-white/60 text-[0.7rem] min-[390px]:text-[0.8rem] font-extralight justify-between h-[3.35rem]">
                    <p className="flex flex-row items-center">
                        {selectedProduct?.calorie
                            ? selectedProduct.calorie * orderQuantity
                            : 0}
                        <Flame size={17} />
                    </p>
                    <p className="flex flex-row items-center">
                        {selectedProduct?.waiting_time} <Hourglass size={17} />
                    </p>
                </div>
            </div>
            <div
                className={`${layout["food-price"]} pr-6 flex flex-col justify-between items-end`}
            >
                <h1 className="text-primary text-2xl min-[390px]:text-4xl text-shadow-md">
                    ₱{" "}
                    {selectedProduct?.price
                        ? selectedProduct.price * orderQuantity
                        : 0}
                </h1>
                <div className="[box-shadow:0_0_8px_rgba(0,0,0,0.5)_inset] bg-gradient-to-t rounded-4xl shadow-md  w-[7rem] h-[2.5rem] min-[390px]:w-[9.5rem] min-[390px]:h-[3.35rem] to-[#9A7E57] from-[#665237] flex flex-row items-center justify-between px-4 text-primary">
                    <button
                        className="text-shadow-md text-4xl min-[390px]:text-5xl"
                        onClick={() => {
                            orderQuantity > 0
                                ? setOrderQuantity((prev) => prev - 1)
                                : setOrderQuantity(0);
                        }}
                    >
                        -
                    </button>
                    <p className="text-shadow-md">{orderQuantity}</p>
                    <button
                        className="text-shadow-md text-4xl min-[390px]:text-5xl"
                        onClick={() => setOrderQuantity((prev) => prev + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className={`${layout["food-detail"]} px-6`}>
                <h1 className="text-primary text-lg">Details</h1>
                <p className="text-justify text-white/50 font-extralight text-[0.8rem]">
                    {selectedProduct?.details}
                </p>
            </div>
            <div className="absolute bottom-10 min-[390px]:bottom-20 w-full h-15 flex items-center justify-center z-20 ">
                <button className="text-primary  px-20 py-2 bg-transparent backdrop-blur-[50px] [-webkit-backdrop-filter:blur(50px)] rounded-[10rem] border-1 border-white/10 shadow-lg">
                    Add to basket
                </button>
            </div>
            <div className="w-full h-[80%] bg-gradient-to-t from-[#0000009e] to-[#ffffff00] absolute bottom-0 z-[-1]"></div>
        </div>
    );
};

export default ProductDetails;
